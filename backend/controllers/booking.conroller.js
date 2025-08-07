//call Data Base
const connection = require("../config/db");
//
const { sendMail } = require("../utils/mailer");
const { sendEmailIfEnabled } = require("./notifications.controller");
//fitching booking
exports.getBooking = (req, res) => {
  const userId = req.user.id;

  const sql = `
  SELECT 
    b.id,
    b.notes,
    b.status,
    b.created_at,
    b.appointment_time,
    s.service_name AS service_name,
    c.model AS car_model,
    c.plate_number AS car_plate
  FROM bookings b
  JOIN services s ON b.service_id = s.id
  JOIN cars c ON b.car_id = c.id
  WHERE b.user_id = ?
`;

  connection.query(sql, [userId], (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Fetching failed", error: err });
    }
    return res.status(200).json({ message: "Fetching successfully", result });
  });
};

//get all bookings
exports.getAllBookings = (req, res) => {
  const sql = `
    SELECT 
      b.id,
      b.notes,
      b.status,
      b.created_at,
      b.appointment_time,
      s.service_name AS service_name,
        u.username AS user_name,
      c.model AS car_model,
      c.plate_number AS car_plate
    FROM bookings b
    LEFT JOIN services s ON b.service_id = s.id
    LEFT JOIN cars c ON b.car_id = c.id
    LEFT JOIN users u ON b.user_id = u.id
  `;
  connection.query(sql, (err, result) => {
    if (err) {
      console.error("Error fetching data:", err);
      return res.status(500).json({ message: "Fetching failed", error: err });
    }
    return res.status(200).json({ message: "Fetching successfully", result });
  });
};

//add new booking
exports.addNewBooking = (req, res) => {
  const userId = req.user.id;
  const { car_id, service_id, status, notes, booking_time } = req.body;

  const sql = `
    INSERT INTO bookings (user_id, car_id, service_id, status, notes, booking_time)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  const getUserAndBookingDetailsSql = `
    SELECT s.service_name, c.model AS car_model, b.booking_time, u.email, u.email_notifications_enabled
    FROM bookings b
    JOIN services s ON b.service_id = s.id
    JOIN cars c ON b.car_id = c.id
    JOIN users u ON b.user_id = u.id
    WHERE b.id = ?
  `;

  connection.query(
    sql,
    [userId, car_id, service_id, status, notes, booking_time],
    (err, result) => {
      if (err) {
        return res
          .status(400)
          .json({ message: "Adding booking failed", error: err });
      }

      const bookingId = result.insertId;
      connection.query(
        getUserAndBookingDetailsSql,
        [bookingId],
        (err, detailsResult) => {
          if (err) {
            return res
              .status(500)
              .json({ message: "Error fetching details", error: err });
          }

          const {
            service_name,
            car_model,
            booking_time,
            email,
            email_notifications_enabled,
          } = detailsResult[0];

          const subject = "Booking Confirmation - Pending";
          const text = `Your booking has been successfully made.\n\nDetails:\nService: ${service_name}\nCar: ${car_model}\nAppointment: ${new Date(
            booking_time
          ).toLocaleString()}\nNotes: ${notes}\n\nYour appointment is currently in "Pending" status. We will notify you once it's confirmed.`;

          if (email_notifications_enabled) {
            sendMail(email, subject, text);
          }

          return res
            .status(201)
            .json({ message: "Booking added successfully", result });
        }
      );
    }
  );
};

//delete booking
exports.deleteBooking = (req, res) => {
  const bookingId = req.params.bookingId;
  const userId = req.user.id;

  const checkBookingSql = "SELECT * FROM bookings WHERE id = ? AND user_id = ?";

  connection.query(checkBookingSql, [bookingId, userId], (err, checkResult) => {
    if (err) {
      return res.status(500).json({ message: "Error checking booking", err });
    }

    if (checkResult.length === 0) {
      return res
        .status(404)
        .json({ message: "Booking not found or not owned by user" });
    }

    const getUserAndBookingDetailsSql = `
      SELECT u.email, u.email_notifications_enabled
      FROM bookings b
      JOIN users u ON b.user_id = u.id
      WHERE b.id = ? AND b.user_id = ?
    `;

    connection.query(
      getUserAndBookingDetailsSql,
      [bookingId, userId],
      (err, detailsResult) => {
        if (err) {
          return res
            .status(500)
            .json({ message: "Error fetching user details", err });
        }

        if (detailsResult.length > 0) {
          const { email, email_notifications_enabled } = detailsResult[0];

          const subject = "Booking Cancellation";
          const text = `Your booking has been successfully deleted.\n\nYour booking has been removed from our system.`;

          if (email_notifications_enabled) {
            sendMail(email, subject, text);
          }
        } else {
          console.log("No user email found for this booking.");
        }

        const deleteBookingSql =
          "DELETE FROM bookings WHERE id = ? AND user_id = ?";
        connection.query(
          deleteBookingSql,
          [bookingId, userId],
          (err, result) => {
            if (err) {
              return res.status(500).json({ message: "Delete failed", err });
            }
            return res
              .status(200)
              .json({ message: "Booking deleted successfully", result });
          }
        );
      }
    );
  });
};

//update booking
exports.updateBookingStatus = (req, res) => {
  const bookingId = req.params.bookingId;
  const { status } = req.body;

  if (!status) {
    return res.status(400).json({ message: "Status is required" });
  }

  const getBookingDetailsSql = `
    SELECT s.service_name, c.model AS car_model, b.booking_time, u.email, u.email_notifications_enabled
    FROM bookings b
    JOIN services s ON b.service_id = s.id
    JOIN cars c ON b.car_id = c.id
    JOIN users u ON b.user_id = u.id
    WHERE b.id = ?
  `;

  const sql = "UPDATE bookings SET status = ? WHERE id = ?";

  connection.query(sql, [status, bookingId], (err, result) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Error updating booking status", error: err });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Booking not found" });
    }

    connection.query(
      getBookingDetailsSql,
      [bookingId],
      (err, detailsResult) => {
        if (err) {
          return res
            .status(500)
            .json({ message: "Error fetching booking details", error: err });
        }

        if (detailsResult.length > 0) {
          const {
            service_name,
            car_model,
            booking_time,
            email,
            email_notifications_enabled,
          } = detailsResult[0];

          let subject, text;

          if (status === "Confirmed") {
            subject = "Booking Confirmed";
            text = `Your booking has been confirmed.\n\nDetails:\nService: ${service_name}\nCar: ${car_model}\nAppointment: ${new Date(
              booking_time
            ).toLocaleString()}\n`;
          } else if (status === "In Progress") {
            subject = "Booking In Progress";
            text = `Your booking is now in progress.\n\nDetails:\nService: ${service_name}\nCar: ${car_model}\nAppointment: ${new Date(
              booking_time
            ).toLocaleString()}\n`;
          } else if (status === "Completed") {
            subject = "Booking Completed";
            text = `Your booking has been completed.\n\nDetails:\nService: ${service_name}\nCar: ${car_model}\nAppointment: ${new Date(
              booking_time
            ).toLocaleString()}\n`;
          } else {
            subject = "Booking Status Update";
            text = `Your booking status has been updated.\n\nDetails:\nService: ${service_name}\nCar: ${car_model}\nAppointment: ${new Date(
              booking_time
            ).toLocaleString()}\nStatus: ${status}`;
          }

          if (email_notifications_enabled) {
            sendMail(email, subject, text);
          }

          return res
            .status(200)
            .json({ message: "Booking status updated successfully" });
        } else {
          return res.status(404).json({ message: "Booking details not found" });
        }
      }
    );
  });
};

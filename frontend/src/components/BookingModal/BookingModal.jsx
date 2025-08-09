//css import
import "./BookingModal.css";

//axios import
import axios from "axios";

//react hook import
import { useState, useEffect } from "react";

//contexts import
import { useCarContext } from "../../context/CarContext";
import { useToast } from "../../context/ToastContext";
import { useAdmin } from "../../context/AdminContext";
import { useEmployee } from "../../context/EmployeeContext";

//react routes
import { useNavigate } from "react-router-dom";

//icons import
import { FaTimesCircle } from "react-icons/fa";
import { FaCheckCircle } from "react-icons/fa";

//components
import { playNotificationSound } from "../../utils/sound";

const BookingModal = ({ serviceId, onClose }) => {
  const { isAdmin } = useAdmin();
  const { isEmployee } = useEmployee();

  //cars contexts
  const { myCar } = useCarContext();

  //toast contexts
  const { showToast } = useToast();

  //save car id
  const [carId, setCarId] = useState("");

  //note state
  const [note, setNote] = useState("");

  //booking date & time stete
  const [bookingDate, setBookingDate] = useState("");
  const [bookingTime, setBookingTime] = useState("");

  //rect routes navigate
  const navigate = useNavigate();

  //handel add booking
  const handelAddBooking = async () => {
    if (!carId) {
      showToast("Please select a car before booking.", "error");
      return;
    }

    //Time validation
    if (!bookingDate || !bookingTime) {
      showToast("⚠️ Select date & time", "error");
      return;
    }
    const bookingDateTime = `${bookingDate}T${bookingTime}`;
    const [hour, minute] = bookingTime.split(":").map(Number);
    if (hour < 7 || hour >= 19) {
      showToast("⚠️ Time must be between 07:00–19:00", "error");
      return;
    }

    //Add new booking
    const bookingData = {
      car_id: carId,
      service_id: serviceId,
      notes: note,
      status: "pending",
      booking_time: bookingDateTime,
    };

    try {
      const response = await axios.post(
        "http://localhost:3002/bookings",
        bookingData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response) {
        showToast(response.data.message, "success");
        onClose();
      }
      if (isEmployee || isAdmin) {
        playNotificationSound();
      }
    } catch (err) {
      console.error("adding new booking fialed", err);
    }
  };
  const today = new Date();
  const fiveDaysLater = new Date();
  fiveDaysLater.setDate(today.getDate() + 5);

  const formatDate = (date) => date.toISOString().split("T")[0];

  const minDate = formatDate(today);
  const maxDate = formatDate(fiveDaysLater);

  return (
    <>
      <div className="modal-container">
        <div className="booking-modal-content">
          <div className="img-add-booking-content">
            <img
              src="./images/booking.webp"
              alt="car img"
              className="img-add-booking"
            />
          </div>
          <div id="add-booking-from">
            <label>select your car:</label>
            <select onChange={(e) => setCarId(e.target.value)}>
              <option value=""> Select your car </option>
              {myCar.map((car) => {
                const plateString = car.plate_number
                  ? car.plate_number.toString()
                  : "";
                const firstTwo = plateString.slice(0, 2);
                const rest = plateString.slice(2);

                return (
                  <option key={car.id} value={car.id}>
                    {car.model} - {firstTwo}-{rest}
                  </option>
                );
              })}
            </select>
            <label>Enter your note:</label>
            <input
              className="note-inbut"
              type="text"
              placeholder="Enter your note"
              value={note}
              onChange={(e) => {
                setNote(e.target.value);
              }}
            />
            <label>Select Booking Date:</label>
            <input
              className="date-input"
              type="date"
              min={minDate}
              max={maxDate}
              value={bookingDate}
              onChange={(e) => setBookingDate(e.target.value)}
            />

            <label>Select Time:</label>
            <input
              className="time-input"
              type="time"
              min="07:00"
              max="19:00"
              value={bookingTime}
              onChange={(e) => setBookingTime(e.target.value)}
            />
            <div className="add-booking-btn">
              <button onClick={handelAddBooking} id="add-booking-btn">
                <FaCheckCircle size={13} /> add new booking
              </button>
              <button onClick={onClose} id="cancel-btn">
                <FaTimesCircle size={13} /> Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default BookingModal;

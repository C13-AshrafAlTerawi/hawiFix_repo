const express = require("express");
const router = express.Router();

//verify token call
const verifyToken = require("../middlewares/auth");

//booking controller call
const bookinController = require("../controllers/booking.conroller");

//fitching booking routes
router.get("/bookings", verifyToken, bookinController.getBooking);
//add new booking routes
router.post("/bookings", verifyToken, bookinController.addNewBooking);
//delete booking routes
router.delete(
  "/bookings/:bookingId",
  verifyToken,
  bookinController.deleteBooking
);
//get all bookings
router.get("/admin/bookings", bookinController.getAllBookings);
//update status booking
router.patch("/update-status/:bookingId", bookinController.updateBookingStatus);

module.exports = router;

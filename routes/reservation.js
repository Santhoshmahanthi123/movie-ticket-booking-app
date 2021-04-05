const express = require("express");
const router = express.Router();
const auth = require("../middlewares/user-auth");
const reservationController = require("../controllers/reservation");
router.post("/book-ticket",auth.isLoggedIn,reservationController.bookTicket);
router.delete("/:booking_id",auth.isLoggedIn,reservationController.cancelBooking);
router.get("/user/:user_id",reservationController.findUserBookings);
router.get("/bookings",reservationController.findAllBookings);
module.exports = router;
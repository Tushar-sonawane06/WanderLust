const express = require("express");
const router = express.Router();
const { isLoggedIn } = require("../middleware.js");
const wrapAsync = require("../utils/wrapasync.js");
const listingController = require("../controllers/booking.js");

router.post("/", isLoggedIn, wrapAsync (listingController.createBooking));

router.get("/my/bookings", isLoggedIn, wrapAsync(listingController.myBookings));

router.delete("/:id", isLoggedIn, wrapAsync(listingController.cancelBooking));

router.get("/new/:id", isLoggedIn, wrapAsync(listingController.bookHotel));

router.get("/:bookingId", isLoggedIn, wrapAsync (listingController.showBooking));

module.exports = router;
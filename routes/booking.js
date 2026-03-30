const express = require("express");
const router = express.Router();
const { isLoggedIn } = require("../middleware.js");
const wrapAsync = require("../utils/wrapasync.js");
const listingController = require("../controllers/main.js");

router.get("/:id", isLoggedIn, wrapAsync (listingController.bookHotel));

router.post("/", isLoggedIn, wrapAsync (listingController.createBooking));

router.get("/:bookingId", isLoggedIn, wrapAsync (listingController.showBooking));

router.get("/mybookings", isLoggedIn, wrapAsync(listingController.myBookings));

router.delete("/:id", isLoggedIn, wrapAsync(listingController.cancelBooking));

module.exports = router;
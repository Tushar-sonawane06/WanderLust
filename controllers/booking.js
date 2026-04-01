const express = require("express");
const Listing = require("../models/listing.js");
const Booking = require("../models/booking.js");

module.exports.bookHotel= async (req, res) => {
    const listing = await Listing.findById(req.params.id);
    res.render("listings/book.ejs", { listing });
};

module.exports.createBooking = async (req, res) => {
  try {
    const { listingId, checkIn, checkOut, guests } = req.body;

    const listing = await Listing.findById(listingId);

    let days =
      (new Date(checkOut) - new Date(checkIn)) /
      (1000 * 60 * 60 * 24);

    if (days <= 0) days = 1;

    const totalPrice = days * listing.price;

    const newBooking = new Booking({
      user: req.user._id,
      listing: listingId,
      checkIn,
      checkOut,
      guests,
      totalPrice,
    });

    await newBooking.save();

    res.redirect(`/my/bookings`);
  } catch (err) {
    console.log(err);
    res.send("Booking Failed");
  }
};

module.exports.showBooking = async (req, res) => {
  const booking = await Booking.findById(req.params.bookingId)
    .populate("listing")
    .populate("user");

  res.render("listings/showbooked.ejs", { booking });
};

module.exports.myBookings = async (req, res) => {
  const bookings = await Booking.find({ user: req.user._id })
    .populate("listing");

  res.render("listings/booked", { bookings });
};

module.exports.cancelBooking = async (req, res) => {
  const booking = await Booking.findById(req.params.id);

  if (!booking) {
    return res.send("Booking not found");
  }

  // 🔒 Security check (very important)
  if (!booking.user.equals(req.user._id)) {
    return res.send("Unauthorized");
  }

  booking.status = "cancelled";
  await booking.save();

  res.redirect("/bookings/my/bookings");
};
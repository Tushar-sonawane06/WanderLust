const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  listing: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Listing",
  },
  checkIn: Date,
  checkOut: Date,
  guests: Number,
  totalPrice: Number,
  status: {
    type: String,
    default: "confirmed",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ["confirmed", "cancelled"],
    default: "confirmed",
  }
});

module.exports = mongoose.model("Booking", bookingSchema);
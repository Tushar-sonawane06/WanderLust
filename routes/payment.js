const express = require("express");
const router = express.Router();
const Razorpay = require("razorpay");
const crypto = require("crypto");
const Booking = require("../models/booking");

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

router.post("/create-order", async (req, res) => {
  try {
    const { amount } = req.body;

    const options = {
      amount: amount * 100,
      currency: "INR",
      receipt: "receipt_" + Date.now(),
    };

    const order = await razorpay.orders.create(options);

    res.json(order);
  } catch (err) {
    console.log("RAZORPAY ERROR:", err);
    res.status(500).json({ error: "Error creating order" });
  }
});

router.post("/verify", async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      listingId,
      checkIn,
      checkOut,
      guests,
      totalPrice
    } = req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest("hex");

    if (expectedSignature === razorpay_signature) {

      const newBooking = new Booking({
        user: req.user._id,
        listing: listingId,
        checkIn,
        checkOut,
        guests,
        totalPrice,
        paymentId: razorpay_payment_id,
        orderId: razorpay_order_id,
      });

      await newBooking.save();

      return res.json({ success: true });

    } else {
      return res.status(400).json({ success: false });
    }

  } catch (err) {
    console.log("VERIFY ERROR:", err);
    res.status(500).json({ success: false });
  }
});

module.exports = router;
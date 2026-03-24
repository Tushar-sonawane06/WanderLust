const express = require("express");
const router = express.Router();
const passport = require("passport");

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login",
    successRedirect: "/listings", 
  }),
  (req, res) => {
    res.redirect("/listings"); // or home page
  }
);

module.exports = router;
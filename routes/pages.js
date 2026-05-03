const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapasync.js");
const Listing = require("../models/listing");
const {isLoggedIn} = require("../middleware.js");
const listingController = require("../controllers/pages.js");

router.get("/contactus",isLoggedIn,wrapAsync(listingController.renderContactUs));

router.get("/privacypolicy",wrapAsync(listingController.renderPrivacyPolicy));

router.get("/termsofservice",wrapAsync(listingController.renderTermsOfService));

router.post("/contact",wrapAsync(listingController.redirectCotactForm));

module.exports = router;
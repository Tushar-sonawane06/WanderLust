const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapasync.js");
const Listing = require("../models/listing");
const {isLoggedIn} = require("../middleware.js");
const listingController = require("../controllers/pages.js");

router.get("/contactus",isLoggedIn,wrapAsync(listingController.renderContactUs));

module.exports = router;
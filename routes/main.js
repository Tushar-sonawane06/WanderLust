const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapasync.js");
const Listing = require("../models/listing");
const {validateListing, isLoggedIn, isOwner} = require("../middleware.js");
const listingController = require("../controllers/main.js");
const multer = require("multer");

//new main page
router.get("/",wrapAsync(listingController.mainPage));

module.exports = router;
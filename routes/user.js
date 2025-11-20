const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapasync.js");
const { nextTick } = require("process");
const passport = require("passport");
const { saveRedirectUrl} = require("../middleware.js");
const userController = require("../controllers/user.js");

router.route("/signup")
//render signup form
.get(userController.renderSignupForm)
//submit signup form
.post(wrapAsync(userController.signup));

router.route("/login")
//render login form
.get(userController.renderLoginForm)
//submit login form
.post(saveRedirectUrl,passport.authenticate("local",{failureRedirect: '/login', failureFlash:true}),userController.login);

router.get("/logout",userController.logout);

module.exports = router;


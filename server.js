
if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
  }
  
  const express = require("express");
  const app = express();
  const path = require("path");
  const methodOverride = require("method-override");
  const ejsMate = require("ejs-mate");
  const ExpressError = require("./utils/ExpressError.js");
  const session = require("express-session");
  const MongoStore = require("connect-mongo");
  const flash = require("connect-flash");
  const passport = require("passport");
  const LocalStrategy = require("passport-local");
  const user = require("./models/user.js");
  const passportConfig = require("./config/passport.js");
  
  const listingsRouter = require("./routes/listing.js");
  const reviewsRouter = require("./routes/review.js");
  const userRouter = require("./routes/user.js");
  const mainRouter = require("./routes/main.js");
  const pagesRouter = require("./routes/pages.js");
  const authRoutes = require("./routes/auth");
  const bookingRoutes = require("./routes/booking.js");
  const paymentRoutes = require("./routes/payment");
  
  const dbUrl = process.env.ATLASDB_URL;
  
  // EJS configuration
  app.set("view engine", "ejs");
  app.set("views", path.join(__dirname, "views"));
  app.engine("ejs", ejsMate);
  
  // Middleware
  app.use(express.urlencoded({ extended: true }));
  app.use(methodOverride("_method"));
  app.use(express.static(path.join(__dirname, "public")));
  app.set("trust proxy", 1);
  app.use(express.json());
  
  // Session configuration
  const sessionOptions = {
    secret: process.env.SESSION_SECRET || "mysupersecretcode",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    },
  };
  
  // Use MongoDB sessions normally; use the default in-memory
  // session store when running automated tests.
  if (process.env.NODE_ENV !== "test") {
    sessionOptions.store = MongoStore.create({
      mongoUrl: dbUrl,
      touchAfter: 24 * 3600,
    });
  }
  
  app.use(session(sessionOptions));
  app.use(flash());
  app.use(passport.initialize());
  app.use(passport.session());
  
  passport.use(new LocalStrategy(user.authenticate()));
  passport.serializeUser(user.serializeUser());
  passport.deserializeUser(user.deserializeUser());
  
  // Flash messages and current user
  app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currentUser = req.user;
    next();
  });
  
  // Routes
  app.use("/listings", listingsRouter);
  app.use("/listings/:id/reviews", reviewsRouter);
  app.use("/", userRouter);
  app.use("/", mainRouter);
  app.use("/", pagesRouter);
  app.use("/auth", authRoutes);
  app.use("/bookings", bookingRoutes);
  app.use("/payment", paymentRoutes);
  
  // 404 middleware
  app.use((req, res, next) => {
    next(new ExpressError(404, "Page Not Found"));
  });
  
  // Error handler
  app.use((err, req, res, next) => {
    const { statuscode = 500, message = "Something Went Wrong" } = err;
    res.status(statuscode).send(message);
  });
  
  module.exports = app;
  
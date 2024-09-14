const express = require("express");
//require("./instrument.js");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const config = require("/opt/render/project/src/utils/config");
const logger = require("/opt/render/project/src/utils/logger");
//const Sentry = require("@sentry/node");
const cors = require("cors");
const middleware = require("/opt/render/project/src/utils/middleware");
const app = express();
const session = require("express-session");
const passport = require("passport");
const userRoutes = require("/opt/render/project/src/routers/userRouter");
const debtRoutes = require("/opt/render/project/src/routers/debtRouter");
const calcRoutes = require("/opt/render/project/src/routers/calculatorRouter");
//const redisClient = require("./utils/reddisConnection.js");
//require("./utils/passport");

//DATABASES
mongoose.set("strictQuery", false);
mongoose
  .connect(config.MONGODB_URI, {})
  .then(() => logger.info("MongoDB connected"))
  .catch((err) => logger.error("MongoDB connection error:", err));

// (async () => {
//   await redisClient.connect();
// })();
//middleware for requests before routes access
//Sentry.setupExpressErrorHandler(app);

//app config
app.use(cors());
app.use(express.static("dist"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//google middleware
// app.use(
//   session({
//     secret: config.SECRET,
//     resave: false,
//     saveUninitialized: true,
//   })
// );
// Initialize Passport and use session
// app.use(passport.initialize());
// app.use(passport.session());

//app.use(middleware.requestLogger);
app.use(bodyParser.json());

// Use routes
//app.use("/auth", authRoutes);
app.use("/api/users/", userRoutes);
app.use("/api/calcs/", calcRoutes);
app.use("/api/debts/", debtRoutes);

//middleware to handle errors in utils module
app.use(middleware.errorHandler);
app.use(middleware.unknownEndpoint);

module.exports = app;

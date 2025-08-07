const express = require("express");
const app = express();
const mysql = require("mysql2");
const cors = require("cors");
const passport = require("passport");
const session = require("express-session");
const bodyParser = require("body-parser");

//call Data Base
require("dotenv").config();

//translate To Json
app.use(cors());
app.use(express.json());

//not amportante
const connection = require("./config/db");

//user routes
const userRoutes = require("./routes/user.routes");
app.use("/Users", userRoutes);

//authentication routes
const authRoutes = require("./routes/auth.routes");
app.use("/Auth", authRoutes);

//admins routes
const adminRoutes = require("./routes/adminDashboard.routes");
app.use("/admin", adminRoutes);

//Notification Email Enabled routes
const NotificationEmailRoutes = require("./routes/notifications.routes");
app.use("/", NotificationEmailRoutes);

//car routes
const carRoutes = require("./routes/car.routes");
app.use("/cars", carRoutes);

//services routes
const services = require("./routes/sarvice.routes");
app.use("/", services);

//booking routes
const booking = require("./routes/booking.routes");
app.use("/", booking);

//Routs
app.get("/", (req, res) => {
  res.send("Backend is working!!!");
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//app listen
app.listen(process.env.APP_PORT, () => {
  console.log("Server running on http://localhost:3002");
});

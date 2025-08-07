const express = require("express");
const app = express();
app.use(express.json());

module.exports = function Employee(req, res, next) {
  if ((req.user && req.user.role === "admin") || req.user.role === "employee") {
    return next();
  }
  return res
    .status(403)
    .json({ error: "Access denied. Admins or Employees only." });
};

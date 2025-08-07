const express = require("express");
const app = express();
app.use(express.json());

module.exports = function isAdmin(req, res, next) {
  if (req.user && req.user.role === "admin") {
    return next();
  }
  return res.status(403).json({ error: "Access denied. Admins only." });
};

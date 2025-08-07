const express = require("express");
const router = express.Router();

const isAdmin = require("../middlewares/authorization");
const verifyToken = require("../middlewares/auth");
const Employee = require("../middlewares/isEmployee");

router.get("/check-admin", verifyToken, isAdmin, (req, res) => {
  res.json({ role: "admin" });
});

router.get("/employee-dashboard", verifyToken, Employee, (req, res) => {
  res.json({ message: "Welcome Employee or Admin, you're authorized." });
});
module.exports = router;

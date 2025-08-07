const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/auth");

const NotificationEmailIfEnabled = require("../controllers/notifications.controller");

router.patch(
  "/update-notification-preference",
  verifyToken,
  NotificationEmailIfEnabled.sendEmailIfEnabled
);
module.exports = router;

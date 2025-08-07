const connection = require("../config/db");
const { sendMail } = require("../utils/mailer");

const sendEmailIfEnabled = (req, res) => {
  const userId = req.user.id;

  const { emailNotificationsEnabled } = req.body;

  const sql = "UPDATE users SET email_notifications_enabled = ? WHERE id = ?";

  connection.query(sql, [emailNotificationsEnabled, userId], (err, result) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Error updating preferences", error: err });
    }

    if (emailNotificationsEnabled) {
      const subject = "Email Notifications Enabled";
      const text = "You have successfully enabled email notifications.";
      sendMail(req.user.email, subject, text);
    }

    return res
      .status(200)
      .json({ message: "Notification preferences updated successfully" });
  });
};
module.exports = {
  sendEmailIfEnabled,
};

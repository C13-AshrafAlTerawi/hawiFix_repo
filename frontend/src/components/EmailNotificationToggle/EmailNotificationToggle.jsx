//css import
import "./EmailNotificationToggle.css";

//axios import
import axios from "axios";

//react hooks import
import { useState, useEffect } from "react";

//context
import { useAuthContext } from "../../context/AuthContext";

//token decoded
import { jwtDecode } from "jwt-decode";

const EmailNotificationToggle = () => {
  // is Subscribed token
  const [isSubscribed, setIsSubscribed] = useState(null);

  // context token
  const { token } = useAuthContext();

  // Load the notification preference when the page loads
  useEffect(() => {
    const savedPreference = localStorage.getItem("emailNotificationsEnabled");
    if (savedPreference !== null) {
      setIsSubscribed(savedPreference === "1");
    } else if (token) {
      const decoded = jwtDecode(token);
      setIsSubscribed(decoded.emailNotificationsEnabled);
      localStorage.setItem(
        "emailNotificationsEnabled",
        decoded.emailNotificationsEnabled ? "1" : "0"
      );
    }
  }, [token]);

  // Toggle the notification preference
  const handelNotificationToggle = async () => {
    if (isSubscribed === null) return;

    try {
      const NotificationData = {
        emailNotificationsEnabled: !isSubscribed ? "1" : "0",
      };

      const response = await axios.patch(
        "http://localhost:3002/update-notification-preference",
        NotificationData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        console.log("Notification Toggle successful");
        setIsSubscribed(!isSubscribed);

        localStorage.setItem(
          "emailNotificationsEnabled",
          !isSubscribed ? "1" : "0"
        );
      }
    } catch (err) {
      console.error("Notification Toggle failed", err);
    }
  };

  return (
    <div className="notification-toggle-container">
      {isSubscribed !== null ? (
        <>
          <label>
            <input
              type="checkbox"
              checked={isSubscribed}
              onChange={handelNotificationToggle}
            />
            Enable Email Notifications
          </label>

          <p className="notification-description">
            <strong>By enabling email notifications,</strong> you will receive
            updates on your bookings, including when a new appointment is
            scheduled or when there are changes in the status of your booking
            (e.g., confirmed, in progress, or completed).
            <br />
            If you choose to disable email notifications, you will no longer
            receive any updates via email regarding your booking status.
            <br />
            This means you won't be notified about your appointment's progress,
            status changes, or any reminders.
            <br />
            You can always enable them again to start receiving notifications.
            <br />
            Please note, this setting applies to all future updates related to
            your bookings.
          </p>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default EmailNotificationToggle;

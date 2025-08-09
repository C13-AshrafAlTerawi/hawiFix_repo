//css import
import "./Settings.css";

//react hooks
import { useState } from "react";

//react routes
import { useNavigate } from "react-router-dom";

//component import
import Navbar from "../Navbar/Navbar";
import EmailNotificationToggle from "../EmailNotificationToggle/EmailNotificationToggle";
import AccountSetting from "../AccountSetting/AccountSetting";
import Footer from "../Footer/Footer";
import NoTokenMessage from "../NoTokenMessage/NoTokenMessage";

//contexts
import { useAuthContext } from "../../context/AuthContext";
import { useAdmin } from "../../context/AdminContext";
import { useConfirmModal } from "../../context/ConfirmModalContext";
import { useUserContext } from "../../context/UserContext";

//icons import
import { FaRegCircleUser } from "react-icons/fa6";
import { IoMdSettings } from "react-icons/io";
import { HiMiniBellAlert } from "react-icons/hi2";
import { IoLogOut } from "react-icons/io5";

const Settings = () => {
  //react routes
  const navigate = useNavigate();

  //Notification state
  const [notifactionClick, setNotifactionClick] = useState(false);

  //admin state
  const { setIsAdmin } = useAdmin();

  //auth contexts
  const { setToken, setIsLoggedIn, token } = useAuthContext();

  //confirm modal state
  const { openModal } = useConfirmModal();

  //User Contexts
  const { userName } = useUserContext();

  //handel Notification option click
  const handelNotificationOptionsTokel = () => {
    if (notifactionClick) {
      setNotifactionClick(false);
    } else {
      setNotifactionClick(true);
    }
  };

  //handel log out
  const handelLogOut = () => {
    openModal({
      title: "Confirm log out",
      message: "Are you sure you want to log out",
      onConfirm: () => {
        localStorage.removeItem("token");
        localStorage.removeItem("emailNotificationsEnabled");
        localStorage.removeItem("username");
        localStorage.removeItem("email");
        localStorage.removeItem("phone_number");
        setIsLoggedIn(false);
        setToken(null);
        setIsAdmin(false);
        navigate("/login");
      },
    });
  };
  if (!token) {
    return <NoTokenMessage />;
  }
  return (
    <>
      <Navbar />
      <div className="setting-container">
        <div className="setting-content">
          <div className="options-container">
            <div className="options-content">
              <div className="useIcon">
                <FaRegCircleUser
                  size={150}
                  onClick={() => {
                    navigate("/");
                  }}
                />
                <h2>{userName}</h2>
              </div>
              <div className="Account-and-Notifaction">
                <p
                  onClick={() => {
                    setNotifactionClick(false);
                  }}
                >
                  <IoMdSettings />
                  Account settings{" "}
                </p>
                <p onClick={handelNotificationOptionsTokel}>
                  <HiMiniBellAlert />
                  Notifaction
                </p>
              </div>
              <p onClick={handelLogOut}>
                <IoLogOut size={30} />
                log out
              </p>
            </div>
          </div>
          <div className="setting-panel">
            {notifactionClick ? (
              <EmailNotificationToggle />
            ) : (
              <div>
                <AccountSetting />
                <div>
                  <p className="info-message">
                    You are in the Account Info page, and you can update your
                    details here. Make sure to save your changes after editing.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
export default Settings;

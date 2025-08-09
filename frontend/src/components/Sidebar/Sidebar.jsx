//css import
import "./Sidebar.css";

import { useAuthContext } from "../../context/AuthContext";

import { useNavigate } from "react-router-dom";

//icons
import { FaLock, FaExclamationCircle } from "react-icons/fa";
import { GiGearStickPattern } from "react-icons/gi";
import { FaCar, FaTools, FaCalendarAlt } from "react-icons/fa";

const Sidebar = () => {
  //auth contexts
  const { token } = useAuthContext();

  //react navegate
  const navegate = useNavigate();

  return (
    <>
      <aside className="sidebar-with-bg">
        <div className="bg-overlay" />
        {!token && (
          <div className="lock-overlay">
            <FaLock className="lock-icon" />
            <p className="lock-message">
              <FaExclamationCircle className="lock-message-icon" />
              Please log in or sign up to unlock the sidebar menu.
            </p>
          </div>
        )}
        <div className="sidebar-content">
          <h1 className="app-title">
            <GiGearStickPattern size={40} />
            Welcome from HawiFix Dashboard
          </h1>
          <div className="sidebar-menu">
            <div className="menu-item">
              <FaCar className="menu-icon" size={20} />
              <h2
                onClick={() => {
                  navegate("/carList");
                }}
              >
                My Cars
              </h2>
            </div>
            <div className="menu-item">
              <FaTools className="menu-icon" size={20} />
              <h2
                onClick={() => {
                  navegate("/service");
                }}
              >
                The Services
              </h2>
            </div>
            <div className="menu-item">
              <FaCalendarAlt className="menu-icon" size={20} />
              <h2
                onClick={() => {
                  navegate("/booking");
                }}
              >
                My Booking
              </h2>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;

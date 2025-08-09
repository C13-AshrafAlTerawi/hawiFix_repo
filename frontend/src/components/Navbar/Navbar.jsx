//css import
import "./Navbar.css";

//react routes import
import { useNavigate, useLocation } from "react-router-dom";

//react hook import
import { useState, useEffect } from "react";

//json web token import
import { jwtDecode } from "jwt-decode";

//icons
import { ShieldUser, MonitorCog } from "lucide-react";
import { Info } from "lucide-react";

//contexts import
import { useAuthContext } from "../../context/AuthContext";
import { useAdmin } from "../../context/AdminContext";
import { useEmployee } from "../../context/EmployeeContext";
import { useConfirmModal } from "../../context/ConfirmModalContext";

//component import
import WelcomeUser from "../Navbar/WelcomeUser";

const Navbar = () => {
  //react routes
  const navigate = useNavigate();
  const location = useLocation();

  //employee context
  const { isEmployee } = useEmployee();

  //admin state
  const { isAdmin, setIsAdmin } = useAdmin();

  //user name state
  const [userName, setUserName] = useState("");

  //user email state
  const [email, setEmail] = useState("");

  //modal open state
  const [itsOpen, setItsOpen] = useState(false);

  //confirm modal state
  const { openModal } = useConfirmModal();

  //auth state
  const { token, setToken, isLoggedIn, setIsLoggedIn } = useAuthContext();

  const isActiveAdminBtn =
    location.pathname === "/admin-dashboard" ||
    location.pathname === "/admin-dashboard/users" ||
    location.pathname === "/admin-dashboard/service";

  const isActiveEplloyeeBtn = location.pathname === "/employee-dashboard";

  //deoded the token
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setIsLoggedIn(true);

        setUserName(decoded.username);
        setEmail(decoded.email);
      } catch (err) {
        console.error("Invalid token");
        setIsLoggedIn(false);
      }
    }
  }, [isLoggedIn, token]);

  //handel log out
  const handelLogout = () => {
    openModal({
      title: "log out Confirm ",
      message: "Are you sure you want to log out",
      onConfirm: () => {
        localStorage.removeItem("token");
        localStorage.removeItem("emailNotificationsEnabled");
        localStorage.removeItem("username");
        localStorage.removeItem("email");
        localStorage.removeItem("phone_number");
        setIsLoggedIn(false);
        setItsOpen(false);
        setToken(null);
        setIsAdmin(false);
        navigate("/login");
      },
    });
  };
  return (
    <div className="navbar">
      <div className="navbarContainer">
        <h1 className="logo">
          <img
            src="/images/carFixlogo.png"
            alt="hawiFix Logo"
            className="logoImg"
          />
          HawiFix Booking
        </h1>
        <ul className="navLinks">
          {isAdmin && (
            <li
              className="admin-dashboard"
              onClick={() => {
                navigate("/admin-dashboard");
              }}
              style={{
                color: isActiveAdminBtn ? "#7a7c7d" : "#fff",
              }}
            >
              <ShieldUser size={25} />
              Admin Dashboard
            </li>
          )}
          {isEmployee && (
            <li
              style={{
                color: isActiveEplloyeeBtn ? "#7a7c7d" : "#fff",
              }}
              className="admin-dashboard"
              onClick={() => {
                navigate("/employee-dashboard");
              }}
            >
              <MonitorCog
                size={25}
                style={{ color: isActiveEplloyeeBtn ? "#7a7c7d" : "#fff" }}
              />{" "}
              employee-dashboard
            </li>
          )}

          <li
            className="aboutUs"
            onClick={() => {
              navigate("/about-us");
            }}
          >
            <Info style={{ color: "#fff" }} />
            About Us
          </li>

          {isLoggedIn && (
            <>
              <WelcomeUser
                userName={userName}
                email={email}
                itsOpen={itsOpen}
                setItsOpen={setItsOpen}
                handelLogout={handelLogout}
              />
            </>
          )}
        </ul>
      </div>
    </div>
  );
};
export default Navbar;

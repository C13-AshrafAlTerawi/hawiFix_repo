//css import
import "./Register.css";

//axios import
import axios from "axios";

//react hook import
import { useState } from "react";

//react router import
import { Link, useNavigate } from "react-router-dom";

//component import
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

//contexts
import { useToast } from "../../context/ToastContext";

//icons
import { BiError } from "react-icons/bi";
import { PiSignInBold } from "react-icons/pi";
import { FaUserPlus } from "react-icons/fa";

const Register = () => {
  //react navigate
  const navigate = useNavigate();

  //user name state
  const [username, setUserName] = useState("");

  //email state
  const [email, setEmail] = useState("");

  //password state
  const [password, setPassword] = useState("");

  //Phone number state
  const [phoneNumber, setPhoneNumber] = useState("");

  //error message state
  const [errorMessage, setErrorMessage] = useState("");

  //successfull message state
  const [successMessage, setSuccessMessage] = useState("");

  //toast context
  const { showToast } = useToast();

  //handel register
  const handleRegister = async (e) => {
    e.preventDefault();
    if (!username) {
      setErrorMessage("User name cannot be empty.");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }
    if (phoneNumber.length !== 10) {
      setErrorMessage("Please enter a valid 10-digit phone number.");
      return;
    }
    if (password.length < 8) {
      setErrorMessage("Password must be at least 8 characters long.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3002/Auth/register", {
        username,
        email,
        password,
        phoneNumber,
      });

      showToast(`${response.data.message}! 🎉 `, "success");
      setTimeout(() => {
        navigate("/login");
      }, 500);
    } catch (err) {
      const error =
        err.response?.data.error ||
        "Email already exists" ||
        "DB error" ||
        "Register failed" ||
        "Hashing failed" ||
        "User Name already exists";
      setErrorMessage(error);
      setSuccessMessage("");
      console.error("Registration failed", err.response?.data);
    }
  };
  return (
    <>
      <Navbar />
      <div className="login_container">
        <div className="login_image">
          <img src="/images/loginCar.webp" alt="Car repair" />
        </div>
        <div className="login_form_section">
          <form onSubmit={handleRegister}>
            <div className="message-placeholder-register-from">
              {successMessage && (
                <p className="successMessage">{successMessage}</p>
              )}
              {errorMessage && (
                <p className="errorMessage-register-from">
                  <BiError size={30} />
                  {errorMessage}
                </p>
              )}
            </div>

            <h2 className="login-sign-up-taitl">
              <FaUserPlus /> Sign Up for a New Account
            </h2>

            <label className="label-register-form">User Name:</label>
            <input
              placeholder="Enter your user Name"
              value={username}
              onChange={(e) => {
                setUserName(e.target.value);
              }}
              className="register-input"
            />
            <label className="label-register-form">Email:</label>
            <input
              placeholder="Enter your email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              className="register-input"
            />
            <label className="label-register-form">Phone Number:</label>
            <input
              placeholder="Enter your phone number"
              value={phoneNumber}
              onChange={(e) => {
                setPhoneNumber(e.target.value);
              }}
              className="register-input"
            />
            <label className="label-register-form">Password:</label>
            <input
              placeholder="Enter your password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              className="register-input"
            />

            <button type="submit" className="submit-btn">
              Sign Up
              <PiSignInBold size={25} />
            </button>
            <div className="regiter-placeholder">
              <p>
                <Link to="/login">Click here</Link> to go back to log in
              </p>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};
export default Register;

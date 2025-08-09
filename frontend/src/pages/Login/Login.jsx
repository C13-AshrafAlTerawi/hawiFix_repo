//css import
import "./Login.css";

//react hook import
import { useState } from "react";

//react routes import
import { useNavigate, Link } from "react-router-dom";

//axios import
import axios from "axios";

//component import
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer.jsx";

//contexts import
import { useAuthContext } from "../../context/AuthContext";
import { useToast } from "../../context/ToastContext";

//icons
import { BiError } from "react-icons/bi";
import { TbLogin2 } from "react-icons/tb";

const Login = () => {
  //react routes
  const navigate = useNavigate();
  //user email state
  const [email, setEmail] = useState("");
  //user password state
  const [password, setPassword] = useState("");
  //error message state
  const [errorMessage, setErrorMessage] = useState("");
  //successfull message state
  const [successMessage, setSuccessMessage] = useState("");
  //toast context
  const { showToast } = useToast();
  //Auth contexts
  const { setToken, setIsLoggedIn } = useAuthContext();

  //handel log in
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3002/Auth/login", {
        email,
        password,
      });
      const receivedToken = response.data.token;
      const successMessage = response.data.message;

      if (receivedToken) {
        localStorage.setItem("token", receivedToken);
        setSuccessMessage(successMessage);
        setToken(receivedToken);
        showToast(`${successMessage}! 🎉 `, "success");
        setErrorMessage("");
        setIsLoggedIn(true);

        setTimeout(() => {
          navigate("/");
        }, 500);
      }

      setEmail("");
      setPassword("");
    } catch (err) {
      const error = err.response?.data?.Message || "Invalid email or password";
      setErrorMessage(error);
      console.error("Login failed", err.response?.data);
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
          <form onSubmit={handleLogin}>
            <div className="message-placeholder">
              {successMessage && (
                <p className="successMessage">{successMessage}</p>
              )}
              {errorMessage && (
                <p className="errorMessage">
                  <BiError size={30} />
                  {errorMessage}
                </p>
              )}
            </div>
            <h2 className="login-sign-up-taitl">
              <TbLogin2 size={35} /> Login to Your Account
            </h2>

            <label>Email</label>
            <input
              className="login-input"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <label>Password</label>
            <input
              className="login-input"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button type="submit" className="submit-btn">
              Log In <TbLogin2 size={25} />
            </button>
            <div className="regiter-placeholder">
              <p>
                Don't have an account?
                <Link to="/register"> Register here</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};
export default Login;

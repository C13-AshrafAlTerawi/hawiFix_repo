//css import
import "./AccountSetting.css";

//react hooks import
import { useState, useEffect } from "react";

//react route
import { useNavigate } from "react-router-dom";

//context import
import { useUserContext } from "../../context/UserContext";
import { useAuthContext } from "../../context/AuthContext";
import { useToast } from "../../context/ToastContext";
import { useConfirmModal } from "../../context/ConfirmModalContext";

//axios import
import axios from "axios";

//jwt Decode
import { jwtDecode } from "jwt-decode";

//icons
import { FaEdit } from "react-icons/fa";
import { MdCancel } from "react-icons/md";

//component import
const AccountSetting = () => {
  //Navigate React Routes
  const Navigate = useNavigate();

  //toast context
  const { showToast } = useToast();

  //confirm context
  const { openModal } = useConfirmModal();

  //Edite User Data state
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    phone_number: "",
  });

  //Open Is Editing state
  const [isEditing, setIsEditing] = useState({
    username: false,
    email: false,
    phone_number: false,
    password: false,
  });

  //User informacion state
  const [userName, setUserName] = useState(null);
  const [email, setEmail] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState(null);

  //auth contexts
  const { token } = useAuthContext();

  //User New password state
  const [newPassword, setNewPassword] = useState("");
  //comparison Password state
  const [confirmPassword, setConfirmPassword] = useState("");

  //verification token and set the paylod in local storage
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      const decoded = jwtDecode(storedToken);
      setUserName(localStorage.getItem("username") || decoded.username);
      setEmail(localStorage.getItem("email") || decoded.email);
      setPhoneNumber(localStorage.getItem("phone") || decoded.phoneNumber);
    } else {
      setUserName(null);
      setEmail(null);
      setPhoneNumber(null);
    }
  }, []);

  //set User Data from User Name state && User Email state && User Phone Number state
  useEffect(() => {
    if (userName && email && phoneNumber) {
      setUserData({
        username: userName,
        email: email,
        phone_number: phoneNumber,
      });
    }
  }, [userName, email, phoneNumber]);

  //Change the Edit field to True or False
  const handleEdit = (field) => {
    setIsEditing((prevState) => ({ ...prevState, [field]: true }));
  };

  //handel update User Name & Email & Phone Number
  const handleSubmit = async (field) => {
    try {
      const updatedData = { [field]: userData[field] };

      const response = await axios.patch(
        `http://localhost:3002/Users/update/${field}`,
        updatedData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("the response", response);

      if (field === "username") {
        setUserName(userData.username);
        localStorage.setItem("username", userData.username);
        showToast("User Name Update Successful", "success");
      }
      if (field === "email") {
        setEmail(userData.email);
        localStorage.setItem("email", userData.email);
        showToast("User Email Update Successful", "success");
      }
      if (field === "phone_number") {
        setPhoneNumber(userData.phone_number);
        localStorage.setItem("phone_number", userData.phone_number);
        showToast("User Phone Number Update Successful", "success");
      }
      setIsEditing((prevState) => ({ ...prevState, [field]: false }));
    } catch (error) {
      const errorMessage =
        error.response?.data?.error ||
        "Update Error" ||
        "User Name already exists." ||
        "Email already exists";
      console.error("Update Error", errorMessage);
      showToast(errorMessage, "error");
    }
  };

  //handel Password update
  const handlePasswordSubmit = async () => {
    if (newPassword !== confirmPassword) {
      showToast("Passwords do not match!", "error");
      return;
    }
    if (newPassword.length < 8) {
      showToast("Password must be at least 8 characters long.", "error");
      return;
    }

    openModal({
      title: "Password Updated Successfully",
      message:
        "Your password has been updated. You will be logged out automatically. Please log in again with your new password to continue.",
      onConfirm: async () => {
        try {
          const response = await axios.patch(
            "http://localhost:3002/Users/update/password",
            { password: newPassword },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          showToast("User Password Update Successful", "success");
          setIsEditing({ password: false });
          // localStorage.removeItem("token"); // Log out user
          // Navigate("/login");
        } catch (err) {
          console.error("Password update failed", err);
          showToast("An error occurred while updating your password.", "error");
        }
      },
    });
  };
  return (
    <div className="account-settings">
      <div className="user-info">
        <div className="user-field">
          <label>Username: </label>
          {isEditing.username ? (
            <div className="update-content">
              <input
                type="text"
                value={userData.username}
                onChange={(e) =>
                  setUserData({ ...userData, username: e.target.value })
                }
              />
              <button onClick={() => handleSubmit("username")}>Submit</button>
              <button
                className="cancel-update-user-btn"
                onClick={() => {
                  setIsEditing(false);
                }}
              >
                <MdCancel />
                cancel{" "}
              </button>
            </div>
          ) : (
            <div className="span-and-edite-icon">
              <span>{userData.username}</span>
              <FaEdit
                size={23}
                style={{ cursor: "pointer", color: "#032353" }}
                onClick={() => handleEdit("username")}
              />
            </div>
          )}
        </div>
        <div className="user-field">
          <label>Email: </label>
          {isEditing.email ? (
            <div className="update-content">
              <input
                type="email"
                value={userData.email}
                onChange={(e) =>
                  setUserData({ ...userData, email: e.target.value })
                }
              />
              <button onClick={() => handleSubmit("email")}>Submit</button>
              <button
                className="cancel-update-user-btn"
                onClick={() => {
                  setIsEditing(false);
                }}
              >
                <MdCancel />
                cancel{" "}
              </button>
            </div>
          ) : (
            <div className="span-and-edite-icon">
              <span>{userData.email}</span>
              <FaEdit
                size={23}
                style={{ cursor: "pointer", color: "#032353" }}
                onClick={() => handleEdit("email")}
              />
            </div>
          )}
        </div>
        <div className="user-field">
          <label>Phone:</label>
          {isEditing.phone_number ? (
            <div className="update-content">
              <input
                type="tel"
                value={userData.phone_number}
                onChange={(e) =>
                  setUserData({ ...userData, phone_number: e.target.value })
                }
              />
              <button onClick={() => handleSubmit("phone_number")}>
                Submit
              </button>
              <button
                className="cancel-update-user-btn"
                onClick={() => {
                  setIsEditing(false);
                }}
              >
                <MdCancel />
                cancel{" "}
              </button>
            </div>
          ) : (
            <div className="span-and-edite-icon">
              <span>{userData.phone_number}</span>
              <FaEdit
                size={23}
                style={{ cursor: "pointer", color: "#032353" }}
                onClick={() => handleEdit("phone_number")}
              />
            </div>
          )}
        </div>
        <div className="user-field">
          <label>Change Password: </label>
          {isEditing.password ? (
            <div className="update-content">
              <input
                type="password"
                value={newPassword}
                placeholder="Enter New Password"
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <label>Confirm Password:</label>
              <input
                type="password"
                value={confirmPassword}
                placeholder="Confirm Password"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <button onClick={() => handlePasswordSubmit()}>Submit</button>
              <button
                className="cancel-update-user-btn"
                onClick={() => {
                  setIsEditing(false);
                }}
              >
                <MdCancel />
                cancel{" "}
              </button>
            </div>
          ) : (
            <div className="span-and-edite-icon">
              <span>**************</span>
              <FaEdit
                size={23}
                style={{ cursor: "pointer", color: "#032353" }}
                onClick={() => handleEdit("password")}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default AccountSetting;

//css import
import "./DisplayUsers.css";

//react hooks
import { useState, useEffect } from "react";

//contexts
import { useAdmin } from "../../../context/AdminContext";
import { useConfirmModal } from "../../../context/ConfirmModalContext";
import { useToast } from "../../../context/ToastContext";

//components import
import Navbar from "../../../components/Navbar/Navbar";
import AccessDeniedMessage from "../../../components/AccessDeniedMessage/AccessDeniedMessage";

//axios import
import axios from "axios";

//icons
import { Trash2, Clipboard } from "lucide-react";

const DisplayUsers = () => {
  //admin state
  const { isAdmin } = useAdmin();

  //diplay all users state
  const [users, setUsers] = useState([]);

  //role state
  const [newRole, setNewRole] = useState("");

  //update open
  const [updateOpen, setUpdateOpen] = useState(false);

  //confirm contexts
  const { openModal } = useConfirmModal();

  //toast contexts
  const { showToast } = useToast();

  //save user id on click
  const [userIdBeingEdited, setUserIdBeingEdited] = useState(null);

  //handel get all users
  const handelGetAllUsers = async () => {
    try {
      const response = await axios.get("http://localhost:3002/Users");
      if (response) {
        setUsers(response.data);
      }
    } catch (err) {
      console.error("fitching users failed", err);
    }
  };

  //side effict
  useEffect(() => {
    handelGetAllUsers();
  }, []);

  //handel delete user
  const handelDelteUser = (userId, useName) => {
    openModal({
      title: "Confirm Delete",
      message: `Are you sure you want to delete user ${useName}?`,
      onConfirm: async () => {
        try {
          const response = await axios.delete(
            `http://localhost:3002/Users/${userId}`
          );
          if (response) {
            setUsers((prevUsers) =>
              prevUsers.filter((user) => user.id !== userId)
            );
            showToast(`${response.data.message}! 🎉`, "success");
          }
        } catch (err) {
          console.error("Delete user failed", err);
        }
      },
    });
  };
  //handel user update
  const handelUpdateUser = async (userId, useName, userEmail, usePassword) => {
    if (!newRole) {
      showToast("Please select a role!", "error");
      return;
    }

    const userData = {
      username: useName,
      email: userEmail,
      role: newRole,
      password: usePassword,
    };

    try {
      const response = await axios.put(
        `http://localhost:3002/Users/${userId}`,
        userData
      );
      if (response) {
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.id === userId ? { ...user, role: newRole } : user
          )
        );
        setUpdateOpen(false);
        showToast("User role updated successfully!", "success");
      }
    } catch (err) {
      console.error("Update user failed", err);
      showToast("Failed to update user!", "error");
    }
  };
  //save the value in the state
  const handleNewRoleChange = (e) => {
    setNewRole(e.target.value);
  };

  if (isAdmin === false || isAdmin === null) {
    return <AccessDeniedMessage />;
  }

  return (
    <>
      <Navbar />
      <div className="users-container">
        <div className="users-content">
          {users.map((user) => (
            <div className="users-card" key={user.id}>
              <p>id:</p>
              <h4>{user.id}</h4>
              <p>user name: </p>
              <h4>{user.username}</h4>
              <p>email:</p>
              <h4>{user.email}</h4>
              {updateOpen && user.id === userIdBeingEdited ? (
                <>
                  <p>role:</p>
                  <select
                    className="select-role"
                    id="role"
                    value={newRole}
                    onChange={handleNewRoleChange}
                  >
                    <option value="">Select </option>
                    <option value="admin">Admin</option>
                    <option value="employee">Employee</option>
                    <option value="customer">Customer</option>
                  </select>
                  <button
                    className="update-btn-admin-panel"
                    onClick={() => {
                      handelUpdateUser(
                        user.id,
                        user.username,
                        user.email,
                        user.password
                      );
                    }}
                  >
                    Update
                  </button>
                </>
              ) : (
                <>
                  <p>role:</p>
                  <h4>{user.role}</h4>
                </>
              )}
              <div className="user-admin-tools">
                <Trash2
                  className="delete-icon"
                  color="#616161"
                  size={25}
                  onClick={() => {
                    handelDelteUser(user.id, user.username);
                  }}
                />
                <Clipboard
                  className="Edite-icon"
                  color="#00bcd4"
                  size={25}
                  onClick={() => {
                    setUserIdBeingEdited(user.id);
                    setUpdateOpen(true);
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
export default DisplayUsers;

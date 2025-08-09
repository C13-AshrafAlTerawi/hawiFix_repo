//react hooks
import { createContext, useContext, useState, useEffect } from "react";

//context
import { useAuthContext } from "./AuthContext";

//axios import
import axios from "axios";

//json web token
import { jwtDecode } from "jwt-decode";

//create contecxt
export const AdminContexts = createContext();

export const useAdmin = () => useContext(AdminContexts);

export const AdminProvider = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  const { token } = useAuthContext();

  const [userRole, setUserRole] = useState(null);

  const fitchToken = () => {
    if (token) {
      const decoded = jwtDecode(token);
      setUserRole(decoded.role);
    } else {
      setUserRole(null);
    }
  };
  useEffect(() => {
    fitchToken();
  }, [token]);

  useEffect(() => {
    if (userRole === "employee" && userRole === "customer") {
      return;
    }
    const token = localStorage.getItem("token");
    if (!token) {
      return;
    }

    axios
      .get("http://localhost:3002/admin/check-admin", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        if (response.data.role === "admin") {
          setIsAdmin(true);
        } else {
          setIsAdmin(false);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (err.response && err.response.status === 403) {
          console.log("Access denied: 403 Forbidden");
        } else {
          console.error("Error verifying token:", err);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, [userRole]);

  return (
    <AdminContexts.Provider value={{ isAdmin, setIsAdmin, loading }}>
      {children}
    </AdminContexts.Provider>
  );
};

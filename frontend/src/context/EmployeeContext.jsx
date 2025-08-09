//react hooks
import { createContext, useState, useEffect, useContext } from "react";

//axios import
import axios from "axios";

//context
import { useAuthContext } from "./AuthContext";

//json web token
import { jwtDecode } from "jwt-decode";

//create context
export const EmployeeContext = createContext();

export const useEmployee = () => useContext(EmployeeContext);

export const EmployeeProvider = ({ children }) => {
  //is Employee stete
  const [isEmployee, setIsEmployee] = useState(null);
  //token context state
  const { token } = useAuthContext();

  //user role state
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
  //loding state
  const [loading, setLoading] = useState(true);

  // handel is employee
  useEffect(() => {
    if (userRole !== "admin" && userRole !== "employee") {
      return;
    }

    const token = localStorage.getItem("token");

    if (token) {
      axios
        .get("http://localhost:3002/admin/employee-dashboard", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          if (
            response.data.message &&
            response.data.message.includes("Employee or Admin")
          ) {
            setIsEmployee(true);
          } else {
            setIsEmployee(false);
          }
        })
        .catch((err) => {
          console.error("Error verifying token:", err);
          setIsEmployee(false);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setIsEmployee(false);
      setLoading(false);
    }
  }, [token, userRole]);
  return (
    <>
      <EmployeeContext.Provider value={{ isEmployee, loading }}>
        {children}
      </EmployeeContext.Provider>
    </>
  );
};

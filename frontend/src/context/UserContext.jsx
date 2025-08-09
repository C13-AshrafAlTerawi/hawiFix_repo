//react hooks import
import { useState, useContext, createContext, useEffect } from "react";

//json web token
import { jwtDecode } from "jwt-decode";

//create context
export const UserContext = createContext();

export const useUserContext = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [userName, setUserName] = useState(null);
  const [email, setEmail] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState(null);

  const [userRole, setUserRole] = useState(null);

  const storedToken = localStorage.getItem("token");
  const fitchToken = () => {
    if (storedToken) {
      const decoded = jwtDecode(storedToken);
      setUserName(decoded.username);
      setEmail(decoded.email);
      setPhoneNumber(decoded.phoneNumber);
      setUserRole(decoded.role);
    } else {
      setUserName(null);
      setEmail(null);
      setPhoneNumber(null);
      setUserRole(null);
    }
  };
  useEffect(() => {
    fitchToken();
  }, [storedToken]);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      const decoded = jwtDecode(storedToken);
      setUserName(decoded.username);
      setEmail(decoded.email);
      setPhoneNumber(decoded.phoneNumber);
      setUserRole(decoded.role);
    } else {
      setUserName(null);
      setEmail(null);
      setPhoneNumber(null);
      setUserRole(null);
    }
  }, [localStorage.getItem("token")]);

  return (
    <UserContext.Provider
      value={{
        userName,
        setUserName,
        email,
        setEmail,
        phoneNumber,
        setPhoneNumber,
        fitchToken,
        userRole,
        setUserRole,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

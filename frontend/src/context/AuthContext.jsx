import { useEffect, useState, createContext, useContext } from "react";

export const AuthContext = createContext();

export const useAuthContext = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{ token, setToken, setIsLoggedIn, isLoggedIn }}
    >
      {children}
    </AuthContext.Provider>
  );
};

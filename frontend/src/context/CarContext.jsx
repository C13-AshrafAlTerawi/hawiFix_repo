//react hook
import {
  useState,
  useEffect,
  useContext,
  createContext,
  useCallback,
} from "react";

//axios import
import axios from "axios";

//contexts
import { useAuthContext } from "./AuthContext";

export const CarContext = createContext();

export const useCarContext = () => useContext(CarContext);

const CarProvider = ({ children }) => {
  //cars state
  const [myCar, setMyCar] = useState([]);

  //token context
  const { token } = useAuthContext();

  //fetching cars data
  const fetchCars = useCallback(async () => {
    if (!token) {
      return;
    }
    try {
      const response = await axios.get("http://localhost:3002/cars", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setMyCar(response.data.result);
    } catch (err) {
      console.error("Error fetching cars", err);
    }
  }, [token]);
  useEffect(() => {
    fetchCars();
  }, [token]);

  return (
    <CarContext.Provider value={{ fetchCars, setMyCar, myCar }}>
      {children}
    </CarContext.Provider>
  );
};
export default CarProvider;

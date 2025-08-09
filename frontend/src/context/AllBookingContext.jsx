//react hooks import
import { useEffect, useState, createContext, useContext } from "react";

//axios import
import axios from "axios";

//create contexts
export const AllBookingsContext = createContext();

export const useAllBookings = () => useContext(AllBookingsContext);

export const AllBookingsProvider = ({ children }) => {
  //all bookings stete
  const [AllBookings, setAllBookings] = useState([]);

  //handel get all bookings
  const handelGetAllBookinks = async () => {
    try {
      const response = await axios.get("http://localhost:3002/admin/bookings");
      if (response) {
        setAllBookings(response.data.result);
      }
    } catch (err) {
      console.error("fitching data fialed", err);
    }
  };
  useEffect(() => {
    handelGetAllBookinks();
  }, []);
  return (
    <>
      <AllBookingsContext.Provider value={{ AllBookings, setAllBookings }}>
        {children}
      </AllBookingsContext.Provider>
    </>
  );
};

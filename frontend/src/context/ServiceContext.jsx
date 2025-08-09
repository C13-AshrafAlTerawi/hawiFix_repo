//recat hooks import
import { useState, useEffect, useContext, createContext } from "react";

//axios import
import axios from "axios";

//create contexts
export const ServiceContext = createContext();

//coustom hook to use it on any component
export const useService = () => useContext(ServiceContext);

export const ServiceProvider = ({ children }) => {
  //save service id state
  const [serviceId, setServiceId] = useState(null);
  //service state
  const [service, setService] = useState([]);
  //open modal booking state
  const [modalBokkingOpen, setModalBokkingOpen] = useState(false);

  //handel booking modal
  const handleOpenBookingModal = (serviceId) => {
    setServiceId(serviceId);
    setModalBokkingOpen(true);
  };

  const fitchService = async () => {
    try {
      const response = await axios.get("http://localhost:3002/services");
      if (response) {
        setService(response.data.data);
      }
    } catch (err) {
      console.error("Failed to fetch services", err);
    }
  };

  useEffect(() => {
    fitchService();
  }, []);

  //image from service
  const getImageForService = (serviceName) => {
    const serviceImages = {
      "Transmission Fluid Replacement":
        "/images/TransmissionFluidReplaceent.webp",
      "Engine Oil Change": "/images/carfix1.webp",
      "Battery Check and Replacement": "/images/BatteryCheck.webp",
      "Brake Pad Replacement": "/images/BrakePadReplaceent.webp",
      "Air Conditioning Service": "/images/AirConditioningService.webp",
      "Full Vehicle Inspection": "/images/FullVehicleInspection.webp",
      "Tire Rotation & Balancing": "/images/carfix3.webp",
      "Engine Diagnostics": "/images/EngineDiagnostics.webp",
      "Wheel Alignment": "/images/WheelAlignment.webp",
      "Interior Cleaning": "/images/InteriorCleaning.webp",
      "Exterior Wash & Polish": "/images/ExteriorWash&Polish.webp",
    };
    return serviceImages[serviceName] || "/images/carfix1.webp";
  };
  return (
    <>
      <ServiceContext.Provider
        value={{
          serviceId,
          service,
          modalBokkingOpen,
          handleOpenBookingModal,
          setModalBokkingOpen,
          getImageForService,
          setService,
          fitchService,
          setServiceId,
        }}
      >
        {children}
      </ServiceContext.Provider>
    </>
  );
};

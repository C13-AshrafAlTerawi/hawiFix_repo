//css import
import "./ServiceCard.css";

//react hook import
import { useState, useCallback } from "react";

//contexts
import { useService } from "../../context/ServiceContext";
import { useAuthContext } from "../../context/AuthContext";

//components
import Navbar from "../Navbar/Navbar";
import BookingModal from "../BookingModal/BookingModal";
import SearchBar from "../SearchBar/SearchBar";
import Footer from "../Footer/Footer";
import NoTokenMessage from "../NoTokenMessage/NoTokenMessage";

//icons
import { DollarSign } from "lucide-react";
import { FaCalendarPlus } from "react-icons/fa";
import { TbFaceIdError } from "react-icons/tb";

const Service = () => {
  //context service
  const {
    serviceId,
    service,
    modalBokkingOpen,
    handleOpenBookingModal,
    setModalBokkingOpen,
    getImageForService,
  } = useService();

  //auth context
  const { token } = useAuthContext();

  const [filteredCars, setFilteredCars] = useState(service);

  const [errorMessage, setErrorMessage] = useState("");
  const handleSearch = useCallback(
    (searchTerm) => {
      const filtered = service.filter((serv) =>
        serv.service_name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredCars(filtered);
      if (filtered.length === 0) {
        setErrorMessage(
          "Sorry, we couldn't find anything matching your search."
        );
      } else {
        setErrorMessage("");
      }
    },
    [service]
  );
  if (!token) {
    return <NoTokenMessage />;
  }
  return (
    <>
      <Navbar />
      <SearchBar items={service} onSearch={handleSearch} />
      <div className="service-container">
        <div className="service-content">
          {errorMessage ? (
            <div className="no-results-message-div">
              <TbFaceIdError size={120} style={{ color: "#5c5c5c" }} />
              <p className="no-results-message">{errorMessage}</p>
            </div>
          ) : (
            <>
              {filteredCars.length > 0
                ? filteredCars.map((service) => (
                    <div className="service-card" key={service.id}>
                      <div className="img-div">
                        <img
                          src={getImageForService(service.service_name)}
                          alt={service.service_name}
                          className="img-from-service"
                          loading="lazy"
                        />
                        <hr />
                      </div>
                      <div className="card-content">
                        <h1>{service.service_name}</h1>
                        <p>{service.description}</p>
                        <div className="rr">
                          <p>
                            <DollarSign />
                            {service.price}
                          </p>
                          <button
                            className="add-booking-btn-from-service"
                            onClick={() => handleOpenBookingModal(service.id)}
                          >
                            <FaCalendarPlus size={17} /> add booking
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                : service.map((service) => (
                    <div className="service-card" key={service.id}>
                      <div className="img-div">
                        <img
                          src={getImageForService(service.service_name)}
                          alt={service.service_name}
                          className="img-from-service"
                          loading="lazy"
                        />
                        <hr />
                      </div>
                      <div className="card-content">
                        <h1>{service.service_name}</h1>
                        <p>{service.description}</p>
                        <div className="rr">
                          <p>
                            <DollarSign />
                            {service.price}
                          </p>
                          <button
                            className="add-booking-btn-from-service"
                            onClick={() => handleOpenBookingModal(service.id)}
                          >
                            <FaCalendarPlus size={17} /> add booking
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
            </>
          )}
        </div>

        {modalBokkingOpen && (
          <BookingModal
            serviceId={serviceId}
            onClose={() => setModalBokkingOpen(false)}
          />
        )}
      </div>
      <Footer />
    </>
  );
};
export default Service;

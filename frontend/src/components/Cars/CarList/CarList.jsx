//css import
import "./CarList.css";

//react hooks import
import { useState, useEffect } from "react";

//components
import Navbar from "../../Navbar/Navbar";
import CarDetailsModal from "../CarDetailsModal/CarDetailsModal";
import AddCarModal from "../AddCarModal/AddCarModal";
import CarApi from "../CarApi/CarApi";
import Footer from "../../Footer/Footer";
import NoTokenMessage from "../../NoTokenMessage/NoTokenMessage";

//icons
import { FaCar, FaCalendarAlt, FaPalette } from "react-icons/fa";
import { CirclePlus, CarFront } from "lucide-react";
import { BiSolidCarMechanic } from "react-icons/bi";

//contexts
import { useCarContext } from "../../../context/CarContext";
import { useAuthContext } from "../../../context/AuthContext";

import React from "react";

const CarList = () => {
  //auth context
  const { token, isAuthenticated } = useAuthContext();
  //car context
  const { fetchCars, setMyCar, myCar } = useCarContext();

  //to display modal adding states
  const [addModalOpen, setAddModalOpen] = useState(false);

  //to display modal ditels states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCar, setSelectedCar] = useState(null);

  //handel  display modal
  const handelModalOpen = (car) => {
    setIsModalOpen(true);
    setSelectedCar(car);
  };

  //auto scroll
  useEffect(() => {
    const scrollDiv = document.querySelector(".car-api");

    if (scrollDiv) {
      const scrollInterval = setInterval(() => {
        scrollDiv.scrollTop += 5;

        if (
          scrollDiv.scrollTop + scrollDiv.clientHeight >=
          scrollDiv.scrollHeight
        ) {
          scrollDiv.scrollTop = 0;
        }
      }, 20);

      return () => clearInterval(scrollInterval);
    }
  }, []);

  if (!token) {
    return <NoTokenMessage />;
  }
  return (
    <>
      <Navbar />

      <div className="car-list-container">
        <div className="car-api">
          <CarApi />
        </div>

        <div className="car-list-content">
          <div className="taital-modal-content">
            <h1
              className="Add-from-modal"
              onClick={() => {
                setAddModalOpen(true);
              }}
            >
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginRight: "9px",
                }}
              >
                <CirclePlus size={30} style={{ color: "black" }} />{" "}
              </span>
            </h1>
            <h1 className="welcome-taital-modal">
              <span>
                <BiSolidCarMechanic style={{ color: "black" }} size={35} />
              </span>{" "}
              Welcome to your Car List!{" "}
            </h1>
          </div>
          {myCar && myCar.length > 0 ? (
            myCar.map((car, index) => {
              const plateString = car.plate_number
                ? car.plate_number.toString()
                : "";
              const firstTwo = plateString.slice(0, 2);
              const rest = plateString.slice(2);
              return (
                <React.Fragment key={car.id}>
                  <div
                    className="car-item"
                    onClick={() => handelModalOpen(car)}
                  >
                    {car.brand === "Kia" && (
                      <img
                        className="car-img"
                        alt="car-img"
                        src="/images/kia1.webp"
                      />
                    )}
                    {car.brand === "Toyota" && (
                      <img
                        className="car-img"
                        alt="car-img"
                        src="/images/toyota.webp"
                      />
                    )}
                    {car.brand === "BMW" && (
                      <img
                        className="car-img"
                        alt="car-img"
                        src="/images/bmw1.webp"
                      />
                    )}
                    {car.brand === "Mitsubishi" && (
                      <img
                        className="car-img"
                        alt="car-img"
                        src="/images/Mitsubishi.webp"
                      />
                    )}
                    <hr />
                    <div className="car-ditels">
                      <div className="brand-and-model">
                        <h3 className="car-brand">Car Brand: {car.brand}</h3>
                        <h3>
                          <FaCar /> {car.model}
                        </h3>
                        <h3>
                          <FaCalendarAlt /> {car.year}
                        </h3>
                        <h3>
                          <FaPalette /> {car.color}
                        </h3>
                      </div>

                      <div className="plate-number">
                        <p>
                          <strong>
                            Car Plate Number: {firstTwo}-{rest}
                          </strong>
                        </p>
                      </div>
                    </div>
                  </div>
                </React.Fragment>
              );
            })
          ) : (
            <div>
              <h1>No cars found</h1>
            </div>
          )}
        </div>
      </div>
      {isModalOpen && (
        <CarDetailsModal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          selectedCar={selectedCar}
        />
      )}
      {addModalOpen && (
        <AddCarModal
          setAddModalOpen={setAddModalOpen}
          setMyCar={setMyCar}
          fetchCars={fetchCars}
        />
      )}
      <Footer />
    </>
  );
};

export default CarList;

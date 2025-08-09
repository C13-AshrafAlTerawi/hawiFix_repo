//css import
import "./CarDetailsModal.css";

//react
import React from "react";

//icons
import { FaCar, FaCalendarAlt, FaPalette } from "react-icons/fa";
import { Trash2, SquareX, Pencil } from "lucide-react";

//axios import
import axios from "axios";

//contexts import
import { useConfirmModal } from "../../../context/ConfirmModalContext";
import { useCarContext } from "../../../context/CarContext";
import { useToast } from "../../../context/ToastContext";

const CarDetailsModal = ({ selectedCar, setIsModalOpen }) => {
  //cars context
  const { setMyCar } = useCarContext();

  //modal context
  const { openModal } = useConfirmModal();

  //toast context
  const { showToast } = useToast();

  const handelDeleteCar = () => {
    openModal({
      title: "Are you sure you want to delete this car?",
      message: "This action cannot be undone.",
      onConfirm: async () => {
        try {
          await axios.delete(`http://localhost:3002/cars/${selectedCar.id}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          });

          setMyCar((prevCars) =>
            prevCars.filter((car) => car.id !== selectedCar.id)
          );
          setIsModalOpen(false);
          showToast("Car deleted! See you next ride 👋", "success");
        } catch (err) {
          console.error("Error deleting car", err);
        }
      },
    });
  };
  return (
    <div className="modal-container">
      <div className="modal-content">
        <div className="modal-ditels">
          <div className="car-item-modal" key={selectedCar.id}>
            {selectedCar.brand === "Kia" && (
              <img
                className="car-img-modal"
                alt="car-img"
                src="/images/kia1.webp"
              />
            )}
            {selectedCar.brand === "Toyota" && (
              <img
                className="car-img-modal"
                alt="car-img"
                src="/images/toyota.webp"
              />
            )}
            {selectedCar.brand === "BMW" && (
              <img
                className="car-img-modal"
                alt="car-img"
                src="/images/bmw1.webp"
              />
            )}
            {selectedCar.brand === "Mitsubishi" && (
              <img
                className="car-img-modal"
                alt="car-img"
                src="/images/Mitsubishi.webp"
              />
            )}
            <hr />
            <div className="car-ditels">
              <div className="brand-and-model">
                <h3 className="car-brand">Car Brand: {selectedCar.brand}</h3>
                <h3>
                  <FaCar /> {selectedCar.model}
                </h3>
                <h3>
                  <FaCalendarAlt /> {selectedCar.year}
                </h3>
                <h3>
                  <FaPalette /> {selectedCar.color}
                </h3>
              </div>

              <div className="plate-number">
                <p>
                  <strong>Car Plate Number: {selectedCar.plate_number}</strong>
                </p>
              </div>
            </div>
          </div>

          <div className="car-details-actions">
            <button className="delete-car-btn" onClick={handelDeleteCar}>
              <span>
                <Trash2 size={20} />
              </span>
              Delete
            </button>
            <button className="edite-car-btn">
              <span>
                <Pencil size={20} />
              </span>
              Edite
            </button>
            <div className="close-modal-div">
              <button
                className="close-car-modal"
                onClick={() => {
                  setIsModalOpen(false);
                }}
              >
                <span>
                  <SquareX size={20} />
                </span>
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
const MemoizedCarDetailsModal = React.memo(CarDetailsModal);
export default MemoizedCarDetailsModal;

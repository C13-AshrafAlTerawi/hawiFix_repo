//css import
import "./AddCarModal.css";

//react hook
import { useCallback, useMemo, useState } from "react";

//axios import
import axios from "axios";

//icons
import { FaCar, FaPlus } from "react-icons/fa";
import { HiOutlineXCircle } from "react-icons/hi2";

//contexts
import { useToast } from "../../../context/ToastContext";

//react import
import React from "react";

const AddCarModal = ({ setAddModalOpen, setMyCar, fetchCars }) => {
  //toast
  const { showToast } = useToast();
  //brand state
  const [brand, setBrand] = useState("");
  //model state
  const [model, setModel] = useState("");
  //year state
  const [year, setYear] = useState("");
  //color state
  const [color, setColor] = useState("");
  //plateNumber state
  const [plateNumber, setPlateNumber] = useState("");
  //error state
  const [errorYear, setErrorYear] = useState("");
  const [errorPlate, setErrorPlate] = useState("");

  //selects detales
  const carOptions = useMemo(
    () => ({
      Toyota: ["Corolla", "Camry", "Yaris", "Hilux", "Rav4", "Prius"],
      Kia: ["Niro", "Rio", "Sephia", "K5", "Serato", "Sportage"],
      BMW: ["E36", "E30", "E34", "E46", "E28", "E21"],
      Mitsubishi: [
        "L200",
        "Lancer",
        "Galant",
        "Pajero",
        "Lancer Evo",
        "Outlander",
      ],
    }),
    []
  );
  const colors = useMemo(
    () => ["Black", "White", "Red", "Blue", "Silver", "Gray", "green", "brown"],
    []
  );
  //validate plate number
  const validatePlateNumber = useCallback(() => {
    if (plateNumber.length < 3 || plateNumber.length > 7) {
      showToast("Plate number must be 3-7 digits", "error");
      return false;
    } else {
      setErrorPlate("");
      return true;
    }
  }, [plateNumber, showToast]);

  //validate model
  const validateModel = useCallback(() => {
    if (model.length < 0 || model === "") {
      showToast(" Please select a car model", "error");
      return false;
    } else {
      return true;
    }
  }, [model, showToast]);

  //validate brand
  const validateBrand = useCallback(() => {
    if (brand.length < 0 || brand === "") {
      showToast(" Please select a car brand", "error");
      return false;
    } else {
      return true;
    }
  }, [brand, showToast]);

  //validate color
  const validateColor = useCallback(() => {
    if (color.length < 0 || color === "") {
      showToast("Please select a car color", "error");
      return false;
    } else {
      return true;
    }
  }, [color, showToast]);
  //validate Year
  const validateYear = useCallback(() => {
    if (year.length !== 4) {
      showToast("Please enter a valid 4-digit year", "error");
      return false;
    } else {
      setErrorYear("");
      return true;
    }
  }, [year, showToast]);

  //handel add new car
  const handleAddCar = useCallback(
    async (e) => {
      e.preventDefault();

      if (!validateBrand()) return;
      if (!validateModel()) return;
      if (!validateColor()) return;
      if (!validateYear()) return;
      if (!validatePlateNumber()) return;
      const newCar = {
        brand,
        model,
        year,
        color,
        plate_number: plateNumber,
      };

      try {
        const response = await axios.post(
          "http://localhost:3002/cars",
          newCar,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        setMyCar((prevCars) => [...prevCars, response.data.result]);
        setAddModalOpen(false);
        fetchCars();
        showToast("New car registered! 🎉", "success");
      } catch (err) {
        console.error("Error adding car", err);
      }
    },
    [
      [
        brand,
        model,
        year,
        color,
        plateNumber,
        setAddModalOpen,
        setMyCar,
        fetchCars,
        showToast,
        validateBrand,
        validateModel,
        validateColor,
        validateYear,
        validatePlateNumber,
      ],
    ]
  );

  return (
    <>
      <div className="modal-container">
        <div className="modal-content">
          <div className="add-car-taital">
            <FaCar size={88} />
          </div>
          <div className="add-form-content">
            <form onSubmit={handleAddCar} className="from-add-car">
              <label>Brand:</label>
              <select
                value={brand}
                onChange={(e) => {
                  setBrand(e.target.value);
                  setModel("");
                }}
              >
                <option value="">Select Brand</option>
                {Object.keys(carOptions).map((brandName) => (
                  <option key={brandName} value={brandName}>
                    {brandName}
                  </option>
                ))}
              </select>
              {brand && (
                <>
                  <label>Model:</label>
                  <select
                    value={model}
                    onChange={(e) => {
                      setModel(e.target.value);
                    }}
                  >
                    <option value="">Select Model</option>
                    {carOptions[brand].map((modelName) => (
                      <option key={modelName} value={modelName}>
                        {modelName}
                      </option>
                    ))}
                  </select>
                </>
              )}
              {brand && model && (
                <>
                  <label>Color:</label>
                  <select
                    value={color}
                    onChange={(e) => {
                      setColor(e.target.value);
                    }}
                  >
                    <option value="">Select Color</option>
                    {colors.map((Color) => (
                      <option key={Color} value={Color}>
                        {Color}
                      </option>
                    ))}
                  </select>
                </>
              )}
              {brand && model && color && (
                <>
                  <label>Select year:</label>
                  <input
                    type="number"
                    value={year}
                    placeholder="Enter the year of manufacture"
                    onChange={(e) => {
                      setYear(e.target.value);
                    }}
                  />
                  <div style={{ minHeight: "20px" }}>
                    {errorYear && <p className="error-message">{errorYear}</p>}
                  </div>
                </>
              )}
              {brand && model && color && /^\d{4}$/.test(year) && (
                <>
                  <label>Enter plate Number:</label>
                  <input
                    type="number"
                    placeholder="Enter plate Number"
                    value={plateNumber}
                    onChange={(e) => {
                      setPlateNumber(e.target.value);
                    }}
                  />
                  <div style={{ minHeight: "20px" }}>
                    {errorPlate && (
                      <p className="error-message">{errorPlate}</p>
                    )}
                  </div>
                </>
              )}
              <button type="submit">
                <FaPlus /> Add New Car
              </button>
            </form>
          </div>
          <button
            id="cancel-btn"
            onClick={() => {
              setAddModalOpen(false);
            }}
          >
            <HiOutlineXCircle size={18} /> Cancel
          </button>
        </div>
      </div>
    </>
  );
};
const MemoizedAddCarModal = React.memo(AddCarModal);
export default MemoizedAddCarModal;

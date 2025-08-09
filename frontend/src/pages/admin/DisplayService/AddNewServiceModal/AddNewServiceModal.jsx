//css import
import "./AddNewServiceModal.css";

//react hooks import
import { useState } from "react";

//axios import
import axios from "axios";

//contexts import
import { useService } from "../../../../context/ServiceContext";
import { useToast } from "../../../../context/ToastContext";

//icons
import { CircleX, PencilLine } from "lucide-react";
import { BsDatabaseAdd } from "react-icons/bs";

const AddNewServiceModal = ({ handleModalClose }) => {
  //sevice context
  const { setService, fitchService } = useService();

  //toast context
  const { showToast } = useToast();

  //service name state
  const [serviceName, setServiceName] = useState("");

  //service description state
  const [serviceDescription, setServiceDescription] = useState("");

  //service price state
  const [price, setPrice] = useState("");

  //handel add new service
  const handelAddNewService = async (e) => {
    e.preventDefault();
    const servicedata = {
      service_name: serviceName,
      description: serviceDescription,
      price: price,
    };
    if (serviceName === "") {
      showToast("Enter Service Name ", "error");
      return;
    }
    if (serviceDescription === "") {
      showToast("Enter Service Description ", "error");
      return;
    }
    if (price === "") {
      showToast("Enter Service price ", "error");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3002/services",
        servicedata
      );
      if (response) {
        setService((prev) => [...prev, response.data]);
        showToast("New service added successfully! 🎉", "success");
        setServiceName("");
        setServiceDescription("");
        setPrice("");
        fitchService();
      }
    } catch (err) {
      console.error("Error adding service. Please try again.", err);
      showToast("Error adding service. Please try again.", "error");
    }
  };
  return (
    <>
      <div className="modal-container">
        <div className="modal-content">
          <div className="close-add-service-modal">
            <CircleX
              style={{ color: "#000000", marginBottom: "8px" }}
              size={35}
              onClick={() => {
                handleModalClose();
              }}
            />
          </div>
          <div>
            <h1
              style={{
                margin: "0px",
                display: "flex",
                gap: "8px",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              add new service
              <PencilLine />
            </h1>
          </div>
          <form className="add-service-form" onSubmit={handelAddNewService}>
            <label className="add-service-labels">Enter Service Name:</label>
            <input
              className="add-service-inputs"
              type="text"
              value={serviceName}
              placeholder="Service Name"
              onChange={(e) => {
                setServiceName(e.target.value);
              }}
            />
            <label className="add-service-labels">
              Enter Service Description:
            </label>
            <input
              className="add-service-inputs"
              type="text"
              value={serviceDescription}
              placeholder="Service Description"
              onChange={(e) => {
                setServiceDescription(e.target.value);
              }}
            />
            <label className="add-service-labels">
              Enter price Description:
            </label>
            <input
              className="add-service-inputs"
              value={price}
              type="Number"
              placeholder="price Description"
              onChange={(e) => {
                setPrice(e.target.value);
              }}
            />
            <button type="submet" className="add-new-service-btn">
              <BsDatabaseAdd /> Add Service
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
export default AddNewServiceModal;

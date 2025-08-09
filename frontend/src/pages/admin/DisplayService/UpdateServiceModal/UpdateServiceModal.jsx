//css import
import "./UpdateServiceModal.css";

//react hooks import
import { useState, useEffect } from "react";

//axios import
import axios from "axios";

//contexts import
import { useService } from "../../../../context/ServiceContext";
import { useToast } from "../../../../context/ToastContext";

//icons
import { CircleX, Clipboard } from "lucide-react";

const UpdateServiceModal = ({ handleModalUpdateClose }) => {
  //service name state
  const [serviceName, setServiceName] = useState("");

  //service description state
  const [serviceDescription, setServiceDescription] = useState("");

  //service price state
  const [price, setPrice] = useState("");

  //sevice context
  const { setService, serviceId, service } = useService();

  //toast context
  const { showToast } = useToast();

  useEffect(() => {
    if (serviceId && service.length > 0) {
      const selectedService = service.find((s) => s.id === serviceId);
      if (selectedService) {
        setServiceName(selectedService.service_name);
        setServiceDescription(selectedService.description);
        setPrice(selectedService.price);
      }
    }
  }, [serviceId, service]);

  //handel update service
  const handelUpdateService = async (e) => {
    e.preventDefault();
    const serviceData = {
      service_name: serviceName,
      description: serviceDescription,
      price: price,
    };

    try {
      const response = await axios.put(
        `http://localhost:3002/services/${serviceId}`,
        serviceData
      );
      if (response) {
        setService((prevServices) =>
          prevServices.map((service) =>
            service.id === serviceId
              ? {
                  ...service,
                  service_name: serviceName,
                  description: serviceDescription,
                  price: price,
                }
              : service
          )
        );

        showToast("Service updated successfully! 🎉", "success");
        handleModalUpdateClose();
      }
    } catch (err) {
      console.error("Failed to update the service. Please try again.", err);
      showToast("Failed to update the service. Please try again.", "error");
    }
  };
  return (
    <>
      <div className="modal-container">
        <div className="modal-content">
          <div className="close-add-service-modal">
            <span
              className="close-service-update-modal"
              onClick={() => {
                handleModalUpdateClose();
              }}
            >
              <CircleX
                style={{ color: "#007bff", marginBottom: "8px" }}
                size={35}
              />
            </span>
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
              update service
              <Clipboard />
            </h1>
          </div>
          <form className="add-service-form" onSubmit={handelUpdateService}>
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
              submet
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
export default UpdateServiceModal;

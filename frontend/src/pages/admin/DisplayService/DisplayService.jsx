//css import
import "./DisplayService.css";

//contexts import
import { useAdmin } from "../../../context/AdminContext";
import { useService } from "../../../context/ServiceContext";
import { useToast } from "../../../context/ToastContext";
import { useConfirmModal } from "../../../context/ConfirmModalContext";

//components import
import Navbar from "../../../components/Navbar/Navbar";
import AddNewServiceModal from "./AddNewServiceModal/AddNewServiceModal";
import UpdateServiceModal from "./UpdateServiceModal/UpdateServiceModal";
import AccessDeniedMessage from "../../../components/AccessDeniedMessage/AccessDeniedMessage";

//react hooks
import { useState } from "react";

//axios import
import axios from "axios";

//icons
import { DollarSign, CirclePlus, Trash2, Pencil } from "lucide-react";

const DisplayService = () => {
  //is admin context
  const { isAdmin } = useAdmin();

  //sevice context
  const { service, setService, setServiceId } = useService();

  //add new service modal state
  const [modalOpen, setModalOpen] = useState(false);

  //toast context
  const { showToast } = useToast();

  //confirm contexts
  const { openModal } = useConfirmModal();

  //update modal open
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

  //handel delete service
  const handelDeleteService = async (serviceId) => {
    openModal({
      title: "Confirm Delete",
      message: `Are you sure you want to delete this service?`,
      onConfirm: async () => {
        try {
          const response = await axios.delete(
            `http://localhost:3002/services/${serviceId}`
          );
          if (response) {
            setService((prev) =>
              prev.filter((service) => service.id !== serviceId)
            );
            showToast("Service has been successfully deleted! 🎉", "success");
          }
        } catch (err) {
          console.error("Failed to delete the service. Please try again.", err);
          showToast("Failed to delete the service. Please try again.", "error");
        }
      },
    });
  };

  //routes protection
  if (isAdmin === false || isAdmin === null) {
    return <AccessDeniedMessage />;
  }

  //open add service modal
  const handleModalAddOpen = () => setModalOpen(true);
  const handleModalAddClose = () => setModalOpen(false);

  //open update service modal
  const handleModalUpdateOpen = (serviceId) => {
    setServiceId(serviceId);
    setIsUpdateModalOpen(true);
  };
  const handleModalUpdateClose = () => setIsUpdateModalOpen(false);

  return (
    <>
      <Navbar />
      <div className="service-container-admin-panel">
        <div className="tital-service-panel">
          <h1>Service Management</h1>
          <div className="tital-service-panel-add">
            <span onClick={handleModalAddOpen}>
              <CirclePlus size={35} />
            </span>
          </div>
        </div>
        <div className="service-content-admin-panel">
          {service.map((service) => (
            <div
              className="service-card-admin-panel"
              key={service.id}
              service={service}
            >
              <div className="card-content-admin-panel">
                <h1>{service.service_name}</h1>
                <p>{service.description}</p>
                <p>
                  <DollarSign />
                  {service.price}
                </p>
                <div className="service-tools-admin-panel">
                  <button
                    className="edite-service-panel"
                    onClick={() => {
                      handleModalUpdateOpen(service.id);
                    }}
                  >
                    <Pencil size={20} />
                    Edite
                  </button>
                  <button
                    className="delete-service-panel"
                    onClick={() => {
                      handelDeleteService(service.id);
                    }}
                  >
                    <Trash2 size={20} />
                    delete service{" "}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {modalOpen && (
        <AddNewServiceModal handleModalClose={handleModalAddClose} />
      )}

      {isUpdateModalOpen && (
        <UpdateServiceModal handleModalUpdateClose={handleModalUpdateClose} />
      )}
    </>
  );
};
export default DisplayService;

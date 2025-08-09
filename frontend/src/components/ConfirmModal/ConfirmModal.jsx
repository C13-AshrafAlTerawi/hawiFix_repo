//css import
import "./ConfirmModal.css";
//contexts import
import { useConfirmModal } from "../../context/ConfirmModalContext";
//icon import
import { CircleAlert } from "lucide-react";

const ConfirmModal = () => {
  //confarm modal context
  const { isOpen, title, message, onConfirm, closeModal } = useConfirmModal();

  //to hide moadal
  if (!isOpen) return null;

  return (
    <div className="modalOverlay">
      <div className="modalContent">
        <div className="modalHeader">
          <CircleAlert size={90} color="#f39c12" />
          <h1 style={{ marginTop: "0", marginBottom: "0" }}>{title}</h1>
        </div>
        <div className="modalBody">
          <p>{message}</p>
        </div>
        <div className="modalFooter">
          <button
            className="ConfirmBtn"
            onClick={async () => {
              await onConfirm();
              closeModal();
            }}
          >
            Confirm
          </button>
          <button onClick={closeModal} className="CancelBtn">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
export default ConfirmModal;

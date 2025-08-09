//css import
import "./Toast.css";

//icons import
import { Check } from "lucide-react";
import { AlertTriangle } from "lucide-react";

//contexts import
import { useToast } from "../../context/ToastContext";

const Toast = () => {
  const { toast } = useToast();

  if (!toast.show) return null;

  return (
    <div className={`toast-message-container ${toast.type}`}>
      <div className="toast-content">
        {toast.type === "success" && (
          <>
            <div className="toast-header">
              <Check
                size={15}
                style={{
                  border: "3px solid",
                  borderRadius: "20px",
                  padding: "3px",
                  color: "white",
                  marginRight: "5px",
                }}
              />
              <h2 style={{ margin: "0px" }}>Success</h2>
            </div>
            <div className="toast-message">
              <p id="tital-tost">{toast.message}</p>
            </div>
          </>
        )}

        {toast.type === "error" && (
          <>
            <div className="toast-header">
              <AlertTriangle
                size={17}
                style={{
                  border: "3px solid",
                  borderRadius: "20px",
                  padding: "5px",
                  color: "white",
                  marginRight: "5px",
                }}
              />

              <h2 style={{ margin: "0px" }}>Error</h2>
            </div>
            <div className="toast-message">
              <p id="tital-tost">{toast.message}</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
export default Toast;

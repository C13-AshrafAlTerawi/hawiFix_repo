//icons import
import { BiSolidErrorAlt } from "react-icons/bi";

//react route
import { useNavigate } from "react-router-dom";

const AccessDeniedMessage = () => {
  const navigate = useNavigate();
  return (
    <div className="no-token-message-container">
      <span>
        <BiSolidErrorAlt size={200} style={{ color: "#cd0505" }} />
      </span>
      <h2>Access Denied</h2>
      <p>You do not have permission to access this page.</p>
      <a
        className="login-link"
        onClick={() => {
          navigate("/");
        }}
      >
        Go to The dashboard
      </a>
    </div>
  );
};
export default AccessDeniedMessage;

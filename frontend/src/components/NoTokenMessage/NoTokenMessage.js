//css import
import "./NoTokenMessage.css";

//icons import
import { BiSolidErrorAlt } from "react-icons/bi";

//react route
import { useNavigate } from "react-router-dom";

const NoTokenMessage = () => {
  const navigate = useNavigate();
  return (
    <div className="no-token-message-container">
      <span>
        <BiSolidErrorAlt size={200} style={{ color: "#cd0505" }} />
      </span>
      <h2>You are not authenticated</h2>
      <p>
        It seems you are not logged in or your session has expired. Please log
        in to access the requested page.
      </p>
      <a
        className="login-link"
        onClick={() => {
          navigate("/login");
        }}
      >
        Go to Login
      </a>
    </div>
  );
};
export default NoTokenMessage;

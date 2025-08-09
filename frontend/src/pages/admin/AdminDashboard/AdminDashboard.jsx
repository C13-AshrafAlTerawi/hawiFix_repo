//css import
import "./AdminDashboard.css";

//conexts import
import { useAdmin } from "../../../context/AdminContext";

//components import
import Navbar from "../../../components/Navbar/Navbar";
import AccessDeniedMessage from "../../../components/AccessDeniedMessage/AccessDeniedMessage";

//icons
import { MonitorCog } from "lucide-react";

//react routes
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  //react routes
  const navigate = useNavigate();
  //is admin context
  const { isAdmin } = useAdmin();

  if (isAdmin === false || isAdmin === null) {
    return <AccessDeniedMessage />;
  }

  return (
    <>
      <Navbar />
      <div className="admin-dashboard-container">
        <div className="admin-dashboard-content">
          <div className="admin-img-div">
            <img
              alt="admin-img"
              src="./images/adminImg.webp"
              className="admin-img"
            />
          </div>
          <div className="tital-div">
            <h1 className="admin-panel-taital">
              welcome from admin panel <MonitorCog size={25} />
            </h1>
          </div>
          <div className="admin-controller">
            <button
              className="display-users"
              onClick={() => {
                navigate("/admin-dashboard/users");
              }}
            >
              Display Users
            </button>
            <button
              className="display-users"
              onClick={() => {
                navigate("/admin-dashboard/service");
              }}
            >
              Display servies
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;

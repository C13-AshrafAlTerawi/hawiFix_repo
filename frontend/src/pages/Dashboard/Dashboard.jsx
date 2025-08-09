//css import
import "../Dashboard/Dashboard.css";

//components import
import Navbar from "../../components/Navbar/Navbar";
import ConfirmModal from "../../components/ConfirmModal/ConfirmModal";
import Sidebar from "../../components/Sidebar/Sidebar";
import ImageSlider from "../../components/ImageSlider/ImageSlider";
import Footer from "../../components/Footer/Footer";

const Dashboard = () => {
  return (
    <>
      <Navbar />
      <div className="tt">
        <Sidebar />
        <ImageSlider />
        <ConfirmModal />
      </div>
      <Footer />
    </>
  );
};
export default Dashboard;

//css import
import "./EmployeeDashboard.css";

//react hooks
import { useState } from "react";

//component import
import Navbar from "../../../components/Navbar/Navbar";
import AccessDeniedMessage from "../../../components/AccessDeniedMessage/AccessDeniedMessage";

//lucide icons
import {
  CalendarCheck2,
  Clock,
  StickyNote,
  Car,
  Settings2,
  MonitorCog,
} from "lucide-react";

//axios import
import axios from "axios";

//contexts
import { useAllBookings } from "../../../context/AllBookingContext";
import { useToast } from "../../../context/ToastContext";
import { useEmployee } from "../../../context/EmployeeContext";

const EmployeeDashboard = () => {
  // is employee context
  const { isEmployee } = useEmployee();

  // all booking context
  const { AllBookings, setAllBookings } = useAllBookings();

  // get all btn open
  const [setIsAllBookingClick] = useState(false);

  // state for selected filter
  const [filterStatus, setFilterStatus] = useState(null);

  // state for active button
  const [activeButton, setActiveButton] = useState(null);

  // toast context
  const { showToast } = useToast();

  const handelAllBookingsclick = () => {
    setIsAllBookingClick(true);
  };

  // change status confirmed state
  const handelChangeStatusToConfirmed = async (bookingId, newStatus) => {
    const bookingData = { status: newStatus };
    try {
      const response = await axios.patch(
        `http://localhost:3002/update-status/${bookingId}`,
        bookingData
      );
      if (response.status === 200) {
        setAllBookings((prev) =>
          prev.map((booking) =>
            booking.id === bookingId
              ? { ...booking, status: newStatus }
              : booking
          )
        );
        showToast("The status has been updated to Confirmed", "success");
      }
      if (
        newStatus === "In Progress" ||
        newStatus === "Confirmed" ||
        newStatus === "Pending" ||
        newStatus === "Completed"
      ) {
        setFilterStatus(newStatus);
      }
    } catch (err) {
      console.error("updated status failed");
      showToast("Failed to update booking status.", "error");
    }
  };

  // protect routes
  if (isEmployee === false || isEmployee === null) {
    return <AccessDeniedMessage />;
  }

  // Filter AllBookings based on selected status
  const filteredBookings = AllBookings.filter((booking) => {
    if (filterStatus === null) return true;
    return booking.status === filterStatus;
  });

  // Function to handle active button
  const handleFilterButtonClick = (status) => {
    setFilterStatus(status);
    setActiveButton(status);
  };

  return (
    <>
      <Navbar />
      <div className="employee-dashboard-container">
        <div className="employee-dashboard-taital-container">
          <h1>
            Welcome to Your Employee Dashboard
            <MonitorCog size={27} />
          </h1>
        </div>
        <div className="employee-dashboard-content">
          <button
            onClick={() => {
              setFilterStatus(null);
              setActiveButton(null);
              handelAllBookingsclick();
            }}
            className={`status-btn ${activeButton === null ? "active" : ""}`}
          >
            All Bookings
          </button>

          <button
            className={`status-btn ${
              activeButton === "Pending" ? "active" : ""
            }`}
            onClick={() => handleFilterButtonClick("Pending")}
          >
            Pending
          </button>
          <button
            className={`status-btn ${
              activeButton === "Confirmed" ? "active" : ""
            }`}
            onClick={() => handleFilterButtonClick("Confirmed")}
          >
            Confirmed
          </button>
          <button
            className={`status-btn ${
              activeButton === "In Progress" ? "active" : ""
            }`}
            onClick={() => handleFilterButtonClick("In Progress")}
          >
            In Progress
          </button>
          <button
            className={`status-btn ${
              activeButton === "Completed" ? "active" : ""
            }`}
            onClick={() => handleFilterButtonClick("Completed")}
          >
            Completed
          </button>
        </div>

        <div className="booking-display-employee-dashboard">
          <div className="booking-display-employee-dashboard-content">
            {filteredBookings.length === 0 ? (
              <p className="no-bookings-msg">
                You have no bookings for this status.
              </p>
            ) : (
              filteredBookings.map((booking) => {
                const appointmentDate = new Date(booking.appointment_time);
                const formattedDate = appointmentDate.toLocaleDateString();
                const formattedTime = appointmentDate.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                });

                return (
                  <div
                    className="booking-card-employee-dashboard"
                    key={booking.id}
                  >
                    <h3>
                      <Settings2 size={20} style={{ marginRight: "6px" }} />
                      {booking.service_name}
                    </h3>
                    <p>
                      <Car size={18} style={{ marginRight: "6px" }} />
                      {booking.car_model} - {booking.car_plate}
                    </p>
                    <p>
                      <StickyNote size={18} style={{ marginRight: "6px" }} />
                      {booking.notes}
                    </p>
                    <p>
                      <CalendarCheck2
                        size={18}
                        style={{ marginRight: "6px" }}
                      />
                      {formattedDate}
                      {" | "}
                      <Clock size={18} style={{ margin: "0 6px" }} />
                      {formattedTime}
                    </p>
                    <p>
                      <strong style={{ marginRight: "3px" }}>Status:</strong>
                      {"  "}
                      {booking.status}
                    </p>
                    <p className="created-at">
                      Created at:{" "}
                      {new Date(booking.created_at).toLocaleString()}
                    </p>
                    <div className="status-btn-booking-employee-dashboard">
                      {filterStatus === "Pending" && (
                        <button
                          onClick={() =>
                            handelChangeStatusToConfirmed(
                              booking.id,
                              "Confirmed"
                            )
                          }
                        >
                          Confirmed
                        </button>
                      )}
                      {filterStatus === "Confirmed" && (
                        <button
                          onClick={() =>
                            handelChangeStatusToConfirmed(
                              booking.id,
                              "In Progress"
                            )
                          }
                        >
                          In Progress
                        </button>
                      )}
                      {filterStatus === "In Progress" && (
                        <button
                          onClick={() =>
                            handelChangeStatusToConfirmed(
                              booking.id,
                              "Completed"
                            )
                          }
                        >
                          Completed
                        </button>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default EmployeeDashboard;

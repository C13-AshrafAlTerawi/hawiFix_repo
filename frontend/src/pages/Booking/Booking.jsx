//css import
import "./Booking.css";

//component import
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import NoTokenMessage from "../../components/NoTokenMessage/NoTokenMessage";

//react hook
import { useState, useEffect } from "react";

//contexts import
import { useConfirmModal } from "../../context/ConfirmModalContext";
import { useToast } from "../../context/ToastContext";
import { useAuthContext } from "../../context/AuthContext";

//axios import
import axios from "axios";

//lucide icons
import {
  ClipboardList,
  CalendarCheck2,
  Clock,
  StickyNote,
  Car,
  Settings2,
} from "lucide-react";
import { FaInbox } from "react-icons/fa";
import { RiDeleteBin5Line } from "react-icons/ri";

const Booking = () => {
  //toast
  const { showToast } = useToast();

  //confirm modal state
  const { openModal } = useConfirmModal();

  //booking state
  const [myBooking, setMyBooking] = useState("");

  //auth context
  const { token } = useAuthContext();

  //fitchin booking data
  const fitchBooking = async () => {
    try {
      const response = await axios.get("http://localhost:3002/bookings", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response) {
        setMyBooking(response.data.result);
      }
    } catch (err) {
      console.error("Fetching failed", err);
    }
  };
  useEffect(() => {
    fitchBooking();
  }, []);

  //handel delete booking
  const handleDelete = (bookingId) => {
    openModal({
      title: "Are you sure you want to delete this booking?",
      message: "This action cannot be undone.",
      onConfirm: async () => {
        try {
          const response = await axios.delete(
            `http://localhost:3002/bookings/${bookingId}`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );
          if (response.status === 200) {
            setMyBooking((prev) => prev.filter((b) => b.id !== bookingId));
            showToast("Booking Deleted Successfully", "success");
          }
        } catch (err) {
          console.error("Delete failed", err);
        }
      },
    });
  };
  if (!token) {
    return <NoTokenMessage />;
  }
  return (
    <>
      <Navbar />
      <div className="my-bookings-container">
        <h1 className="my-bookings-title">
          <ClipboardList size={28} style={{ marginRight: "10px" }} />
          Your Appointments
        </h1>
        {myBooking.length === 0 ? (
          <div className="no-bookings-msg-content">
            <p className="no-bookings-msg">
              <FaInbox size={30} />
              You have no bookings yet.
            </p>
          </div>
        ) : (
          myBooking.map((booking) => {
            const appointmentDate = new Date(booking.appointment_time);
            const formattedDate = appointmentDate.toLocaleDateString();
            const formattedTime = appointmentDate.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            });

            return (
              <div className="booking-card" key={booking.id}>
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
                  <CalendarCheck2 size={18} style={{ marginRight: "6px" }} />
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
                  Created at: {new Date(booking.created_at).toLocaleString()}
                </p>
                <div className="cnacel-booking">
                  <button
                    style={{ width: "283px" }}
                    onClick={() => {
                      handleDelete(booking.id);
                    }}
                  >
                    <RiDeleteBin5Line size={17} /> delete
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
      <Footer />
    </>
  );
};
export default Booking;

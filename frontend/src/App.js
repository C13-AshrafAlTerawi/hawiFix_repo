//react logo
import logo from "./logo.svg";

//app css import
import "./App.css";

//reacts
import React from "react";
import ReactDOM from "react-dom/client";

//react router
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//components
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import ConfirmModal from "./components/ConfirmModal/ConfirmModal";
import Dashboard from "./pages/Dashboard/Dashboard";
import CarList from "./components/Cars/CarList/CarList";
import Service from "./components/ServiceCard/ServiceCard";
import Booking from "./pages/Booking/Booking";
import Toast from "./components/Toast/Toast";
import Settings from "./components/Settings/Settings";
import AboutUs from "./components/AboutUs/AboutUs";

//admin components
import AdminDashboard from "./pages/admin/AdminDashboard/AdminDashboard";
import DisplayUsers from "./pages/admin/DisplayUsers/DisplayUsers";
import DisplayService from "./pages/admin/DisplayService/DisplayService";

//employee components
import EmployeeDashboard from "./pages/Employee/EmployeeDashboard/EmployeeDashboard";

//contexts
import { ConfirmModalProvider } from "./context/ConfirmModalContext";
import { AuthProvider } from "./context/AuthContext";
import CarProvider from "./context/CarContext";
import { ToastProvider } from "./context/ToastContext";
import { AdminProvider } from "./context/AdminContext";
import { ServiceProvider } from "./context/ServiceContext";
import { EmployeeProvider } from "./context/EmployeeContext";
import { AllBookingsProvider } from "./context/AllBookingContext";
import { UserProvider } from "./context/UserContext";

//react profiler
import { Profiler } from "react";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
function App() {
  return (
    <div className="App">
      <Profiler id="App">
        <ConfirmModalProvider>
          <ToastProvider>
            <UserProvider>
              <AuthProvider>
                <AllBookingsProvider>
                  <EmployeeProvider>
                    <ServiceProvider>
                      <AdminProvider>
                        <CarProvider>
                          <Router>
                            <ConfirmModal />
                            <Toast />
                            <Routes>
                              <Route path="/login" element={<Login />} />
                              <Route path="/" element={<Dashboard />} />
                              <Route path="/register" element={<Register />} />
                              <Route path="/carList" element={<CarList />} />
                              <Route path="/service" element={<Service />} />
                              <Route path="/booking" element={<Booking />} />
                              <Route
                                path="/admin-dashboard"
                                element={<AdminDashboard />}
                              />
                              <Route
                                path="/admin-dashboard/users"
                                element={<DisplayUsers />}
                              />
                              <Route
                                path="/admin-dashboard/service"
                                element={<DisplayService />}
                              />
                              <Route
                                path="/employee-dashboard"
                                element={<EmployeeDashboard />}
                              />
                              <Route path="/Settings" element={<Settings />} />
                              <Route path="/about-us" element={<AboutUs />} />
                            </Routes>
                          </Router>
                        </CarProvider>
                      </AdminProvider>
                    </ServiceProvider>
                  </EmployeeProvider>
                </AllBookingsProvider>
              </AuthProvider>
            </UserProvider>
          </ToastProvider>
        </ConfirmModalProvider>
      </Profiler>
    </div>
  );
}

export default App;

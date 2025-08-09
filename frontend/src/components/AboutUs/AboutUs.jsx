//css import
import "./AboutUs.css";

//components import
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";

const AboutUs = () => {
  return (
    <>
      <Navbar />
      <div className="about-us-container">
        <h1>About Us</h1>
        <p>
          At <strong>hawiFix</strong>, we offer an innovative platform for
          booking car maintenance services in Amman, Bayader Al-Senaa. Our
          mission is to make car servicing simple and convenient by providing an
          easy-to-use online platform where you can:
        </p>
        <div>
          <ul>
            <li>
              <strong>Login to Your Account</strong>: Access and manage your
              account with ease.
            </li>
            <li>
              <strong>Add or Edit Your Cars</strong>: Add new cars or update
              existing ones in your profile.
            </li>
            <li>
              <strong>View Available Services</strong>: Explore a variety of
              maintenance services we offer.
            </li>
            <li>
              <strong>Book Maintenance Appointments</strong>: Schedule your
              car's service by selecting a preferred time and date.
            </li>
            <li>
              <strong>Add Notes</strong>: Include special instructions or notes
              regarding the service.
            </li>
            <li>
              <strong>Receive Email Updates</strong>: Get real-time
              notifications on the status of your request, from processing to
              completion.
            </li>
          </ul>
        </div>
        <p>
          We are committed to providing the best service experience for our
          customers, making car maintenance hassle-free through technology.
        </p>
        <h2>Project History</h2>
        <p>
          [hawiFix] was launched on [26/07/2025] with the goal of
          revolutionizing the car maintenance experience by offering an
          innovative, efficient solution tailored to meet our customers' needs.
          We strive to deliver the highest customer satisfaction with every
          service.
        </p>
        <h2>Our Team</h2>
        <p>
          Our team consists of experts in both technology and car maintenance,
          working together to provide the best solutions for our customers.
        </p>
      </div>
      <Footer />
    </>
  );
};
export default AboutUs;

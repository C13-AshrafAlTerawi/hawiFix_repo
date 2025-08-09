//css import
import "./Footer.css";

//react routes import
import { useNavigate } from "react-router-dom";

//icons
import { MdEmail } from "react-icons/md";
import { BsTelephoneFill } from "react-icons/bs";
import { HiLocationMarker } from "react-icons/hi";

const Footer = () => {
  const navigate = useNavigate();
  return (
    <div className="footer-container">
      <div className="footer-content">
        <div className="Quick-links">
          <h1>Important Links</h1>
          <p
            onClick={() => {
              navigate("/");
            }}
          >
            Home / Dashboard
          </p>
          <p
            onClick={() => {
              navigate("/about-us");
            }}
          >
            About Us / Who we are and what we do
          </p>
          <p
            onClick={() => {
              navigate("/service");
            }}
          >
            Services / Appointment booking, car maintenance
          </p>
        </div>

        <div className="discrebtion-content">
          <h1>Project Overview</h1>
          <p>
            This project is a car maintenance appointment booking system for Haw
            Fix Garage.
            <br />
            Created on 26/07/2025.
          </p>
        </div>

        <div className="connect-info">
          <h1>Contact Info</h1>
          <p>
            <HiLocationMarker /> Address: Industrial Area – Bayader, Amman, next
            to Mazda Company
          </p>
          <p>
            <BsTelephoneFill /> Phone: +962 79 526 3586
          </p>
          <p>
            <MdEmail /> ashraf.moh.alhawi@gmail.com
          </p>
        </div>
      </div>
      <hr />
      <div className="FollowUs-container">
        <p className="designer-content">
          © 2025 All rights reserved. This project was designed and developed by{" "}
          <span class="designer-name">Ashraf Alhawi .</span>
        </p>
        <div className="FollowUs-content">
          <div className="Social-Media-img-content">
            <a
              href="https://www.instagram.com/_ashraf2l"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img alt="instagram" src="/images/instagram.png" />
            </a>
            <a
              href="https://www.facebook.com/ashraf.hawi.2025?mibextid=wwXIfr&rdid=grFtgb3GpHJ1qeyq&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1FAxibPfsY%2F%3Fmibextid%3DwwXIfr#"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img alt="facebook" src="/images/facebook.png" />
            </a>
            <img alt="linkedin" src="/images/linkedin.png" />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Footer;

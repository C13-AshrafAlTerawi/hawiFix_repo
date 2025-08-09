import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../ImageSlider/ImageSlider.css";
import Slider from "react-slick";

//contexts
import { useAuthContext } from "../../context/AuthContext";

//react route
import { useNavigate } from "react-router-dom";

//icons
import { FaLock } from "react-icons/fa";

const ImageSlider = () => {
  const navigate = useNavigate();

  //auth contexts
  const { token } = useAuthContext();

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 5000,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const images = [
    "/images/carfix1.webp",
    "/images/carfix2.webp",
    "/images/carfix3.webp",
    "/images/carfix4.webp",
  ];

  return (
    <div className="sliderContainer">
      <div className="backgraund">
        <div className="sliderOverlayText">
          <h1 className="welcomeText">Control Panel Ready ✨</h1>
          <p className="loginReminder">Start your journey from the sidebar!</p>

          {!token && (
            <>
              <p className="loginReminder">
                If you're not logged in, please log in to unlock the sidebar
                menu.
              </p>

              <button
                className="sginIn-or-logIn-btn"
                onClick={() => {
                  navigate("/login");
                }}
              >
                <FaLock size={20} /> log in or sign up
              </button>
            </>
          )}
        </div>

        <Slider {...settings}>
          {images.map((src, i) => (
            <div key={i} className="mySlide">
              <img src={src} alt={`slide-${i}`} className="slideImage" />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default ImageSlider;

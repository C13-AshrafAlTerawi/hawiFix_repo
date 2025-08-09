//css import
import "./CarApi.css";

//axios import
import axios from "axios";

//react hook import
import { useEffect, useState } from "react";

//icons
import { Flag, Car, MoveRight } from "lucide-react";
import { FaCarAlt } from "react-icons/fa";

const CarApi = () => {
  const [carApi, setCarApi] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handelCarApi = async () => {
    try {
      const response = await axios.get(
        `https://cors-anywhere.herokuapp.com/https://www.carqueryapi.com/api/0.3/?cmd=getMakes`
      );
      if (response) {
        setCarApi(response.data.Makes);
      }
      setLoading(false);
      console.log("the car api response is", response.data);
    } catch (err) {
      setError("Error fetching data: " + err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    handelCarApi();
  }, []);
  return (
    <div>
      <h1
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "8px",
        }}
      >
        Car Makes <FaCarAlt />
      </h1>

      {loading && <p>Loading...</p>}

      {error && <p style={{ color: "red" }}>{error}</p>}

      <div className="car-list-container-api">
        <ul>
          {carApi.length > 0 ? (
            carApi.map((car, index) => (
              <div key={car.make_id || index}>
                <p className="det-from-api">
                  <Car /> <MoveRight /> {car.make_display}
                  <Flag /> <MoveRight /> {car.make_country}
                </p>
                <p></p>
              </div>
            ))
          ) : (
            <p>No data available.</p>
          )}
        </ul>
      </div>
    </div>
  );
};
export default CarApi;

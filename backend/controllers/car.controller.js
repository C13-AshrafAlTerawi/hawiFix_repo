//call Data Base
const connection = require("../config/db");

//fetcing car data
exports.getAllCars = (req, res) => {
  const userId = req.user.id;
  const sql = "SELECT * FROM cars WHERE user_id = ?";
  connection.query(sql, [userId], (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Error fetching cars" });
    }
    if (result.length === 0) {
      return res.status(200).json({ message: "No cars available", result: [] });
    }
    res.status(200).json({ message: "Fetching successful", result });
  });
};

//add new car
exports.addNewCar = (req, res) => {
  const userId = req.user.id;
  const { brand, model, plate_number, year, color } = req.body;

  const sql =
    "INSERT INTO cars (brand, model, plate_number,year,color, user_id) VALUES (?, ?, ?, ?,?,?)";

  connection.query(
    sql,
    [brand, model, plate_number, year, color, userId],
    (err, result) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Adding car failed", error: err });
      }

      res.status(201).json({ message: "Car added successfully", result });
    }
  );
};

//update car
exports.updateCar = (req, res) => {
  const userId = req.user.id;
  const carId = req.params.carId;

  const { brand, model, plate_number } = req.body;

  const sql =
    "UPDATE cars SET brand = ?, model = ?, plate_number = ? WHERE id = ? AND user_id = ?";

  connection.query(
    sql,
    [brand, model, plate_number, carId, userId],
    (err, result) => {
      if (err) {
        return res.status(500).json({ message: "Update failed", error: err });
      }

      if (result.affectedRows === 0) {
        return res
          .status(404)
          .json({ message: "Car not found or not owned by user" });
      }

      return res
        .status(200)
        .json({ message: "Car updated successfully", result });
    }
  );
};

//delete car
exports.deleteCar = (req, res) => {
  const userId = req.user.id;
  const carId = req.params.carId;
  const sql = "DELETE FROM cars WHERE id = ? AND user_id = ?";
  connection.query(sql, [carId, userId], (err, result) => {
    if (err) {
      return res.status(401).json({ message: "delete car failed" });
    }
    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json({ message: "Car not found or not owned by user" });
    }
    return res.status(201).json({ message: "deleted sccssfuly ", result });
  });
};

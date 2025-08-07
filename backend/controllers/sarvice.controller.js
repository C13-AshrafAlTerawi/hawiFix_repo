//call Data Base
const connection = require("../config/db");

//fitching services
exports.getAllSarvice = (req, res) => {
  const sql = "SELECT * FROM services";
  connection.query(sql, (err, result) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Error fetching services data", error: err });
    }
    if (result.length == 0) {
      return res.status(402).json({ message: "no services avilable" });
    }
    return res
      .status(200)
      .json({ message: "Fetching successful", data: result });
  });
};

//create service
exports.addNewSarvice = (req, res) => {
  const { service_name, description, price } = req.body;

  const sql =
    "INSERT INTO services (service_name, description, price) VALUES (?, ?, ?)";

  connection.query(sql, [service_name, description, price], (err, result) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Failed to add new service", error: err });
    }

    return res
      .status(201)
      .json({ message: "Service added successfully", data: result });
  });
};
//update service
exports.updateSarvice = (req, res) => {
  const serviceId = req.params.serviceId;

  const { service_name, description, price } = req.body;

  const sql =
    "UPDATE services SET service_name=?, description=?, price=? WHERE id = ?";

  connection.query(
    sql,
    [service_name, description, price, serviceId],
    (err, result) => {
      if (err) {
        return res.status(401).json({ message: "fialed update", err });
      }
      return res.status(201).json({ message: "updated succssfully", result });
    }
  );
};
//delete sarvice
exports.deleteSarvice = (req, res) => {
  const serviceId = req.params.serviceId;
  const sql = "delete from services where id=?";
  connection.query(sql, [serviceId], (err, result) => {
    if (err) {
      return res.status(401).json({ message: "fialed delete", err });
    }
    return res.status(201).json({ message: "deleted succssfully", result });
  });
};

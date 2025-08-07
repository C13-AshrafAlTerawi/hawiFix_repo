const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/auth");

const carController = require("../controllers/car.controller");

router.get("/", verifyToken, carController.getAllCars);

router.post("/", verifyToken, carController.addNewCar);

router.put("/:carId", verifyToken, carController.updateCar);

router.delete("/:carId", verifyToken, carController.deleteCar);
module.exports = router;

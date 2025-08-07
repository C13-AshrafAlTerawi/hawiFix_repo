const express = require("express");
const router = express.Router();

const servicesController = require("../controllers/sarvice.controller");

//fitching services routes
router.get("/services", servicesController.getAllSarvice);
//create service routes
router.post("/services", servicesController.addNewSarvice);
//update service routes
router.put("/services/:serviceId", servicesController.updateSarvice);
//delete sarvice routes
router.delete("/services/:serviceId", servicesController.deleteSarvice);

module.exports = router;

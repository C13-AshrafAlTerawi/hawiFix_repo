const express = require("express");
const router = express.Router();

const userController = require("../controllers/user.controller");
const verifyToken = require("../middlewares/auth");

router.get("/", userController.getAllUsers);
router.post("/", userController.creatNewUser);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);
//Update user field route
router.patch("/update/:field", verifyToken, userController.UpdateUserField);
//update user password
router.patch(
  "/update/password",
  verifyToken,
  userController.UpdateUserPassword
);

module.exports = router;

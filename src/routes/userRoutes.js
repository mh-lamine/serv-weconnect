const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const jwt = require("../utils/middleware");

router.post("/register", userController.registerUser);
router.post("/login", userController.loginUser);
router.get("/", jwt.verifyToken, userController.getUser);

router.post("/providers", userController.getProvidersByFilters);
router.patch("/", jwt.verifyToken, userController.updateUser);
router.delete("/", jwt.verifyToken, userController.deleteUser);

module.exports = router;

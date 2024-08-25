const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { verifyToken } = require("../utils/middleware");

router.get("/", verifyToken, userController.getUser);
router.post("/providers", userController.getProvidersByFilters);
router.patch("/", verifyToken, userController.updateUser);
router.patch("/admin", verifyToken, userController.makeProvider);
router.delete("/", verifyToken, userController.deleteUser);

module.exports = router;

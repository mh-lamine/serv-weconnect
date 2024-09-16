const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { verifyToken, upload } = require("../utils/middleware");

router.get("/", verifyToken, userController.getUser);
router.post("/providers", userController.getProvidersByFilters);
router.post("/profile", verifyToken, upload.single('profile'), userController.uploadProfile);
router.post("/cover", verifyToken, upload.single('profile'), userController.uploadCover);
router.patch("/", verifyToken, userController.updateUser);
router.patch("/admin", verifyToken, userController.makeProvider);
router.delete("/", verifyToken, userController.deleteUser);

module.exports = router;

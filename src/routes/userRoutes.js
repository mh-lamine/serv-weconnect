const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { verifyToken, upload } = require("../utils/middleware");

router.get("/", verifyToken, userController.getUser);
router.post("/providers", userController.getProvidersByFilters);
router.get("/images/:providerId", userController.getImages);
router.post("/file", verifyToken, upload.single('profile'), userController.uploadFile);
router.patch("/", verifyToken, userController.updateUser);
router.patch("/admin", verifyToken, userController.makeProvider);
router.delete("/", verifyToken, userController.deleteUser);

module.exports = router;

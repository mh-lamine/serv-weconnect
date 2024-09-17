const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const s3Controller = require("../controllers/s3Controller");
const { verifyToken, upload } = require("../utils/middleware");

router.get("/", verifyToken, userController.getUser);
router.post("/providers", userController.getProvidersByFilters);
router.patch("/", verifyToken, userController.updateUser);
router.patch("/admin", verifyToken, userController.makeProvider);
router.delete("/", verifyToken, userController.deleteUser);

router.post("/profile", verifyToken, upload.single('profile'), s3Controller.uploadProfile);
router.post("/cover", verifyToken, upload.single('cover'), s3Controller.uploadCover);
router.delete("/profile", verifyToken, s3Controller.deleteProfile);
router.delete("/cover", verifyToken, s3Controller.deleteCover);

module.exports = router;

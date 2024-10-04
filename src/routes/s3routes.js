const express = require("express");
const router = express.Router();
const s3Controller = require("../controllers/s3Controller");
const { verifyToken, upload } = require("../utils/middleware");

router.post(
  "/profile",
  verifyToken,
  upload.single("profile"),
  s3Controller.uploadProfile
);
router.post(
  "/cover",
  verifyToken,
  upload.single("cover"),
  s3Controller.uploadCover
);
router.delete("/profile", verifyToken, s3Controller.deleteProfile);
router.delete("/cover", verifyToken, s3Controller.deleteCover);

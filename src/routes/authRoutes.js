const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

router.post("/register", authController.registerUser);
router.post("/login", authController.loginUser);
router.get("/logout", authController.logout);
router.get("/refresh", authController.refreshToken);

router.post("/pro/register", authController.registerPro);
router.post("/pro/login", authController.loginPro);

router.post("/salon/register", authController.registerSalon);
router.post("/salon/login", authController.loginSalon);
router.post("/member/login", authController.loginMember);

router.post("/forgot-password", authController.forgotPassword);
router.post("/reset-password", authController.resetPassword);

module.exports = router;

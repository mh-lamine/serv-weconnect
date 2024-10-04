const express = require("express");
const { verifyToken } = require("../utils/middleware");
const router = express.Router();
const salonController = require("../controllers/salonController");

router.get("/", verifyToken, salonController.getSalon);
router.post("/", verifyToken, salonController.addMember);
router.patch("/", verifyToken, salonController.updateSalon);
router.delete("/", verifyToken, salonController.removeMember);
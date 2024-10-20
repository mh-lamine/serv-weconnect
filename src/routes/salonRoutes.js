const express = require("express");
const { verifyToken } = require("../utils/middleware");
const router = express.Router();
const salonController = require("../controllers/salonController");

router.get("/", verifyToken, salonController.getSalon);
router.get("/members", verifyToken, salonController.getMembers);
// router.get("/members/:id", verifyToken, salonController.getMember);
router.post("/", verifyToken, salonController.addMember);
router.patch("/", verifyToken, salonController.updateSalon);
router.delete("/", verifyToken, salonController.removeMember);

module.exports = router;
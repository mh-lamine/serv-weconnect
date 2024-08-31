const express = require("express");
const router = express.Router();
const availabilityController = require("../controllers/availabilityController");
const jwt = require("../utils/middleware");

router.post("/", jwt.verifyToken, availabilityController.createAvailability);
router.post("/special", jwt.verifyToken, availabilityController.createSpecialAvailability);
router.post("/:id", availabilityController.getAvailableTimeSlots);
router.get("/", jwt.verifyToken, availabilityController.getAvailabilities);
router.patch(
  "/:availabilityId",
  jwt.verifyToken,
  availabilityController.updateAvailability
);
router.delete(
  "/:availabilityId",
  jwt.verifyToken,
  availabilityController.deleteAvailability
);
router.delete(
  "/special/:availabilityId",
  jwt.verifyToken,
  availabilityController.deleteSpecialAvailability
);

module.exports = router;

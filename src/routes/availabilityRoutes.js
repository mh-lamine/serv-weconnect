const express = require("express");
const router = express.Router();
const availabilityController = require("../controllers/availabilityController");
const jwt = require("../utils/middleware");

router.post("/", jwt.verifyToken, availabilityController.createAvailability);
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

module.exports = router;

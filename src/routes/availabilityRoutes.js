const express = require("express");
const router = express.Router();
const availabilityController = require("../controllers/availabilityController");
const jwt = require("../utils/middleware");

router.post("/", jwt.verifyToken, availabilityController.createAvailability);
router.post("/member/:id", jwt.verifyToken, availabilityController.createMemberAvailability);
router.post(
  "/special",
  jwt.verifyToken,
  availabilityController.createSpecialAvailability
);
router.post(
  "/special/member/:id",
  jwt.verifyToken,
  availabilityController.createSpecialMemberAvailability
);
router.post("/unavailability", jwt.verifyToken, availabilityController.createUnavailability);

router.post("/:id", availabilityController.getAvailableTimeSlots);
router.post("/salon/:id", availabilityController.getSalonAvailableTimeSlots);
router.get("/", jwt.verifyToken, availabilityController.getAvailabilities);
router.get(
  "/member/:id",
  jwt.verifyToken,
  availabilityController.getMemberAvailabilities
);
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
router.delete("/unavailability/:unavailabilityId", jwt.verifyToken, availabilityController.deleteUnavailability);

module.exports = router;

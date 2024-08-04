const express = require("express");
const router = express.Router();
const appointmentController = require("../controllers/appointmentController");
const jwt = require("../utils/middleware");

router.post("/", jwt.verifyToken, appointmentController.createAppointment);
router.get(
  "/client",
  jwt.verifyToken,
  appointmentController.getAppointmentsAsClient
);
router.get(
  "/provider",
  jwt.verifyToken,
  appointmentController.getAppointmentsAsProvider
);
router.patch(
  "/:appointmentId",
  jwt.verifyToken,
  appointmentController.updateAppointment
);
router.delete(
  "/appointmentId",
  jwt.verifyToken,
  appointmentController.deleteAppointment
);

module.exports = router;

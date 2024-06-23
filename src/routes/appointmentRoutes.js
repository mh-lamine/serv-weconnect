const express = require("express");
const router = express.Router();
const appointmentController = require("../controllers/appointmentController");

router.post("/", appointmentController.createAppointment);
router.get("/client/:id", appointmentController.getAppointmentsAsClient);
router.get("/provider/:id", appointmentController.getAppointmentsAsProvider);
router.patch("/:id", appointmentController.updateAppointment);
router.delete("/:id", appointmentController.deleteAppointment);

module.exports = router;

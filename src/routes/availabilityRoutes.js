const express = require("express");
const router = express.Router();
const availabilityController = require("../controllers/availabilityController");

router.post("/", availabilityController.createAvailability);
router.get("/:id", availabilityController.getProviderAvailability);
router.put("/:id", availabilityController.updateAvailability);
router.delete("/:id", availabilityController.deleteAvailability);

module.exports = router;

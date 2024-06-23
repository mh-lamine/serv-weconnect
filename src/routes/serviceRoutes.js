const express = require("express");
const router = express.Router();
const serviceController = require("../controllers/serviceController");

// admin
router.post("/", serviceController.createService);
router.put("/:id", serviceController.updateService);
router.delete("/:id", serviceController.deleteService);

router.get("/:id/providers", serviceController.getProvidersByServiceId);

module.exports = router;
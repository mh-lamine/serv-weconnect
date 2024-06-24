const express = require("express");
const router = express.Router();
const providerServiceController = require("../controllers/providerServiceController");

router.post("/", providerServiceController.createProviderService);
router.put("/:id", providerServiceController.updateProviderService);
router.delete("/:id", providerServiceController.deleteProviderService);

module.exports = router;

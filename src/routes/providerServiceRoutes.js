const express = require("express");
const router = express.Router();
const providerServiceController = require("../controllers/providerServiceController");
const jwt = require("../utils/middleware");

router.post("/", jwt.verifyToken, providerServiceController.createProviderService);
router.put("/:serviceId", jwt.verifyToken, providerServiceController.updateProviderService);
router.delete("/:serviceId", jwt.verifyToken, providerServiceController.deleteProviderService);

module.exports = router;

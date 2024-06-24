const express = require("express");
const router = express.Router();
const providerServiceController = require("../controllers/providerServiceController");

router.post("/", providerServiceController);
router.get("/:id", providerServiceController);
router.put("/:id", providerServiceController);
router.delete("/:id", providerServiceController);

module.exports = router;

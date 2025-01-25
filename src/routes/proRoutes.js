const express = require("express");
const router = express.Router();
const proController = require("../controllers/proController");
const { verifyToken, upload } = require("../utils/middleware");

router.get("/", verifyToken, proController.getPro);
// router.post("/providers", proController.getProvidersByFilters);
router.patch("/", verifyToken, proController.updatePro);
// router.patch("/admin", verifyToken, proController.makeProvider);
// router.delete("/", verifyToken, proController.deleteUser);

module.exports = router;

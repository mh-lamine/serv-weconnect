const express = require("express");
const router = express.Router();
const providerCategoryController = require("../controllers/providerCategoryController");
const jwt = require("../utils/middleware");

router.post(
  "/",
  jwt.verifyToken,
  providerCategoryController.createProviderCategory
);
router.get("/:id", providerCategoryController.getProviderCategories);
router.put(
  "/:categoryId",
  jwt.verifyToken,
  providerCategoryController.updateProviderCategory
);
router.delete(
  "/:categoryId",
  jwt.verifyToken,
  providerCategoryController.deleteProviderCategory
);

module.exports = router;

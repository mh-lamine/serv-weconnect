const express = require("express");
const router = express.Router();
const providerCategoryController = require("../controllers/providerCategoryController");

router.post("/", providerCategoryController.createProviderCategory);
router.get("/:id", providerCategoryController.getProviderCategories);
router.put("/:id", providerCategoryController.updateProviderCategory);
router.delete("/:id", providerCategoryController.deleteProviderCategory);

module.exports = router;

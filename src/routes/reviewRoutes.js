const express = require("express");
const router = express.Router();
const reviewController = require("../controllers/reviewController");

router.post("/", reviewController);
router.get("/:id", reviewController);
router.put("/:id", reviewController);
router.delete("/:id", reviewController);

module.exports = router;

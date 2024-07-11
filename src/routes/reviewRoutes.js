const express = require("express");
const router = express.Router();
const reviewController = require("../controllers/reviewController");
const jwt = require("../utils/middleware");

router.post("/", jwt.verifyToken, reviewController.createReview);
router.get("/:serviceId", reviewController.getProviderReviews);
router.put("/:reviewId", jwt.verifyToken, reviewController.updateReview);
router.delete("/:reviewId", jwt.verifyToken, reviewController.deleteReview);

module.exports = router;

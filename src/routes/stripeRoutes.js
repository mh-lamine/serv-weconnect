const express = require("express");
const router = express.Router();
const stripeController = require("../controllers/stripeController");
const { verifyToken } = require("../utils/middleware");

router.post("/startOnboarding", verifyToken, stripeController.startOnboarding);
router.post("/create-payment-intent", stripeController.createPaymentIntent);

module.exports = router;

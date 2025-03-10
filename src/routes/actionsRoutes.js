const express = require("express");
const router = express.Router();

const actionsController = require("../controllers/actionsController");

router.post("/contact-me", actionsController.contactMe);

module.exports = router;
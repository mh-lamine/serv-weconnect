const express = require("express");
const router = express.Router();
const tagsController = require("../controllers/tagsController");

router.post("/", tagsController);
router.get("/:id", tagsController);
router.put("/:id", tagsController);
router.delete("/:id", tagsController);

module.exports = router;

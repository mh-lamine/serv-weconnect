const express = require("express");
const router = express.Router();
const tagsController = require("../controllers/tagsController");

router.post("/", tagsController.createTag);
router.get("/", tagsController.getTags);
router.put("/:id", tagsController.updateTag);
router.delete("/:id", tagsController.deleteTag);

module.exports = router;

const express = require("express");
const router = express.Router();
const tagsController = require("../controllers/tagsController");

router.post("/", tagsController.createTag);
router.get("/", tagsController.getTags);
router.put("/:tagId", tagsController.updateTag);
router.delete("/:tagId", tagsController.deleteTag);

module.exports = router;
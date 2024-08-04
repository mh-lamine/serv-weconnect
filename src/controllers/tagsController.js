const tagsService = require("../services/tagsService");

exports.createTag = async (req, res) => {
  try {
    const adminId = req.user.id;
    if (adminId !== PROCESS.ENV.ADMIN_ID) {
      return res.status(403).json({ message: "Unauthorized, admin only" });
    }
    const tag = await tagsService.createTag(req.body);
    return res.status(201).json(tag);
  } catch (error) {
    return res.status(error.statusCode || 500).json({ message: error.message });
  }
};

exports.getTags = async (req, res) => {
  try {
    const tags = await tagsService.getTags();
    return res.json(tags);
  } catch (error) {
    return res.status(error.statusCode || 500).json({ message: error.message });
  }
};

exports.updateTag = async (req, res) => {
  try {
    const adminId = req.user.id;
    if (adminId !== PROCESS.ENV.ADMIN_ID) {
      return res.status(403).json({ message: "Unauthorized, admin only" });
    }
    const { tagId } = req.params;
    const tag = await tagsService.updateTag(tagId, req.body);
    return res.json(tag);
  } catch (error) {
    return res.status(error.statusCode || 500).json({ message: error.message });
  }
};

exports.deleteTag = async (req, res) => {
  try {
    const adminId = req.user.id;
    if (adminId !== PROCESS.ENV.ADMIN_ID) {
      return res.status(403).json({ message: "Unauthorized, admin only" });
    }
    const { tagId } = req.params;
    const tag = await tagsService.deleteTag(tagId);
    return res.json(tag);
  } catch (error) {
    return res.status(error.statusCode || 500).json({ message: error.message });
  }
};

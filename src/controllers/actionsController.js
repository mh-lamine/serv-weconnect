const actionsService = require("../services/actionsService");

exports.contactMe = async (req, res) => {
  try {
    await actionsService.contactMe(req.body);
    return res.status(201).json({ message: "Message sent successfully" });
  } catch (error) {
    return res.status(error.statusCode || 500).json({ message: error.message });
  }
};

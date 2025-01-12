const proService = require("../services/proService");

exports.getPro = async (req, res) => {
  try {
    const { id } = req.user;
    const pro = await proService.getPro(id);
    return res.json(pro);
  } catch (error) {
    return res.status(error.statusCode || 500).json({ message: error.message });
  }
};

const s3Service = require('../services/s3Service');

exports.uploadProfile = async (req, res) => {
  try {
    const { id, role } = req.user;
    const user = await s3Service.uploadProfile(id, role, req.file);
    return res.json(user);
  } catch (error) {
    return res.status(error.statusCode || 500).json({ message: error.message });
  }
};

exports.uploadCover = async (req, res) => {
  try {
    const { id, role } = req.user;
    const user = await s3Service.uploadCover(id, role, req.file);
    return res.json(user);
  } catch (error) {
    return res.status(error.statusCode || 500).json({ message: error.message });
  }
};

exports.deleteProfile = async (req, res) => {
  try {
    const { id, role } = req.user;
    await s3Service.deleteProfile(id, role);
    return res.status(204).end();
  } catch (error) {
    return res.status(error.statusCode || 500).json({ message: error.message });
  }
};

exports.deleteCover = async (req, res) => {
  try {
    const { id, role } = req.user;
    await s3Service.deleteCover(id, role);
    return res.status(204).end();
  } catch (error) {
    return res.status(error.statusCode || 500).json({ message: error.message });
  }
};

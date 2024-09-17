const s3Service = require('../services/s3Service');

exports.uploadProfile = async (req, res) => {
  try {
    const { id } = req.user;
    const user = await s3Service.uploadProfile(id, req.file);
    return res.json(user);
  } catch (error) {
    return res.status(error.statusCode || 500).json({ message: error.message });
  }
};

exports.uploadCover = async (req, res) => {
  try {
    const { id } = req.user;
    const user = await s3Service.uploadCover(id, req.file);
    return res.json(user);
  } catch (error) {
    return res.status(error.statusCode || 500).json({ message: error.message });
  }
};

exports.deleteProfile = async (req, res) => {
  try {
    const { id } = req.user;
    await s3Service.deleteProfile(id);
    return res.status(204).end();
  } catch (error) {
    return res.status(error.statusCode || 500).json({ message: error.message });
  }
};

exports.deleteCover = async (req, res) => {
  try {
    const { id } = req.user;
    await s3Service.deleteCover(id);
    return res.status(204).end();
  } catch (error) {
    return res.status(error.statusCode || 500).json({ message: error.message });
  }
};

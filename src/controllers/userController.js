const userService = require("../services/userService");

exports.getUser = async (req, res) => {
  try {
    const { id } = req.user;
    const user = await userService.getUser(id);
    return res.json(user);
  } catch (error) {
    return res.status(error.statusCode || 500).json({ message: error.message });
  }
};

exports.getProvidersByFilters = async (req, res) => {
  try {
    const filters = req.body;
    const providers = await userService.getProvidersByFilters(filters);
    return res.json(providers);
  } catch (error) {
    return res.status(error.statusCode || 500).json({ message: error.message });
  }
};

exports.getImages = async (req, res) => {
  try {
    const { providerId } = req.params;
    const presignedUrls = await userService.getImages(providerId);
    return res.json(presignedUrls);
  } catch (error) {
    return res.status(error.statusCode || 500).json({ message: error.message });
  }
};

exports.uploadFile = async (req, res) => {
  try {
    const { id } = req.user;
    const user = await userService.uploadFile(id, req.file);
    return res.json(user);
  } catch (error) {
    return res.status(error.statusCode || 500).json({ message: error.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { id } = req.user;
    const user = await userService.updateUser(id, req.body);
    return res.json(user);
  } catch (error) {
    return res.status(error.statusCode || 500).json({ message: error.message });
  }
};

exports.makeProvider = async (req, res) => {
  try {
    const { userPhoneNumber, password } = req.body;
    const user = await userService.makeProvider(userPhoneNumber, password);
    return res.json(user);
  } catch (error) {
    return res.status(error.statusCode || 500).json({ message: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.user;
    await userService.deleteUser(id);
    return res.status(204).end();
  } catch (error) {
    return res.status(error.statusCode || 500).json({ message: error.message });
  }
};

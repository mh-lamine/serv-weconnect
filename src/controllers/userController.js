const userService = require("../services/userService");
const jwt = require("../utils/middleware");

exports.registerUser = async (req, res) => {
  try {
    const user = await userService.registerUser(req.body);
    return res.json({
      ...user,
      token: jwt.generateToken(user.id),
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({ message: error.message });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { phoneNumber, password } = req.body;
    if (!phoneNumber || !password) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const user = await userService.loginUser(phoneNumber, password);
    return res.json({
      ...user,
      token: jwt.generateToken(user.id),
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({ message: error.message });
  }
};

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

exports.updateUser = async (req, res) => {
  try {
    const { id } = req.user;
    const user = await userService.updateUser(id, req.body);
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

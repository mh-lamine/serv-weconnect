const userService = require("../services/userService");
const jwt = require("../utils/middleware");

exports.registerUser = async (req, res) => {
  try {
    const user = await userService.registerUser(req.body);
    res.json({
      ...user,
      token: jwt.generateToken(user.id),
    });
  } catch (err) {
    return res.json({ err: err.message || "Internal Server Error" });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { phoneNumber, password } = req.body;
    if (!phoneNumber || !password) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const user = await userService.loginUser(phoneNumber, password);
    res.json({
      ...user,
      token: jwt.generateToken(user.id),
    });
  } catch (err) {
    return res.json({ err: err.message || "Internal Server Error" });
  }
};

exports.getUser = async (req, res) => {
  const { id } = req.user;
  const user = await userService.getUser(id);
  res.json(user);
};

exports.getProvidersByFilters = async (req, res) => {
  try {
    const filters = req.body;
    const providers = await userService.getProvidersByFilters(filters);
    res.json(providers);
  } catch (error) {
    return res.json({ err: err.message || "Internal Server Error" });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { id } = req.user;
    const user = await userService.updateUser(id, req.body);
    res.json(user);
  } catch (error) {
    return res.json({ err: err.message || "Internal Server Error" });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.user;
    await userService.deleteUser(id);
    res.status(204).end();
  } catch (error) {
    return res.json({ err: err.message || "Internal Server Error" });
  }
};

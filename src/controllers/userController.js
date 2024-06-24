const userService = require("../services/userService");
const Joi = require("joi");

const userSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  phoneNumber: Joi.string().required(),
  address: Joi.string().required(),
  isProvider: Joi.boolean(),
  hasActiveSubscription: Joi.boolean(),
  isInVacancyMode: Joi.boolean(),
  autoAcceptAppointments: Joi.boolean(),
  firstName: Joi.string().optional(),
  lastName: Joi.string().optional(),
  providerName: Joi.string().optional(),
});

exports.createUser = async (req, res, next) => {
  try {
    const { error } = userSchema.validate(req.body);
    if (error)
      return res.status(400).json({ message: error.details[0].message });

    const user = await userService.createUser(req.body);
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};

exports.getProvidersByFilters = async (req, res, next) => {
  try {
    const filters = req.body;
    const providers = await userService.getProvidersByFilters(filters);
    res.json(providers);
  } catch (error) {
    next(error);
  }
};

exports.getUserById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await userService.getUserById(id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    next(error);
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { error } = userSchema.validate(req.body);
    if (error)
      return res.status(400).json({ message: error.details[0].message });

    const user = await userService.updateUser(id, req.body);
    res.json(user);
  } catch (error) {
    next(error);
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    await userService.deleteUser(id);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};
const serviceService = require("../services/serviceService");
const Joi = require("joi");

const serviceSchema = Joi.object({
  name: Joi.string().required(),
  categoryId: Joi.string().required(),
});

exports.createService = async (req, res, next) => {
  try {
    const { error } = serviceSchema.validate(req.body);
    if (error)
      return res.status(400).json({ message: error.details[0].message });

    const service = await serviceService.createService(req.body);
    res.status(201).json(service);
  } catch (error) {
    next(error);
  }
};

exports.updateService = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { error } = serviceSchema.validate(req.body);
    if (error)
      return res.status(400).json({ message: error.details[0].message });

    const service = await serviceService.updateService(id, req.body);
    res.json(service);
  } catch (error) {
    next(error);
  }
};

exports.deleteService = async (req, res, next) => {
  try {
    const { id } = req.params;
    await serviceService.deleteService(id);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

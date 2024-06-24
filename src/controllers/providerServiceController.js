const providerServiceService = require("../services/providerServiceService");
const Joi = require("joi");

const providerServiceSchema = Joi.object({
  name: Joi.string().required(),
  price: Joi.number().required(),
  duration: Joi.number().required(),
  description: Joi.string(),
  providerCategoryId: Joi.string().required(),
});

exports.createProviderService = async (req, res, next) => {
  try {
    const { error } = providerServiceSchema.validate(req.body);
    if (error)
      return res.status(400).json({ message: error.details[0].message });
    const providerService = await providerServiceService.createProviderService(
      req.body
    );
    res.status(201).json(providerService);
  } catch (error) {
    next(error);
  }
};

exports.updateProviderService = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { error } = providerServiceSchema.validate(req.body);
    if (error)
      return res.status(400).json({ message: error.details[0].message });
    const providerService = await providerServiceService.updateProviderService(
      id,
      req.body
    );
    if (!providerService)
      return res.status(404).json({ message: "Provider not found" });
    res.status(200).json(providerService);
  } catch (error) {
    next(error);
  }
};

exports.deleteProviderService = async (req, res, next) => {
  try {
    const { id } = req.params;
    const providerService = await providerServiceService.deleteProviderService(
      id
    );
    if (!providerService)
      return res.status(404).json({ message: "Provider not found" });
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};
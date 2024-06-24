const providerCategoryService = require("../services/providerCategoryService");
const Joi = require("joi");

const providerCategorySchema = Joi.object({
  name: Joi.string().required(),
  providerId: Joi.string().required(),
});

exports.createProviderCategory = async (req, res, next) => {
  try {
    const { error } = providerCategorySchema.validate(req.body);
    if (error)
      return res.status(400).json({ message: error.details[0].message });

    const providerCategory =
      await providerCategoryService.createProviderCategory(req.body);
    res.status(201).json(providerCategory);
  } catch (error) {
    next(error);
  }
};

exports.getProviderCategories = async (req, res, next) => {
  try {
    const { id } = req.params;
    const providerCategories =
      await providerCategoryService.getProviderCategories(id);
    if (!providerCategories)
      return res.status(404).json({ message: "Provider not found" });
    res.status(200).json(providerCategories);
  } catch (error) {
    next(error);
  }
};

exports.updateProviderCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { error } = providerCategorySchema.validate(req.body);
    if (error)
      return res.status(400).json({ message: error.details[0].message });
    const providerCategory =
      await providerCategoryService.updateProviderCategory(id, req.body);
    if (!providerCategory)
      return res.status(404).json({ message: "Provider not found" });
    res.status(200).json(providerCategory);
  } catch (error) {
    next(error);
  }
};

exports.deleteProviderCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const providerCategory =
      await providerCategoryService.deleteProviderCategory(id);
    if (!providerCategory)
      return res.status(404).json({ message: "Provider not found" });
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

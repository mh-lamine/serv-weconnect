const providerCategoryService = require("../services/providerCategoryService");

exports.createProviderCategory = async (req, res) => {
  try {
    const providerId = req.user.id;
    const providerCategory =
      await providerCategoryService.createProviderCategory(
        providerId,
        req.body
      );
    return res.status(201).json(providerCategory);
  } catch (error) {
    return res.status(error.statusCode || 500).json({ message: error.message });
  }
};

exports.getProviderCategories = async (req, res) => {
  try {
    const { id } = req.params;
    const providerCategories =
      await providerCategoryService.getProviderCategories(id);
    return res.status(200).json(providerCategories);
  } catch (error) {
    return res.status(error.statusCode || 500).json({ message: error.message });
  }
};

exports.updateProviderCategory = async (req, res) => {
  try {
    const providerId = req.user.id;
    const { categoryId } = req.params;
    const providerCategory =
      await providerCategoryService.updateProviderCategory(
        providerId,
        categoryId,
        req.body
      );
    return res.status(200).json(providerCategory);
  } catch (error) {
    return res.status(error.statusCode || 500).json({ message: error.message });
  }
};

exports.deleteProviderCategory = async (req, res) => {
  try {
    const providerId = req.user.id;
    const { categoryId } = req.params;
    await providerCategoryService.deleteProviderCategory(
      providerId,
      categoryId
    );
    return res.status(204).end();
  } catch (error) {
    return res.status(error.statusCode || 500).json({ message: error.message });
  }
};

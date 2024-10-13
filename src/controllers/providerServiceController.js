const providerServiceService = require("../services/providerServiceService");

exports.createProviderService = async (req, res) => {
  try {
    const { id, role } = req.user;
    const providerService = await providerServiceService.createProviderService(
      id,
      role,
      req.body
    );
    return res.status(201).json(providerService);
  } catch (error) {
    return res.status(error.statusCode || 500).json({ message: error.message });
  }
};

exports.updateProviderService = async (req, res) => {
  try {
    const providerId = req.user.id;
    const { serviceId } = req.params;
    const providerService = await providerServiceService.updateProviderService(
      providerId,
      serviceId,
      req.body
    );
    return res.status(200).json(providerService);
  } catch (error) {
    return res.status(error.statusCode || 500).json({ message: error.message });
  }
};

exports.deleteProviderService = async (req, res) => {
  try {
    const providerId = req.user.id;
    const { serviceId } = req.params;
    const providerService = await providerServiceService.deleteProviderService(
      providerId,
      serviceId
    );
    return res.status(204).end();
  } catch (error) {
    return res.status(error.statusCode || 500).json({ message: error.message });
  }
};

const stripeService = require("../services/stripeService");

exports.startOnboarding = async (req, res) => {
  try {
    const { id } = req.user;
    const onboardingUrl = await stripeService.startOnboarding(id);
    return res.status(201).json(onboardingUrl);
  } catch (error) {
    return res.status(error.statusCode || 500).json({ message: error.message });
  }
};

exports.createPaymentIntent = async (req, res) => {
  const { connectedAccountId, amount } = req.body;
  try {
    const { client_secret } = await stripeService.createPaymentIntent(
      connectedAccountId,
      amount
    );
    return res.status(201).json(client_secret);
  } catch (error) {
    return res.status(error.statusCode || 500).json({ message: error.message });
  }
};

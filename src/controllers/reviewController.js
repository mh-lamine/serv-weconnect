const reviewService = require("../services/reviewService");

exports.createReview = async (req, res) => {
  try {
    const clientId = req.user.id;
    const review = await reviewService.createReview(clientId, req.body);
    return res.status(201).json(review);
  } catch (error) {
    return res.status(error.statusCode || 500).json({ message: error.message });
  }
};

exports.getProviderReviews = async (req, res) => {
  try {
    const { serviceId } = req.params;
    const reviews = await reviewService.getProviderReviews(serviceId);
    return res.json(reviews);
  } catch (error) {
    return res.status(error.statusCode || 500).json({ message: error.message });
  }
};

exports.updateReview = async (req, res) => {
  try {
    const clientId = req.user.id;
    const { reviewId } = req.params;
    const review = await reviewService.updateReview(
      clientId,
      reviewId,
      req.body
    );
    return res.json(review);
  } catch (error) {
    return res.status(error.statusCode || 500).json({ message: error.message });
  }
};

exports.deleteReview = async (req, res) => {
  try {
    const clientId = req.user.id;
    const { reviewId } = req.params;
    const review = await reviewService.deleteReview(clientId, reviewId);
    return res.json(review);
  } catch (error) {
    return res.status(error.statusCode || 500).json({ message: error.message });
  }
};

const reviewService = require("../services/reviewService");
const Joi = require("joi");

const reviewSchema = Joi.object({
  rating: Joi.number().required(),
  comment: Joi.string().optional(),
  providerId: Joi.string().required(),
  clientId: Joi.string().required(),
});

exports.createReview = async (req, res, next) => {
  try {
    const { error } = reviewSchema.validate(req.body);
    if (error)
      return res.status(400).json({ message: error.details[0].message });
    const review = await reviewService.createReview(req.body);
    res.status(201).json(review);
  } catch (error) {
    next(error);
  }
};

exports.getProviderReviews = async (req, res, next) => {
  try {
    const { id } = req.params;
    const reviews = await reviewService.getProviderReviews(id);
    res.json(reviews);
  } catch (error) {
    next(error);
  }
};

exports.updateReview = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { error } = reviewSchema.validate(req.body);
    if (error)
      return res.status(400).json({ message: error.details[0].message });
    const review = await reviewService.updateReview(id, req.body);
    if (!review) return res.status(404).json({ message: "Review not found" });
    res.json(review);
  } catch (error) {
    next(error);
  }
};

exports.deleteReview = async (req, res, next) => {
  try {
    const { id } = req.params;
    const review = await reviewService.deleteReview(id);
    if (!review) return res.status(404).json({ message: "Review not found" });
    res.json(review);
  } catch (error) {
    next(error);
  }
};

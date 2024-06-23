const availabilityService = require("../services/availabilityService");
const Joi = require("joi");

const availabilitySchema = Joi.object({
  dayOfWeek: Joi.string()
    .valid(
      "MONDAY",
      "TUESDAY",
      "WEDNESDAY",
      "THURSDAY",
      "FRIDAY",
      "SATURDAY",
      "SUNDAY"
    )
    .required(),
  startTime: Joi.date().required(),
  endTime: Joi.date().required(),
  providerId: Joi.string().required(),
});

exports.createAvailability = async (req, res, next) => {
  try {
    const { error } = availabilitySchema.validate(req.body);
    if (error)
      return res.status(400).json({ message: error.details[0].message });

    const availability = await availabilityService.createAvailability(req.body);
    res.status(201).json(availability);
  } catch (error) {
    next(error);
  }
};

exports.getProviderAvailability = async (req, res, next) => {
  try {
    const { id } = req.params;
    const availability = await availabilityService.getProviderAvailability(id);
    if (!availability)
      return res.status(404).json({ message: "Provider not found" });
    res.json(availability);
  } catch (error) {
    next(error);
  }
};

exports.updateAvailability = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { error } = availabilitySchema.validate(req.body);
    if (error)
      return res.status(400).json({ message: error.details[0].message });

    const availability = await availabilityService.updateAvailability(
      id,
      req.body
    );
    res.json(availability);
  } catch (error) {
    next(error);
  }
};

exports.deleteAvailability = async (req, res, next) => {
  try {
    const { id } = req.params;
    await availabilityService.deleteAvailability(id);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

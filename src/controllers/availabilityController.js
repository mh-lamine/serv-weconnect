const availabilityService = require("../services/availabilityService");

exports.createAvailability = async (req, res) => {
  try {
    const { id } = req.user;
    const availability = await availabilityService.createAvailability(
      id,
      req.body
    );
    res.status(201).json(availability);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};

exports.getAvailableTimeSlots = async (req, res) => {
  try {
    const { id } = req.params;
    const { date, serviceDuration } = req.body;
    const availability = await availabilityService.getAvailableTimeSlots(
      id,
      date,
      serviceDuration
    );
    if (!availability)
      return res.status(404).json({ message: "No availability found" });
    res.json(availability);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};

exports.getDailyAvailabilities = async (req, res) => {
  try {
    const { id } = req.user;
    const availabilities = await availabilityService.getDailyAvailabilities(id);
    res.json(availabilities);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};

exports.updateAvailability = async (req, res) => {
  try {
    const providerId = req.user.id;
    const { availabilityId } = req.params;
    const availability = await availabilityService.updateAvailability(
      providerId,
      availabilityId,
      req.body
    );
    res.json(availability);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};

exports.deleteAvailability = async (req, res) => {
  try {
    const providerId = req.user.id;
    const { availabilityId } = req.params;
    await availabilityService.deleteAvailability(providerId, availabilityId);
    res.status(204).end();
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};

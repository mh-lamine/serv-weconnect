const availabilityService = require("../services/availabilityService");

exports.createAvailability = async (req, res) => {
  try {
    const { id } = req.user;
    const availability = await availabilityService.createAvailability(
      id,
      req.body
    );
    return res.status(201).json(availability);
  } catch (error) {
    return res.status(error.statusCode || 500).json({ message: error.message });
  }
};

exports.createSpecialAvailability = async (req, res) => {
  try {
    const { id } = req.user;
    const availability = await availabilityService.createSpecialAvailability(
      id,
      req.body
    );
    return res.status(201).json(availability);
  } catch (error) {
    return res.status(error.statusCode || 500).json({ message: error.message });
  }
}

exports.getAvailableTimeSlots = async (req, res) => {
  try {
    const { id } = req.params;
    const { date, serviceDuration } = req.body;
    const availability = await availabilityService.getAvailableTimeSlots(
      id,
      date,
      serviceDuration
    );
    return res.json(availability);
  } catch (error) {
    return res.status(error.statusCode || 500).json({ message: error.message });
  }
};

exports.getAvailabilities = async (req, res) => {
  try {
    const { id } = req.user;
    const availabilities = await availabilityService.getAvailabilities(id);
    res.json(availabilities);
  } catch (error) {
    return res.status(error.statusCode || 500).json({ message: error.message });
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
    return res.status(error.statusCode || 500).json({ message: error.message });
  }
};

exports.deleteAvailability = async (req, res) => {
  try {
    const providerId = req.user.id;
    const { availabilityId } = req.params;
    await availabilityService.deleteAvailability(providerId, availabilityId);
    return res.status(204).end();
  } catch (error) {
    return res.status(error.statusCode || 500).json({ message: error.message });
  }
};

exports.deleteSpecialAvailability = async (req, res) => { 
  try {
    const providerId = req.user.id;
    const { availabilityId } = req.params;
    await availabilityService.deleteSpecialAvailability(providerId, availabilityId);
    return res.status(204).end();
  } catch (error) {
    return res.status(error.statusCode || 500).json({ message: error.message });
  }
}

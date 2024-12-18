const availabilityService = require("../services/availabilityService");

exports.createAvailability = async (req, res) => {
  try {
    const { id, role } = req.user;
    const availability = await availabilityService.createAvailability(
      id,
      role,
      req.body
    );
    return res.status(201).json(availability);
  } catch (error) {
    return res.status(error.statusCode || 500).json({ message: error.message });
  }
};

exports.createMemberAvailability = async (req, res) => {
  try {
    const memberId = req.params.id;
    const salonId = req.user.id;
    const availability = await availabilityService.createMemberAvailability(
      memberId,
      salonId,
      req.body
    );
    return res.status(201).json(availability);
  } catch (error) {
    return res.status(error.statusCode || 500).json({ message: error.message });
  }
};

exports.createSpecialAvailability = async (req, res) => {
  try {
    const { id, role } = req.user;
    const availability = await availabilityService.createSpecialAvailability(
      id,
      role,
      req.body
    );
    return res.status(201).json(availability);
  } catch (error) {
    return res.status(error.statusCode || 500).json({ message: error.message });
  }
};

exports.createSpecialMemberAvailability = async (req, res) => {
  try {
    const memberId = req.params.id;
    const salonId = req.user.id;
    const availability =
      await availabilityService.createSpecialMemberAvailability(
        memberId,
        salonId,
        req.body
      );
    return res.status(201).json(availability);
  } catch (error) {
    return res.status(error.statusCode || 500).json({ message: error.message });
  }
};

exports.createUnavailability = async (req, res) => {
  try {
    const { id, role } = req.user;
    const unavailability = await availabilityService.createUnavailability(
      id,
      role,
      req.body
    );
    return res.status(201).json(unavailability);
  } catch (error) {
    return res.status(error.statusCode || 500).json({ message: error.message });
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
    return res.json(availability);
  } catch (error) {
    return res.status(error.statusCode || 500).json({ message: error.message });
  }
};

exports.getSalonAvailableTimeSlots = async (req, res) => {
  try {
    const { id } = req.params;
    const { date, service } = req.body;
    const availability = await availabilityService.getSalonAvailableTimeSlots(
      id,
      date,
      service
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

exports.getMemberAvailabilities = async (req, res) => {
  try {
    const memberId = req.params.id;
    const availabilities = await availabilityService.getMemberAvailabilities(
      memberId
    );
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
    const { id } = req.user;
    const { availabilityId } = req.params;
    await availabilityService.deleteAvailability(id, availabilityId);
    return res.status(204).end();
  } catch (error) {
    return res.status(error.statusCode || 500).json({ message: error.message });
  }
};

exports.deleteSpecialAvailability = async (req, res) => {
  try {
    const providerId = req.user.id;
    const { availabilityId } = req.params;
    await availabilityService.deleteSpecialAvailability(
      providerId,
      availabilityId
    );
    return res.status(204).end();
  } catch (error) {
    return res.status(error.statusCode || 500).json({ message: error.message });
  }
};

exports.deleteUnavailability = async (req, res) => {
  try {
    const { id } = req.user;
    const { unavailabilityId } = req.params;
    await availabilityService.deleteUnavailability(id, unavailabilityId);
    return res.status(204).end();
  } catch (error) {
    return res.status(error.statusCode || 500).json({ message: error.message });
  }
}

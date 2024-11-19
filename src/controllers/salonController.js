const salonService = require("../services/salonService");

exports.getSalon = async (req, res) => {
  try {
    const { id } = req.user;
    const salon = await salonService.getSalon(id);
    return res.json(salon);
  } catch (error) {
    return res.status(error.statusCode || 500).json({ message: error.message });
  }
};

exports.getMembers = async (req, res) => {
  try {
    const { id } = req.user;
    const members = await salonService.getMembers(id);
    return res.json(members);
  } catch (error) {
    return res.status(error.statusCode || 500).json({ message: error.message });
  }
};

exports.getMember = async (req, res) => {
  try {
    const { id } = req.user;
    const member = await salonService.getMember(id, req.params.id);
    return res.json(member);
  } catch (error) {
    return res.status(error.statusCode || 500).json({ message: error.message });
  }
};

exports.updateMember = async (req, res) => {
  try {
    const { id } = req.user;
    const member = await salonService.updateMember(id, req.params.id, req.body);
    return res.json(member);
  } catch (error) {
    return res.status(error.statusCode || 500).json({ message: error.message });
  }
};

exports.addMember = async (req, res) => {
  try {
    const { id } = req.user;
    const salon = await salonService.addMember(id, req.body);
    return res.json(salon);
  } catch (error) {
    return res.status(error.statusCode || 500).json({ message: error.message });
  }
};

exports.updateSalon = async (req, res) => {
  try {
    const { id } = req.user;
    const salon = await salonService.updateSalon(id, req.body);
    return res.json(salon);
  } catch (error) {
    return res.status(error.statusCode || 500).json({ message: error.message });
  }
};

exports.assignServices = async (req, res) => {
  try {
    const salonId = req.user.id;
    const memberId = req.params.id;
    const member = await salonService.assignServices(
      salonId,
      memberId,
      req.body
    );
    return res.json(member);
  } catch (error) {
    return res.status(error.statusCode || 500).json({ message: error.message });
  }
};

exports.removeMember = async (req, res) => {
  try {
    const salonId = req.user.id;
    const memberId = req.params.id;
    await salonService.removeMember(salonId, memberId);
    return res.status(204).end();
  } catch (error) {
    return res.status(error.statusCode || 500).json({ message: error.message });
  }
};

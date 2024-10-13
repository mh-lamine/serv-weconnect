const appointmentService = require("../services/appointmentService");

exports.createAppointment = async (req, res) => {
  try {
    const data = req.body;
    const { id } = req.user;
    const appointment = await appointmentService.createAppointment(data, id);
    return res.status(201).json(appointment);
  } catch (error) {
    return res.status(error.statusCode || 500).json({ message: error.message });
  }
};

exports.getAppointmentsAsClient = async (req, res) => {
  try {
    const { id } = req.user;
    const appointments = await appointmentService.getAppointmentsAsClient(id);
    return res.status(201).json(appointments);
  } catch (error) {
    return res.status(error.statusCode || 500).json({ message: error.message });
  }
};

exports.getAppointmentsAsProvider = async (req, res) => {
  try {
    const { id } = req.user;
    const appointments = await appointmentService.getAppointmentsAsProvider(id);
    return res.status(201).json(appointments);
  } catch (error) {
    return res.status(error.statusCode || 500).json({ message: error.message });
  }
};

exports.updateAppointment = async (req, res) => {
  try {
    const userId = req.user.id;
    const { appointmentId } = req.params;
    const appointment = await appointmentService.updateAppointment(
      userId,
      appointmentId,
      req.body
    );
    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }
    return res.json(appointment);
  } catch (error) {
    return res.status(error.statusCode || 500).json({ message: error.message });
  }
};

exports.deleteAppointment = async (req, res) => {
  try {
    const userId = req.user.id;
    const { appointmentId } = req.params;
    await appointmentService.deleteAppointment(userId, appointmentId);
    return res.status(204).end();
  } catch (error) {
    return res.status(error.statusCode || 500).json({ message: error.message });
  }
};

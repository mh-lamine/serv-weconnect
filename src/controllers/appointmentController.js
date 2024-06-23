const appointmentService = require("../services/appointmentService");
const Joi = require("joi");

const appointmentSchema = Joi.object({
  date: Joi.date(),
  status: Joi.string().valid(
    "PENDING",
    "ACCEPTED",
    "REJECTED",
    "CANCELLED",
    "COMPLETED"
  ),
  providerId: Joi.string(),
  clientId: Joi.string(),
}).or("date", "status", "providerId", "clientId");

exports.createAppointment = async (req, res, next) => {
  try {
    const { error } = appointmentSchema.validate(req.body);
    if (error)
      return res.status(400).json({ message: error.details[0].message });

    const appointment = await appointmentService.createAppointment(req.body);
    res.status(201).json(appointment);
  } catch (error) {
    next(error);
  }
};

exports.getAppointmentsAsClient = async (req, res, next) => {
  try {
    const { id } = req.params;
    const appointments = await appointmentService.getAppointmentsAsClient(id);
    res.json(appointments);
  } catch (error) {
    next(error);
  }
};

exports.getAppointmentsAsProvider = async (req, res, next) => {
  try {
    const { id } = req.params;
    const appointments = await appointmentService.getAppointmentsAsProvider(id);
    res.json(appointments);
  } catch (error) {
    next(error);
  }
};

exports.updateAppointment = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { error } = appointmentSchema.validate(req.body, {
      allowUnknown: true,
      stripUnknown: true,
    });
    if (error)
      return res.status(400).json({ message: error.details[0].message });

    const appointment = await appointmentService.updateAppointment(
      id,
      req.body
    );
    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }
    res.json(appointment);
  } catch (error) {
    next(error);
  }
};

exports.deleteAppointment = async (req, res, next) => {
  try {
    const { id } = req.params;
    await appointmentService.deleteAppointment(id);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

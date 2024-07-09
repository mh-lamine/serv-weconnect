const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { DateTime } = require("luxon");

exports.createAppointment = async (data) => {
  const { date, providerId } = data;


  const existingAppointment = await prisma.appointment.findFirst({
    where: {
      date,
      providerId,
    },
  });

  if (existingAppointment) {
    const error = new Error("Time slot already booked");
    error.statusCode = 409;
    throw error;
  }

  return await prisma.appointment.create({ data });
};

exports.getAppointmentsAsClient = async (id) => {
  const appointments = await prisma.appointment.findMany({
    where: { clientId: id },
    include: {
      provider: true,
      service: true,
    },
  });
  return appointments;
};

exports.getAppointmentsAsProvider = async (id) => {
  const appointments = await prisma.appointment.findMany({
    where: { providerId: id },
    include: {
      client: true,
      service: true,
    },
  });
  return appointments;
};

exports.updateAppointment = async (id, data) => {
  try {
    const appointment = await prisma.appointment.update({
      where: { id },
      data,
    });
    return appointment;
  } catch (error) {
    if (error.code === "P2025") {
      return null;
    }
    throw error;
  }
};

exports.deleteAppointment = async (id) => {
  return await prisma.appointment.delete({ where: { id } });
};

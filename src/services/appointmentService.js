const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.createAppointment = async (data, userId) => {
  const { date, providerId, clientId } = data;

  // Authorization check: Ensure userId matches providerId or implement your own logic
  if (userId !== providerId || userId !== clientId) {
    const error = new Error("Unauthorized to create appointment");
    error.statusCode = 403; // Forbidden
    throw error;
  }

  const existingAppointment = await prisma.appointment.findFirst({
    where: {
      date,
      OR: [{ clientId: userId }, { providerId: userId }],
    },
  });

  if (existingAppointment) {
    const error = new Error("Time slot already booked");
    error.statusCode = 409; // Conflict
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

exports.updateAppointment = async (userId, appointmentId, data) => {
  try {
    const appointment = await prisma.appointment.update({
      where: {
        id: appointmentId,
        OR: [{ clientId: userId }, { providerId: userId }],
      },
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

exports.deleteAppointment = async (userId, appointmentId) => {
  try {
    await prisma.appointment.delete({
      where: {
        id: appointmentId,
        OR: [{ clientId: userId }, { providerId: userId }],
      },
    });
  } catch (error) {
    if (error.code === "P2025") {
      return null;
    }
    throw error;
  }
};

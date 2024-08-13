const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.createAppointment = async (data, userId) => {
  if (!userId) {
    const error = new Error("Unauthorized to create appointment");
    error.statusCode = 403; // Forbidden
    throw error;
  }
  return await prisma.appointment.create({
    data: { ...data, clientId: userId },
  });
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

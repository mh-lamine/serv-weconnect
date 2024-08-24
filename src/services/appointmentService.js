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
  const futureAppointments = await prisma.appointment.findMany({
    where: {
      clientId: id,
      status: {
        in: ["PENDING", "ACCEPTED"],
      },
    },
    include: {
      provider: true,
      service: true,
    },
  });

  const pastAppointments = await prisma.appointment.findMany({
    where: {
      clientId: id,
      status: {
        in: ["CANCELLED", "COMPLETED"],
      },
    },
    include: {
      provider: true,
      service: true,
    },
  });

  return { futureAppointments, pastAppointments };
};

exports.getAppointmentsAsProvider = async (id) => {
  const futureAppointments = await prisma.appointment.findMany({
    where: {
      providerId: id,
      status: {
        in: ["PENDING", "ACCEPTED"],
      },
    },
    include: {
      client: true,
      service: true,
    },
  });

  const pastAppointments = await prisma.appointment.findMany({
    where: {
      providerId: id,
      status: {
        in: ["CANCELLED", "COMPLETED"],
      },
    },
    include: {
      client: true,
      service: true,
    },
  });

  return { futureAppointments, pastAppointments };
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

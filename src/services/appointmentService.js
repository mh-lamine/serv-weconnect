const { DateTime } = require("luxon");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const {
  updateAppointmentsStatuses,
  sendSMS,
} = require("../utils/businessLogic");

exports.createAppointment = async (data, userId) => {
  if (!userId) {
    const error = new Error("Unauthorized to create appointment");
    error.statusCode = 403; // Forbidden
    throw error;
  }
  try {
    const { phoneNumber } = await prisma.user.findUnique({
      where: { id: data.providerId },
    });
    await prisma.appointment.create({
      data: { ...data, clientId: userId },
    });
    sendSMS(
      phoneNumber,
      `Vous avez une nouvelle demande de rendez-vous sur WeConnect 🎉👑\n
Connectez-vous pour voir les détails.
https://pro.weconnect-rdv.fr`
    );
  } catch (error) {
    return error;
  }
};

exports.getAppointmentsAsClient = async (id) => {
  const now = DateTime.now().toISO();
  const futureAppointments = await prisma.appointment.findMany({
    where: {
      clientId: id,
      status: {
        in: ["PENDING", "ACCEPTED"],
      },
      date: { gt: now },
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
      date: { lt: now },
    },
    include: {
      provider: true,
      service: true,
    },
    orderBy: {
      date: "desc",
    },
    take: 5,
  });

  return { futureAppointments, pastAppointments };
};

exports.getAppointmentsAsProvider = async (id) => {
  const now = DateTime.now().toISO();

  await updateAppointmentsStatuses(id);

  const startOfDay = DateTime.local().startOf("day");
  const endOfDay = startOfDay.plus({ days: 1 });

  const futureAppointments = await prisma.appointment.findMany({
    where: {
      providerId: id,
      status: {
        in: ["PENDING", "ACCEPTED"],
      },
      date: {
        gte: endOfDay.toISO(),
      },
    },
    include: {
      client: true,
      service: true,
    },
  });

  const today = DateTime.now().toISODate();
  const todaysAppointments = await prisma.appointment.findMany({
    where: {
      providerId: id,
      date: {
        startsWith: today,
      },
      status: {
        in: ["ACCEPTED", "COMPLETED"],
      },
    },
    include: {
      client: true,
      service: true,
    },
  });

  const missedAppointments = await prisma.appointment.findMany({
    where: {
      providerId: id,
      date: { lt: now },
      status: "PENDING",
    },
    include: {
      client: true,
      service: true,
    },
  });

  return { futureAppointments, todaysAppointments, missedAppointments };
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
    if (data.status === "ACCEPTED" || data.status === "CANCELLED") {
      const { phoneNumber } = await prisma.user.findUnique({
        where: { id: appointment.clientId },
      });
      const formattedDate = DateTime.fromISO(appointment.date).toLocaleString(
        DateTime.DATE_MED
      );
      const formattedTime = DateTime.fromISO(appointment.date).toLocaleString(
        DateTime.TIME_SIMPLE
      );
      const message = `Votre rendez-vous du ${formattedDate} à ${formattedTime} a été ${
        data.status === "ACCEPTED" ? "accepté" : "annulé"
      }.\nConnectez-vous pour voir les détails.\n
      https://www.weconnect-rdv.fr`;
      sendSMS(phoneNumber, message);
    }
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

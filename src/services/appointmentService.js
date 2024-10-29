const { DateTime } = require("luxon");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const {
  updateAppointmentsStatuses,
  sendSMS,
} = require("../utils/businessLogic");

exports.createAppointment = async (data, clientId) => {
  if (!clientId) {
    const error = new Error("Unauthorized to create appointment");
    error.statusCode = 403; // Forbidden
    throw error;
  }

  try {
    await prisma.appointment.create({
      data: { ...data, clientId },
    });
    if (data.providerId) {
      const { phoneNumber } = await prisma.user.findUnique({
        where: { id: data.providerId },
      });
      sendSMS(
        phoneNumber,
        `Vous avez une nouvelle demande de rendez-vous sur WeConnect 🎉👑\n
Connectez-vous pour voir les détails.
https://pro.weconnect-rdv.fr`
      );
      return;
    }
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
      salon: true,
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
      salon: true,
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
      OR: [{ salonId: id }, { providerId: id }],
      status: {
        in: ["PENDING", "ACCEPTED"],
      },
      date: {
        gte: now,
      },
    },
    include: {
      client: true,
      service: true,
      member: true,
    },
  });

  const today = DateTime.now().toISODate();
  const todaysAppointments = await prisma.appointment.findMany({
    where: {
      OR: [{ salonId: id }, { providerId: id }],
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
      member: true,
    },
  });

  const missedAppointments = await prisma.appointment.findMany({
    where: {
      OR: [{ salonId: id }, { providerId: id }],
      date: { lt: now },
      status: "PENDING",
    },
    include: {
      client: true,
      service: true,
      member: true,
    },
  });

  return { futureAppointments, todaysAppointments, missedAppointments };
};

exports.updateAppointment = async (userId, appointmentId, data) => {
  try {
    const appointment = await prisma.appointment.update({
      where: {
        id: appointmentId,
        OR: [{ clientId: userId }, { providerId: userId }, { salonId: userId }],
      },
      data,
    });
    if (data.status === "ACCEPTED" || data.status === "CANCELLED") {
      const { phoneNumber } = await prisma.user.findUnique({
        where: { id: appointment.clientId },
      });
      const formattedDate = DateTime.fromISO(appointment.date)
        .setLocale("fr")
        .toLocaleString(DateTime.DATE_MED);
      const formattedTime = DateTime.fromISO(appointment.date)
        .setLocale("fr")
        .toLocaleString(DateTime.TIME_SIMPLE);
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
        OR: [{ clientId: userId }, { providerId: userId }, { salonId: userId }],
      },
    });
  } catch (error) {
    if (error.code === "P2025") {
      return null;
    }
    throw error;
  }
};

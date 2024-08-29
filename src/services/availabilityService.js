const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { DateTime } = require("luxon");
const {
  generateAvailableRanges,
  generateTimeSlots,
} = require("../utils/businessLogic");

exports.createAvailability = async (id, data) => {
  try {
    await prisma.availability.create({
      data: {
        ...data,
        providerId: id,
      },
    });
    return "Availability created successfully";
  } catch (error) {
    return error.message;
  }
};

exports.getAvailableTimeSlots = async (id, date, serviceDuration) => {
  const dateTime = DateTime.fromISO(date).setLocale("en");
  const dayOfWeek = dateTime.weekdayLong.toUpperCase();

  const availabilities = await prisma.availability.findMany({
    where: {
      providerId: id,
      dayOfWeek,
    },
  });

  const appointments = await prisma.appointment.findMany({
    where: {
      status: {
        in: ["PENDING", "ACCEPTED"],
      },
      providerId: id,
      date: {
        startsWith: dateTime.toISODate(),
      },
    },
  });

  let availableSlots = [];
  availabilities.sort((a, b) => {
    return a.startTime.localeCompare(b.startTime);
  });
  availabilities.forEach((availability) => {
    const availableRanges = generateAvailableRanges(availability, appointments);
    availableRanges.forEach((range) => {
      availableSlots = availableSlots.concat(
        generateTimeSlots(range.start, range.end, serviceDuration, date)
      );
    });
  });

  return availableSlots;
};

exports.getAvailabilities = async (id) => {
  return await prisma.availability.findMany({
    where: { providerId: id },
  });
};

exports.updateAvailability = async (providerId, availabilityId, data) => {
  try {
    await prisma.availability.update({
      where: {
        id: availabilityId,
        providerId,
      },
      data,
    });
  } catch (error) {
    throw new Error("Unauthorized");
  }
};

exports.deleteAvailability = async (providerId, availabilityId) => {
  try {
    await prisma.availability.delete({
      where: {
        id: availabilityId,
        providerId,
      },
    });
  } catch (error) {
    throw new Error("Unauthorized");
  }
};

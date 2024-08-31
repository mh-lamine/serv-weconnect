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

exports.createSpecialAvailability = async (id, data) => {
  try {
    await prisma.specialAvailability.create({
      data: {
        ...data,
        providerId: id,
      },
    });
    return "Special availability created successfully";
  } catch (error) {
    return error.message;
  }
}

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
  const [availabilities, specialAvailabilities] = await prisma.$transaction([
    prisma.availability.findMany({
      where: { providerId: id },
    }),
    prisma.specialAvailability.findMany({
      where: { providerId: id },
    }),
  ]);

  return { availabilities, specialAvailabilities };

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

exports.deleteSpecialAvailability = async (providerId, availabilityId) => {
  try {
    await prisma.specialAvailability.delete({
      where: {
        id: availabilityId,
        providerId,
      },
    });
  } catch (error) {
    throw new Error("Unauthorized");
  }
};

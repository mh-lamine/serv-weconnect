const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { DateTime } = require("luxon");
const { generateAvailableRanges, generateTimeSlots } = require("../businessLogic");

exports.createAvailability = async (data) => {
  return await prisma.availability.create({ data });
};

exports.getProviderAvailabilities = async (id, date, serviceDuration) => {
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
      providerId: id,
      date: {
        startsWith: dateTime.toISODate(),
      },
    },
  });

  let availableSlots = [];
  availabilities.forEach((availability) => {
    const availableRanges = generateAvailableRanges(
      availability,
      appointments
    );
    availableRanges.forEach((range) => {
      availableSlots = availableSlots.concat(
        generateTimeSlots(range.start, range.end, serviceDuration, date)
      );
    });
  });

  return availableSlots;
};

exports.updateAvailability = async (id, data) => {
  return await prisma.availability.update({ where: { id }, data });
};

exports.deleteAvailability = async (id) => {
  return await prisma.availability.delete({ where: { id } });
};

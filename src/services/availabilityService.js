const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { DateTime } = require("luxon");
const {
  generateAvailableRanges,
  generateTimeSlots,
} = require("../utils/businessLogic");

exports.createAvailability = async (id, role, data) => {
  const ref = role === "USER" ? "providerId" : "SALON" ? "salonId" : null;
  const overlappingAvailability = await prisma.availability.findFirst({
    where: {
      [ref]: id,
      dayOfWeek: data.dayOfWeek,
      OR: [
        {
          startTime: {
            lte: data.endTime,
          },
          endTime: {
            gte: data.startTime,
          },
        },
        {
          startTime: {
            gte: data.startTime,
            lte: data.endTime,
          },
          endTime: {
            gte: data.startTime,
            lte: data.endTime,
          },
        },
      ],
    },
  });

  if (overlappingAvailability) {
    const error = new Error("Unauthorized to create appointment");
    error.statusCode = 401; // Unauthorized
    throw error;
  }

  await prisma.availability.create({
    data: {
      ...data,
      [ref]: id,
    },
  });

  return "Disponibilité créée avec succès";
};

exports.createMemberAvailability = async (memberId, data) => {
  const overlappingAvailability = await prisma.availability.findFirst({
    where: {
      memberId,
      dayOfWeek: data.dayOfWeek,
      OR: [
        {
          startTime: {
            lte: data.endTime,
          },
          endTime: {
            gte: data.startTime,
          },
        },
        {
          startTime: {
            gte: data.startTime,
            lte: data.endTime,
          },
          endTime: {
            gte: data.startTime,
            lte: data.endTime,
          },
        },
      ],
    },
  });

  if (overlappingAvailability) {
    const error = new Error("Unauthorized to create appointment");
    error.statusCode = 401; // Unauthorized
    throw error;
  }

  await prisma.availability.create({
    data: {
      ...data,
      memberId,
    },
  });

  return "Disponibilité créée avec succès";
};

exports.createSpecialAvailability = async (id, role, data) => {
  const ref = role === "USER" ? "providerId" : "SALON" ? "salonId" : null;
  const overlappingSpecialAvailability =
    await prisma.specialAvailability.findFirst({
      where: {
        [ref]: id,
        date: data.date,
        OR: [
          {
            startTime: {
              lte: data.endTime,
            },
            endTime: {
              gte: data.startTime,
            },
          },
          {
            startTime: {
              gte: data.startTime,
              lte: data.endTime,
            },
            endTime: {
              gte: data.startTime,
              lte: data.endTime,
            },
          },
        ],
      },
    });

  if (overlappingSpecialAvailability) {
    const error = new Error("Unauthorized to create appointment");
    error.statusCode = 401; // Unauthorized
    throw error;
  }

  await prisma.specialAvailability.create({
    data: {
      ...data,
      [ref]: id,
    },
  });

  return "Disponibilité spéciale créée avec succès";
};

exports.createSpecialMemberAvailability = async (memberId, data) => {
  const overlappingSpecialAvailability =
    await prisma.specialAvailability.findFirst({
      where: {
        memberId,
        date: data.date,
        OR: [
          {
            startTime: {
              lte: data.endTime,
            },
            endTime: {
              gte: data.startTime,
            },
          },
          {
            startTime: {
              gte: data.startTime,
              lte: data.endTime,
            },
            endTime: {
              gte: data.startTime,
              lte: data.endTime,
            },
          },
        ],
      },
    });

  if (overlappingSpecialAvailability) {
    const error = new Error("Unauthorized to create appointment");
    error.statusCode = 401; // Unauthorized
    throw error;
  }

  await prisma.specialAvailability.create({
    data: {
      ...data,
      memberId,
    },
  });

  return "Disponibilité spéciale créée avec succès";
};

exports.getAvailableTimeSlots = async (id, date, serviceDuration) => {
  const dateTime = DateTime.fromISO(date).setLocale("en");
  const dayOfWeek = dateTime.weekdayLong.toUpperCase();

  const specialDayAvailabilities = await prisma.specialAvailability.findMany({
    where: {
      OR: [{ providerId: id }, { salonId: id }],
      date: dateTime.toISODate(),
    },
  });

  const availabilities =
    specialDayAvailabilities.length > 0
      ? specialDayAvailabilities
      : await prisma.availability.findMany({
          where: {
            OR: [{ providerId: id }, { salonId: id }],
            dayOfWeek,
          },
        });

  const appointments = await prisma.appointment.findMany({
    where: {
      status: {
        in: ["PENDING", "ACCEPTED"],
      },
      OR: [{ providerId: id }, { salonId: id }],
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
      where: {
        OR: [{ providerId: id }, { salonId: id }],
      },
    }),
    prisma.specialAvailability.findMany({
      where: {
        OR: [{ providerId: id }, { salonId: id }],
        date: {
          gte: DateTime.now().toISODate(),
        },
      },
    }),
  ]);

  return { availabilities, specialAvailabilities };
};

exports.getMemberAvailabilities = async (memberId) => {
  try {
    const [availabilities, specialAvailabilities] = await prisma.$transaction([
      prisma.availability.findMany({
        where: {
          memberId,
        },
      }),
      prisma.specialAvailability.findMany({
        where: {
          memberId,
          date: {
            gte: DateTime.now().toISODate(),
          },
        },
      }),
    ]);
    return { availabilities, specialAvailabilities };
  } catch (error) {
    console.log(error);
  }
};

exports.updateAvailability = async (id, availabilityId, data) => {
  try {
    await prisma.availability.update({
      where: {
        id: availabilityId,
        OR: [{ providerId: id }, { salonId: id }],
      },
      data,
    });
  } catch (error) {
    throw new Error("Unauthorized");
  }
};

exports.deleteAvailability = async (id, availabilityId) => {
  try {
    await prisma.availability.delete({
      where: {
        id: availabilityId,
        OR: [{ providerId: id }, { salonId: id }],
      },
    });
  } catch (error) {
    throw new Error("Unauthorized");
  }
};

exports.deleteSpecialAvailability = async (id, availabilityId) => {
  try {
    await prisma.specialAvailability.delete({
      where: {
        id: availabilityId,
        OR: [{ providerId: id }, { salonId: id }],
      },
    });
  } catch (error) {
    throw new Error("Unauthorized");
  }
};

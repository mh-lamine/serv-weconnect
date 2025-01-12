const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { DateTime } = require("luxon");
const {
  generateAvailableRanges,
  generateTimeSlots,
  adjustAvailableRangesWithUnavailability,
} = require("../utils/businessLogic");

exports.createAvailability = async (id, role, data) => {
  const ref = role === "PRO" ? "proId" : "SALON" ? "salonId" : null;
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

exports.createMemberAvailability = async (memberId, salonId, data) => {
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
      salonId,
    },
  });

  return "Disponibilité créée avec succès";
};

exports.createSpecialAvailability = async (id, role, data) => {
  const ref = role === "PRO" ? "proId" : "SALON" ? "salonId" : null;
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

exports.createSpecialMemberAvailability = async (memberId, salonId, data) => {
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
      salonId,
    },
  });

  return "Disponibilité spéciale créée avec succès";
};

exports.createUnavailability = async (id, role, data) => {
  const ref = role === "PRO" ? "proId" : "SALON" ? "salonId" : null;
  const overlappingUnavailability = await prisma.unavailability.findFirst({
    where: {
      [ref]: id,
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

  if (overlappingUnavailability) {
    const error = new Error("Unauthorized to create appointment");
    error.statusCode = 401; // Unauthorized
    throw error;
  }

  await prisma.unavailability.create({
    data: {
      ...data,
      [ref]: id,
    },
  });

  return "Indisponibilité créée avec succès";
};

exports.getAvailableTimeSlots = async (id, date, serviceDuration) => {
  const dateTime = DateTime.fromISO(date).setLocale("en");
  const dayOfWeek = dateTime.weekdayLong.toUpperCase();

  const specialDayAvailabilities = await prisma.specialAvailability.findMany({
    where: {
      proId: id,
      date: dateTime.toISODate(),
    },
  });

  const availabilities =
    specialDayAvailabilities.length > 0
      ? specialDayAvailabilities
      : await prisma.availability.findMany({
          where: {
            proId: id,
            dayOfWeek,
          },
        });

  const appointments = await prisma.appointment.findMany({
    where: {
      status: {
        in: ["PENDING", "ACCEPTED"],
      },
      proId: id,
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

exports.getSalonAvailableTimeSlots = async (salonId, date, service) => {
  const dateTime = DateTime.fromISO(date).setLocale("en");
  const dayOfWeek = dateTime.weekdayLong.toUpperCase();
  const { id: serviceId, duration: serviceDuration } = service;

  // Récupération des membres du salon
  const salonMembers = await prisma.member.findMany({
    where: {
      salonId: salonId,
      services: {
        some: {
          id: serviceId,
        },
      },
    },
    include: {
      availabilities: {
        where: { dayOfWeek },
      },
      specialAvailabilities: {
        where: { date: dateTime.toISODate() },
      },
      appointments: {
        where: {
          status: { in: ["PENDING", "ACCEPTED"] },
          date: { startsWith: dateTime.toISODate() },
        },
      },
    },
  });

  const unavailabilities = await prisma.unavailability.findMany({
    where: {
      salonId,
      date,
    },
  });

  // Parcours de chaque membre pour récupérer les créneaux disponibles
  let salonAvailableSlots = [];

  salonMembers.forEach((member) => {
    const availabilities =
      member.specialAvailabilities.length > 0
        ? member.specialAvailabilities
        : member.availabilities;

    // Trier les disponibilités par heure de début
    availabilities.sort((a, b) => a.startTime.localeCompare(b.startTime));

    // Générer les créneaux disponibles en excluant les rendez-vous déjà pris
    let memberSlots = [];
    availabilities.forEach((availability) => {
      const availableRanges = generateAvailableRanges(
        availability,
        member.appointments
      );

      const adjustedRanges = adjustAvailableRangesWithUnavailability(
        availableRanges,
        unavailabilities
      );

      adjustedRanges.forEach((range) => {
        memberSlots = memberSlots.concat(
          generateTimeSlots(range.start, range.end, serviceDuration, date)
        );
      });
    });

    // Ajouter les créneaux de chaque membre au tableau du salon
    salonAvailableSlots.push({
      memberId: member.id,
      memberName: `${member.firstName} ${member.lastName}`,
      availableSlots: memberSlots,
    });
  });

  return salonAvailableSlots;
};

exports.getAvailabilities = async (id) => {
  const [availabilities, specialAvailabilities, unavailabilities] =
    await prisma.$transaction([
      prisma.availability.findMany({
        where: {
          OR: [{ proId: id }, { salonId: id }],
        },
        orderBy: [
          {
            startTime: "asc",
          },
        ],
      }),
      prisma.specialAvailability.findMany({
        where: {
          OR: [{ proId: id }, { salonId: id }],
          date: {
            gte: DateTime.now().toISODate(),
          },
        },
        orderBy: [
          {
            startTime: "asc",
          },
        ],
      }),
      prisma.unavailability.findMany({
        where: {
          OR: [{ proId: id }, { salonId: id }],
          date: {
            gte: DateTime.now().toISOTime(),
          },
        },
        orderBy: [
          {
            startTime: "asc",
          },
        ],
      }),
    ]);

  return { availabilities, specialAvailabilities, unavailabilities };
};

exports.getMemberAvailabilities = async (memberId) => {
  try {
    const [availabilities, specialAvailabilities] = await prisma.$transaction([
      prisma.availability.findMany({
        where: {
          memberId,
        },
        orderBy: [
          {
            startTime: "asc",
          },
        ],
      }),
      prisma.specialAvailability.findMany({
        where: {
          memberId,
          date: {
            gte: DateTime.now().toISODate(),
          },
        },
        orderBy: [
          {
            startTime: "asc",
          },
        ],
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
        OR: [{ proId: id }, { salonId: id }],
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
        OR: [{ proId: id }, { salonId: id }],
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
        OR: [{ proId: id }, { salonId: id }],
      },
    });
  } catch (error) {
    throw new Error("Unauthorized");
  }
};

exports.deleteUnavailability = async (id, unavailabilityId) => {
  try {
    await prisma.unavailability.delete({
      where: {
        id: unavailabilityId,
        OR: [{ proId: id }, { salonId: id }],
      },
    });
  } catch (error) {
    throw new Error("Unauthorized");
  }
};

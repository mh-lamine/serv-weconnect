const { DateTime } = require("luxon");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.generateAvailableRanges = (availability, appointments) => {
  const availableRanges = [];
  let availabilityStartTime = DateTime.fromISO(
    availability.startTime
  ).toISOTime();
  let availabilityEndTime = DateTime.fromISO(availability.endTime).toISOTime();

  appointments.sort((a, b) => {
    return DateTime.fromISO(a.date) - DateTime.fromISO(b.date);
  });

  appointments.forEach((appointment) => {
    const appointmentStartTime = DateTime.fromISO(appointment.date).toISOTime();
    const appointmentEndTime = DateTime.fromISO(appointment.date)
      .plus({
        minutes: appointment.duration,
      })
      .toISOTime();

    const isAppointmentInAvailabilityRange =
      appointmentStartTime >= availabilityStartTime &&
      appointmentEndTime <= availabilityEndTime;

    if (!isAppointmentInAvailabilityRange) {
      return;
    }

    if (appointmentStartTime > availabilityStartTime) {
      availableRanges.push({
        start: availabilityStartTime,
        end: appointmentStartTime,
      });
    }
    availabilityStartTime = appointmentEndTime;
  });

  if (availabilityStartTime < availabilityEndTime) {
    availableRanges.push({
      start: availabilityStartTime,
      end: availabilityEndTime,
    });
  }

  return availableRanges;
};

exports.generateTimeSlots = (
  slotStartTime,
  slotEndTime,
  serviceDuration,
  todaysDate
) => {
  const timeSlots = [];
  let currentSlotStart = DateTime.fromISO(slotStartTime).toISOTime();
  let currentSlotEnd = DateTime.fromISO(slotStartTime)
    .plus({
      minutes: serviceDuration,
    })
    .toISOTime();
  const slotEnd = DateTime.fromISO(slotEndTime).toISOTime();

  const isFutureSlot = (slotStart) =>
    DateTime.now().toISODate() !== DateTime.fromISO(todaysDate).toISODate()
      ? true
      : DateTime.now().toISO() < DateTime.fromISO(slotStart).toISO();

  while (currentSlotEnd <= slotEnd) {
    if (isFutureSlot(currentSlotStart)) {
      timeSlots.push({
        start: DateTime.fromISO(currentSlotStart).toLocaleString(
          DateTime.TIME_24_SIMPLE
        ),
        end: DateTime.fromISO(currentSlotEnd).toLocaleString(
          DateTime.TIME_24_SIMPLE
        ),
      });
    }
    currentSlotStart = currentSlotEnd;
    currentSlotEnd = DateTime.fromISO(currentSlotStart)
      .plus({
        minutes: serviceDuration,
      })
      .toISOTime();

    if (currentSlotStart >= slotEnd) {
      break;
    }
  }

  return timeSlots;
};

exports.updateAppointmentsStatuses = async (id) => {
  const now = DateTime.now().toISO();

  const ongoingAppointments = await prisma.appointment.findMany({
    where: {
      OR: [{ clientId: id }, { providerId: id }],
      status: "ACCEPTED",
      date: {
        lte: now,
      },
    },
  });

  for (const appointment of ongoingAppointments) {
    const endTime = DateTime.fromISO(appointment.date)
      .plus({ minutes: appointment.duration })
      .toISO();
    if (DateTime.now() > DateTime.fromISO(endTime)) {
      await prisma.appointment.update({
        where: { id: appointment.id },
        data: { status: "COMPLETED" },
      });
    }
  }
};

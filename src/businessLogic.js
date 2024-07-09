const { DateTime } = require("luxon");

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

exports.generateTimeSlots = (slotStartTime, slotEndTime, serviceDuration) => {
  const timeSlots = [];
  let currentSlotStart = DateTime.fromISO(slotStartTime).toISOTime();
  let currentSlotEnd = DateTime.fromISO(slotStartTime).plus({
    minutes: serviceDuration,
  }).toISOTime();
  const slotEnd = DateTime.fromISO(slotEndTime).toISOTime();

  while (currentSlotEnd <= slotEnd) {
    timeSlots.push({
      start: DateTime.fromISO(currentSlotStart).toLocaleString(DateTime.TIME_SIMPLE),
      end: DateTime.fromISO(currentSlotEnd).toLocaleString(DateTime.TIME_SIMPLE),
    });

    currentSlotStart = currentSlotEnd;
    currentSlotEnd = DateTime.fromISO(currentSlotStart).plus({
      minutes: serviceDuration,
    }).toISOTime();
  }

  return timeSlots;
};
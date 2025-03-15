const { DateTime } = require("luxon");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const { PublishCommand, SNSClient } = require("@aws-sdk/client-sns");

function formatPhoneNumberToFrance(phoneNumber) {
  if (phoneNumber.startsWith("0")) {
    return "+33" + phoneNumber.slice(1);
  }
  return phoneNumber;
}

const snsClient = new SNSClient({
  region: "eu-west-3",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

exports.sendSMS = async (phoneNumber, message) => {
  const formattedPhoneNumber = formatPhoneNumberToFrance(phoneNumber);

  const params = {
    Message: message,
    PhoneNumber: formattedPhoneNumber,
  };

  try {
    const command = new PublishCommand(params);
    await snsClient.send(command);
    console.log(`SMS sent to ${formattedPhoneNumber}`);
  } catch (error) {
    console.error(`Failed to send SMS to ${formattedPhoneNumber}:`, error);
  }
};

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

exports.adjustAvailableRangesWithUnavailability = (
  availableRanges,
  unavailabilities
) => {
  // Helper function: Parse time string (HH:mm:ss.SSS+01:00) into minutes since midnight
  function parseTimeToMinutes(time) {
    const [hours, minutes] = time.split(":").map(Number);
    return hours * 60 + minutes;
  }

  // Helper function: Convert minutes back to time string (HH:mm:ss.SSS+01:00)
  function convertMinutesToTime(minutes) {
    const hours = Math.floor(minutes / 60)
      .toString()
      .padStart(2, "0");
    const mins = (minutes % 60).toString().padStart(2, "0");
    return `${hours}:${mins}:00.000+01:00`;
  }

  // Adjust available ranges based on unavailabilities
  return availableRanges.flatMap((range) => {
    const rangeStartMinutes = parseTimeToMinutes(range.start.split("+")[0]);
    const rangeEndMinutes = parseTimeToMinutes(range.end.split("+")[0]);

    let adjustedRanges = [
      { startMinutes: rangeStartMinutes, endMinutes: rangeEndMinutes },
    ];

    unavailabilities.forEach((unavailability) => {
      const unavailStartMinutes = parseTimeToMinutes(unavailability.startTime);
      const unavailEndMinutes = parseTimeToMinutes(unavailability.endTime);

      const newRanges = [];

      adjustedRanges.forEach(({ startMinutes, endMinutes }) => {
        // If the slot does not overlap with unavailability, keep it
        if (
          endMinutes <= unavailStartMinutes ||
          startMinutes >= unavailEndMinutes
        ) {
          newRanges.push({ startMinutes, endMinutes });
        } else {
          // If overlaps, split the slot into parts
          if (startMinutes < unavailStartMinutes) {
            newRanges.push({
              startMinutes,
              endMinutes: unavailStartMinutes,
            });
          }
          if (endMinutes > unavailEndMinutes) {
            newRanges.push({
              startMinutes: unavailEndMinutes,
              endMinutes,
            });
          }
        }
      });

      adjustedRanges = newRanges; // Update adjusted ranges
    });

    // Convert adjusted ranges back to string format
    return adjustedRanges.map(({ startMinutes, endMinutes }) => ({
      start: convertMinutesToTime(startMinutes),
      end: convertMinutesToTime(endMinutes),
    }));
  });
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
      OR: [
        { clientId: id },
        { providerId: id },
        { salonId: id },
        { memberId: id },
      ],
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

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const { DateTime } = require("luxon");
const { sendSMS } = require("../utils/businessLogic");

exports.sendAppointmentReminders = async () => {
  try {
    const twoDaysFromNow = DateTime.now().plus({ days: 2 }).toISODate();

    const appointments = await prisma.appointment.findMany({
      where: {
        date: {
          startsWith: twoDaysFromNow,
        },
        status: "ACCEPTED",
      },
      include: {
        client: true,
        service: true,
      },
    });

    if (appointments.length > 0) {
      const sendAllReminders = appointments.map(({ client, service, date }) => {
        const formattedDate = DateTime.fromISO(date)
          .setLocale("fr")
          .toLocaleString(DateTime.DATE_MED);
        const formattedTime = DateTime.fromISO(date)
          .setLocale("fr")
          .toLocaleString(DateTime.TIME_SIMPLE);

        const message = `
    Hey ${client.firstName} !
Juste un petit rappel que ton rendez-vous pour ${service.name} est prévu le ${formattedDate} à ${formattedTime}.\n
À très vite,
  `;
        return sendSMS(client.phoneNumber, message);
      });

      await Promise.all(sendAllReminders);
      console.log(`${appointments.length} reminders sent.`);
    } else {
      console.log("No appointments found for the next 2 days.");
    }
  } catch (error) {
    console.error("Error fetching appointments or sending reminders:", error);
  }
};

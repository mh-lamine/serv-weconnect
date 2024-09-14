const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const { DateTime } = require("luxon");
const { sendSMS } = require("../utils/businessLogic");

const constructMessage = (firstName, service, date, time) => {
  return `
    Hey ${firstName} ! 👋
    Juste un petit rappel que ton rendez-vous pour ${service} est prévu le ${date} à ${time} ⏰.
    
    On a hâte de te voir ! 🤩
    Besoin de changer l'heure ou d'infos supplémentaires ? Fais-le nous savoir directement ici.

    À très vite,
    L’équipe WeConnect 🚀
  `;
};


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
        const formattedDate = DateTime.fromISO(date).toLocaleString(
          DateTime.DATE_MED
        );
        const formattedTime = DateTime.fromISO(date).toLocaleString(
          DateTime.TIME_SIMPLE
        );

        const smsMessage = constructMessage(
          client.firstName,
          service.name,
          formattedDate,
          formattedTime
        );
        return sendSMS(client.phoneNumber, smsMessage);
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

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const { SNSClient, PublishCommand } = require("@aws-sdk/client-sns");
const { DateTime } = require("luxon");

const snsClient = new SNSClient({
  region: "eu-west-3",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

function formatPhoneNumberToFrance(phoneNumber) {
  if (phoneNumber.startsWith("0")) {
    return "+33" + phoneNumber.slice(1);
  }
  return phoneNumber; 
}

async function sendSMS(phoneNumber, message) {
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
}


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
    const twoDaysFromNow = DateTime.now().plus({ days: 2 });

    const startOfDay = twoDaysFromNow.startOf("day").toJSDate();
    const endOfDay = twoDaysFromNow.endOf("day").toJSDate();

    const appointments = await prisma.appointment.findMany({
      where: {
        date: {
          gte: startOfDay,
          lt: endOfDay,
        },
      },
      include: {
        client: true,
        service: true,
      },
    });

    if (appointments.length > 0) {
      const sendAllReminders = appointments.map(({ client, service, date }) => {
        const formattedDate = DateTime.fromJSDate(date).toLocaleString(
          DateTime.DATE_MED
        );
        const formattedTime = DateTime.fromJSDate(date).toLocaleString(
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

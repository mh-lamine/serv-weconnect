// services/reminderService.js

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const { SNSClient, PublishCommand } = require("@aws-sdk/client-sns");

// Initialize SNS client
const snsClient = new SNSClient({
  region: "eu-west-3",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

// Function to send SMS via SNS
async function sendSMS(phoneNumber, message) {
  const params = {
    Message: message,
    PhoneNumber: phoneNumber,
  };

  try {
    const command = new PublishCommand(params);
    await snsClient.send(command);
    console.log(`SMS sent to ${phoneNumber}`);
  } catch (error) {
    console.error(`Failed to send SMS to ${phoneNumber}:`, error);
  }
}

module.exports = { sendSMS };

// Function to fetch appointments and send reminders using Prisma
exports.sendAppointmentReminders = async () => {
  try {
    // Query for appointments scheduled two days from now
    const twoDaysFromNow = new Date();
    twoDaysFromNow.setDate(twoDaysFromNow.getDate() + 2);

    const appointments = await prisma.appointment.findMany({
      where: {
        date: {
          gte: new Date(twoDaysFromNow.setHours(0, 0, 0, 0)), // Start of the day
          lt: new Date(twoDaysFromNow.setHours(23, 59, 59, 999)), // End of the day
        },
      },
      include: {
        client: true,
        provider: true,
        service: true,
      },
    });

    if (appointments.length > 0) {
      for (const appointment of appointments) {
        const message = `
                    Hello! This is a reminder for your upcoming appointment:
                    Service: ${appointment.service.name}
                    Time: ${appointment.date.toLocaleTimeString("fr-FR", {
                      timeStyle: "short",
                    })}
                    }
                `;

        // Send SMS reminder
        await sendSMS(appointment.client.phoneNumber, message);
      }
    } else {
      console.log("No appointments found for the next 2 days.");
    }
  } catch (error) {
    console.error("Error fetching appointments or sending reminders:", error);
  }
};


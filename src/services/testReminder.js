// testReminderService.js

const { sendAppointmentReminders, sendSMS } = require("./reminderService");

// Run the reminder service function to test it
sendSMS('+33629640428', 'testing the thing')
  .then(() => console.log("Reminder service function completed"))
  .catch((err) =>
    console.error("Error running reminder service function:", err)
  );

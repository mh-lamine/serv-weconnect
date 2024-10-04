const express = require("express");
require("dotenv").config();
const morgan = require("morgan");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const cron = require("node-cron");

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const salonRoutes = require("./routes/salonRoutes");
const s3routes = require("./routes/s3routes");
const appointmentRoutes = require("./routes/appointmentRoutes");
const availabilityRoutes = require("./routes/availabilityRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const providerCategoryRoutes = require("./routes/providerCategoryRoutes");
const providerServiceRoutes = require("./routes/providerServiceRoutes");
const tagsRoutes = require("./routes/tagsRoutes");
const { sendAppointmentReminders } = require("./services/reminderService");

const app = express();

app.use(morgan("dev"));
app.use(helmet());
app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/salon", salonRoutes);
app.use("/api/s3", s3routes)
app.use("/api/appointments", appointmentRoutes);
app.use("/api/availabilities", availabilityRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/providerCategory", providerCategoryRoutes);
app.use("/api/providerService", providerServiceRoutes);
app.use("/api/tags", tagsRoutes);

// Set up cron job to run every day at 10 AM France time
const TIMEZONE = "Europe/Paris";

cron.schedule(
  "0 10 * * *",
  async () => {
    await sendAppointmentReminders();
  },
  {
    timezone: TIMEZONE,
  }
);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

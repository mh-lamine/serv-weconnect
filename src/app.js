const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const userRoutes = require("./routes/userRoutes");
const appointmentRoutes = require("./routes/appointmentRoutes");
const serviceRoutes = require("./routes/serviceRoutes");
const availabilityRoutes = require("./routes/availabilityRoutes");
const errorHandler = require("./utils/errorHandler");

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(helmet());
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/availabilities", availabilityRoutes);

app.use(errorHandler);

module.exports = app;

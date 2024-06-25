const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const userRoutes = require("./routes/userRoutes");
const appointmentRoutes = require("./routes/appointmentRoutes");
const availabilityRoutes = require("./routes/availabilityRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const providerCategoryRoutes = require("./routes/providerCategoryRoutes");
const providerServiceRoutes = require("./routes/providerServiceRoutes");
const tagsRoutes = require("./routes/tagsRoutes");

const errorHandler = require("./utils/errorHandler");

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(helmet());
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/availabilities", availabilityRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/providerCategory", providerCategoryRoutes);
app.use("/api/providerService", providerServiceRoutes);
app.use("/api/tags", tagsRoutes);
app.use(errorHandler);

module.exports = app;

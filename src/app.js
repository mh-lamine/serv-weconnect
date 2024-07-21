const express = require("express");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const morgan = require("morgan");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const appointmentRoutes = require("./routes/appointmentRoutes");
const availabilityRoutes = require("./routes/availabilityRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const providerCategoryRoutes = require("./routes/providerCategoryRoutes");
const providerServiceRoutes = require("./routes/providerServiceRoutes");
const tagsRoutes = require("./routes/tagsRoutes");
const { credentials } = require("./utils/middleware");

const app = express();
app.use(credentials);
app.use(cors(corsOptions));
app.use(morgan("dev"));
app.use(helmet());
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/availabilities", availabilityRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/providerCategory", providerCategoryRoutes);
app.use("/api/providerService", providerServiceRoutes);
app.use("/api/tags", tagsRoutes);

module.exports = app;

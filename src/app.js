const express = require("express");
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

const app = express();
const path = require("path");

app.use(morgan("dev"));
app.use(helmet());
app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/availabilities", availabilityRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/providerCategory", providerCategoryRoutes);
app.use("/api/providerService", providerServiceRoutes);
app.use("/api/tags", tagsRoutes);

// Servez les fichiers statiques du répertoire 'dist'
app.use(express.static(path.join(__dirname, "..", "dist")));

// Route de repli pour toutes les autres requêtes
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "dist", "index.html"));
});

module.exports = app;

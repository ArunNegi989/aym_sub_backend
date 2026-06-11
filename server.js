require("dotenv").config();

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const path = require("path");
const connectDB = require("./config/db");

const app = express();

/* ========================= DATABASE ========================= */
connectDB();

app.set("trust proxy", 1);

/* ========================= CORS ========================= */
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000", 
    credentials: true,
  }),
);

/* ========================= BODY PARSER ========================= */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* ========================= COOKIE PARSER ========================= */
app.use(cookieParser());

/* ========================= SECURITY ========================= */
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" },
  }),
);

/* ========================= LOGGER ========================= */
app.use(morgan("dev"));

/* ========================= STATIC FILES ========================= */
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

/* ========================= ROUTES ========================= */
const uploadRoutes = require("./routes/uploadRoutes");
app.use("/api/upload", uploadRoutes);

const courseStatsRoute = require("./routes/courseStatsRoutes");
app.use("/api/course-stats", courseStatsRoute);

const contactRoute = require("./routes/Contact.route");
app.use("/api/contact", contactRoute);

app.use("/api", require("./routes"));

/* ========================= HEALTH CHECK ========================= */
app.get("/", (req, res) => {
  res.json({ success: true, message: "API is running 🚀" });
});

/* ========================= ERROR HANDLER ========================= */
app.use(require("./middleware/errorMiddleware"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, "localhost", () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

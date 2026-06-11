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
const allowedOrigins = [
  "http://localhost:3000",
  "http://172.20.10.3:3000", // ✅ hotspot IP
  process.env.FRONTEND_URL,
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
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
  })
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

/* ========================= SERVER START ========================= */
const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
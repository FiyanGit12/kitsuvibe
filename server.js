require('dotenv').config();
const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth");
const animeRoutes = require("./routes/anime");
const adminRoutes = require("./routes/admin");

const app = express();

// ==================== CORS ====================
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  process.env.FRONTEND_URL,
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);

    if (
      process.env.NODE_ENV === "production" &&
      !allowedOrigins.includes(origin)
    ) {
      return callback(new Error("CORS not allowed"), false);
    }
    return callback(null, true);
  },
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ==================== API ROUTES ====================
app.use("/auth", authRoutes);
app.use("/anime", animeRoutes);
app.use("/admin", adminRoutes);

// ==================== DEVELOPMENT ====================
if (process.env.NODE_ENV !== "production") {
  app.get("/", (req, res) => {
    res.json({
      status: "OK",
      message: "Backend Anime Streaming API running 🚀",
    });
  });
}

// ==================== START SERVER ====================
const PORT = process.env.PORT || 3000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📦 ENV: ${process.env.NODE_ENV || "development"}`);
});

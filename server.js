require('dotenv').config();
const express = require("express");
const cors = require("cors");
const path = require("path");

const authRoutes = require("./routes/auth");
const animeRoutes = require("./routes/anime");
const adminRoutes = require("./routes/admin");

const app = express();

// ==================== CORS CONFIGURATION ====================
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  process.env.FRONTEND_URL, // Vercel / domain FE
];

app.use(
  cors({
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
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ==================== API ROUTES ====================
app.use("/auth", authRoutes);
app.use("/anime", animeRoutes);
app.use("/admin", adminRoutes);

// ==================== PRODUCTION: SERVE FRONTEND ====================
if (process.env.NODE_ENV === "production") {
  const frontendPath = path.join(__dirname, "Frontend", "dist");

  app.use(express.static(frontendPath));

  // 🔴 FIX CRASH RAILWAY (JANGAN PAKE '*')
  app.get("/*", (req, res) => {
    res.sendFile(path.join(frontendPath, "index.html"));
  });
} 
// ==================== DEVELOPMENT MODE ====================
else {
  app.get("/", (req, res) => {
    res.json({
      status: "OK",
      message: "🎌 Backend Anime Streaming API running",
      endpoints: {
        auth: ["/auth/login", "/auth/register"],
        anime: ["/anime", "/anime/:id", "/anime/:id/episodes"],
        admin: ["/admin/anime", "/admin/episode"],
      },
    });
  });
}

// ==================== START SERVER ====================
const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📍 Environment: ${process.env.NODE_ENV || "development"}`);
});

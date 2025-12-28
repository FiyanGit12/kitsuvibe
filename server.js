require('dotenv').config();
const express = require("express");
const cors = require("cors");
const path = require("path");

const authRoutes = require("./routes/auth");
const animeRoutes = require("./routes/anime");
const adminRoutes = require("./routes/admin");

const app = express();

// ==================== CORS ====================
const allowedOrigins = [
  "https://kitsuvibe.vercel.app",
  "http://localhost:3000",
  "http://localhost:5173",
  process.env.FRONTEND_URL,
].filter(Boolean);

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
app.use("/api/auth", authRoutes);
app.use("/api/anime", animeRoutes);
app.use("/api/admin", adminRoutes);

// ==================== SERVE FRONTEND (PRODUCTION) ====================
if (process.env.NODE_ENV === "production") {
  // Serve static files dari Frontend/dist
  app.use(express.static(path.join(__dirname, 'Frontend/dist')));
  
  // Handle React Router - Serve index.html untuk semua NON-API routes
  app.use((req, res, next) => {
    // Skip kalau path dimulai dengan /api
    if (req.path.startsWith('/api')) {
      return next();
    }
    
    // Serve index.html untuk React Router
    res.sendFile(path.join(__dirname, 'Frontend/dist/index.html'), (err) => {
      if (err) {
        res.status(500).send(err);
      }
    });
  });
} else {
  // ==================== DEVELOPMENT ====================
  app.get("/", (req, res) => {
    res.json({
      status: "OK",
      message: "🎌 Backend Anime Streaming API running",
      environment: "development",
      endpoints: {
        auth: ["/api/auth/login", "/api/auth/register"],
        anime: ["/api/anime", "/api/anime/:id", "/api/anime/:id/episodes"],
        admin: ["/api/admin/anime", "/api/admin/episode"]
      }
    });
  });
}

// ==================== START SERVER ====================
const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📍 Environment: ${process.env.NODE_ENV || "development"}`);
});
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
  "http://localhost:5173", // Vite dev server
  process.env.FRONTEND_URL,
].filter(Boolean);

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (mobile apps, Postman, etc)
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

// ==================== API ROUTES - HARUS SEBELUM STATIC FILES ====================
app.use("/auth", authRoutes);
app.use("/anime", animeRoutes);
app.use("/admin", adminRoutes);

// ==================== SERVE FRONTEND (PRODUCTION) ====================
if (process.env.NODE_ENV === "production") {
  // Serve static files dari Frontend/dist
  app.use(express.static(path.join(__dirname, 'Frontend/dist')));
  
  // Handle React Router - Serve index.html untuk semua route yang BUKAN API
  // PENTING: Ini harus PALING TERAKHIR setelah semua API routes
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'Frontend/dist/index.html'));
  });
} else {
  // ==================== DEVELOPMENT ====================
  app.get("/", (req, res) => {
    res.json({
      status: "OK",
      message: "🎌 Backend Anime Streaming API running",
      environment: "development",
      endpoints: {
        auth: ["/auth/login", "/auth/register"],
        anime: ["/anime", "/anime/:id", "/anime/:id/episodes"],
        admin: ["/admin/anime", "/admin/episode"]
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
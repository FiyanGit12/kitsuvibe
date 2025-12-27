require('dotenv').config();
const express = require("express");
const cors = require("cors");
const path = require("path");

const authRoutes = require("./routes/auth");
const animeRoutes = require("./routes/anime");
const adminRoutes = require("./routes/admin");

const app = express();

// ==================== CORS CONFIGURATION ====================
// SECURITY: Restrict CORS to specific origins in production
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  process.env.FRONTEND_URL, // Will be Vercel URL
];

app.use(cors({
  origin: function(origin, callback) {
    // Allow requests with no origin (mobile apps, Postman, etc)
    if (!origin) return callback(null, true);
    
    // In production, strictly check allowed origins
    if (allowedOrigins.indexOf(origin) === -1 && process.env.NODE_ENV === 'production') {
      return callback(new Error('CORS not allowed'), false);
    }
    return callback(null, true);
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ==================== ROUTES ====================
app.use("/auth", authRoutes);
app.use("/anime", animeRoutes);
app.use("/admin", adminRoutes);

// ==================== SERVE STATIC FILES (PRODUCTION) ====================
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'Frontend/dist')));
  
  // Handle React Router - fallback to index.html
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'Frontend/dist/index.html'));
  });
} else {
  // Development: Show API info
  app.get("/", (req, res) => {
    res.json({ 
      message: "🎌 Backend Anime Streaming API",
      status: "running",
      endpoints: {
        auth: ["/auth/login", "/auth/register"],
        anime: ["/anime", "/anime/:id", "/anime/:id/episodes"],
        admin: ["/admin/anime", "/admin/episode"]
      }
    });
  });
}

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📍 Environment: ${process.env.NODE_ENV || 'development'}`);
});
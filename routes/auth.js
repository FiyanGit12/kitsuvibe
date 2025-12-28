// routes/auth.js
// Updated untuk pakai OOP User model

const express = require("express");
const router = express.Router();
const db = require("../db");
const User = require("../models/User");

// ==================== LOGIN ====================
router.post("/login", (req, res) => {
  const { username, password } = req.body;

  // ================= VALIDATION =================
  if (!username || !password) {
    return res.status(400).json({
      success: false,
      message: "Username dan password harus diisi"
    });
  }

  // ================= QUERY USER =================
  const sql = "SELECT * FROM users WHERE username = ?";

  db.query(sql, [username], (err, result) => {
    if (err) {
      console.error("LOGIN ERROR:", err);
      return res.status(500).json({
        success: false,
        message: "Server error"
      });
    }

    // ================= USER NOT FOUND =================
    if (result.length === 0) {
      return res.status(401).json({
        success: false,
        message: "Username tidak ditemukan"
      });
    }

    try {
      // ================= OOP USER =================
      const user = User.fromDatabase(result[0]);

      // ================= PASSWORD CHECK =================
      if (!user.verifyPassword(password)) {
        return res.status(401).json({
          success: false,
          message: "Password salah"
        });
      }

      // ================= SUCCESS =================
      res.json({
        success: true,
        message: "Login berhasil",
        user: user.toJSON() // password tidak dikirim
      });

    } catch (error) {
      console.error("PROCESS USER ERROR:", error);
      res.status(500).json({
        success: false,
        message: "Error processing user"
      });
    }
  });
});

module.exports = router;

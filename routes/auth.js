// routes/auth.js
// Updated untuk pakai OOP User model

const express = require("express");
const router = express.Router();
const db = require("../db");
const User = require("../models/User");

// ==================== LOGIN ====================
router.post("/login", (req, res) => {
  const { username, password } = req.body;

  // Validation
  if (!username || !password) {
    return res.status(400).json({
      success: false,
      message: "Username dan password harus diisi"
    });
  }

  const sql = "SELECT * FROM users WHERE username = ?";

  db.query(sql, [username], (err, result) => {
    if (err) {
      console.error("LOGIN ERROR:", err);
      return res.status(500).json({
        success: false,
        message: "Server error",
        error: err.message
      });
    }

    if (result.length === 0) {
      return res.status(401).json({
        success: false,
        message: "Username tidak ditemukan"
      });
    }

    try {
      // Pakai OOP User model
      const user = User.fromDatabase(result[0]);

      // Verify password menggunakan method dari class User
      // ENCAPSULATION - password tidak diexpose langsung
      if (!user.verifyPassword(password)) {
        return res.status(401).json({
          success: false,
          message: "Password salah"
        });
      }

      // Login berhasil
      res.json({
        success: true,
        message: "Login berhasil",
        user: user.toJSON() // toJSON() tidak include password (ENCAPSULATION)
      });

    } catch (error) {
      console.error("Error processing user data:", error);
      res.status(500).json({
        success: false,
        message: "Error processing user data",
        error: error.message
      });
    }
  });
});

// ==================== REGISTER (Optional) ====================
router.post("/register", (req, res) => {
  const { username, password, role = 'user' } = req.body;

  // Validation
  if (!username || !password) {
    return res.status(400).json({
      success: false,
      message: "Username dan password harus diisi"
    });
  }

  try {
    // Buat User object untuk validasi
    const newUser = new User(null, username, password, role);
    
    // Validate menggunakan method dari class User
    newUser.validate();

    // Check if username exists
    const checkSql = "SELECT * FROM users WHERE username = ?";
    
    db.query(checkSql, [username], (err, result) => {
      if (err) {
        console.error("CHECK USER ERROR:", err);
        return res.status(500).json({
          success: false,
          message: "Server error",
          error: err.message
        });
      }

      if (result.length > 0) {
        return res.status(400).json({
          success: false,
          message: "Username sudah digunakan"
        });
      }

      // Insert new user
      const insertSql = "INSERT INTO users (username, password, role) VALUES (?, ?, ?)";
      
      db.query(insertSql, [username, password, role], (err, result) => {
        if (err) {
          console.error("INSERT USER ERROR:", err);
          return res.status(500).json({
            success: false,
            message: "Gagal membuat user",
            error: err.message
          });
        }

        res.status(201).json({
          success: true,
          message: "User berhasil dibuat",
          user: {
            id: result.insertId,
            username: username,
            role: role
          }
        });
      });
    });

  } catch (error) {
    console.error("Validation error:", error);
    res.status(400).json({
      success: false,
      message: "Validation failed",
      error: error.message
    });
  }
});

module.exports = router;
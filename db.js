require('dotenv').config();
const mysql = require("mysql2");

// GANTI createConnection → createPool untuk production
// Pool lebih baik untuk handle multiple concurrent requests
const db = mysql.createPool({
  host: process.env.MYSQL_HOST || "127.0.0.1",
  user: process.env.MYSQL_USER || "animeyan",
  password: process.env.MYSQL_PASSWORD || "Fian2580",
  database: process.env.MYSQL_DATABASE || "anime_streaming",
  port: process.env.MYSQL_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Test connection with pool
db.getConnection((err, connection) => {
  if (err) {
    console.error("❌ Database connection error:", err);
    process.exit(1);
  }
  console.log("✅ MySQL connected successfully");
  connection.release(); // Release connection back to pool
});

module.exports = db;
require('dotenv').config();
const mysql = require("mysql2");

// Railway pakai MYSQLHOST (tanpa underscore), bukan MYSQL_HOST
const db = mysql.createPool({
  host: process.env.MYSQLHOST || process.env.MYSQL_HOST || "127.0.0.1",
  user: process.env.MYSQLUSER || process.env.MYSQL_USER || "root",
  password: process.env.MYSQLPASSWORD || process.env.MYSQL_PASSWORD || "Fian2580",
  database: process.env.MYSQLDATABASE || process.env.MYSQL_DATABASE || "railway",
  port: process.env.MYSQLPORT || process.env.MYSQL_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Test connection with pool + debug info
db.getConnection((err, connection) => {
  if (err) {
    console.error("❌ Database connection error:", err);
    console.error("🔍 Trying to connect with:");
    console.error("   Host:", process.env.MYSQLHOST || process.env.MYSQL_HOST || "NOT SET");
    console.error("   User:", process.env.MYSQLUSER || process.env.MYSQL_USER || "NOT SET");
    console.error("   Database:", process.env.MYSQLDATABASE || process.env.MYSQL_DATABASE || "NOT SET");
    console.error("   Port:", process.env.MYSQLPORT || process.env.MYSQL_PORT || "NOT SET");
    process.exit(1);
  }
  console.log("✅ MySQL connected successfully");
  console.log("📊 Connected to:", process.env.MYSQLHOST || process.env.MYSQL_HOST);
  connection.release();
});

module.exports = db;
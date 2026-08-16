import sqlite3 from 'sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.resolve(__dirname, 'hayot_ritmi.db');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("❌ SQLite bazasiga ulanishda xato:", err.message);
  } else {
    console.log("✅ SQLite ma'lumotlar bazasi tayyor:", dbPath);
  }
});

// Initialize Tables
db.serialize(() => {
  // Users Table
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      full_name TEXT NOT NULL,
      plan_tier TEXT DEFAULT 'free',
      telegram_id TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Daily Logs Table
  db.run(`
    CREATE TABLE IF NOT EXISTS daily_logs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      log_date TEXT NOT NULL,
      water_intake_ml INTEGER DEFAULT 0,
      exercise_minutes INTEGER DEFAULT 0,
      sleep_hours REAL DEFAULT 7.5,
      FOREIGN KEY (user_id) REFERENCES users (id)
    )
  `);

  // Medications Table
  db.run(`
    CREATE TABLE IF NOT EXISTS medications (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      med_name TEXT NOT NULL,
      time_str TEXT NOT NULL,
      note TEXT,
      is_taken INTEGER DEFAULT 0,
      FOREIGN KEY (user_id) REFERENCES users (id)
    )
  `);

  // Doctor Appointments Table
  db.run(`
    CREATE TABLE IF NOT EXISTS doctor_appointments (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      doctor_name TEXT NOT NULL,
      clinic TEXT,
      app_date TEXT NOT NULL,
      app_time TEXT,
      status TEXT DEFAULT 'Rejalashtirilgan',
      FOREIGN KEY (user_id) REFERENCES users (id)
    )
  `);
});

export default db;

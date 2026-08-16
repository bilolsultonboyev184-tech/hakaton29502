import express from 'express';
import db from '../db.js';
import { authenticateToken } from './auth.js';

const router = express.Router();
const getTodayStr = () => new Date().toISOString().split('T')[0];

// GET Today's Habit Status
router.get('/today', authenticateToken, (req, res) => {
  const userId = req.user.id;
  const today = getTodayStr();

  db.get(`SELECT * FROM daily_logs WHERE user_id = ? AND log_date = ?`, [userId, today], (err, log) => {
    if (err) return res.status(500).json({ error: err.message });

    if (!log) {
      // Create initial log for today
      db.run(
        `INSERT INTO daily_logs (user_id, log_date, water_intake_ml, exercise_minutes, sleep_hours) VALUES (?, ?, 0, 0, 7.5)`,
        [userId, today],
        function (err2) {
          if (err2) return res.status(500).json({ error: err2.message });
          fetchUserFullHabits(userId, this.lastID, res);
        }
      );
    } else {
      fetchUserFullHabits(userId, log.id, res);
    }
  });
});

function fetchUserFullHabits(userId, logId, res) {
  const today = getTodayStr();
  db.get(`SELECT * FROM daily_logs WHERE user_id = ? AND log_date = ?`, [userId, today], (err, log) => {
    db.all(`SELECT * FROM medications WHERE user_id = ?`, [userId], (err2, meds) => {
      db.all(`SELECT * FROM doctor_appointments WHERE user_id = ?`, [userId], (err3, appointments) => {
        res.json({
          log: log || { water_intake_ml: 0, exercise_minutes: 0, sleep_hours: 7.5 },
          medications: meds || [],
          appointments: appointments || []
        });
      });
    });
  });
}

// Update Water Intake
router.post('/water', authenticateToken, (req, res) => {
  const { amount } = req.body;
  const userId = req.user.id;
  const today = getTodayStr();

  db.run(
    `UPDATE daily_logs SET water_intake_ml = water_intake_ml + ? WHERE user_id = ? AND log_date = ?`,
    [amount || 250, userId, today],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ success: true, added: amount });
    }
  );
});

// Update Exercise
router.post('/exercise', authenticateToken, (req, res) => {
  const { minutes } = req.body;
  const userId = req.user.id;
  const today = getTodayStr();

  db.run(
    `UPDATE daily_logs SET exercise_minutes = exercise_minutes + ? WHERE user_id = ? AND log_date = ?`,
    [minutes || 10, userId, today],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ success: true, addedMinutes: minutes });
    }
  );
});

// Update Sleep
router.post('/sleep', authenticateToken, (req, res) => {
  const { hours } = req.body;
  const userId = req.user.id;
  const today = getTodayStr();

  db.run(
    `UPDATE daily_logs SET sleep_hours = ? WHERE user_id = ? AND log_date = ?`,
    [hours, userId, today],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ success: true, sleepHours: hours });
    }
  );
});

export default router;

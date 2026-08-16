import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import db from '../db.js';

const router = express.Router();
const JWT_SECRET = 'hayot_ritmi_super_secret_key_2026';

// Middleware to authenticate JWT
export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ error: "Token topilmadi" });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: "Token yaroqsiz" });
    req.user = user;
    next();
  });
};

// Register
router.post('/register', async (req, res) => {
  const { email, password, full_name } = req.body;
  if (!email || !password || !full_name) {
    return res.status(400).json({ error: "Barcha maydonlarni to'ldiring" });
  }

  try {
    const salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash(password, salt);

    const query = `INSERT INTO users (email, password_hash, full_name, plan_tier) VALUES (?, ?, ?, 'free')`;
    db.run(query, [email.toLowerCase(), password_hash, full_name], function (err) {
      if (err) {
        if (err.message.includes('UNIQUE')) {
          return res.status(400).json({ error: "Ushbu email ro'yxatdan o'tgan" });
        }
        return res.status(500).json({ error: "Server xatosi" });
      }

      const userPayload = { id: this.lastID, email: email.toLowerCase(), full_name, plan_tier: 'free' };
      const token = jwt.sign(userPayload, JWT_SECRET, { expiresIn: '30d' });

      res.status(201).json({
        message: "Ro'yxatdan o'tish muvaffaqiyatli!",
        token,
        user: userPayload
      });
    });
  } catch (e) {
    res.status(500).json({ error: "Parolni shifrlashda xato" });
  }
});

// Login
router.post('/login', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "Email va parolni kiriting" });
  }

  db.get(`SELECT * FROM users WHERE email = ?`, [email.toLowerCase()], async (err, user) => {
    if (err || !user) {
      return res.status(400).json({ error: "Email yoki parol noto'g'ri" });
    }

    const validPass = await bcrypt.compare(password, user.password_hash);
    if (!validPass) {
      return res.status(400).json({ error: "Email yoki parol noto'g'ri" });
    }

    const userPayload = {
      id: user.id,
      email: user.email,
      full_name: user.full_name,
      plan_tier: user.plan_tier,
      telegram_id: user.telegram_id
    };
    const token = jwt.sign(userPayload, JWT_SECRET, { expiresIn: '30d' });

    res.json({
      message: "Xush kelibsiz!",
      token,
      user: userPayload
    });
  });
});

// Get Current User Profile
router.get('/me', authenticateToken, (req, res) => {
  db.get(`SELECT id, email, full_name, plan_tier, telegram_id, created_at FROM users WHERE id = ?`, [req.user.id], (err, user) => {
    if (err || !user) return res.status(404).json({ error: "Foydalanuvchi topilmadi" });
    res.json({ user });
  });
});

export default router;

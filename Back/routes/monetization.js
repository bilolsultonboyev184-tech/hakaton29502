import express from 'express';
import db from '../db.js';
import { authenticateToken } from './auth.js';

const router = express.Router();

// GET Available Tariff Plans
router.get('/plans', (req, res) => {
  res.json({
    currency: "UZS",
    plans: [
      {
        id: "free",
        name: "Bepul (Free)",
        price: 0,
        period: "cheksiz",
        features: [
          "1-Tap kunlik suv, uyqu va mashq tracking",
          "Brauzer ichida xavfsiz Local xotira",
          "Vitality Tree novda tizimi",
          "Favqulodda ICE kartasi (103/112)"
        ]
      },
      {
        id: "pro_streak",
        name: "Pro Streak",
        price: 25000,
        period: "oyiga",
        features: [
          "Barcha Bepul imkoniyatlar",
          "🤖 Telegram Bot avtomatik kunlik dori/suv eslatmasi",
          "☁️ Cheksiz Bulutli Sync"
        ]
      },
      {
        id: "ai_coach",
        name: "AI Health Coach",
        price: 69000,
        period: "oyiga",
        recommended: true,
        features: [
          "Barcha Pro imkoniyatlar",
          "🧠 Sun'iy intellekt AI Coach shaxsiy maslahatchi",
          "📄 PDF Haftalik Salomatlik Hisoboti",
          "💎 Exclusive Diamond Vitality Tree vizualizatsiyasi"
        ]
      },
      {
        id: "family_vip",
        name: "Family & Clinic VIP",
        price: 149000,
        period: "oyiga",
        features: [
          "Barcha AI Coach imkoniyatlar",
          "👨‍👩‍👧‍👦 Oila a'zolari uchun 5 ta Akkaunt",
          "🏥 Shifokor bilan 1-Tap VIP ulash va hisobot yuborish",
          "🌙 Tungi Meditatsiya Audiolari va 24/7 VIP Support"
        ]
      }
    ]
  });
});

// Upgrade Subscription (Payme / Click simulation)
router.post('/upgrade', authenticateToken, (req, res) => {
  const { plan_id, payment_method } = req.body;
  const userId = req.user.id;

  if (!plan_id) return res.status(400).json({ error: "Tarif rejasini tanlang" });

  db.run(`UPDATE users SET plan_tier = ? WHERE id = ?`, [plan_id, userId], function (err) {
    if (err) return res.status(500).json({ error: "Obuna faollashtirishda xato" });

    res.json({
      success: true,
      message: `Tabriklaymiz! Obunangiz muvaffaqiyatli faollashtirildi! 🎉`,
      user: {
        id: userId,
        plan_tier: plan_id
      }
    });
  });
});

// Link Telegram Bot ID
router.post('/telegram-link', authenticateToken, (req, res) => {
  const { telegram_id } = req.body;
  const userId = req.user.id;

  db.run(`UPDATE users SET telegram_id = ? WHERE id = ?`, [telegram_id, userId], function (err) {
    if (err) return res.status(500).json({ error: "Telegram ID saqlashda xato" });
    res.json({ success: true, message: "Telegram bot eslatmalari faollashtirildi!" });
  });
});

export default router;

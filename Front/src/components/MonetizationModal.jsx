import React, { useState } from 'react';
import { Crown, Check, Zap, Send, FileText, X, CreditCard, Brain, Users, Sparkles, ShieldCheck } from 'lucide-react';
import { apiService } from '../services/api';

export default function MonetizationModal({ isOpen, onClose, currentUser, onUpgradeSuccess }) {
  const [loading, setLoading] = useState(false);
  const [telegramId, setTelegramId] = useState('');
  const [tgMsg, setTgMsg] = useState('');

  if (!isOpen) return null;

  const handleSimulatePayment = async (planId, planName, method) => {
    setLoading(true);
    try {
      if (currentUser) {
        await apiService.upgradePlan(planId, method);
        onUpgradeSuccess(planId);
      } else {
        onUpgradeSuccess(planId);
      }
      alert(`🎉 Tabriklaymiz! ${method} orqali "${planName}" muvaffaqiyatli faollashtirildi!`);
      onClose();
    } catch (e) {
      alert("Obunani faollashtirishda xato. Avval tizimga kiring.");
    } finally {
      setLoading(false);
    }
  };

  const handleLinkTelegram = async (e) => {
    e.preventDefault();
    if (!telegramId) return;
    try {
      await apiService.linkTelegram(telegramId);
      setTgMsg("✅ Telegram Bot ulandi! Kunlik eslatmalar Telegramingizga yuboriladi.");
    } catch (e) {
      setTgMsg("✅ Telegram bot eslatmasi saqlandi (Demo rejim).");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content" style={{ maxWidth: '850px', padding: '1.75rem' }}>
        
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <div style={{ background: 'var(--accent-amber-bg)', color: 'var(--accent-amber-light)', padding: '0.55rem', borderRadius: 'var(--radius-md)' }}>
              <Crown size={26} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.3rem', fontWeight: '800' }}>HayotRitmi Pro & Daromad Modeli (Tariflar)</h3>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>Rejim qanchalik yuqori bo'lsa, platforma imkoniyatlari shunchalik kuchli!</p>
            </div>
          </div>
          <button className="btn-icon" onClick={onClose} style={{ width: '34px', height: '34px' }}>
            <X size={16} />
          </button>
        </div>

        {/* Pricing Cards Grid - 4 Tiers */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
          
          {/* 1. Free Tier */}
          <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-lg)', padding: '1.15rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: '800' }}>BEPUL REJIM</span>
              <div style={{ fontSize: '1.25rem', fontWeight: '800', margin: '0.2rem 0' }}>0 UZS</div>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '0.85rem' }}>Boshlang'ich tracking</p>

              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.78rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}><Check size={12} color="var(--accent-emerald)" /> 1-Tap Suv & Dori tracking</li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}><Check size={12} color="var(--accent-emerald)" /> Brauzer Local xotirasi</li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}><Check size={12} color="var(--accent-emerald)" /> Vitality Tree 1-2 daraja</li>
              </ul>
            </div>

            <button style={{ width: '100%', padding: '0.55rem', borderRadius: 'var(--radius-md)', background: 'transparent', border: '1px solid var(--border-color)', color: 'var(--text-muted)', fontSize: '0.78rem', fontWeight: '700' }} disabled>
              Amaldagi Rejim
            </button>
          </div>

          {/* 2. Pro Streak Tier */}
          <div style={{ background: 'var(--bg-secondary)', border: '1px solid rgba(16, 185, 129, 0.3)', borderRadius: 'var(--radius-lg)', padding: '1.15rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <span style={{ fontSize: '0.75rem', color: 'var(--accent-emerald-light)', fontWeight: '800' }}>⚡ PRO STREAK</span>
              <div style={{ fontSize: '1.25rem', fontWeight: '800', margin: '0.2rem 0', color: 'var(--text-primary)' }}>
                25,000 UZS <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>/ oy</span>
              </div>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '0.85rem' }}>Avto Telegram eslatmalar</p>

              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.78rem', color: 'var(--text-primary)', marginBottom: '1rem' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}><Check size={12} color="var(--accent-emerald)" /> Barcha Bepul imkoniyatlar</li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}><Check size={12} color="var(--accent-emerald)" /> 🤖 Telegram Bot eslatmasi</li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}><Check size={12} color="var(--accent-emerald)" /> ☁️ Cheksiz Cloud Sync</li>
              </ul>
            </div>

            <button 
              onClick={() => handleSimulatePayment('pro_streak', 'Pro Streak', 'Payme/Click')}
              className="quick-action-btn"
              style={{ width: '100%', justifyContent: 'center', fontSize: '0.78rem', padding: '0.55rem' }}
              disabled={loading}
            >
              Tanlash (25,000)
            </button>
          </div>

          {/* 3. AI Health Coach Tier (MOST POPULAR) */}
          <div style={{ background: 'linear-gradient(135deg, rgba(224, 124, 84, 0.15), rgba(16, 185, 129, 0.15))', border: '2px solid var(--accent-coral)', borderRadius: 'var(--radius-lg)', padding: '1.15rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', position: 'relative' }}>
            <div style={{ position: 'absolute', top: '-10px', right: '10px', background: 'var(--accent-coral)', color: '#0f172a', fontSize: '0.65rem', fontWeight: '800', padding: '0.15rem 0.5rem', borderRadius: 'var(--radius-full)' }}>
              ENG POPULYAR 🔥
            </div>

            <div>
              <span style={{ fontSize: '0.75rem', color: 'var(--accent-coral-light)', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                <Brain size={14} /> AI HEALTH COACH
              </span>
              <div style={{ fontSize: '1.25rem', fontWeight: '800', margin: '0.2rem 0', color: 'var(--text-primary)' }}>
                69,000 UZS <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>/ oy</span>
              </div>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '0.85rem' }}>Sun'iy intellekt tahlili</p>

              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.78rem', color: 'var(--text-primary)', marginBottom: '1rem' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}><Check size={12} color="var(--accent-coral)" /> Barcha Pro imkoniyatlar</li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}><Check size={12} color="var(--accent-coral)" /> 🧠 Sun'iy intellekt AI Coach</li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}><Check size={12} color="var(--accent-coral)" /> 📄 PDF Salomatlik Hisoboti</li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}><Check size={12} color="var(--accent-coral)" /> 💎 Diamond Tree Vizualizatsiyasi</li>
              </ul>
            </div>

            <button 
              onClick={() => handleSimulatePayment('ai_coach', 'AI Health Coach', 'Payme/Click')}
              className="quick-action-btn"
              style={{ width: '100%', justifyContent: 'center', background: 'var(--accent-coral)', color: '#0f172a', fontWeight: '800', fontSize: '0.78rem', padding: '0.55rem' }}
              disabled={loading}
            >
              Tanlash (69,000)
            </button>
          </div>

          {/* 4. Family & VIP Tier */}
          <div style={{ background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.15), rgba(244, 63, 94, 0.1))', border: '2px solid var(--accent-amber)', borderRadius: 'var(--radius-lg)', padding: '1.15rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <span style={{ fontSize: '0.75rem', color: 'var(--accent-amber-light)', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                <Crown size={14} /> VIP FAMILY & CLINIC
              </span>
              <div style={{ fontSize: '1.25rem', fontWeight: '800', margin: '0.2rem 0', color: 'var(--text-primary)' }}>
                149,000 UZS <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>/ oy</span>
              </div>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '0.85rem' }}>Butun oila + VIP Shifokor</p>

              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.78rem', color: 'var(--text-primary)', marginBottom: '1rem' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}><Check size={12} color="var(--accent-amber)" /> Barcha AI Coach imkoniyatlar</li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}><Check size={12} color="var(--accent-amber)" /> 👨‍👩‍👧‍👦 Oila uchun 5 ta Akkaunt</li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}><Check size={12} color="var(--accent-amber)" /> 🏥 Shifokor bilan VIP Ulash</li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}><Check size={12} color="var(--accent-amber)" /> 🌙 Tungi Meditatsiya Audiolari</li>
              </ul>
            </div>

            <button 
              onClick={() => handleSimulatePayment('family_vip', 'VIP Family & Clinic', 'Payme/Click')}
              className="quick-action-btn"
              style={{ width: '100%', justifyContent: 'center', background: 'var(--accent-amber)', color: '#0f172a', fontWeight: '800', fontSize: '0.78rem', padding: '0.55rem' }}
              disabled={loading}
            >
              VIP Olish (149,000)
            </button>
          </div>

        </div>

        {/* Telegram Bot Integration Section */}
        <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', padding: '1rem' }}>
          <h4 style={{ fontSize: '0.9rem', color: 'var(--accent-coral)', display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.4rem' }}>
            <Send size={16} /> Telegram Bot Integratsiyasi (Avto Eslatma)
          </h4>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.75rem' }}>
            Telegram chat ID ingizni kiriting va dori/suv eslatmalarini to'g'ridan-to'g'ri Telegram xabarnomalarida oling.
          </p>

          <form onSubmit={handleLinkTelegram} style={{ display: 'flex', gap: '0.5rem' }}>
            <input 
              type="text"
              placeholder="Telegram ID (masalan: 12345678)"
              value={telegramId}
              onChange={(e) => setTelegramId(e.target.value)}
              style={{ flex: 1, padding: '0.55rem', borderRadius: 'var(--radius-sm)', background: 'var(--bg-primary)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', fontSize: '0.85rem' }}
            />
            <button type="submit" className="quick-action-btn" style={{ fontSize: '0.8rem' }}>
              Ulash
            </button>
          </form>
          {tgMsg && <p style={{ fontSize: '0.8rem', color: 'var(--accent-emerald-light)', marginTop: '0.5rem' }}>{tgMsg}</p>}
        </div>

      </div>
    </div>
  );
}

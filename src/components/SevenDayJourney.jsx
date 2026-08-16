import React, { useState } from 'react';
import { MOCK_JOURNEY_DAYS } from '../data/mock7DayData';
import { Calendar, CheckCircle2, TrendingUp, Award, ArrowRight, ShieldCheck, Flame, X, Share2, Copy, Check } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useLanguage } from '../services/LanguageContext';

const BADGE_DETAILS = {
  "Ilk Qadam": {
    icon: "🌱",
    title: "Ilk Qadam / First Step",
    description: "Siz HayotRitmi ilovasida ilk bor 1-tap orqali o'z sog'lom odatingizni belgiladingiz.",
    reward: "+50 Vitality"
  },
  "3 Kunlik Zanjir": {
    icon: "⚡",
    title: "3 Kunlik Zanjir / 3-Day Streak",
    description: "3 kun ketma-ket o'z sog'lig'ingizga e'tibor qaratdingiz.",
    reward: "+150 Vitality"
  },
  "Intizom Qahramoni": {
    icon: "🌿",
    title: "Intizom Qahramoni / Habit Hero",
    description: "5 kunlik uzluksiz zanjir!",
    reward: "+300 Vitality"
  },
  "Odat Ustasi (7 Kun)": {
    icon: "🏆",
    title: "Odat Ustasi / Habit Master",
    description: "Bir haftalik mukammal g'alaba!",
    reward: "👑 Master Badge"
  }
};

export default function SevenDayJourney({ onApplyJourneyDay }) {
  const [selectedDayNum, setSelectedDayNum] = useState(7); // default show Day 7 victory!
  const [selectedBadge, setSelectedBadge] = useState(null);
  const [copied, setCopied] = useState(false);
  const { lang, t } = useLanguage();

  const currentDayData = MOCK_JOURNEY_DAYS[selectedDayNum];

  const handleSelectDay = (dayNum) => {
    setSelectedDayNum(dayNum);
    if (onApplyJourneyDay) {
      onApplyJourneyDay(MOCK_JOURNEY_DAYS[dayNum]);
    }
  };

  const handleBadgeClick = (bName) => {
    const badgeInfo = BADGE_DETAILS[bName] || {
      icon: "🏆",
      title: bName,
      description: "Vitality Badge",
      reward: "+100 Vitality"
    };
    setSelectedBadge(badgeInfo);
    setCopied(false);
    try {
      confetti({ particleCount: 50, spread: 70, origin: { y: 0.6 } });
    } catch (e) {}
  };

  const handleCopyShare = () => {
    if (!selectedBadge) return;
    const shareText = `🏆 "${selectedBadge.title}" — HayotRitmi! 🌿`;
    navigator.clipboard.writeText(shareText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      
      {/* Judge Interactive Header */}
      <div className="card" style={{ background: 'linear-gradient(135deg, rgba(224, 124, 84, 0.1), rgba(16, 185, 129, 0.1))', borderColor: 'rgba(224, 124, 84, 0.3)' }}>
        <div className="card-header" style={{ marginBottom: '0.75rem' }}>
          <div>
            <div className="card-title" style={{ color: 'var(--accent-coral)' }}>
              <Calendar size={20} /> {t.journeyTitle}
            </div>
            <p className="card-subtitle">{t.journeySubtitle}</p>
          </div>
        </div>

        {/* Day Selector Buttons */}
        <div className="journey-selector">
          {[1, 3, 5, 7].map((dNum) => (
            <button
              key={dNum}
              className={`day-step-btn ${selectedDayNum === dNum ? 'active' : ''}`}
              onClick={() => handleSelectDay(dNum)}
            >
              {lang === 'rus' ? `ДЕНЬ ${dNum}` : lang === 'eng' ? `DAY ${dNum}` : `${dNum}-KUN`} {dNum === 7 ? '🏆' : ''}
            </button>
          ))}
        </div>
      </div>

      {/* Selected Day View Showcase */}
      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.25rem' }}>
          <div>
            <span className="streak-badge" style={{ marginBottom: '0.5rem', display: 'inline-flex' }}>
              <Award size={14} /> {currentDayData.badge}
            </span>
            <h2 style={{ fontSize: '1.4rem', fontWeight: '800', margin: '0.2rem 0' }}>{currentDayData.title}</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{currentDayData.subtitle}</p>
          </div>

          <div style={{ background: 'var(--bg-secondary)', padding: '0.75rem 1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-default)', textAlign: 'right' }}>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Uzluksiz Streak</div>
            <div style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--accent-amber)' }}>
              🔥 {currentDayData.streakCount} KUN
            </div>
          </div>
        </div>

        {/* 4 Core Metrics Grid for Selected Day */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
          
          <div style={{ background: 'var(--bg-secondary)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-default)' }}>
            <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>💧 Suv iste'moli</div>
            <div style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--accent-coral)', margin: '0.2rem 0' }}>
              {currentDayData.waterIntake} / {currentDayData.waterTarget} ml
            </div>
            <div className="progress-bar-bg" style={{ height: '6px', margin: '0.4rem 0 0 0' }}>
              <div className="progress-bar-fill" style={{ width: `${Math.min((currentDayData.waterIntake / currentDayData.waterTarget)*100, 100)}%`, background: 'var(--accent-coral)' }}></div>
            </div>
          </div>

          <div style={{ background: 'var(--bg-secondary)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-default)' }}>
            <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>💊 Dori eslatmasi</div>
            <div style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--accent-amber)', margin: '0.2rem 0' }}>
              {currentDayData.medsTaken} / {currentDayData.medsTotal} qabul
            </div>
            <div className="progress-bar-bg" style={{ height: '6px', margin: '0.4rem 0 0 0' }}>
              <div className="progress-bar-fill" style={{ width: `${(currentDayData.medsTaken / currentDayData.medsTotal)*100}%`, background: 'var(--accent-amber)' }}></div>
            </div>
          </div>

          <div style={{ background: 'var(--bg-secondary)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-default)' }}>
            <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>🏃 Mashq / Harakat</div>
            <div style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--accent-emerald-light)', margin: '0.2rem 0' }}>
              {currentDayData.exerciseMinutes} / {currentDayData.exerciseTarget} daq
            </div>
            <div className="progress-bar-bg" style={{ height: '6px', margin: '0.4rem 0 0 0' }}>
              <div className="progress-bar-fill" style={{ width: `${Math.min((currentDayData.exerciseMinutes / currentDayData.exerciseTarget)*100, 100)}%` }}></div>
            </div>
          </div>

          <div style={{ background: 'var(--bg-secondary)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-default)' }}>
            <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>🌙 Uyqu balansi</div>
            <div style={{ fontSize: '1.25rem', fontWeight: '700', color: '#a78bfa', margin: '0.2rem 0' }}>
              {currentDayData.sleepHours} soat
            </div>
            <div className="progress-bar-bg" style={{ height: '6px', margin: '0.4rem 0 0 0' }}>
              <div className="progress-bar-fill" style={{ width: `${(currentDayData.sleepHours / 8.0)*100}%`, background: '#8b5cf6' }}></div>
            </div>
          </div>

        </div>

        {/* Tahlil va Maslahatlar (Insights) */}
        <div style={{ background: 'rgba(16, 185, 129, 0.05)', border: '1px solid rgba(16, 185, 129, 0.2)', borderRadius: 'var(--radius-md)', padding: '1.1rem' }}>
          <h4 style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--accent-emerald-light)', marginBottom: '0.75rem', fontSize: '0.95rem' }}>
            <TrendingUp size={18} /> Ushbu Kun Tahlili va Rivojlanish Maslahati:
          </h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {currentDayData.insights.map((ins, i) => (
              <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.88rem', color: 'var(--text-primary)' }}>
                <CheckCircle2 size={16} color="var(--accent-emerald)" style={{ marginTop: '2px', flexShrink: 0 }} />
                <span>{ins}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Unlocked Badges for this state */}
        <div style={{ marginTop: '1.5rem' }}>
          <h4 style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
            Ochilgan Nisonlar (Badges) — bosing va ko'ring:
          </h4>
          <div className="badges-grid">
            {currentDayData.unlockedBadges.map((bName, idx) => (
              <div 
                key={idx} 
                className="badge-card" 
                onClick={() => handleBadgeClick(bName)}
                style={{ cursor: 'pointer' }}
                title="Tafsilotlarni ko'rish uchun bosing"
              >
                <div className="badge-icon">{BADGE_DETAILS[bName]?.icon || "🏆"}</div>
                <div className="badge-name">{bName}</div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Badge Details Modal */}
      {selectedBadge && (
        <div className="modal-overlay" onClick={() => setSelectedBadge(null)}>
          <div className="modal-content" style={{ maxWidth: '420px', textAlign: 'center' }} onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button className="btn-icon" onClick={() => setSelectedBadge(null)} style={{ width: '30px', height: '30px' }}>
                <X size={16} />
              </button>
            </div>

            <div className="pulse" style={{ fontSize: '4.5rem', margin: '0.5rem 0' }}>
              {selectedBadge.icon}
            </div>

            <h3 style={{ fontSize: '1.3rem', fontWeight: '800', marginBottom: '0.3rem', color: 'var(--text-primary)' }}>
              {selectedBadge.title}
            </h3>

            <span style={{ fontSize: '0.78rem', background: 'var(--accent-amber-bg)', color: 'var(--accent-amber-light)', padding: '0.25rem 0.75rem', borderRadius: 'var(--radius-full)', fontWeight: '800', display: 'inline-block', marginBottom: '1rem' }}>
              {selectedBadge.reward}
            </span>

            <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '1.5rem' }}>
              {selectedBadge.description}
            </p>

            <button 
              className="quick-action-btn"
              onClick={handleCopyShare}
              style={{ width: '100%', justifyContent: 'center', background: 'var(--accent-emerald)', color: '#0f172a', fontWeight: '800' }}
            >
              {copied ? <Check size={18} /> : <Share2 size={18} />}
              {copied ? "Nusxalandi! 🎉" : "Natijani Telegram / Story ga ulashish"}
            </button>
          </div>
        </div>
      )}

    </div>
  );
}

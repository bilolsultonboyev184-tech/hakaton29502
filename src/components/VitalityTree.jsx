import React from 'react';
import { Sparkles, Trophy, Flame } from 'lucide-react';
import { useLanguage } from '../services/LanguageContext';

export default function VitalityTree({ stage, level, progress, streakCount }) {
  const { lang, t } = useLanguage();

  const getStageEmoji = () => {
    switch (stage) {
      case 'urug': return '🌱';
      case 'nihol': return '🌿';
      case 'kattalashgan': return '🪴';
      case 'gullagan': return '🌸';
      default: return '🌳';
    }
  };

  const getStageName = () => {
    if (lang === 'rus') {
      switch (stage) {
        case 'urug': return 'Семя Привычки';
        case 'nihol': return 'Растущий Росток';
        case 'kattalashgan': return 'Крепкое Растение';
        case 'gullagan': return 'Цветущее Древо';
        default: return 'Древо Жизни';
      }
    }
    if (lang === 'eng') {
      switch (stage) {
        case 'urug': return 'Habit Seed';
        case 'nihol': return 'Growing Sprout';
        case 'kattalashgan': return 'Healthy Plant';
        case 'gullagan': return 'Blooming Tree';
        default: return 'Vitality Tree';
      }
    }
    switch (stage) {
      case 'urug': return 'Yangi Nihol';
      case 'nihol': return 'Gurkirayotgan Novda';
      case 'kattalashgan': return "Sog'lom Odat Giyohi";
      case 'gullagan': return 'Muvaffaqiyat Daraxti';
      default: return 'Hayot Daraxti';
    }
  };

  return (
    <div className="card" style={{ 
      background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.12), rgba(224, 124, 84, 0.08))', 
      borderColor: 'rgba(16, 185, 129, 0.35)',
      boxShadow: '0 10px 30px rgba(16, 185, 129, 0.1)' 
    }}>
      <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem' }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div className="card-title" style={{ color: 'var(--accent-emerald-light)' }}>
            <Sparkles size={20} className="pulse" /> {t.vitalityTreeTitle}
          </div>
          <p className="card-subtitle" style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>
            {t.treeSubtitle}
          </p>
        </div>
        <div className="streak-badge" style={{ flexShrink: 0, whiteSpace: 'nowrap' }}>
          <Flame size={14} color="var(--accent-amber)" /> {streakCount} {t.streak}
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', margin: '1.25rem 0' }}>
        <div className="pulse" style={{ 
          fontSize: '5rem', 
          width: '110px', 
          height: '110px', 
          background: 'linear-gradient(135deg, var(--bg-secondary), rgba(16, 185, 129, 0.15))', 
          borderRadius: '50%', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          border: '2px solid rgba(16, 185, 129, 0.4)',
          boxShadow: '0 10px 30px rgba(16, 185, 129, 0.25)'
        }}>
          {getStageEmoji()}
        </div>

        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.45rem' }}>
            <span style={{ fontWeight: '800', fontSize: '1.15rem', color: 'var(--text-primary)' }}>{getStageName()}</span>
            <span style={{ fontSize: '0.85rem', color: 'var(--accent-emerald-light)', fontWeight: '700', background: 'var(--accent-emerald-bg)', padding: '0.2rem 0.6rem', borderRadius: 'var(--radius-full)' }}>
              {t.level} {level} / 4
            </span>
          </div>

          <div className="progress-bar-bg" style={{ height: '14px' }}>
            <div className="progress-bar-fill" style={{ width: `${progress}%` }}></div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', color: 'var(--text-secondary)', marginTop: '0.4rem', fontWeight: '600' }}>
            <span>{t.target}: {progress}%</span>
            <span>+{(100 - progress)}%</span>
          </div>
        </div>
      </div>

      <div style={{ 
        background: 'rgba(0, 0, 0, 0.2)', 
        padding: '0.85rem 1.15rem', 
        borderRadius: 'var(--radius-md)', 
        fontSize: '0.85rem', 
        color: 'var(--text-primary)', 
        display: 'flex', 
        alignItems: 'center', 
        gap: '0.6rem',
        border: '1px solid rgba(255, 255, 255, 0.06)'
      }}>
        <Trophy size={18} color="var(--accent-amber-light)" style={{ flexShrink: 0 }} />
        <span>{t.treeDesc}</span>
      </div>
    </div>
  );
}

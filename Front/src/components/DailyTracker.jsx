import React, { useState } from 'react';
import { Droplet, Pill, Activity, Moon, Plus, Minus, Check, RotateCcw, Zap } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useLanguage } from '../services/LanguageContext';

export default function DailyTracker({ data, onUpdateData }) {
  const { waterIntake, waterTarget, meds, exerciseMinutes, exerciseTarget, sleepHours } = data;
  const { t } = useLanguage();

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.8 }
      });
    } catch (e) {
      // fallback
    }
  };

  const handleAddWater = (amount = 250) => {
    const nextWater = Math.min(waterIntake + amount, 5000);
    onUpdateData({ waterIntake: nextWater });
    if (nextWater >= waterTarget && waterIntake < waterTarget) {
      triggerConfetti();
    }
  };

  const handleSubtractWater = (amount = 250) => {
    const nextWater = Math.max(waterIntake - amount, 0);
    onUpdateData({ waterIntake: nextWater });
  };

  const handleResetWater = () => {
    onUpdateData({ waterIntake: 0 });
  };

  const handleToggleMed = (id) => {
    const updatedMeds = meds.map(m => m.id === id ? { ...m, taken: !m.taken } : m);
    onUpdateData({ meds: updatedMeds });
    triggerConfetti();
  };

  const handleAddExercise = (mins) => {
    const nextMins = exerciseMinutes + mins;
    onUpdateData({ exerciseMinutes: nextMins });
    triggerConfetti();
  };

  const handleResetExercise = () => {
    onUpdateData({ exerciseMinutes: 0 });
  };

  const handleSleepChange = (e) => {
    onUpdateData({ sleepHours: parseFloat(e.target.value) });
  };

  const waterPercent = Math.min(Math.round((waterIntake / waterTarget) * 100), 100);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      
      {/* 1. Suv Balansi Card */}
      <div className="card">
        <div className="card-header">
          <div className="card-title" style={{ color: 'var(--accent-coral)' }}>
            <Droplet size={20} /> {t.waterTitle}
          </div>
          <span style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--accent-coral-light)' }}>
            {waterIntake} / {waterTarget} ml ({waterPercent}%)
          </span>
        </div>

        <div className="progress-bar-bg">
          <div className="progress-bar-fill" style={{ 
            width: `${waterPercent}%`,
            background: 'linear-gradient(90deg, #e07c54, #d4613a)'
          }}></div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            <button className="quick-action-btn" onClick={() => handleSubtractWater(250)} style={{ background: 'rgba(244, 63, 94, 0.15)', color: '#f43f5e', borderColor: 'rgba(244, 63, 94, 0.3)' }}>
              <Minus size={16} /> {t.waterSub}
            </button>
            <button className="quick-action-btn" onClick={() => handleAddWater(250)} style={{ background: 'rgba(224, 124, 84, 0.15)', color: '#e07c54', borderColor: 'rgba(224, 124, 84, 0.3)' }}>
              <Plus size={16} /> {t.waterAddCup}
            </button>
            <button className="quick-action-btn" onClick={() => handleAddWater(500)} style={{ background: 'rgba(224, 124, 84, 0.15)', color: '#e07c54', borderColor: 'rgba(224, 124, 84, 0.3)' }}>
              <Plus size={16} /> {t.waterAddBottle}
            </button>
          </div>
          
          <button className="btn-icon" onClick={handleResetWater} title={t.reset} style={{ width: '34px', height: '34px' }}>
            <RotateCcw size={14} />
          </button>
        </div>
      </div>

      {/* 2. Dori Vaqti Eslatmasi Card */}
      <div className="card">
        <div className="card-header">
          <div className="card-title" style={{ color: 'var(--accent-amber)' }}>
            <Pill size={20} /> {t.medTitle}
          </div>
          <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>{t.medTracker}</span>
        </div>

        <div>
          {meds.map((med) => (
            <div key={med.id} className={`med-item ${med.taken ? 'completed' : ''}`}>
              <div className="med-info">
                <h4>{med.name}</h4>
                <p>⏰ {med.time} — {med.note}</p>
              </div>
              <button 
                className={`check-btn ${med.taken ? 'active' : ''}`}
                onClick={() => handleToggleMed(med.id)}
                title={med.taken ? t.medTaken : t.medPending}
              >
                <Check size={18} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Mashg'ulot & Harakat Card */}
      <div className="card">
        <div className="card-header">
          <div className="card-title" style={{ color: 'var(--accent-emerald-light)' }}>
            <Activity size={20} /> {t.exerciseTitle}
          </div>
          <span style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--accent-emerald-light)' }}>
            {exerciseMinutes} / {exerciseTarget} {t.mins}
          </span>
        </div>

        <div className="progress-bar-bg">
          <div className="progress-bar-fill" style={{ width: `${Math.min((exerciseMinutes / exerciseTarget) * 100, 100)}%` }}></div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            <button className="quick-action-btn" onClick={() => handleAddExercise(5)}>
              <Zap size={14} /> +5 {t.mins}
            </button>
            <button className="quick-action-btn" onClick={() => handleAddExercise(15)}>
              <Zap size={14} /> +15 {t.mins}
            </button>
            <button className="quick-action-btn" onClick={() => handleAddExercise(30)}>
              <Zap size={14} /> +30 {t.mins}
            </button>
          </div>

          <button className="btn-icon" onClick={handleResetExercise} title={t.reset} style={{ width: '34px', height: '34px' }}>
            <RotateCcw size={14} />
          </button>
        </div>
      </div>

      {/* 4. Uyqu Sifati Card */}
      <div className="card">
        <div className="card-header">
          <div className="card-title" style={{ color: '#8b5cf6' }}>
            <Moon size={20} /> {t.sleepTitle}
          </div>
          <span style={{ fontSize: '0.9rem', fontWeight: '700', color: '#a78bfa' }}>
            {sleepHours} {t.sleepHours}
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '0.5rem' }}>
          <input 
            type="range" 
            min="4" 
            max="12" 
            step="0.5" 
            value={sleepHours}
            onChange={handleSleepChange}
            style={{ flex: 1, accentColor: '#8b5cf6', cursor: 'pointer' }}
          />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
          <span>4 Soat</span>
          <span>8 Soat (Optimal)</span>
          <span>12 Soat</span>
        </div>
      </div>

    </div>
  );
}

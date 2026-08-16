import React from 'react';
import { Activity, Flame, HeartPulse, ShieldCheck, Sparkles, Crown, ArrowRight, Zap, CheckCircle2, Droplets, Dumbbell, Moon, Pill, TrendingUp, Users, Smartphone, Shield, BookOpen } from 'lucide-react';

export default function HomePage({ onOpenDashboard, onOpenLogin, onOpenPricing }) {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--bg-primary)',
      backgroundImage: 'radial-gradient(ellipse 80% 60% at 50% 10%, rgba(16, 185, 129, 0.09) 0%, transparent 60%), radial-gradient(ellipse 60% 50% at 90% 90%, rgba(224, 124, 84, 0.09) 0%, transparent 55%)',
      color: 'var(--text-primary)',
      padding: '1.5rem 1.25rem 5rem',
      animation: 'fadeIn 0.5s ease-out'
    }}>
      
      {/* Home Page Navbar Header */}
      <nav style={{
        maxWidth: '1140px', margin: '0 auto 3.5rem', display: 'flex',
        alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem',
        padding: '1rem 1.5rem', background: 'var(--bg-card)', backdropFilter: 'blur(20px)',
        border: '1px solid var(--border-default)', borderRadius: 'var(--radius-xl)',
        boxShadow: 'var(--shadow-md)'
      }}>
        <div className="brand-logo" style={{ cursor: 'pointer' }} onClick={onOpenDashboard}>
          <div className="brand-icon-wrapper">🌱</div>
          <div className="brand-title-group">
            <h1 style={{ fontSize: '1.4rem' }}>HayotRitmi</h1>
            <span className="brand-tagline">Kundalik Sog'liq va Odatlar Portali</span>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
          <button 
            className="quick-action-btn"
            onClick={onOpenLogin}
            style={{ background: 'var(--bg-tertiary)', color: 'var(--text-primary)', borderColor: 'var(--border-default)' }}
          >
            Tizimga Kirish
          </button>
          
          <button 
            className="quick-action-btn"
            onClick={onOpenDashboard}
            style={{ background: 'linear-gradient(135deg, var(--accent-emerald), #0d9668)', color: '#ffffff', border: 'none', boxShadow: 'var(--shadow-emerald-glow)' }}
          >
            Ilovani Boshlash <ArrowRight size={18} />
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <div style={{ maxWidth: '1050px', margin: '0 auto 5rem', textAlign: 'center' }}>
        
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
          background: 'var(--accent-emerald-bg)', color: 'var(--accent-emerald-light)',
          padding: '0.45rem 1.15rem', borderRadius: 'var(--radius-full)',
          border: '1px solid rgba(16, 185, 129, 0.3)', fontWeight: '800',
          fontSize: '0.88rem', marginBottom: '1.5rem', boxShadow: 'var(--shadow-xs)'
        }}>
          <Sparkles size={16} /> Sog'liq, Sport va Tibbiyot Hackathon Loyihasi 2026
        </div>

        <h1 style={{
          fontSize: 'clamp(2.3rem, 5vw, 3.8rem)', fontWeight: '900', lineHeight: '1.15',
          letterSpacing: '-0.04em', marginBottom: '1.5rem',
          background: 'linear-gradient(135deg, var(--text-primary) 30%, var(--accent-emerald-light) 70%, var(--accent-coral-light) 100%)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'
        }}>
          Hayotingiz Ritmini Egallang va Odatlaringizni O'stiring!
        </h1>

        <p style={{
          fontSize: '1.2rem', color: 'var(--text-secondary)', maxWidth: '780px',
          margin: '0 auto 2.5rem', lineHeight: '1.65', fontWeight: '500'
        }}>
          Oddiy 1-tap logging, gamifikatsiyalangan Vitality Tree daraxti, favqulodda ICE SOS kartasi va sun'iy intellekt yordamchisi bilan sog'lom turmush tarzini shakllantiring.
        </p>

        {/* Action Buttons */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <button 
            className="quick-action-btn"
            onClick={onOpenDashboard}
            style={{
              padding: '0.95rem 2.25rem', fontSize: '1.1rem', borderRadius: 'var(--radius-md)',
              background: 'linear-gradient(135deg, var(--accent-emerald), #0d9668)',
              color: '#ffffff', border: 'none', fontWeight: '800', boxShadow: 'var(--shadow-lg), 0 0 30px rgba(16, 185, 129, 0.25)'
            }}
          >
            <Activity size={20} /> Tracker Interfeysiga O'tish
          </button>

          <button 
            className="quick-action-btn"
            onClick={onOpenPricing}
            style={{
              padding: '0.95rem 2rem', fontSize: '1.1rem', borderRadius: 'var(--radius-md)',
              background: 'var(--accent-amber-bg)', color: 'var(--accent-amber-light)',
              borderColor: 'rgba(245, 158, 11, 0.35)', fontWeight: '800'
            }}
          >
            <Crown size={20} /> Tariflar va Imkoniyatlar
          </button>
        </div>

      </div>

      {/* Feature Showcase Grid (4 Pillars) */}
      <div style={{ maxWidth: '1140px', margin: '0 auto 5rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '2.1rem', fontWeight: '900', letterSpacing: '-0.03em', marginBottom: '0.75rem' }}>
            Nega Aynan HayotRitmi?
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem' }}>
            Murakkab formalar o'rniga 1 marta bosish va natijani ko'rish
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
          
          <div className="card" style={{ padding: '1.75rem' }}>
            <div style={{
              width: '48px', height: '48px', borderRadius: 'var(--radius-md)',
              background: 'var(--accent-emerald-bg)', color: 'var(--accent-emerald-light)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem'
            }}>
              <Droplets size={24} />
            </div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '800', marginBottom: '0.6rem' }}>1-Tap Tracking</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.6' }}>
              Suv (+250ml, -250ml), mashq daqiqalari, uyqu va dori qabul qilishni bitta bosishda qayd eting.
            </p>
          </div>

          <div className="card" style={{ padding: '1.75rem' }}>
            <div style={{
              width: '48px', height: '48px', borderRadius: 'var(--radius-md)',
              background: 'var(--accent-coral-bg)', color: 'var(--accent-coral-light)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem'
            }}>
              <Flame size={24} />
            </div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '800', marginBottom: '0.6rem' }}>Vitality Tree Gamifikatsiya</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.6' }}>
              Urug'dan o'sib gullaydigan daraxt va ketma-ket Streak nishonlari bilan odat hosil qiling.
            </p>
          </div>

          <div className="card" style={{ padding: '1.75rem' }}>
            <div style={{
              width: '48px', height: '48px', borderRadius: 'var(--radius-md)',
              background: 'rgba(245, 158, 11, 0.15)', color: 'var(--accent-amber-light)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem'
            }}>
              <HeartPulse size={24} />
            </div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '800', marginBottom: '0.6rem' }}>Favqulodda ICE SOS</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.6' }}>
              103 tez tibbiy yordam chaqiruvi va shaffof tibbiy karta bilan favqulodda tayyor bo'ling.
            </p>
          </div>

          <div className="card" style={{ padding: '1.75rem' }}>
            <div style={{
              width: '48px', height: '48px', borderRadius: 'var(--radius-md)',
              background: 'rgba(139, 92, 246, 0.15)', color: '#a78bfa',
              display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem'
            }}>
              <ShieldCheck size={24} />
            </div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '800', marginBottom: '0.6rem' }}>100% Data Maxfiyligi</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.6' }}>
              Barcha shaxsiy ma'lumotlaringiz xavfsiz shifrlanadi, JSON formatda yuklab olish mumkin.
            </p>
          </div>

        </div>
      </div>

      {/* Stats Counter Banner */}
      <div className="card" style={{ maxWidth: '1140px', margin: '0 auto 5rem', padding: '2.5rem 2rem', background: 'linear-gradient(135deg, var(--bg-card), var(--bg-tertiary))' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '2rem', textAlign: 'center' }}>
          <div>
            <div style={{ fontSize: '2.5rem', fontWeight: '900', color: 'var(--accent-emerald-light)' }}>100%</div>
            <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Tezkor 1-Tap Log</div>
          </div>
          <div>
            <div style={{ fontSize: '2.5rem', fontWeight: '900', color: 'var(--accent-coral-light)' }}>7 Kun</div>
            <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Safar Simulyatori</div>
          </div>
          <div>
            <div style={{ fontSize: '2.5rem', fontWeight: '900', color: 'var(--accent-amber-light)' }}>REST API</div>
            <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>SQLite Full-Stack</div>
          </div>
          <div>
            <div style={{ fontSize: '2.5rem', fontWeight: '900', color: '#a78bfa' }}>0 Error</div>
            <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Barqaror Tizim</div>
          </div>
        </div>
      </div>

      {/* CTA Footer Section */}
      <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '2rem', fontWeight: '900', letterSpacing: '-0.03em', marginBottom: '1rem' }}>
          Odatlaringizni Bugundanoq O'stiring!
        </h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', fontSize: '1.05rem' }}>
          Hech qanday murakkab sozlamalarsiz hoziroq foydalanishni boshlang.
        </p>
        <button 
          className="quick-action-btn"
          onClick={onOpenDashboard}
          style={{
            padding: '1rem 2.5rem', fontSize: '1.15rem', borderRadius: 'var(--radius-md)',
            background: 'linear-gradient(135deg, var(--accent-emerald), #0d9668)',
            color: '#ffffff', border: 'none', fontWeight: '800', boxShadow: 'var(--shadow-lg)'
          }}
        >
          HayotRitmi Ilovasini Ochish <ArrowRight size={20} />
        </button>
      </div>

    </div>
  );
}

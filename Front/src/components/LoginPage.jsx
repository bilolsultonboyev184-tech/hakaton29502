import React, { useState } from 'react';
import { apiService } from '../services/api';
import { User, Lock, Mail, LogIn, UserPlus, Eye, EyeOff, Crown, Shield, Zap, Sparkles, CheckCircle2, Flame, HeartPulse, Activity, ArrowRight, ShieldCheck, ArrowLeft, LayoutDashboard } from 'lucide-react';

export default function LoginPage({ currentUser, onAuthSuccess, onLogout, onGoToDashboard }) {
  const [isLoginView, setIsLoginView] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');
    setLoading(true);

    try {
      if (isLoginView) {
        const res = await apiService.login(email, password);
        setSuccessMsg("Tizimga muvaffaqiyatli kirdingiz!");
        setTimeout(() => {
          onAuthSuccess(res.user);
          if (onGoToDashboard) onGoToDashboard();
        }, 500);
      } else {
        const res = await apiService.register(email, password, fullName);
        setSuccessMsg("Akkaunt muvaffaqiyatli yaratildi!");
        setTimeout(() => {
          onAuthSuccess(res.user);
          if (onGoToDashboard) onGoToDashboard();
        }, 500);
      }
    } catch (err) {
      setErrorMsg(err.message || "Xatolik yuz berdi. Qayta urinib ko'ring.");
    } finally {
      setLoading(false);
    }
  };

  const handleDirectDemoLogin = () => {
    const demoUser = {
      id: 'demo_' + Date.now(),
      email: 'demo@hayotritmi.uz',
      full_name: 'Demo Foydalanuvchi',
      role: 'user',
      plan_tier: 'free'
    };
    localStorage.setItem('hr_jwt_token', 'demo_token_' + Date.now());
    localStorage.setItem('hr_mock_user', JSON.stringify(demoUser));
    onAuthSuccess(demoUser);
    if (onGoToDashboard) onGoToDashboard();
  };

  const handleDirectAdminLogin = () => {
    const adminUser = {
      id: 'admin_' + Date.now(),
      email: 'admin@hayotritmi.uz',
      full_name: 'Administrator',
      role: 'admin',
      plan_tier: 'pro'
    };
    localStorage.setItem('hr_jwt_token', 'admin_token_' + Date.now());
    localStorage.setItem('hr_mock_user', JSON.stringify(adminUser));
    onAuthSuccess(adminUser);
    if (onGoToDashboard) onGoToDashboard();
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--bg-primary)',
      backgroundImage: 'radial-gradient(ellipse 80% 60% at 50% 10%, rgba(16, 185, 129, 0.08) 0%, transparent 60%), radial-gradient(ellipse 60% 50% at 90% 90%, rgba(224, 124, 84, 0.08) 0%, transparent 55%)',
      color: 'var(--text-primary)',
      padding: '1.5rem 1.25rem 4rem',
      animation: 'fadeIn 0.4s ease-out'
    }}>
      
      {/* Standalone Page Header */}
      <div style={{
        maxWidth: '1100px', margin: '0 auto 2.5rem', display: 'flex',
        alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem'
      }}>
        <div className="brand-logo">
          <div className="brand-icon-wrapper">🌱</div>
          <div className="brand-title-group">
            <h1 style={{ fontSize: '1.5rem' }}>HayotRitmi</h1>
            <span className="brand-tagline">Tizimga Kirish va Ro'yxatdan O'tish Portali</span>
          </div>
        </div>

        <button 
          className="quick-action-btn"
          onClick={onGoToDashboard}
          style={{ background: 'var(--bg-tertiary)', color: 'var(--text-primary)', borderColor: 'var(--border-default)' }}
        >
          <LayoutDashboard size={18} /> Mehmon Sifatida Ilovaga O'tish <ArrowRight size={18} />
        </button>
      </div>

      {currentUser ? (
        /* Logged In Full Page View */
        <div className="card" style={{ maxWidth: '850px', margin: '2rem auto', padding: '2.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
              <div style={{
                width: '72px', height: '72px', borderRadius: 'var(--radius-lg)',
                background: 'linear-gradient(135deg, var(--accent-emerald), var(--accent-coral))',
                color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontWeight: '900', fontSize: '2rem', boxShadow: 'var(--shadow-lg)'
              }}>
                {currentUser.full_name ? currentUser.full_name[0].toUpperCase() : 'U'}
              </div>
              <div>
                <h2 style={{ fontSize: '1.75rem', fontWeight: '900', letterSpacing: '-0.03em' }}>{currentUser.full_name}</h2>
                <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)' }}>{currentUser.email}</p>
              </div>
            </div>
            
            <div className="streak-badge" style={{ fontSize: '1rem', padding: '0.6rem 1.25rem' }}>
              <Crown size={20} color="var(--accent-amber)" /> {currentUser.plan_tier === 'pro' ? 'Pro Obunachi' : 'Bepul Tarif'}
            </div>
          </div>

          {/* Account Stats Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem', marginBottom: '2rem' }}>
            <div style={{ background: 'var(--bg-tertiary)', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-default)' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.3rem' }}>Sinxronizatsiya Holati</span>
              <strong style={{ fontSize: '1.1rem', color: 'var(--accent-emerald-light)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <CheckCircle2 size={18} /> SQLite Cloud Active
              </strong>
            </div>

            <div style={{ background: 'var(--bg-tertiary)', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-default)' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.3rem' }}>Maxfiylik Kafolati</span>
              <strong style={{ fontSize: '1.1rem', color: 'var(--accent-coral-light)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <ShieldCheck size={18} /> 100% Shaxsiy
              </strong>
            </div>

            <div style={{ background: 'var(--bg-tertiary)', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-default)' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.3rem' }}>Tarif Imkoniyati</span>
              <strong style={{ fontSize: '1.1rem', color: 'var(--accent-amber-light)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Zap size={18} /> {currentUser.plan_tier === 'pro' ? 'Cheksiz AI & ICE' : 'Asosiy Funksiyalar'}
              </strong>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <button 
              className="quick-action-btn"
              onClick={onGoToDashboard}
              style={{ flex: 1, minWidth: '200px', justifyContent: 'center', padding: '0.85rem', fontSize: '1rem' }}
            >
              <Activity size={18} /> Main Dashboardga O'tish <ArrowRight size={18} />
            </button>
            <button 
              onClick={onLogout}
              style={{
                flex: 1, minWidth: '200px', padding: '0.85rem', borderRadius: 'var(--radius-md)',
                background: 'var(--accent-rose-bg)', color: 'var(--accent-rose-light)',
                border: '1px solid rgba(244, 63, 94, 0.3)', fontWeight: '800', fontSize: '1rem',
                cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem'
              }}
            >
              Tizimdan Chiqish
            </button>
          </div>
        </div>
      ) : (
        /* Grand Standalone Full Page Login / Register Showcase */
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          gap: '2.5rem', alignItems: 'center', maxWidth: '1100px', margin: '0 auto'
        }}>
          
          {/* Left Hero Feature Showcase */}
          <div>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              background: 'var(--accent-coral-bg)', color: 'var(--accent-coral-light)',
              padding: '0.4rem 0.95rem', borderRadius: 'var(--radius-full)',
              border: '1px solid rgba(224, 124, 84, 0.3)', fontWeight: '800',
              fontSize: '0.85rem', marginBottom: '1.25rem'
            }}>
              <Sparkles size={16} /> HayotRitmi Standalone Auth 2.0
            </div>

            <h1 style={{
              fontSize: '2.5rem', fontWeight: '900', lineHeight: '1.2',
              letterSpacing: '-0.035em', marginBottom: '1rem',
              background: 'linear-gradient(135deg, var(--text-primary) 30%, var(--accent-emerald-light))',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'
            }}>
              Sog'lig'ingiz va Odatlaringiz Bir Joyda!
            </h1>

            <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '2rem' }}>
              Ro'yxatdan o'ting va kunlik suv, harakat, uyqu hamda dorilaringizni bulutda xavfsiz saqlang. Har bir odatingiz Vitality Tree darachtini o'stiradi!
            </p>

            {/* Feature Bullets */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.15rem' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.85rem' }}>
                <div style={{
                  width: '38px', height: '38px', borderRadius: 'var(--radius-sm)',
                  background: 'var(--accent-emerald-bg)', color: 'var(--accent-emerald-light)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
                }}>
                  <Flame size={20} />
                </div>
                <div>
                  <h4 style={{ fontWeight: '800', fontSize: '1.05rem' }}>Streak & Gamification</h4>
                  <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>Ketma-ket kunlik odatlar bilan mukofot nishonlarini qo'lga kiriting</p>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.85rem' }}>
                <div style={{
                  width: '38px', height: '38px', borderRadius: 'var(--radius-sm)',
                  background: 'var(--accent-coral-bg)', color: 'var(--accent-coral-light)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
                }}>
                  <HeartPulse size={20} />
                </div>
                <div>
                  <h4 style={{ fontWeight: '800', fontSize: '1.05rem' }}>Tezkor ICE SOS Kartasi</h4>
                  <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>Favqulodda vaziyatlarda 103 qutqaruv va shaffof tibbiy karta</p>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.85rem' }}>
                <div style={{
                  width: '38px', height: '38px', borderRadius: 'var(--radius-sm)',
                  background: 'rgba(245, 158, 11, 0.15)', color: 'var(--accent-amber-light)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
                }}>
                  <ShieldCheck size={20} />
                </div>
                <div>
                  <h4 style={{ fontWeight: '800', fontSize: '1.05rem' }}>100% Maxfiylik</h4>
                  <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>Ma'lumotlar shaffofligi va shifrlangan saqlash kafolati</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Login / Register Card Form */}
          <div className="card" style={{ padding: '2.25rem', boxShadow: 'var(--shadow-xl)', border: '1px solid var(--border-hover)' }}>
            
            {/* View Switcher Tabs */}
            <div style={{
              display: 'flex', background: 'var(--bg-tertiary)', padding: '0.35rem',
              borderRadius: 'var(--radius-md)', border: '1px solid var(--border-default)',
              marginBottom: '1.75rem'
            }}>
              <button
                type="button"
                onClick={() => { setIsLoginView(true); setErrorMsg(''); setSuccessMsg(''); }}
                style={{
                  flex: 1, padding: '0.75rem', border: 'none', borderRadius: 'var(--radius-sm)',
                  background: isLoginView ? 'var(--bg-card)' : 'transparent',
                  color: isLoginView ? 'var(--accent-coral-light)' : 'var(--text-muted)',
                  fontWeight: '800', fontSize: '0.95rem', cursor: 'pointer', transition: 'all var(--transition-fast)',
                  boxShadow: isLoginView ? 'var(--shadow-xs)' : 'none'
                }}
              >
                Tizimga Kirish
              </button>
              <button
                type="button"
                onClick={() => { setIsLoginView(false); setErrorMsg(''); setSuccessMsg(''); }}
                style={{
                  flex: 1, padding: '0.75rem', border: 'none', borderRadius: 'var(--radius-sm)',
                  background: !isLoginView ? 'var(--bg-card)' : 'transparent',
                  color: !isLoginView ? 'var(--accent-coral-light)' : 'var(--text-muted)',
                  fontWeight: '800', fontSize: '0.95rem', cursor: 'pointer', transition: 'all var(--transition-fast)',
                  boxShadow: !isLoginView ? 'var(--shadow-xs)' : 'none'
                }}
              >
                Ro'yxatdan O'tish
              </button>
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.15rem' }}>
              
              {errorMsg && (
                <div style={{
                  background: 'var(--accent-rose-bg)', color: 'var(--accent-rose-light)',
                  border: '1px solid rgba(244, 63, 94, 0.3)', padding: '0.85rem 1rem',
                  borderRadius: 'var(--radius-sm)', fontSize: '0.88rem', fontWeight: '600'
                }}>
                  ⚠️ {errorMsg}
                </div>
              )}

              {successMsg && (
                <div style={{
                  background: 'var(--accent-emerald-bg)', color: 'var(--accent-emerald-light)',
                  border: '1px solid rgba(16, 185, 129, 0.3)', padding: '0.85rem 1rem',
                  borderRadius: 'var(--radius-sm)', fontSize: '0.88rem', fontWeight: '600',
                  display: 'flex', alignItems: 'center', gap: '0.5rem'
                }}>
                  <CheckCircle2 size={18} /> {successMsg}
                </div>
              )}

              {!isLoginView && (
                <div>
                  <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: '700', display: 'block', marginBottom: '0.4rem' }}>
                    Ism va Familiyangiz
                  </label>
                  <div style={{ position: 'relative' }}>
                    <User size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                    <input 
                      type="text" 
                      placeholder="Ali Valiyev" 
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      required
                      style={{
                        width: '100%', padding: '0.85rem 0.85rem 0.85rem 2.6rem',
                        borderRadius: 'var(--radius-sm)', background: 'var(--bg-tertiary)',
                        border: '1px solid var(--border-default)', color: 'var(--text-primary)',
                        fontSize: '0.95rem', outline: 'none'
                      }}
                    />
                  </div>
                </div>
              )}

              <div>
                <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: '700', display: 'block', marginBottom: '0.4rem' }}>
                  Email Manzilingiz
                </label>
                <div style={{ position: 'relative' }}>
                  <Mail size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                  <input 
                    type="email" 
                    placeholder="ali@example.com" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    style={{
                      width: '100%', padding: '0.85rem 0.85rem 0.85rem 2.6rem',
                      borderRadius: 'var(--radius-sm)', background: 'var(--bg-tertiary)',
                      border: '1px solid var(--border-default)', color: 'var(--text-primary)',
                      fontSize: '0.95rem', outline: 'none'
                    }}
                  />
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: '700', display: 'block', marginBottom: '0.4rem' }}>
                  Maxfiy Parolingiz
                </label>
                <div style={{ position: 'relative' }}>
                  <Lock size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                  <input 
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    style={{
                      width: '100%', padding: '0.85rem 2.8rem 0.85rem 2.6rem',
                      borderRadius: 'var(--radius-sm)', background: 'var(--bg-tertiary)',
                      border: '1px solid var(--border-default)', color: 'var(--text-primary)',
                      fontSize: '0.95rem', outline: 'none'
                    }}
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    style={{
                      position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)',
                      background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: 0
                    }}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <button 
                type="submit" 
                className="quick-action-btn" 
                disabled={loading} 
                style={{
                  width: '100%', justifyContent: 'center', padding: '0.9rem', marginTop: '0.5rem',
                  background: 'linear-gradient(135deg, var(--accent-emerald), #0d9668)',
                  color: '#ffffff', border: 'none', fontWeight: '800', fontSize: '1rem'
                }}
              >
                {loading ? 'Bajarilmoqda...' : (isLoginView ? 'Tizimga Kirish' : "Ro'yxatdan O'tish")}
              </button>

              {/* 1-Click Demo Login Button */}
              <button 
                type="button"
                onClick={handleDirectDemoLogin}
                style={{
                  width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-sm)',
                  background: 'var(--accent-coral-bg)', color: 'var(--accent-coral-light)',
                  border: '1px dashed rgba(224, 124, 84, 0.4)', fontSize: '0.88rem',
                  fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center',
                  justifyContent: 'center', gap: '0.5rem', marginTop: '0.3rem'
                }}
              >
                <Sparkles size={16} /> Demo Akkaunt Bilan Kirish (1-Click)
              </button>

              {/* 1-Click Admin Login Button */}
              <button 
                type="button"
                onClick={handleDirectAdminLogin}
                style={{
                  width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-sm)',
                  background: 'var(--accent-rose-bg)', color: 'var(--accent-rose-light)',
                  border: '1px solid rgba(239, 68, 68, 0.4)', fontSize: '0.88rem',
                  fontWeight: '800', cursor: 'pointer', display: 'flex', alignItems: 'center',
                  justifyContent: 'center', gap: '0.5rem', marginTop: '0.2rem'
                }}
              >
                <ShieldCheck size={16} /> 🔑 Admin Akkaunti Bilan Kirish (Full Rights)
              </button>
            </form>
          </div>

        </div>
      )}

    </div>
  );
}

import React, { useState } from 'react';
import { apiService } from '../services/api';
import { User, Lock, Mail, LogIn, UserPlus, X, Eye, EyeOff, Crown, Shield, Zap, Sparkles, CheckCircle2 } from 'lucide-react';

export default function AuthModal({ isOpen, onClose, currentUser, onAuthSuccess, onLogout }) {
  const [isLoginView, setIsLoginView] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

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
          onClose();
        }, 500);
      } else {
        const res = await apiService.register(email, password, fullName);
        setSuccessMsg("Akkaunt muvaffaqiyatli yaratildi!");
        setTimeout(() => {
          onAuthSuccess(res.user);
          onClose();
        }, 500);
      }
    } catch (err) {
      setErrorMsg(err.message || "Xatolik yuz berdi. Qayta urinib ko'ring.");
    } finally {
      setLoading(false);
    }
  };

  const handleDemoFill = () => {
    setEmail('demo@hayotritmi.uz');
    setPassword('123456');
    if (!isLoginView) {
      setFullName('Demo Foydalanuvchi');
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content" style={{ maxWidth: '440px', padding: '1.75rem' }}>
        
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <div style={{
              width: '36px', height: '36px', borderRadius: 'var(--radius-sm)',
              background: 'var(--accent-coral-bg)', color: 'var(--accent-coral-light)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              border: '1px solid rgba(224, 124, 84, 0.25)'
            }}>
              {currentUser ? <User size={20} /> : (isLoginView ? <LogIn size={20} /> : <UserPlus size={20} />)}
            </div>
            <div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: '800', letterSpacing: '-0.02em' }}>
                {currentUser ? "Shaxsiy Profil" : (isLoginView ? 'Tizimga Kirish' : "Ro'yxatdan O'tish")}
              </h3>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                {currentUser ? "Sog'liq ma'lumotlaringiz xavfsiz saqlanadi" : "HayotRitmi xizmatidan to'liq foydalaning"}
              </p>
            </div>
          </div>
          <button className="btn-icon" onClick={onClose} style={{ width: '32px', height: '32px' }}>
            <X size={16} />
          </button>
        </div>

        {currentUser ? (
          /* Profile View */
          <div>
            <div style={{
              background: 'var(--bg-tertiary)', padding: '1.25rem', borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-default)', marginBottom: '1.25rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', marginBottom: '1rem' }}>
                <div style={{
                  width: '52px', height: '52px', borderRadius: 'var(--radius-md)',
                  background: 'linear-gradient(135deg, var(--accent-emerald), var(--accent-coral))',
                  color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontWeight: '900', fontSize: '1.4rem', boxShadow: 'var(--shadow-emerald-glow)'
                }}>
                  {currentUser.full_name ? currentUser.full_name[0].toUpperCase() : 'U'}
                </div>
                <div>
                  <h4 style={{ fontWeight: '800', fontSize: '1.1rem', letterSpacing: '-0.01em' }}>{currentUser.full_name}</h4>
                  <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>{currentUser.email}</p>
                </div>
              </div>

              <div style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                paddingTop: '0.85rem', borderTop: '1px solid var(--border-subtle)', fontSize: '0.85rem'
              }}>
                <span style={{ color: 'var(--text-muted)' }}>Tarif Rejasi:</span>
                <span style={{
                  display: 'inline-flex', alignItems: 'center', gap: '0.35rem',
                  fontWeight: '800', color: currentUser.plan_tier === 'pro' ? 'var(--accent-amber-light)' : 'var(--accent-emerald-light)',
                  background: currentUser.plan_tier === 'pro' ? 'var(--accent-amber-bg)' : 'var(--accent-emerald-bg)',
                  padding: '0.25rem 0.65rem', borderRadius: 'var(--radius-full)',
                  border: '1px solid ' + (currentUser.plan_tier === 'pro' ? 'rgba(245, 158, 11, 0.3)' : 'rgba(16, 185, 129, 0.3)')
                }}>
                  {currentUser.plan_tier === 'pro' ? <Crown size={14} /> : <Zap size={14} />}
                  {currentUser.plan_tier === 'pro' ? 'HayotRitmi Pro' : 'Bepul Tarif'}
                </span>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.65rem', marginBottom: '1.25rem' }}>
              <div style={{
                background: 'var(--bg-tertiary)', padding: '0.75rem', borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--border-subtle)'
              }}>
                <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', display: 'block' }}>Ma'lumotlar</span>
                <strong style={{ fontSize: '0.88rem', color: 'var(--accent-emerald-light)', display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                  <Shield size={12} /> 100% Maxfiy
                </strong>
              </div>
              <div style={{
                background: 'var(--bg-tertiary)', padding: '0.75rem', borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--border-subtle)'
              }}>
                <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', display: 'block' }}>Sinxronizatsiya</span>
                <strong style={{ fontSize: '0.88rem', color: 'var(--accent-coral-light)', display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                  <Sparkles size={12} /> SQLite cloud
                </strong>
              </div>
            </div>

            <button 
              onClick={onLogout}
              style={{
                width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)',
                background: 'var(--accent-rose-bg)', color: 'var(--accent-rose-light)',
                border: '1px solid rgba(244, 63, 94, 0.3)', fontWeight: '800',
                fontSize: '0.9rem', cursor: 'pointer', transition: 'all var(--transition-fast)'
              }}
            >
              Tizimdan Chiqish
            </button>
          </div>
        ) : (
          /* Login / Register Form */
          <div>
            {/* View Switcher Tabs */}
            <div style={{
              display: 'flex', background: 'var(--bg-tertiary)', padding: '0.25rem',
              borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-default)',
              marginBottom: '1.25rem'
            }}>
              <button
                type="button"
                onClick={() => { setIsLoginView(true); setErrorMsg(''); setSuccessMsg(''); }}
                style={{
                  flex: 1, padding: '0.55rem', border: 'none', borderRadius: 'var(--radius-xs)',
                  background: isLoginView ? 'var(--bg-card)' : 'transparent',
                  color: isLoginView ? 'var(--accent-coral-light)' : 'var(--text-muted)',
                  fontWeight: '800', fontSize: '0.82rem', cursor: 'pointer', transition: 'all var(--transition-fast)'
                }}
              >
                Kirish
              </button>
              <button
                type="button"
                onClick={() => { setIsLoginView(false); setErrorMsg(''); setSuccessMsg(''); }}
                style={{
                  flex: 1, padding: '0.55rem', border: 'none', borderRadius: 'var(--radius-xs)',
                  background: !isLoginView ? 'var(--bg-card)' : 'transparent',
                  color: !isLoginView ? 'var(--accent-coral-light)' : 'var(--text-muted)',
                  fontWeight: '800', fontSize: '0.82rem', cursor: 'pointer', transition: 'all var(--transition-fast)'
                }}
              >
                Ro'yxatdan O'tish
              </button>
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              
              {errorMsg && (
                <div style={{
                  background: 'var(--accent-rose-bg)', color: 'var(--accent-rose-light)',
                  border: '1px solid rgba(244, 63, 94, 0.3)', padding: '0.65rem 0.85rem',
                  borderRadius: 'var(--radius-sm)', fontSize: '0.82rem', fontWeight: '600'
                }}>
                  ⚠️ {errorMsg}
                </div>
              )}

              {successMsg && (
                <div style={{
                  background: 'var(--accent-emerald-bg)', color: 'var(--accent-emerald-light)',
                  border: '1px solid rgba(16, 185, 129, 0.3)', padding: '0.65rem 0.85rem',
                  borderRadius: 'var(--radius-sm)', fontSize: '0.82rem', fontWeight: '600',
                  display: 'flex', alignItems: 'center', gap: '0.4rem'
                }}>
                  <CheckCircle2 size={16} /> {successMsg}
                </div>
              )}

              {!isLoginView && (
                <div>
                  <label style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: '700', display: 'block', marginBottom: '0.3rem' }}>
                    Ism va Familiya
                  </label>
                  <div style={{ position: 'relative' }}>
                    <User size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                    <input 
                      type="text" 
                      placeholder="Ali Valiyev" 
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      required
                      style={{
                        width: '100%', padding: '0.65rem 0.65rem 0.65rem 2.3rem',
                        borderRadius: 'var(--radius-sm)', background: 'var(--bg-tertiary)',
                        border: '1px solid var(--border-default)', color: 'var(--text-primary)',
                        fontSize: '0.88rem', outline: 'none'
                      }}
                    />
                  </div>
                </div>
              )}

              <div>
                <label style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: '700', display: 'block', marginBottom: '0.3rem' }}>
                  Email Manzil
                </label>
                <div style={{ position: 'relative' }}>
                  <Mail size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                  <input 
                    type="email" 
                    placeholder="ali@example.com" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    style={{
                      width: '100%', padding: '0.65rem 0.65rem 0.65rem 2.3rem',
                      borderRadius: 'var(--radius-sm)', background: 'var(--bg-tertiary)',
                      border: '1px solid var(--border-default)', color: 'var(--text-primary)',
                      fontSize: '0.88rem', outline: 'none'
                    }}
                  />
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: '700', display: 'block', marginBottom: '0.3rem' }}>
                  Parol
                </label>
                <div style={{ position: 'relative' }}>
                  <Lock size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                  <input 
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    style={{
                      width: '100%', padding: '0.65rem 2.4rem 0.65rem 2.3rem',
                      borderRadius: 'var(--radius-sm)', background: 'var(--bg-tertiary)',
                      border: '1px solid var(--border-default)', color: 'var(--text-primary)',
                      fontSize: '0.88rem', outline: 'none'
                    }}
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    style={{
                      position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)',
                      background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: 0
                    }}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <button 
                type="submit" 
                className="quick-action-btn" 
                disabled={loading} 
                style={{
                  width: '100%', justifyContent: 'center', padding: '0.75rem', marginTop: '0.4rem',
                  background: 'linear-gradient(135deg, var(--accent-emerald), #0d9668)',
                  color: '#ffffff', border: 'none', fontWeight: '800'
                }}
              >
                {loading ? 'Bajarilmoqda...' : (isLoginView ? 'Kirish' : "Ro'yxatdan O'tish")}
              </button>

              {/* 1-Click Demo Fill Button */}
              <button 
                type="button"
                onClick={handleDemoFill}
                style={{
                  width: '100%', padding: '0.55rem', borderRadius: 'var(--radius-sm)',
                  background: 'var(--accent-coral-bg)', color: 'var(--accent-coral-light)',
                  border: '1px dashed rgba(224, 124, 84, 0.4)', fontSize: '0.8rem',
                  fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center',
                  justifyContent: 'center', gap: '0.4rem', marginTop: '0.2rem'
                }}
              >
                <Sparkles size={14} /> Demo Akkaunt Bilan To'ldirish (1-Click)
              </button>
            </form>
          </div>
        )}

      </div>
    </div>
  );
}

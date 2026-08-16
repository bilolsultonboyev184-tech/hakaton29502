import React, { useState, useEffect } from 'react';
import { INITIAL_USER_DATA } from './data/mock7DayData';
import { apiService } from './services/api';
import { useLanguage } from './services/LanguageContext';
import DailyTracker from './components/DailyTracker';
import VitalityTree from './components/VitalityTree';
import SevenDayJourney from './components/SevenDayJourney';
import EmergencyICE from './components/EmergencyICE';
import PrivacyModal from './components/PrivacyModal';
import HabitGuide from './components/HabitGuide';
import AuthModal from './components/AuthModal';
import LoginPage from './components/LoginPage';
import HomePage from './components/HomePage';
import MonetizationModal from './components/MonetizationModal';
import SportsStore, { EXPANDED_PRODUCTS } from './components/SportsStore';
import AdminPanel from './components/AdminPanel';
import { ShieldCheck, Flame, Sun, Moon, AlertTriangle, Calendar, Activity, BookOpen, HeartPulse, User, Crown, Server, LogIn, Home, Globe, Palette, ShoppingBag, ShieldAlert } from 'lucide-react';

export default function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem('hr_theme') || 'sunset');
  const { lang, setLang, t } = useLanguage();
  const [viewMode, setViewMode] = useState('home'); // 'home' | 'app' | 'login'
  const [activeTab, setActiveTab] = useState('tracker'); 
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showMonetizationModal, setShowMonetizationModal] = useState(false);

  const [apiOnline, setApiOnline] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  // Dynamic Products List State (Managed by Admin Panel)
  const [productsList, setProductsList] = useState(() => {
    const saved = localStorage.getItem('hr_admin_products');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return EXPANDED_PRODUCTS;
  });

  useEffect(() => {
    localStorage.setItem('hr_admin_products', JSON.stringify(productsList));
  }, [productsList]);

  const handleAddProduct = (newProduct) => {
    setProductsList(prev => [newProduct, ...prev]);
  };

  const handleUpdateProduct = (updatedProduct) => {
    setProductsList(prev => prev.map(p => p.id === updatedProduct.id ? updatedProduct : p));
  };

  const handleDeleteProduct = (productId) => {
    setProductsList(prev => prev.filter(p => p.id !== productId));
  };

  // App State loaded from localStorage or INITIAL_USER_DATA
  const [userData, setUserData] = useState(() => {
    const saved = localStorage.getItem('hr_user_data');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { }
    }
    return INITIAL_USER_DATA;
  });

  // Current Habit Tree State
  const [treeStage, setTreeStage] = useState('urug');
  const [treeLevel, setTreeLevel] = useState(1);
  const [treeProgress, setTreeProgress] = useState(30);

  // Check Backend Server Connection & Auth on mount
  useEffect(() => {
    const initApi = async () => {
      const healthy = await apiService.checkHealth();
      setApiOnline(healthy);

      if (healthy) {
        const userProfile = await apiService.getMe();
        if (userProfile && userProfile.user) {
          setCurrentUser(userProfile.user);
        }
      }
    };
    initApi();
  }, []);

  // Save to local storage whenever userData changes
  useEffect(() => {
    localStorage.setItem('hr_user_data', JSON.stringify(userData));
    
    const waterPerc = (userData.todayLogs.waterIntake / userData.dailyGoals.waterTargetMl) * 50;
    const medDone = userData.todayLogs.medications.filter(m => m.taken).length;
    const medPerc = (medDone / Math.max(userData.todayLogs.medications.length, 1)) * 50;
    const totalProg = Math.min(Math.round(waterPerc + medPerc), 100);
    setTreeProgress(totalProg);

    if (totalProg >= 90) {
      setTreeStage('gullagan');
      setTreeLevel(4);
    } else if (totalProg >= 60) {
      setTreeStage('kattalashgan');
      setTreeLevel(3);
    } else if (totalProg >= 30) {
      setTreeStage('nihol');
      setTreeLevel(2);
    } else {
      setTreeStage('urug');
      setTreeLevel(1);
    }
  }, [userData]);

  // Apply Theme & Lang to document root
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('hr_theme', theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('hr_lang', lang);
  }, [lang]);

  const cycleTheme = () => {
    const themes = ['sunset', 'emerald', 'cyber', 'light', 'dark'];
    const nextIndex = (themes.indexOf(theme) + 1) % themes.length;
    setTheme(themes[nextIndex]);
  };

  const handleUpdateTracker = (updates) => {
    setUserData(prev => ({
      ...prev,
      todayLogs: {
        ...prev.todayLogs,
        ...(updates.waterIntake !== undefined && { waterIntake: updates.waterIntake }),
        ...(updates.meds !== undefined && { medications: updates.meds }),
        ...(updates.exerciseMinutes !== undefined && { exerciseMinutes: updates.exerciseMinutes }),
        ...(updates.sleepHours !== undefined && { sleepHours: updates.sleepHours })
      }
    }));
  };

  const handleAddAppointment = (newApp) => {
    setUserData(prev => ({
      ...prev,
      todayLogs: {
        ...prev.todayLogs,
        doctorAppointments: [newApp, ...prev.todayLogs.doctorAppointments]
      }
    }));
  };

  const handleApplyJourneyDay = (dayData) => {
    setUserData(prev => ({
      ...prev,
      currentStreak: dayData.streakCount,
      todayLogs: {
        ...prev.todayLogs,
        waterIntake: dayData.waterIntake,
        exerciseMinutes: dayData.exerciseMinutes,
        sleepHours: dayData.sleepHours,
        medications: prev.todayLogs.medications.map(m => ({ ...m, taken: dayData.medsTaken > 0 }))
      }
    }));
  };

  const handleAuthSuccess = (user) => {
    setCurrentUser(user);
    if (user?.email === 'admin@hayotritmi.uz' || user?.role === 'admin') {
      setActiveTab('admin');
    }
    setViewMode('app');
  };

  const handleLogout = () => {
    localStorage.removeItem('hr_jwt_token');
    setCurrentUser(null);
    setShowAuthModal(false);
  };

  const handleUpgradeSuccess = (newPlanTier) => {
    if (currentUser) {
      setCurrentUser(prev => ({ ...prev, plan_tier: newPlanTier }));
    }
  };

  const handleClearData = () => {
    if (window.confirm("Barcha saqlangan ma'lumotlarni o'chirishni tasdiqlaysizmi?")) {
      localStorage.removeItem('hr_user_data');
      setUserData(INITIAL_USER_DATA);
      setShowPrivacyModal(false);
    }
  };

  // Render Standalone Home Page
  if (viewMode === 'home') {
    return (
      <HomePage 
        onOpenDashboard={() => setViewMode('app')}
        onOpenLogin={() => setViewMode('login')}
        onOpenPricing={() => {
          setViewMode('app');
          setShowMonetizationModal(true);
        }}
      />
    );
  }

  // Render Standalone Login Page
  if (viewMode === 'login') {
    return (
      <LoginPage 
        currentUser={currentUser}
        onAuthSuccess={handleAuthSuccess}
        onLogout={handleLogout}
        onGoToDashboard={() => setViewMode('app')}
      />
    );
  }

  return (
    <div className="app-container">
      
      {/* App Header */}
      <header className="app-header">
        <div className="brand-logo" style={{ cursor: 'pointer' }} onClick={() => setViewMode('home')}>
          <div className="brand-icon-wrapper">🌱</div>
          <div className="brand-title-group">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <h1>{t.brandName}</h1>
              {apiOnline && (
                <span style={{ fontSize: '0.7rem', background: 'rgba(16, 185, 129, 0.15)', color: 'var(--accent-emerald-light)', padding: '0.15rem 0.5rem', borderRadius: 'var(--radius-full)', fontWeight: '700', border: '1px solid rgba(16, 185, 129, 0.3)', display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                  <Server size={10} /> REST API Online
                </span>
              )}
            </div>
            <span className="brand-tagline">{t.brandTagline}</span>
          </div>
        </div>

        <div className="header-actions">
          {/* Language Switcher */}
          <div style={{ display: 'flex', alignItems: 'center', background: 'var(--bg-tertiary)', borderRadius: 'var(--radius-full)', padding: '0.15rem', border: '1px solid var(--border-default)' }}>
            <button 
              className={`btn-icon ${lang === 'ozb' ? 'active' : ''}`}
              onClick={() => setLang('ozb')}
              style={{ fontSize: '0.75rem', fontWeight: '800', width: 'auto', padding: '0.2rem 0.5rem', borderRadius: 'var(--radius-full)', background: lang === 'ozb' ? 'var(--accent-emerald-bg)' : 'transparent', color: lang === 'ozb' ? 'var(--accent-emerald-light)' : 'var(--text-muted)' }}
              title="O'zbek tili"
            >
              🇺🇿 O'zb
            </button>
            <button 
              className={`btn-icon ${lang === 'rus' ? 'active' : ''}`}
              onClick={() => setLang('rus')}
              style={{ fontSize: '0.75rem', fontWeight: '800', width: 'auto', padding: '0.2rem 0.5rem', borderRadius: 'var(--radius-full)', background: lang === 'rus' ? 'var(--accent-emerald-bg)' : 'transparent', color: lang === 'rus' ? 'var(--accent-emerald-light)' : 'var(--text-muted)' }}
              title="Русский язык"
            >
              🇷🇺 Рус
            </button>
            <button 
              className={`btn-icon ${lang === 'eng' ? 'active' : ''}`}
              onClick={() => setLang('eng')}
              style={{ fontSize: '0.75rem', fontWeight: '800', width: 'auto', padding: '0.2rem 0.5rem', borderRadius: 'var(--radius-full)', background: lang === 'eng' ? 'var(--accent-emerald-bg)' : 'transparent', color: lang === 'eng' ? 'var(--accent-emerald-light)' : 'var(--text-muted)' }}
              title="English Language"
            >
              🇬🇧 Eng
            </button>
          </div>

          {/* Back to Home Page Trigger */}
          <button 
            className="btn-icon"
            onClick={() => setViewMode('home')}
            title={t.home}
          >
            <Home size={18} color="var(--accent-emerald-light)" />
          </button>

          {/* Pro Upgrade Trigger */}
          <button 
            className="quick-action-btn"
            onClick={() => setShowMonetizationModal(true)}
            style={{ background: 'var(--accent-amber-bg)', color: 'var(--accent-amber)', borderColor: 'rgba(245, 158, 11, 0.3)' }}
          >
            <Crown size={16} /> {currentUser?.plan_tier === 'pro' ? t.proUpgrade : t.proUpgrade}
          </button>

          {/* Standalone Login / Profile Page Trigger */}
          <button 
            className="quick-action-btn"
            onClick={() => setViewMode('login')}
            style={{ background: 'var(--accent-coral-bg)', color: 'var(--accent-coral-light)', borderColor: 'rgba(224, 124, 84, 0.3)' }}
            title={t.login}
          >
            <LogIn size={16} /> {currentUser ? currentUser.full_name.split(' ')[0] : t.login}
          </button>

          {/* Admin Panel Header Trigger for logged in Admin */}
          {(currentUser?.email === 'admin@hayotritmi.uz' || currentUser?.role === 'admin') && (
            <button 
              className="quick-action-btn"
              onClick={() => setActiveTab('admin')}
              style={{ background: 'var(--accent-rose-bg)', color: 'var(--accent-rose-light)', borderColor: 'rgba(239, 68, 68, 0.35)', fontWeight: '800' }}
              title="Admin Panel"
            >
              <ShieldAlert size={16} /> Admin Panel
            </button>
          )}

          <div className="streak-badge" title="Ketma-ket kunlar soni">
            <Flame size={16} color="var(--accent-amber)" /> {userData.currentStreak} {t.streak}
          </div>

          {/* Multi-Theme Selector Trigger */}
          <button className="btn-icon" onClick={cycleTheme} title={`Mavzu: ${theme.toUpperCase()} (Boshqa rangga o'tkazish uchun bosing)`}>
            <Palette size={18} color="var(--accent-amber)" />
          </button>

          <button className="btn-icon" onClick={() => setShowPrivacyModal(true)} title="Maxfiylik va Ma'lumotlar Shaffofligi">
            <ShieldCheck size={18} color="var(--accent-emerald)" />
          </button>
        </div>
      </header>

      {/* Non-Diagnostic Disclaimer Banner */}
      <div className="disclaimer-banner">
        <AlertTriangle size={18} style={{ flexShrink: 0, marginTop: '2px' }} />
        <div>
          <strong>{t.disclaimerTitle}</strong> {t.disclaimerText}
        </div>
      </div>

      {/* Navigation Tabs */}
      <nav className="nav-tabs">
        <button 
          className={`nav-tab-btn ${activeTab === 'tracker' ? 'active' : ''}`}
          onClick={() => setActiveTab('tracker')}
        >
          <Activity size={16} /> {t.tabTracker}
        </button>

        <button 
          className={`nav-tab-btn ${activeTab === 'journey' ? 'active' : ''}`}
          onClick={() => setActiveTab('journey')}
        >
          <Calendar size={16} /> {t.tabJourney}
        </button>

        <button 
          className={`nav-tab-btn ${activeTab === 'ice' ? 'active' : ''}`}
          onClick={() => setActiveTab('ice')}
        >
          <HeartPulse size={16} /> {t.tabIce}
        </button>

        <button 
          className={`nav-tab-btn ${activeTab === 'guide' ? 'active' : ''}`}
          onClick={() => setActiveTab('guide')}
        >
          <BookOpen size={16} /> {t.tabGuide}
        </button>

        <button 
          className={`nav-tab-btn ${activeTab === 'store' ? 'active' : ''}`}
          onClick={() => setActiveTab('store')}
        >
          <ShoppingBag size={16} /> {t.tabStore}
        </button>
      </nav>

      {/* Dynamic Tab Contents */}
      {activeTab === 'tracker' && (
        <div className="dashboard-grid">
          <div>
            <DailyTracker 
              data={{
                waterIntake: userData.todayLogs.waterIntake,
                waterTarget: userData.dailyGoals.waterTargetMl,
                meds: userData.todayLogs.medications,
                exerciseMinutes: userData.todayLogs.exerciseMinutes,
                exerciseTarget: userData.dailyGoals.exerciseTargetMinutes,
                sleepHours: userData.todayLogs.sleepHours
              }}
              onUpdateData={handleUpdateTracker}
            />
          </div>

          <div>
            <VitalityTree 
              stage={treeStage}
              level={treeLevel}
              progress={treeProgress}
              streakCount={userData.currentStreak}
            />
          </div>
        </div>
      )}

      {activeTab === 'journey' && (
        <SevenDayJourney onApplyJourneyDay={handleApplyJourneyDay} />
      )}

      {activeTab === 'ice' && (
        <EmergencyICE 
          userData={userData}
          onAddAppointment={handleAddAppointment}
        />
      )}

      {activeTab === 'guide' && (
        <HabitGuide />
      )}

      {activeTab === 'store' && (
        <SportsStore products={productsList} streakCount={userData.currentStreak} />
      )}

      {activeTab === 'admin' && (
        <AdminPanel 
          currentUser={currentUser}
          products={productsList}
          onAddProduct={handleAddProduct}
          onUpdateProduct={handleUpdateProduct}
          onDeleteProduct={handleDeleteProduct}
        />
      )}

      {/* Privacy Transparency Modal */}
      <PrivacyModal 
        isOpen={showPrivacyModal}
        onClose={() => setShowPrivacyModal(false)}
        onClearData={handleClearData}
      />

      {/* User Auth Modal */}
      <AuthModal 
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        currentUser={currentUser}
        onAuthSuccess={handleAuthSuccess}
        onLogout={handleLogout}
      />

      {/* Monetization / Pro Upgrade Modal */}
      <MonetizationModal 
        isOpen={showMonetizationModal}
        onClose={() => setShowMonetizationModal(false)}
        currentUser={currentUser}
        onUpgradeSuccess={handleUpgradeSuccess}
      />

    </div>
  );
}

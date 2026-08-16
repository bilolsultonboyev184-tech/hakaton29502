import React, { useState } from 'react';
import { AlertTriangle, PhoneCall, UserCheck, CalendarCheck, Plus, ShieldAlert, HeartPulse } from 'lucide-react';
import { useLanguage } from '../services/LanguageContext';

export default function EmergencyICE({ userData, onAddAppointment }) {
  const [showAddModal, setShowAddModal] = useState(false);
  const [docName, setDocName] = useState('');
  const [clinic, setClinic] = useState('');
  const [appDate, setAppDate] = useState('');
  const [appTime, setAppTime] = useState('');
  const { t } = useLanguage();

  const handleSaveAppointment = (e) => {
    e.preventDefault();
    if (!docName || !appDate) return;
    onAddAppointment({
      id: Date.now(),
      doctorName: docName,
      clinic: clinic || 'Klinika',
      date: appDate,
      time: appTime || '10:00',
      status: 'Rejalashtirilgan'
    });
    setDocName('');
    setClinic('');
    setAppDate('');
    setAppTime('');
    setShowAddModal(false);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      
      {/* Emergency Call Action */}
      <div className="card" style={{ border: '1px solid rgba(244, 63, 94, 0.3)', background: 'linear-gradient(135deg, rgba(244, 63, 94, 0.08), rgba(15, 23, 42, 0.8))' }}>
        <div className="card-header" style={{ marginBottom: '0.75rem' }}>
          <div className="card-title" style={{ color: 'var(--accent-rose)' }}>
            <PhoneCall size={20} /> {t.emergencyContacts}
          </div>
        </div>

        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
          {t.iceTitle}
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
          <a href="tel:103" style={{ textDecoration: 'none' }}>
            <button className="emergency-call-btn" style={{ marginBottom: 0 }}>
              <HeartPulse size={20} /> {t.ambulance}
            </button>
          </a>
          <a href="tel:112" style={{ textDecoration: 'none' }}>
            <button className="emergency-call-btn" style={{ background: '#d97706', boxShadow: '0 4px 14px rgba(217, 119, 6, 0.35)', marginBottom: 0 }}>
              <ShieldAlert size={20} /> 112 — Qutqaruv
            </button>
          </a>
        </div>
      </div>

      {/* ICE Personal Emergency Card */}
      <div className="card">
        <div className="card-header">
          <div className="card-title" style={{ color: 'var(--accent-amber)' }}>
            <UserCheck size={20} /> Shaxsiy Tibbiy Karta (ICE Data)
          </div>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Faqat Qurilmangizda Saqlanadi</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.85rem' }}>
          <div style={{ background: 'var(--bg-secondary)', padding: '0.85rem 1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Qon Guruhi</div>
            <div style={{ fontSize: '1.1rem', fontWeight: '800', color: 'var(--text-primary)', marginTop: '0.2rem' }}>
              💉 {userData.bloodGroup}
            </div>
          </div>

          <div style={{ background: 'var(--bg-secondary)', padding: '0.85rem 1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Allergiyalar</div>
            <div style={{ fontSize: '0.95rem', fontWeight: '700', color: 'var(--accent-amber)', marginTop: '0.2rem' }}>
              ⚠️ {userData.allergies}
            </div>
          </div>

          <div style={{ background: 'var(--bg-secondary)', padding: '0.85rem 1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Yaqin Kishilar Aloqasi</div>
            <div style={{ fontSize: '0.95rem', fontWeight: '700', color: 'var(--text-primary)', marginTop: '0.2rem' }}>
              📞 {userData.iceContactName}: <span style={{ color: 'var(--accent-coral-light)' }}>{userData.iceContactPhone}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Shifokor Navbati Eslatmalari */}
      <div className="card">
        <div className="card-header">
          <div className="card-title" style={{ color: 'var(--accent-emerald-light)' }}>
            <CalendarCheck size={20} /> Shifokor Qabuliga Navbat
          </div>
          <button className="quick-action-btn" onClick={() => setShowAddModal(true)}>
            <Plus size={16} /> Navbat Qushish
          </button>
        </div>

        {userData.todayLogs.doctorAppointments.length === 0 ? (
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>Rejalashtirilgan navbatlar yo'q.</p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
            {userData.todayLogs.doctorAppointments.map((app) => (
              <div key={app.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.85rem 1rem', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
                <div>
                  <h4 style={{ fontSize: '0.95rem', fontWeight: '700' }}>{app.doctorName}</h4>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>🏥 {app.clinic} | 📅 {app.date} soat {app.time}</p>
                </div>
                <span style={{ fontSize: '0.78rem', padding: '0.3rem 0.6rem', borderRadius: 'var(--radius-full)', background: 'var(--accent-emerald-bg)', color: 'var(--accent-emerald-light)', fontWeight: '700' }}>
                  {app.status}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal for adding appointment */}
      {showAddModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3 style={{ marginBottom: '1rem', fontSize: '1.15rem' }}>Yangi Shifokor Navbatini Qo'shish</h3>
            <form onSubmit={handleSaveAppointment} style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              <div>
                <label style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.3rem' }}>Shifokor ismi / Mutaxassisligi</label>
                <input 
                  type="text"
                  placeholder="Masalan: Dr. Karimov (Terapevt)"
                  value={docName}
                  onChange={(e) => setDocName(e.target.value)}
                  required
                  style={{ width: '100%', padding: '0.65rem', borderRadius: 'var(--radius-sm)', background: 'var(--bg-primary)', border: '1px solid var(--border-color)', color: 'var(--text-primary)' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.3rem' }}>Klinika nomi</label>
                <input 
                  type="text"
                  placeholder="Masalan: City Hospital"
                  value={clinic}
                  onChange={(e) => setClinic(e.target.value)}
                  style={{ width: '100%', padding: '0.65rem', borderRadius: 'var(--radius-sm)', background: 'var(--bg-primary)', border: '1px solid var(--border-color)', color: 'var(--text-primary)' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                <div>
                  <label style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.3rem' }}>Sana</label>
                  <input 
                    type="date"
                    value={appDate}
                    onChange={(e) => setAppDate(e.target.value)}
                    required
                    style={{ width: '100%', padding: '0.65rem', borderRadius: 'var(--radius-sm)', background: 'var(--bg-primary)', border: '1px solid var(--border-color)', color: 'var(--text-primary)' }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.3rem' }}>Vaqt</label>
                  <input 
                    type="time"
                    value={appTime}
                    onChange={(e) => setAppTime(e.target.value)}
                    style={{ width: '100%', padding: '0.65rem', borderRadius: 'var(--radius-sm)', background: 'var(--bg-primary)', border: '1px solid var(--border-color)', color: 'var(--text-primary)' }}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end', marginTop: '1rem' }}>
                <button type="button" onClick={() => setShowAddModal(false)} style={{ padding: '0.6rem 1rem', borderRadius: 'var(--radius-sm)', background: 'transparent', border: '1px solid var(--border-color)', color: 'var(--text-secondary)', cursor: 'pointer' }}>
                  Bekor qilish
                </button>
                <button type="submit" className="quick-action-btn">
                  Saqlash
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}

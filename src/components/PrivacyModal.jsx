import React from 'react';
import { ShieldCheck, HardDrive, Download, Trash2, X, Lock } from 'lucide-react';

export default function PrivacyModal({ isOpen, onClose, onClearData }) {
  if (!isOpen) return null;

  const dataSchema = [
    { key: "waterIntake", purpose: "Kunlik suv iste'moli balansi va taraqqiyotini ko'rsatish", storage: "Brauzer LocalStorage" },
    { key: "medications", purpose: "Belgilangan vaqtda dori qabil qilish vaqtlarini eslatish", storage: "Brauzer LocalStorage" },
    { key: "exerciseMinutes", purpose: "Harakat va cho'zilish daqiqalarini hisoblash", storage: "Brauzer LocalStorage" },
    { key: "sleepHours", purpose: "Tungi uyqu vaqtini kuzatib borish", storage: "Brauzer LocalStorage" },
    { key: "bloodGroup & ICE", purpose: "Favqulodda vaziyatda tezkor tibbiy kartani ko'rsatish", storage: "Faqat mahalliy xotirada" }
  ];

  const handleExportData = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(localStorage));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", "hayot_ritmi_data_backup.json");
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content" style={{ maxWidth: '650px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <div style={{ background: 'var(--accent-emerald-bg)', padding: '0.5rem', borderRadius: 'var(--radius-md)', color: 'var(--accent-emerald)' }}>
              <ShieldCheck size={24} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: '800' }}>Maxfiylik va Ma'lumotlar Shaffofligi</h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Nimani va nima uchun saqlayotganimiz haqqoniy bayoni</p>
            </div>
          </div>
          <button className="btn-icon" onClick={onClose} style={{ width: '32px', height: '32px' }}>
            <X size={16} />
          </button>
        </div>

        {/* Security Alert Banner */}
        <div style={{ background: 'rgba(16, 185, 129, 0.08)', border: '1px solid rgba(16, 185, 129, 0.25)', padding: '0.85rem 1rem', borderRadius: 'var(--radius-md)', marginBottom: '1.25rem', fontSize: '0.85rem', color: 'var(--text-primary)', display: 'flex', alignItems: 'flex-start', gap: '0.6rem' }}>
          <Lock size={18} color="var(--accent-emerald-light)" style={{ marginTop: '2px', flexShrink: 0 }} />
          <div>
            <strong>100% Mahalliy (Offline) Xavfsizlik:</strong> Sizning barcha ma'lumotlaringiz faqatgina o'zingizning qurilmangizda saqlanadi. Hech qanday tashqi bulut (server)ga yuborilmaydi va sotilmaydi.
          </div>
        </div>

        {/* Schema Breakdown Table */}
        <h4 style={{ fontSize: '0.9rem', marginBottom: '0.6rem', color: 'var(--text-secondary)' }}>Saqlanadigan Ma'lumotlar Ro'yxati:</h4>
        <div style={{ overflowX: 'auto', marginBottom: '1.5rem' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.82rem', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-muted)' }}>
                <th style={{ padding: '0.5rem' }}>Ma'lumot kaliti</th>
                <th style={{ padding: '0.5rem' }}>Saqlash maqsadi (Purpose)</th>
                <th style={{ padding: '0.5rem' }}>Joylashuvi</th>
              </tr>
            </thead>
            <tbody>
              {dataSchema.map((item, index) => (
                <tr key={index} style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '0.65rem 0.5rem', fontWeight: '700', color: 'var(--accent-coral-light)' }}>{item.key}</td>
                  <td style={{ padding: '0.65rem 0.5rem', color: 'var(--text-secondary)' }}>{item.purpose}</td>
                  <td style={{ padding: '0.65rem 0.5rem', color: 'var(--accent-emerald-light)' }}>{item.storage}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Actions: Export Data or Wipe Data */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem', paddingTop: '1rem', borderTop: '1px solid var(--border-color)' }}>
          <button className="quick-action-btn" onClick={handleExportData} style={{ background: 'var(--bg-secondary)', color: 'var(--text-primary)', borderColor: 'var(--border-color)' }}>
            <Download size={16} /> Ma'lumotlarni Yuklab Olish (JSON)
          </button>

          <button className="quick-action-btn" onClick={onClearData} style={{ background: 'rgba(244, 63, 94, 0.15)', color: 'var(--accent-rose)', borderColor: 'rgba(244, 63, 94, 0.3)' }}>
            <Trash2 size={16} /> Barcha Ma'lumotlarni O'chirish
          </button>
        </div>

      </div>
    </div>
  );
}

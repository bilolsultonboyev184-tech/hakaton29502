import React from 'react';
import { Target, Zap, Clock, ShieldCheck, HeartHandshake } from 'lucide-react';

export default function HabitGuide() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      
      <div className="card" style={{ background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.08), rgba(245, 158, 11, 0.08))' }}>
        <div className="card-header">
          <div className="card-title" style={{ color: 'var(--accent-emerald-light)' }}>
            <Target size={20} /> Nima Uchun Odamlar 2-Kuniyoq Tashlab Ketmaydi?
          </div>
        </div>
        <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
          Aksariyat sog'liq ilovalari murakkab formalar va doimiy to'ldirish talab qilgani uchun foydalanuvchilar 2-kuniyoq uni tashlab yuborishadi. 
          <strong> HayotRitmi</strong> ushbu muammoni 3 ta psixologik mezon orqali hal qiladi:
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
        
        {/* Principle 1 */}
        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.75rem' }}>
            <div style={{ background: 'var(--accent-emerald-bg)', color: 'var(--accent-emerald)', padding: '0.5rem', borderRadius: 'var(--radius-md)' }}>
              <Zap size={22} />
            </div>
            <h3 style={{ fontSize: '1rem', fontWeight: '700' }}>1. 1-Soniyali Tezkor Logging</h3>
          </div>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
            Grammlar va sekundlarni kiritish shart emas! Birgina "1 Piyola Suv" yoki "Dori Ichildi" tugmasini 1 marta bosish orqali 100% kunlik vazifa bajariladi. Minimal ishqalanish (zero friction).
          </p>
        </div>

        {/* Principle 2 */}
        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.75rem' }}>
            <div style={{ background: 'var(--accent-amber-bg)', color: 'var(--accent-amber)', padding: '0.5rem', borderRadius: 'var(--radius-md)' }}>
              <Clock size={22} />
            </div>
            <h3 style={{ fontSize: '1rem', fontWeight: '700' }}>2. Zanjirni Uzmaslik (Streak)</h3>
          </div>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
            Ketma-ket kunlar (streak) va o'suvchi "Vitality Tree" novdasi foydalanuvchida vizual rag'bat yaratadi. Inson o'z mehnati samarasini ko me'yorida ko'rib tursagina odat uzluksiz davom etadi.
          </p>
        </div>

        {/* Principle 3 */}
        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.75rem' }}>
            <div style={{ background: 'var(--accent-coral-bg)', color: 'var(--accent-coral)', padding: '0.5rem', borderRadius: 'var(--radius-md)' }}>
              <HeartHandshake size={22} />
            </div>
            <h3 style={{ fontSize: '1rem', fontWeight: '700' }}>3. Tashxis Qo'ymaslik, Do'st bo'lish</h3>
          </div>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
            Ilova shifokor o'rniga tashxis qo'yib insonni qo'rqitmaydi. Aksincha, faqat xavfsiz turmush tarzi va eslatmalar bo'yicha yordamchi bo'lib xizmat qiladi.
          </p>
        </div>

      </div>

    </div>
  );
}

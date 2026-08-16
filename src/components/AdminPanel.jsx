import React, { useState, useEffect } from 'react';
import { ShieldAlert, Plus, Edit3, Trash2, CheckCircle2, Package, Users, DollarSign, Activity, Search, Save, X, Lock, Unlock, Eye, Sparkles, RefreshCw } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useLanguage } from '../services/LanguageContext';

export default function AdminPanel({ currentUser, products, onAddProduct, onUpdateProduct, onDeleteProduct }) {
  const { lang, t } = useLanguage();
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(() => {
    return currentUser?.email === 'admin@hayotritmi.uz' || currentUser?.role === 'admin';
  });
  const [adminEmail, setAdminEmail] = useState('admin@hayotritmi.uz');
  const [adminPin, setAdminPin] = useState('');
  const [pinError, setPinError] = useState(false);

  useEffect(() => {
    if (currentUser?.email === 'admin@hayotritmi.uz' || currentUser?.role === 'admin') {
      setIsAdminAuthenticated(true);
    }
  }, [currentUser]);

  const [activeTab, setActiveTab] = useState('products'); // 'products' | 'analytics' | 'orders'
  const [searchQuery, setSearchQuery] = useState('');

  // Modal states for Add & Edit
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  // Form State for Add/Edit
  const [formData, setFormData] = useState({
    nameOzb: '',
    nameRus: '',
    nameEng: '',
    price: 150000,
    category: 'clothes',
    badge: '🔥 Yangi',
    rating: 5.0,
    reviews: 1,
    image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=500&auto=format&fit=crop&q=80',
    descOzb: '',
    descRus: '',
    descEng: ''
  });

  // Mock Orders Data
  const [orders, setOrders] = useState([
    { id: 'ORD-9021', user: 'Bilol Sultonboyev', email: 'bilol3159@gmail.com', total: 360000, items: 'ProGrip Gantara To\'plami x1', date: '2026-08-16', status: 'Completed' },
    { id: 'ORD-9022', user: 'Jasur Bek', email: 'jasur@example.com', total: 185000, items: 'FitPro Kompressiyon Futbolka x1', date: '2026-08-16', status: 'Pending' },
    { id: 'ORD-9023', user: 'Elena Smirnova', email: 'elena@domain.ru', total: 490000, items: 'AirRun Professional Krossovka x1', date: '2026-08-15', status: 'Shipped' }
  ]);

  const handleAdminLogin = (e) => {
    e.preventDefault();
    if (adminPin === 'admin123' || adminPin === '777' || adminPin === '1234' || adminPin === 'admin') {
      setIsAdminAuthenticated(true);
      setPinError(false);
      try { confetti({ particleCount: 50, spread: 60 }); } catch (err) {}
    } else {
      setPinError(true);
    }
  };

  const openAddModal = () => {
    setFormData({
      nameOzb: '',
      nameRus: '',
      nameEng: '',
      price: 150000,
      category: 'clothes',
      badge: '🔥 Yangi',
      rating: 5.0,
      reviews: 1,
      image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=500&auto=format&fit=crop&q=80',
      descOzb: '',
      descRus: '',
      descEng: ''
    });
    setEditingProduct(null);
    setShowAddModal(true);
  };

  const openEditModal = (product) => {
    setEditingProduct(product);
    setFormData({
      nameOzb: product.name.ozb || '',
      nameRus: product.name.rus || '',
      nameEng: product.name.eng || '',
      price: product.price || 0,
      category: product.category || 'clothes',
      badge: product.badge || '',
      rating: product.rating || 5.0,
      reviews: product.reviews || 1,
      image: product.image || '',
      descOzb: product.description?.ozb || '',
      descRus: product.description?.rus || '',
      descEng: product.description?.eng || ''
    });
    setShowAddModal(true);
  };

  const handleSaveProduct = (e) => {
    e.preventDefault();
    const productPayload = {
      id: editingProduct ? editingProduct.id : 'prod_' + Date.now(),
      category: formData.category,
      name: {
        ozb: formData.nameOzb || formData.nameEng || 'Yangi Tovar',
        rus: formData.nameRus || formData.nameOzb || 'Новый товар',
        eng: formData.nameEng || formData.nameOzb || 'New Product'
      },
      price: Number(formData.price),
      rating: Number(formData.rating),
      reviews: Number(formData.reviews),
      image: formData.image || 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=500&auto=format&fit=crop&q=80',
      badge: formData.badge || '🔥 Top',
      description: {
        ozb: formData.descOzb || 'Mahsulot tavsifi',
        rus: formData.descRus || 'Описание товара',
        eng: formData.descEng || 'Product description'
      }
    };

    if (editingProduct) {
      onUpdateProduct(productPayload);
    } else {
      onAddProduct(productPayload);
    }

    setShowAddModal(false);
    try { confetti({ particleCount: 60, spread: 70 }); } catch (err) {}
  };

  const handleOrderStatusChange = (orderId, newStatus) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
  };

  const filteredProducts = products.filter(p => {
    const title = p.name[lang] || p.name.ozb;
    return title.toLowerCase().includes(searchQuery.toLowerCase());
  });

  // If not logged into admin panel, show Admin Security Gate PIN Form
  if (!isAdminAuthenticated) {
    return (
      <div className="card" style={{ maxWidth: '440px', margin: '2rem auto', textAlign: 'center', padding: '2.5rem 2rem' }}>
        <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'rgba(239, 68, 68, 0.15)', border: '1px solid rgba(239, 68, 68, 0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem', color: 'var(--accent-rose)' }}>
          <Lock size={32} />
        </div>

        <h2 style={{ fontSize: '1.45rem', fontWeight: '900', color: 'var(--text-primary)', marginBottom: '0.4rem' }}>
          {lang === 'rus' ? 'Панель Администратора' : lang === 'eng' ? 'Admin Access Gate' : 'Admin Boshqaruv Paneli'}
        </h2>
        <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginBottom: '1.5rem', lineHeight: '1.4' }}>
          {lang === 'rus' ? 'Введите пароль администратора для управления товарами и заказами' : lang === 'eng' ? 'Enter admin PIN code to manage sports products and site orders' : "Mahsulotlar va buyurtmalarni boshqarish uchun admin maxfiy parolini kiriting"}
        </p>

        <form onSubmit={handleAdminLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'block', textAlign: 'left', marginBottom: '0.35rem', fontWeight: '700' }}>
              Admin Email Manzili
            </label>
            <input 
              type="email"
              required
              value={adminEmail}
              onChange={(e) => setAdminEmail(e.target.value)}
              placeholder="admin@hayotritmi.uz"
              style={{
                width: '100%',
                padding: '0.75rem 1rem',
                borderRadius: 'var(--radius-md)',
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border-default)',
                color: 'var(--text-primary)',
                fontSize: '0.92rem',
                outline: 'none'
              }}
            />
          </div>

          <div>
            <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'block', textAlign: 'left', marginBottom: '0.35rem', fontWeight: '700' }}>
              Admin Maxfiy Paroli
            </label>
            <input 
              type="password"
              required
              placeholder="admin123"
              value={adminPin}
              onChange={(e) => setAdminPin(e.target.value)}
              style={{
                width: '100%',
                padding: '0.75rem 1rem',
                borderRadius: 'var(--radius-md)',
                background: 'var(--bg-secondary)',
                border: pinError ? '1px solid var(--accent-rose)' : '1px solid var(--border-default)',
                color: 'var(--text-primary)',
                fontSize: '0.95rem',
                outline: 'none'
              }}
            />
            {pinError && (
              <span style={{ fontSize: '0.78rem', color: 'var(--accent-rose)', marginTop: '0.35rem', display: 'block' }}>
                {lang === 'rus' ? 'Неверный пароль (попробуйте admin123)' : lang === 'eng' ? 'Incorrect Password (try admin123)' : 'Noto\'g\'ri parol (admin123 kiritib ko\'ring)'}
              </span>
            )}
          </div>

          <button 
            type="submit"
            style={{
              width: '100%',
              padding: '0.85rem',
              borderRadius: 'var(--radius-md)',
              background: 'linear-gradient(135deg, var(--accent-rose), var(--accent-coral))',
              color: '#fff',
              fontWeight: '800',
              fontSize: '0.95rem',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              marginTop: '0.5rem'
            }}
          >
            <Unlock size={18} /> {lang === 'rus' ? 'Войти как Админ' : lang === 'eng' ? 'Unlock Admin' : "Admin Sifatida Kirish"}
          </button>
        </form>

        <div style={{ marginTop: '1.25rem', padding: '0.75rem', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)', textAlign: 'left', fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
          <div style={{ fontWeight: '800', color: 'var(--accent-amber-light)', marginBottom: '0.25rem' }}>🔑 Rasmiy Admin Ma'lumotlari:</div>
          <div>• <strong>Email:</strong> <code style={{ color: 'var(--accent-emerald-light)' }}>admin@hayotritmi.uz</code> (yoki istalgan email)</div>
          <div>• <strong>Parol:</strong> <code style={{ color: 'var(--accent-emerald-light)' }}>admin123</code></div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      
      {/* Admin Top Header Banner */}
      <div className="card" style={{ 
        background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.15), rgba(245, 158, 11, 0.12))', 
        borderColor: 'rgba(239, 68, 68, 0.35)',
        position: 'relative'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div className="card-title" style={{ color: 'var(--accent-rose-light)', fontSize: '1.35rem' }}>
              <ShieldAlert size={26} /> {lang === 'rus' ? 'Панель Управления (Full Admin Rights)' : lang === 'eng' ? 'Admin Management Center' : 'Tizim Boshqaruv Markazi (Full Admin)'}
            </div>
            <p className="card-subtitle" style={{ fontSize: '0.9rem', marginTop: '0.25rem' }}>
              {lang === 'rus' ? 'Полные права: Добавление, редактирование, удаление товаров и управление заказами' : lang === 'eng' ? 'Full Control: Add, edit, delete products & manage customer orders' : "To'liq huquqlar: Mahsulotlar qo'shish, tahrirlash, o'chirish va buyurtmalarni boshqarish"}
            </p>
          </div>

          <div style={{ display: 'flex', gap: '0.65rem' }}>
            <button 
              onClick={openAddModal}
              style={{
                background: 'var(--accent-emerald-bg)',
                color: 'var(--accent-emerald-light)',
                border: '1px solid rgba(16, 185, 129, 0.35)',
                padding: '0.65rem 1.1rem',
                borderRadius: 'var(--radius-md)',
                fontWeight: '800',
                fontSize: '0.9rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.45rem'
              }}
            >
              <Plus size={18} /> {lang === 'rus' ? 'Добавить Товар' : lang === 'eng' ? 'Add Product' : 'Yangi Tovar Qo\'shish'}
            </button>

            <button 
              onClick={() => setIsAdminAuthenticated(false)}
              className="quick-action-btn"
              style={{ background: 'rgba(255, 255, 255, 0.05)', color: 'var(--text-muted)' }}
            >
              <Lock size={15} /> Exit Admin
            </button>
          </div>
        </div>
      </div>

      {/* Admin Navigation Pills */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {[
            { id: 'products', icon: Package, label: lang === 'rus' ? '🛍️ Товары (' + products.length + ')' : lang === 'eng' ? '🛍️ Products (' + products.length + ')' : '🛍️ Mahsulotlar (' + products.length + ')' },
            { id: 'orders', icon: CheckCircle2, label: lang === 'rus' ? '📦 Заказы (' + orders.length + ')' : lang === 'eng' ? '📦 Orders (' + orders.length + ')' : '📦 Buyurtmalar (' + orders.length + ')' },
            { id: 'analytics', icon: Activity, label: lang === 'rus' ? '📊 Аналитика' : lang === 'eng' ? '📊 Analytics' : '📊 Statistika' }
          ].map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  padding: '0.6rem 1.1rem',
                  borderRadius: 'var(--radius-full)',
                  border: '1px solid var(--border-default)',
                  background: activeTab === tab.id ? 'var(--accent-coral-bg)' : 'var(--bg-card)',
                  color: activeTab === tab.id ? 'var(--accent-coral-light)' : 'var(--text-secondary)',
                  fontWeight: '800',
                  fontSize: '0.88rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                  transition: 'all 0.2s ease'
                }}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {activeTab === 'products' && (
          <div style={{ position: 'relative', width: '250px' }}>
            <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input 
              type="text"
              placeholder={lang === 'rus' ? 'Поиск для админа...' : lang === 'eng' ? 'Search admin...' : 'Qidirish...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '0.55rem 0.75rem 0.55rem 2.2rem',
                borderRadius: 'var(--radius-full)',
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border-default)',
                color: 'var(--text-primary)',
                fontSize: '0.85rem',
                outline: 'none'
              }}
            />
          </div>
        )}
      </div>

      {/* TAB 1: PRODUCTS MANAGEMENT TABLE & CARDS */}
      {activeTab === 'products' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.25rem' }}>
          {filteredProducts.map(product => {
            const title = product.name[lang] || product.name.ozb;
            const desc = product.description[lang] || product.description.ozb;

            return (
              <div key={product.id} className="card" style={{ padding: '0', display: 'flex', flexDirection: 'column', height: '100%', border: '1px solid var(--border-default)' }}>
                <div style={{ position: 'relative', height: '160px', overflow: 'hidden' }}>
                  <img src={product.image} alt={title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <span style={{ position: 'absolute', top: '10px', right: '10px', background: 'rgba(15, 23, 42, 0.9)', color: 'var(--accent-amber-light)', padding: '0.2rem 0.6rem', borderRadius: 'var(--radius-full)', fontSize: '0.75rem', fontWeight: '800' }}>
                    {product.badge}
                  </span>
                  <span style={{ position: 'absolute', top: '10px', left: '10px', background: 'var(--bg-secondary)', color: 'var(--accent-emerald-light)', padding: '0.2rem 0.6rem', borderRadius: 'var(--radius-full)', fontSize: '0.72rem', fontWeight: '800', textTransform: 'uppercase' }}>
                    {product.category}
                  </span>
                </div>

                <div style={{ padding: '1rem', display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
                  <div>
                    <h4 style={{ fontSize: '1rem', fontWeight: '800', marginBottom: '0.35rem' }}>{title}</h4>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: '1.35', marginBottom: '0.85rem' }}>{desc}</p>
                    <div style={{ fontSize: '1.15rem', fontWeight: '900', color: 'var(--accent-emerald-light)', marginBottom: '0.85rem' }}>
                      {product.price.toLocaleString()} so'm
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '0.5rem', paddingTop: '0.75rem', borderTop: '1px solid var(--border-subtle)' }}>
                    <button 
                      onClick={() => openEditModal(product)}
                      style={{
                        flex: 1,
                        padding: '0.55rem',
                        borderRadius: 'var(--radius-md)',
                        background: 'var(--accent-amber-bg)',
                        color: 'var(--accent-amber-light)',
                        border: '1px solid rgba(245, 158, 11, 0.35)',
                        fontWeight: '700',
                        fontSize: '0.85rem',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.35rem'
                      }}
                    >
                      <Edit3 size={15} /> {lang === 'rus' ? 'Изменить' : lang === 'eng' ? 'Edit' : 'Tahrirlash'}
                    </button>

                    <button 
                      onClick={() => onDeleteProduct(product.id)}
                      style={{
                        padding: '0.55rem 0.75rem',
                        borderRadius: 'var(--radius-md)',
                        background: 'var(--accent-rose-bg)',
                        color: 'var(--accent-rose-light)',
                        border: '1px solid rgba(239, 68, 68, 0.35)',
                        fontWeight: '700',
                        fontSize: '0.85rem',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                      title="O'chirish"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* TAB 2: ORDERS MANAGEMENT */}
      {activeTab === 'orders' && (
        <div className="card">
          <h3 style={{ fontSize: '1.15rem', fontWeight: '800', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Package size={20} color="var(--accent-emerald)" /> 
            {lang === 'rus' ? 'Все Заказы Покупателей' : lang === 'eng' ? 'Customer Orders List' : 'Mijozlar Buyurtmalari Ro\'yxati'}
          </h3>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border-default)', color: 'var(--text-muted)' }}>
                  <th style={{ padding: '0.75rem 0.5rem' }}>ID</th>
                  <th style={{ padding: '0.75rem 0.5rem' }}>Mijoz</th>
                  <th style={{ padding: '0.75rem 0.5rem' }}>Tovar</th>
                  <th style={{ padding: '0.75rem 0.5rem' }}>Summa</th>
                  <th style={{ padding: '0.75rem 0.5rem' }}>Status</th>
                  <th style={{ padding: '0.75rem 0.5rem' }}>Amal</th>
                </tr>
              </thead>
              <tbody>
                {orders.map(order => (
                  <tr key={order.id} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                    <td style={{ padding: '0.75rem 0.5rem', fontWeight: '800', color: 'var(--accent-coral-light)' }}>{order.id}</td>
                    <td style={{ padding: '0.75rem 0.5rem' }}>
                      <div style={{ fontWeight: '700' }}>{order.user}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{order.email}</div>
                    </td>
                    <td style={{ padding: '0.75rem 0.5rem', color: 'var(--text-secondary)' }}>{order.items}</td>
                    <td style={{ padding: '0.75rem 0.5rem', fontWeight: '900', color: 'var(--accent-emerald-light)' }}>{order.total.toLocaleString()} so'm</td>
                    <td style={{ padding: '0.75rem 0.5rem' }}>
                      <span style={{ 
                        padding: '0.2rem 0.6rem', 
                        borderRadius: 'var(--radius-full)', 
                        fontSize: '0.75rem', 
                        fontWeight: '800',
                        background: order.status === 'Completed' ? 'var(--accent-emerald-bg)' : order.status === 'Shipped' ? 'var(--accent-amber-bg)' : 'var(--accent-rose-bg)',
                        color: order.status === 'Completed' ? 'var(--accent-emerald-light)' : order.status === 'Shipped' ? 'var(--accent-amber-light)' : 'var(--accent-rose-light)'
                      }}>
                        {order.status}
                      </span>
                    </td>
                    <td style={{ padding: '0.75rem 0.5rem' }}>
                      <select
                        value={order.status}
                        onChange={(e) => handleOrderStatusChange(order.id, e.target.value)}
                        style={{ background: 'var(--bg-secondary)', color: 'var(--text-primary)', border: '1px solid var(--border-default)', borderRadius: 'var(--radius-xs)', padding: '0.25rem 0.4rem', fontSize: '0.8rem' }}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Completed">Completed</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: SYSTEM ANALYTICS */}
      {activeTab === 'analytics' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1.25rem' }}>
          <div className="card" style={{ textWrap: 'balance' }}>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.82rem', marginBottom: '0.35rem' }}>Jami Foydalanuvchilar</div>
            <div style={{ fontSize: '1.8rem', fontWeight: '900', color: 'var(--accent-emerald-light)' }}>1,420 ta</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--accent-emerald-light)', marginTop: '0.25rem' }}>+12% ushbu haftada</div>
          </div>

          <div className="card">
            <div style={{ color: 'var(--text-muted)', fontSize: '0.82rem', marginBottom: '0.35rem' }}>Jami Xaridlar Summasi</div>
            <div style={{ fontSize: '1.8rem', fontWeight: '900', color: 'var(--accent-coral-light)' }}>14,250,000 so'm</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--accent-coral-light)', marginTop: '0.25rem' }}>32 ta buyurtma</div>
          </div>

          <div className="card">
            <div style={{ color: 'var(--text-muted)', fontSize: '0.82rem', marginBottom: '0.35rem' }}>Faol Odat Daraxtlari</div>
            <div style={{ fontSize: '1.8rem', fontWeight: '900', color: 'var(--accent-amber-light)' }}>984 ta</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--accent-amber-light)', marginTop: '0.25rem' }}>Aktiv intizom bor</div>
          </div>
        </div>
      )}

      {/* ADD / EDIT PRODUCT MODAL */}
      {showAddModal && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.82)',
          backdropFilter: 'blur(12px)',
          zIndex: 99999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1rem'
        }}>
          <div className="card" style={{ maxWidth: '580px', width: '100%', maxHeight: '90vh', overflowY: 'auto', padding: '1.8rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', paddingBottom: '0.75rem', borderBottom: '1px solid var(--border-default)' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: '900', color: 'var(--accent-emerald-light)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Edit3 size={20} />
                {editingProduct 
                  ? (lang === 'rus' ? 'Редактировать Товар' : lang === 'eng' ? 'Edit Product Details' : 'Mahsulotni Tahrirlash')
                  : (lang === 'rus' ? 'Добавить Новый Товар' : lang === 'eng' ? 'Add New Product' : 'Yangi Mahsulot Qo\'shish')
                }
              </h3>
              <button className="btn-icon" onClick={() => setShowAddModal(false)}>
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', fontWeight: '700', marginBottom: '0.35rem', display: 'block' }}>
                  Mahsulot Nomi (O'zbekcha) *
                </label>
                <input 
                  type="text"
                  required
                  value={formData.nameOzb}
                  onChange={(e) => setFormData({ ...formData, nameOzb: e.target.value })}
                  placeholder="masalan: ProGrip Gantara To'plami"
                  style={{ width: '100%', padding: '0.65rem', borderRadius: 'var(--radius-md)', background: 'var(--bg-secondary)', border: '1px solid var(--border-default)', color: 'var(--text-primary)', outline: 'none' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', fontWeight: '700', marginBottom: '0.35rem', display: 'block' }}>
                    Название (Русский)
                  </label>
                  <input 
                    type="text"
                    value={formData.nameRus}
                    onChange={(e) => setFormData({ ...formData, nameRus: e.target.value })}
                    placeholder="Например: Набор гантелей"
                    style={{ width: '100%', padding: '0.65rem', borderRadius: 'var(--radius-md)', background: 'var(--bg-secondary)', border: '1px solid var(--border-default)', color: 'var(--text-primary)', outline: 'none' }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', fontWeight: '700', marginBottom: '0.35rem', display: 'block' }}>
                    Name (English)
                  </label>
                  <input 
                    type="text"
                    value={formData.nameEng}
                    onChange={(e) => setFormData({ ...formData, nameEng: e.target.value })}
                    placeholder="e.g. Dumbbell Set"
                    style={{ width: '100%', padding: '0.65rem', borderRadius: 'var(--radius-md)', background: 'var(--bg-secondary)', border: '1px solid var(--border-default)', color: 'var(--text-primary)', outline: 'none' }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', fontWeight: '700', marginBottom: '0.35rem', display: 'block' }}>
                    Narxi (So'm) *
                  </label>
                  <input 
                    type="number"
                    required
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    style={{ width: '100%', padding: '0.65rem', borderRadius: 'var(--radius-md)', background: 'var(--bg-secondary)', border: '1px solid var(--border-default)', color: 'var(--text-primary)', outline: 'none' }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', fontWeight: '700', marginBottom: '0.35rem', display: 'block' }}>
                    Kategoriya
                  </label>
                  <select 
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    style={{ width: '100%', padding: '0.65rem', borderRadius: 'var(--radius-md)', background: 'var(--bg-secondary)', border: '1px solid var(--border-default)', color: 'var(--text-primary)', outline: 'none' }}
                  >
                    <option value="clothes">👕 Kiyimlar</option>
                    <option value="equipment">🏋️ Jihozlar</option>
                    <option value="accessories">💧 Aksessuarlar</option>
                  </select>
                </div>

                <div>
                  <label style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', fontWeight: '700', marginBottom: '0.35rem', display: 'block' }}>
                    Nishon (Badge)
                  </label>
                  <input 
                    type="text"
                    value={formData.badge}
                    onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                    placeholder="🔥 Top"
                    style={{ width: '100%', padding: '0.65rem', borderRadius: 'var(--radius-md)', background: 'var(--bg-secondary)', border: '1px solid var(--border-default)', color: 'var(--text-primary)', outline: 'none' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', fontWeight: '700', marginBottom: '0.35rem', display: 'block' }}>
                  Rasm Havolasi (Image URL)
                </label>
                <input 
                  type="text"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  placeholder="https://..."
                  style={{ width: '100%', padding: '0.65rem', borderRadius: 'var(--radius-md)', background: 'var(--bg-secondary)', border: '1px solid var(--border-default)', color: 'var(--text-primary)', outline: 'none' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', fontWeight: '700', marginBottom: '0.35rem', display: 'block' }}>
                  Tavsifi (O'zbekcha)
                </label>
                <textarea 
                  rows="3"
                  value={formData.descOzb}
                  onChange={(e) => setFormData({ ...formData, descOzb: e.target.value })}
                  placeholder="Mahsulot haqida ma'lumot..."
                  style={{ width: '100%', padding: '0.65rem', borderRadius: 'var(--radius-md)', background: 'var(--bg-secondary)', border: '1px solid var(--border-default)', color: 'var(--text-primary)', outline: 'none', resize: 'vertical' }}
                />
              </div>

              <button 
                type="submit"
                style={{
                  width: '100%',
                  padding: '0.85rem',
                  borderRadius: 'var(--radius-md)',
                  background: 'linear-gradient(135deg, var(--accent-emerald), var(--accent-coral))',
                  color: '#fff',
                  fontWeight: '900',
                  fontSize: '1rem',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  marginTop: '0.5rem'
                }}
              >
                <Save size={18} /> {editingProduct ? 'Saqlash' : 'Yangi Mahsulotni Saqlash'}
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}

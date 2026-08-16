import React, { useState } from 'react';
import { ShoppingBag, ShoppingCart, Filter, Search, Star, Tag, CheckCircle2, Zap, Trash2, ArrowRight, X, Plus, Minus, PackageCheck, AlertCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useLanguage } from '../services/LanguageContext';

export const EXPANDED_PRODUCTS = [
  {
    id: 'p1',
    category: 'clothes',
    name: {
      ozb: "FitPro Erkaklar Kompressiyon Futbolkasi",
      rus: "Мужская компрессионная футболка FitPro",
      eng: "FitPro Men's Compression Workout Shirt"
    },
    price: 185000,
    rating: 4.9,
    reviews: 124,
    image: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=500&auto=format&fit=crop&q=80",
    badge: "🔥 Top Sotuv",
    description: {
      ozb: "Nafas oluvchi elastik mato, mushaklarni qo'llab-quvvatlaydi va terni tez quritadi.",
      rus: "Дышащая эластичная ткань, поддерживает мышцы и быстро отводит влагу.",
      eng: "Breathable stretch fabric, supports muscles and wicks moisture fast."
    }
  },
  {
    id: 'p2',
    category: 'clothes',
    name: {
      ozb: "AirRun Professional Yugurish Krossovkasi",
      rus: "Профессиональные кроссовки AirRun",
      eng: "AirRun Professional Running Shoes"
    },
    price: 490000,
    rating: 4.8,
    reviews: 89,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&auto=format&fit=crop&q=80",
    badge: "⚡ Premium",
    description: {
      ozb: "Amortizatsiyali podoshva, bo'g'imlarni zarbadan va jarohatdan saqlaydi.",
      rus: "Амортизирующая подошва защищает суставы от ударов и травм.",
      eng: "Cushioned sole protecting joints from impact and strain."
    }
  },
  {
    id: 'p3',
    category: 'clothes',
    name: {
      ozb: "AeroFit Ayollar Sport Leginslari",
      rus: "Женские спортивные леггинсы AeroFit",
      eng: "AeroFit Women's High-Waist Leggings"
    },
    price: 165000,
    rating: 4.9,
    reviews: 142,
    image: "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=500&auto=format&fit=crop&q=80",
    badge: "✨ High-Waist",
    description: {
      ozb: "Baland bel tizimi, harakatlanishda mutlaqo sirpanmaydi va qulay moslashadi.",
      rus: "Высокая посадка, не сползает при тренировках и идеально облегает.",
      eng: "High-rise waistband providing optimal support and non-slip fit."
    }
  },
  {
    id: 'p4',
    category: 'clothes',
    name: {
      ozb: "Thermal Tech Sport Xudisi (Hoodie)",
      rus: "Спортивное худи Thermal Tech",
      eng: "Thermal Tech Performance Sport Hoodie"
    },
    price: 260000,
    rating: 4.7,
    reviews: 95,
    image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=500&auto=format&fit=crop&q=80",
    badge: "❄️ Izolyatsiya",
    description: {
      ozb: "Salqin ob-havoda yugurish va ochiq havodagi mashg'ulotlar uchun maxsus issiqlik matosi.",
      rus: "Специальная термоткань для бега и тренировок на свежем воздухе.",
      eng: "Thermal tech fabric crafted for chilly outdoor runs and workouts."
    }
  },
  {
    id: 'p5',
    category: 'equipment',
    name: {
      ozb: "ProGrip Gantara To'plami (2x10kg)",
      rus: "Набор гантелей ProGrip (2x10кг)",
      eng: "ProGrip Dumbbell Set (2x10kg)"
    },
    price: 360000,
    rating: 5.0,
    reviews: 210,
    image: "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?w=500&auto=format&fit=crop&q=80",
    badge: "🏋️ Rezinli Qoplama",
    description: {
      ozb: "Zanglamaydigan va polni tirnamaydigan rezinalangan bosim gantellari.",
      rus: "Прорезиненные гантели, не ржавеющие и не царапающие пол.",
      eng: "Rubber-coated dumbbells that won't rust or scratch your floor."
    }
  },
  {
    id: 'p6',
    category: 'equipment',
    name: {
      ozb: "EcoYoga Pro Qalin Yo'lakcha (Mat 10mm)",
      rus: "Профессиональный коврик EcoYoga (10мм)",
      eng: "EcoYoga Extra Thick Mat (10mm)"
    },
    price: 145000,
    rating: 4.7,
    reviews: 67,
    image: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=500&auto=format&fit=crop&q=80",
    badge: "🌿 Ekologik",
    description: {
      ozb: "Sirpanmaydigan NBR materiali, umurtqa va tizzalarga qulay tayanch beradi.",
      rus: "Нескользящий материал NBR обеспечивает комфорт для спины и коленей.",
      eng: "Non-slip NBR material providing cushion for spine and knees."
    }
  },
  {
    id: 'p7',
    category: 'equipment',
    name: {
      ozb: "Fitness Bands Qarshilik Rezinkalari (5 in 1)",
      rus: "Набор фитнес-резинок (5 в 1)",
      eng: "Fitness Resistance Bands (5-in-1 Set)"
    },
    price: 95000,
    rating: 4.9,
    reviews: 312,
    image: "https://images.unsplash.com/photo-1598289431512-b97b0917affc?w=500&auto=format&fit=crop&q=80",
    badge: "💥 Mashhur",
    description: {
      ozb: "5 xil og'irlik darajasidagi elastik rezinkalar to'plami va xaltasi bilan.",
      rus: "Набор эластичных резинок 5 уровней сопротивления с чехлом.",
      eng: "5 levels of resistance bands set complete with carrying pouch."
    }
  },
  {
    id: 'p8',
    category: 'equipment',
    name: {
      ozb: "Smart Count Raqamli Sakragich (Jump Rope)",
      rus: "Умная скакалка со счетчиком Smart Count",
      eng: "Smart Count Digital Speed Jump Rope"
    },
    price: 125000,
    rating: 4.8,
    reviews: 178,
    image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=500&auto=format&fit=crop&q=80",
    badge: "🔢 Raqamli Displey",
    description: {
      ozb: "Sakrashlar soni va yoqilgan kaloriyalarni avtomatik hisoblovchi podshipnikli sakragich.",
      rus: "Скакалка на подшипниках, автоматически считающая прыжки и калории.",
      eng: "Bearing speed rope automatically tracking jump counts and calories burned."
    }
  },
  {
    id: 'p9',
    category: 'equipment',
    name: {
      ozb: "PowerGym Eshikka O'rnatiluvchi Turnik",
      rus: "Дверной турник PowerGym",
      eng: "PowerGym Doorway Pull-Up Bar"
    },
    price: 210000,
    rating: 4.9,
    reviews: 156,
    image: "https://images.unsplash.com/photo-1597452485669-2c7bb5fef90d?w=500&auto=format&fit=crop&q=80",
    badge: "🔩 200kg Chidamli",
    description: {
      ozb: "Devorni teshmasdan e'shik romiga o'rnatiluvchi va 200 kg gacha ko'taruvchi turnik.",
      rus: "Турник без сверления стен, выдерживающий нагрузку до 200 кг.",
      eng: "No-drill door frame pull-up bar holding up to 200kg load capacity."
    }
  },
  {
    id: 'p10',
    category: 'accessories',
    name: {
      ozb: "ThermoHydrate Motivatsion Suv Shishasi (2L)",
      rus: "Мотивационная бутылка ThermoHydrate (2 л)",
      eng: "ThermoHydrate Motivational Water Bottle (2L)"
    },
    price: 110000,
    rating: 4.9,
    reviews: 450,
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500&auto=format&fit=crop&q=80",
    badge: "💧 BPA-Free",
    description: {
      ozb: "Kunlik suv balansingizni to'ldirish uchun vaqt belgilari bor 2L shisha.",
      rus: "Бутылка 2л с временными отметками для поддержания водного баланса.",
      eng: "2L bottle with hour markers to keep your hydration on track."
    }
  },
  {
    id: 'p11',
    category: 'accessories',
    name: {
      ozb: "PowerShaker Elektr Protein Aralashtirgich",
      rus: "Электрический шейкер PowerShaker",
      eng: "PowerShaker Automatic Protein Shaker Bottle"
    },
    price: 175000,
    rating: 4.8,
    reviews: 112,
    image: "https://images.unsplash.com/photo-1546483875-ad9014c88eba?w=500&auto=format&fit=crop&q=80",
    badge: "🔋 USB Quvvatli",
    description: {
      ozb: "Tugmani bir bosishda kokteyl va proteinlarni quyuqlashmasdan bir jinsli aralashtiradi.",
      rus: "Одним нажатием кнопкой идеально смешивает протеиновые коктейли без комков.",
      eng: "One-touch USB motorized vortex mixer for smooth lump-free protein shakes."
    }
  },
  {
    id: 'p12',
    category: 'accessories',
    name: {
      ozb: "FitPulse Smart Fitness Bilaguzuk v4",
      rus: "Фитнес-браслет FitPulse Smart v4",
      eng: "FitPulse Smart Activity Tracker Band v4"
    },
    price: 320000,
    rating: 4.9,
    reviews: 280,
    image: "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=500&auto=format&fit=crop&q=80",
    badge: "❤️ Puls & Uyqu",
    description: {
      ozb: "Yurak urishi, qon kislorodi (SpO2) va qadamlarni 24/7 kuzatuvchi suv o'tkazmas bilaguzuk.",
      rus: "Водонепроницаемый браслет 24/7 отслеживающий пульс, SpO2 и шаги.",
      eng: "Waterproof fitness band monitoring HR, SpO2, and daily steps 24/7."
    }
  }
];

export default function SportsStore({ streakCount = 1 }) {
  const { lang, t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  // Filter products
  const filteredProducts = EXPANDED_PRODUCTS.filter(p => {
    const matchesCat = activeCategory === 'all' || p.category === activeCategory;
    const nameText = p.name[lang] || p.name.ozb;
    const matchesSearch = nameText.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const handleAddToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, qty: item.qty + 1 } : item);
      }
      return [...prev, { ...product, qty: 1 }];
    });

    const itemTitle = product.name[lang] || product.name.ozb;
    const toastMsg = lang === 'rus'
      ? `🛒 "${itemTitle}" добавлено в корзину!`
      : lang === 'eng'
      ? `🛒 "${itemTitle}" added to cart!`
      : `🛒 "${itemTitle}" savatga qo'shildi!`;

    setToastMessage(toastMsg);
    setTimeout(() => setToastMessage(null), 3000);

    try {
      confetti({ particleCount: 35, spread: 55, origin: { y: 0.85 } });
    } catch (e) {}
  };

  const handleRemoveFromCart = (id) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const handleUpdateQty = (id, delta) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const nextQty = item.qty + delta;
        return nextQty > 0 ? { ...item, qty: nextQty } : item;
      }
      return item;
    }));
  };

  const totalItemCount = cart.reduce((acc, i) => acc + i.qty, 0);
  const rawTotal = cart.reduce((acc, item) => acc + (item.price * item.qty), 0);
  
  // Vitality discount: 5% discount per 3 days streak (up to 20%)
  const discountPercent = Math.min(Math.floor(streakCount / 3) * 5, 20);
  const discountAmount = Math.round((rawTotal * discountPercent) / 100);
  const finalTotal = rawTotal - discountAmount;

  const handleCheckout = () => {
    if (cart.length === 0) return;
    setOrderSuccess(true);
    setCart([]);
    try {
      confetti({ particleCount: 120, spread: 100, origin: { y: 0.5 } });
    } catch (e) {}
  };

  const formatPrice = (val) => {
    if (lang === 'rus') return `${Math.round(val / 130).toLocaleString()} ₽`;
    if (lang === 'eng') return `$${(val / 12800).toFixed(2)}`;
    return `${val.toLocaleString()} so'm`;
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', position: 'relative' }}>
      
      {/* Toast Notification when item is added to cart */}
      {toastMessage && (
        <div style={{
          position: 'fixed',
          bottom: '90px',
          right: '24px',
          background: 'linear-gradient(135deg, #10b981, #059669)',
          color: '#fff',
          padding: '0.85rem 1.25rem',
          borderRadius: 'var(--radius-lg)',
          fontWeight: '800',
          fontSize: '0.9rem',
          boxShadow: '0 10px 30px rgba(16, 185, 129, 0.4)',
          zIndex: 99999,
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          animation: 'containerReveal 0.3s ease-out'
        }}>
          <PackageCheck size={20} /> {toastMessage}
        </div>
      )}

      {/* Persistent Floating Cart Badge Trigger Button */}
      <button 
        onClick={() => setIsCartOpen(true)}
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          background: 'linear-gradient(135deg, var(--accent-coral), #d4613a)',
          color: '#fff',
          border: 'none',
          padding: '0.85rem 1.4rem',
          borderRadius: 'var(--radius-full)',
          fontWeight: '900',
          fontSize: '0.95rem',
          boxShadow: '0 8px 30px rgba(224, 124, 84, 0.5)',
          cursor: 'pointer',
          zIndex: 9990,
          display: 'flex',
          alignItems: 'center',
          gap: '0.65rem',
          transition: 'transform 0.2s ease, box-shadow 0.2s ease'
        }}
      >
        <ShoppingCart size={20} />
        <span>{lang === 'rus' ? 'Корзина' : lang === 'eng' ? 'Cart' : 'Savatcha'}</span>
        <span style={{ 
          background: '#fff', 
          color: '#e07c54', 
          padding: '0.15rem 0.6rem', 
          borderRadius: 'var(--radius-full)', 
          fontSize: '0.82rem',
          fontWeight: '900'
        }}>
          {totalItemCount}
        </span>
      </button>

      {/* Store Header Banner */}
      <div className="card" style={{ 
        background: 'linear-gradient(135deg, rgba(224, 124, 84, 0.15), rgba(16, 185, 129, 0.12))', 
        borderColor: 'rgba(224, 124, 84, 0.35)',
        position: 'relative'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div className="card-title" style={{ color: 'var(--accent-coral-light)', fontSize: '1.35rem' }}>
              <ShoppingBag size={26} /> {lang === 'rus' ? 'Спортивный Магазин (' + EXPANDED_PRODUCTS.length + ' товаров)' : lang === 'eng' ? 'Sports Store (' + EXPANDED_PRODUCTS.length + ' Products)' : "Sport va Kiyim Do'koni (" + EXPANDED_PRODUCTS.length + " ta Tovar)"}
            </div>
            <p className="card-subtitle" style={{ fontSize: '0.9rem', marginTop: '0.25rem' }}>
              {lang === 'rus' ? 'Профессиональный инвентарь, одежда и аксессуары для тренировок' : lang === 'eng' ? 'Professional workout gear, athletic wear, and fitness accessories' : "Jismoniy mashqlar, sport kiyimlari va jihozlar to'plami"}
            </p>
          </div>

          <button 
            className="quick-action-btn"
            onClick={() => setIsCartOpen(true)}
            style={{ 
              background: 'var(--accent-emerald-bg)', 
              color: 'var(--accent-emerald-light)', 
              borderColor: 'rgba(16, 185, 129, 0.35)',
              padding: '0.65rem 1.1rem',
              fontSize: '0.95rem'
            }}
          >
            <ShoppingCart size={18} /> 
            {lang === 'rus' ? 'Корзина' : lang === 'eng' ? 'Cart' : 'Savatcha'} ({totalItemCount})
          </button>
        </div>

        {/* Vitality Streak Reward Banner */}
        {discountPercent > 0 && (
          <div style={{ 
            marginTop: '1rem', 
            background: 'var(--accent-amber-bg)', 
            padding: '0.6rem 1rem', 
            borderRadius: 'var(--radius-md)', 
            fontSize: '0.82rem', 
            color: 'var(--accent-amber-light)', 
            fontWeight: '700',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            border: '1px solid rgba(245, 158, 11, 0.3)'
          }}>
            <Zap size={16} /> 
            {lang === 'rus' ? `Ваша серия ${streakCount} дней даёт скидку -${discountPercent}% на все товары!` : lang === 'eng' ? `Your ${streakCount}-day habit streak unlocks a -${discountPercent}% discount!` : `Sizning ${streakCount} kunlik intizomingiz xaridlar uchun -${discountPercent}% chegirma beradi!`}
          </div>
        )}
      </div>

      {/* Filter and Search Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          {[
            { id: 'all', label: lang === 'rus' ? 'Все товары' : lang === 'eng' ? 'All Products' : 'Barcha tovarlar' },
            { id: 'clothes', label: lang === 'rus' ? '👕 Одежда' : lang === 'eng' ? '👕 Apparel' : '👕 Kiyimlar' },
            { id: 'equipment', label: lang === 'rus' ? '🏋️ Инвентарь' : lang === 'eng' ? '🏋️ Equipment' : '🏋️ Jihozlar' },
            { id: 'accessories', label: lang === 'rus' ? '💧 Аксессуары' : lang === 'eng' ? '💧 Accessories' : '💧 Aksessuarlar' }
          ].map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              style={{
                padding: '0.55rem 1rem',
                borderRadius: 'var(--radius-full)',
                border: '1px solid var(--border-default)',
                background: activeCategory === cat.id ? 'var(--accent-coral-bg)' : 'var(--bg-card)',
                color: activeCategory === cat.id ? 'var(--accent-coral-light)' : 'var(--text-secondary)',
                fontWeight: '700',
                fontSize: '0.85rem',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div style={{ position: 'relative', width: '260px' }}>
          <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input 
            type="text"
            placeholder={lang === 'rus' ? 'Поиск товаров...' : lang === 'eng' ? 'Search gear...' : 'Qidirish...'}
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
      </div>

      {/* Products Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(270px, 1fr))', gap: '1.25rem' }}>
        {filteredProducts.map(product => {
          const title = product.name[lang] || product.name.ozb;
          const desc = product.description[lang] || product.description.ozb;

          return (
            <div key={product.id} className="card" style={{ padding: '0', display: 'flex', flexDirection: 'column', height: '100%' }}>
              <div style={{ position: 'relative', height: '185px', overflow: 'hidden', borderTopLeftRadius: 'var(--radius-lg)', borderTopRightRadius: 'var(--radius-lg)' }}>
                <img 
                  src={product.image} 
                  alt={title} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.3s ease' }} 
                />
                <span style={{ 
                  position: 'absolute', 
                  top: '10px', 
                  right: '10px', 
                  background: 'rgba(15, 23, 42, 0.88)', 
                  backdropFilter: 'blur(8px)',
                  color: 'var(--accent-amber-light)', 
                  padding: '0.25rem 0.65rem', 
                  borderRadius: 'var(--radius-full)', 
                  fontSize: '0.75rem',
                  fontWeight: '700',
                  border: '1px solid rgba(245, 158, 11, 0.3)'
                }}>
                  {product.badge}
                </span>
              </div>

              <div style={{ padding: '1.15rem', display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', marginBottom: '0.35rem' }}>
                    <Star size={14} fill="var(--accent-amber)" color="var(--accent-amber)" />
                    <span style={{ fontSize: '0.8rem', fontWeight: '800', color: 'var(--accent-amber)' }}>{product.rating}</span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>({product.reviews})</span>
                  </div>
                  
                  <h3 style={{ fontSize: '1.05rem', fontWeight: '800', color: 'var(--text-primary)', marginBottom: '0.35rem', lineHeight: '1.3' }}>
                    {title}
                  </h3>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: '1.4', marginBottom: '1rem' }}>
                    {desc}
                  </p>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '0.75rem', borderTop: '1px solid var(--border-subtle)' }}>
                  <div>
                    <span style={{ fontSize: '1.15rem', fontWeight: '900', color: 'var(--accent-emerald-light)' }}>
                      {formatPrice(product.price)}
                    </span>
                  </div>

                  <button 
                    onClick={() => handleAddToCart(product)}
                    className="quick-action-btn"
                    style={{ background: 'var(--accent-coral-bg)', color: 'var(--accent-coral-light)', borderColor: 'rgba(224, 124, 84, 0.35)' }}
                  >
                    <ShoppingCart size={15} /> {lang === 'rus' ? 'В корзину' : lang === 'eng' ? 'Add' : "Savatga"}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Cart Drawer / Modal */}
      {isCartOpen && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0, 0, 0, 0.8)',
          backdropFilter: 'blur(12px)',
          zIndex: 9999,
          display: 'flex',
          justifyContent: 'flex-end'
        }}>
          <div style={{
            width: '100%',
            maxWidth: '460px',
            background: 'var(--bg-secondary)',
            height: '100%',
            padding: '1.5rem',
            display: 'flex',
            flexDirection: 'column',
            justify: 'space-between',
            boxShadow: 'var(--shadow-xl)',
            borderLeft: '1px solid var(--border-default)'
          }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: '1px solid var(--border-default)' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <ShoppingCart size={22} color="var(--accent-coral)" /> 
                  {lang === 'rus' ? 'Ваша Корзина' : lang === 'eng' ? 'Your Shopping Cart' : 'Savatchangiz'}
                  <span style={{ fontSize: '0.85rem', color: 'var(--accent-coral-light)', background: 'var(--accent-coral-bg)', padding: '0.15rem 0.6rem', borderRadius: 'var(--radius-full)' }}>
                    {totalItemCount}
                  </span>
                </h3>
                <button className="btn-icon" onClick={() => setIsCartOpen(false)}>
                  <X size={18} />
                </button>
              </div>

              {cart.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '4rem 1rem', color: 'var(--text-muted)' }}>
                  <ShoppingBag size={56} style={{ opacity: 0.25, marginBottom: '1rem' }} />
                  <p style={{ fontSize: '1rem', fontWeight: '700' }}>{lang === 'rus' ? 'Корзина пуста' : lang === 'eng' ? 'Your cart is empty' : 'Savatchangiz hozircha bo\'sh'}</p>
                  <p style={{ fontSize: '0.82rem', marginTop: '0.35rem' }}>{lang === 'rus' ? 'Выберите нужные товары из каталога' : lang === 'eng' ? 'Add sports gear from the catalog' : 'Katalogdan kerakli sport jihozlarini tanlang'}</p>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxHeight: '55vh', overflowY: 'auto', paddingRight: '0.3rem' }}>
                  {cart.map(item => (
                    <div key={item.id} style={{ display: 'flex', gap: '0.85rem', alignItems: 'center', background: 'var(--bg-card)', padding: '0.85rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
                      <img src={item.image} alt="" style={{ width: '60px', height: '60px', borderRadius: 'var(--radius-sm)', objectFit: 'cover' }} />
                      <div style={{ flex: 1 }}>
                        <h4 style={{ fontSize: '0.9rem', fontWeight: '800', lineHeight: '1.2' }}>{item.name[lang] || item.name.ozb}</h4>
                        <div style={{ fontSize: '0.85rem', color: 'var(--accent-emerald-light)', fontWeight: '800', marginTop: '0.2rem' }}>
                          {formatPrice(item.price * item.qty)}
                        </div>
                      </div>
                      
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', background: 'var(--bg-tertiary)', borderRadius: 'var(--radius-full)', padding: '0.2rem 0.5rem', border: '1px solid var(--border-default)' }}>
                        <button onClick={() => handleUpdateQty(item.id, -1)} style={{ background: 'none', border: 'none', color: 'var(--text-primary)', cursor: 'pointer', padding: '0 0.3rem', fontWeight: '800' }}>-</button>
                        <span style={{ fontSize: '0.85rem', fontWeight: '900' }}>{item.qty}</span>
                        <button onClick={() => handleUpdateQty(item.id, 1)} style={{ background: 'none', border: 'none', color: 'var(--text-primary)', cursor: 'pointer', padding: '0 0.3rem', fontWeight: '800' }}>+</button>
                      </div>

                      <button onClick={() => handleRemoveFromCart(item.id)} style={{ background: 'none', border: 'none', color: 'var(--accent-rose)', cursor: 'pointer', padding: '0.3rem' }} title="O'chirish">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {cart.length > 0 && (
              <div style={{ paddingTop: '1rem', borderTop: '1px solid var(--border-default)' }}>
                {discountAmount > 0 && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem', color: 'var(--accent-amber-light)', marginBottom: '0.4rem', fontWeight: '700' }}>
                    <span>🔥 Streak Chegirma (-{discountPercent}%):</span>
                    <span>-{formatPrice(discountAmount)}</span>
                  </div>
                )}
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.25rem', fontWeight: '900', color: 'var(--text-primary)', marginBottom: '1.1rem' }}>
                  <span>Jami / Total:</span>
                  <span style={{ color: 'var(--accent-emerald-light)' }}>{formatPrice(finalTotal)}</span>
                </div>

                <button 
                  onClick={handleCheckout}
                  style={{
                    width: '100%',
                    padding: '0.95rem',
                    borderRadius: 'var(--radius-md)',
                    background: 'linear-gradient(135deg, var(--accent-emerald), var(--accent-coral))',
                    color: '#fff',
                    fontWeight: '900',
                    fontSize: '1.05rem',
                    border: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    boxShadow: '0 8px 24px rgba(16, 185, 129, 0.3)'
                  }}
                >
                  <CheckCircle2 size={22} /> {lang === 'rus' ? 'Оформить заказ' : lang === 'eng' ? 'Checkout Order' : 'Buyurtmani rasmiylashtirish'}
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Order Success Modal */}
      {orderSuccess && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0, 0, 0, 0.85)',
          backdropFilter: 'blur(12px)',
          zIndex: 10000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1rem'
        }}>
          <div className="card text-center" style={{ maxWidth: '440px', width: '100%', padding: '2.2rem' }}>
            <CheckCircle2 size={64} color="var(--accent-emerald-light)" style={{ margin: '0 auto 1rem' }} />
            <h2 style={{ fontSize: '1.45rem', fontWeight: '900', marginBottom: '0.5rem' }}>
              {lang === 'rus' ? 'Заказ успешно оформлен!' : lang === 'eng' ? 'Order Placed Successfully!' : 'Buyurtma muvaffaqiyatli qabul qilindi!'}
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', marginBottom: '1.5rem', lineHeight: '1.5' }}>
              {lang === 'rus' ? 'Спасибо за покупку! Спортивный инвентарь скоро будет доставлен по вашему адресу.' : lang === 'eng' ? 'Thank you for shopping with us! Your gear is packed and on its way.' : 'Xaridingiz uchun rahmat! Sport jihozlaringiz kuryer orqali manzilingizga tez orada yetkaziladi.'}
            </p>
            <button 
              className="quick-action-btn"
              onClick={() => { setOrderSuccess(false); setIsCartOpen(false); }}
              style={{ background: 'var(--accent-emerald-bg)', color: 'var(--accent-emerald-light)', borderColor: 'rgba(16, 185, 129, 0.35)', margin: '0 auto', width: '100%', padding: '0.85rem', fontSize: '0.95rem' }}
            >
              {lang === 'rus' ? 'Отлично' : lang === 'eng' ? 'Great' : 'Tushunarli'}
            </button>
          </div>
        </div>
      )}

    </div>
  );
}

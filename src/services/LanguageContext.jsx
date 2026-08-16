import React, { createContext, useContext, useState, useEffect } from 'react';

export const TRANSLATIONS = {
  ozb: {
    brandName: "HayotRitmi",
    brandTagline: "Kundalik Sog'liq va Odatlar Yordamchisi",
    home: "Bosh Sahifa",
    proUpgrade: "Pro Obuna",
    login: "Kirish Sahifasi",
    streak: "Kun",
    disclaimerTitle: "Tibbiy Ogohlantirish:",
    disclaimerText: "Ushbu ilova shifokor o'rnini bosmaydi. Tashxis qo'ymaydi va davolamaydi. U faqat turmush tarzi, dori eslatmasi va odatlar yordamchisi sifatidadir.",
    
    // Tabs
    tabTracker: "Kundalik Tracker",
    tabJourney: "1-7 Kunlik Safar (Demo)",
    tabIce: "ICE & Shifokor",
    tabGuide: "Odat Siri (2-Kun)",
    tabStore: "Sport Do'koni",

    // Daily Tracker
    waterTitle: "Suv Balansi (Hydration)",
    waterAddCup: "+250 ml (1 Piyola)",
    waterAddBottle: "+500 ml (Katta idish)",
    waterSub: "-250 ml",
    medTitle: "Dori Vaqti Eslatmasi",
    medTaken: "Qabul qilindi",
    medPending: "Kutilmoqda",
    exerciseTitle: "Jismoniy Mashqlar (Yurish / Sport)",
    mins: "daqiqa",
    sleepTitle: "Uyqu Vaqti",
    sleepHours: "soat",
    target: "Maqsad",

    // Vitality Tree
    treeTitle: "Hayot Daraxti (Vitality Tree)",
    treeSubtitle: "Jonli rivojlanuvchi odat daraxti",
    treeStageSeed: "Urug'",
    treeStageSprout: "Nihol",
    treeStageGrowing: "Rivojlanayotgan Daraxt",
    treeStageBlooming: "Gullagan Daraxt",
    level: "Daraja",
    streakDays: "Kunlik Zanjir",
    treeDesc: "Sizning har bir bajargan doringiz va suv balansingiz daraxtingizni o'stiradi!",

    // 7-Day Journey
    journeyTitle: "1-7 Kunlik Safar Simulyatori",
    journeySubtitle: "Hakamlar va foydalanuvchilar ilovadagi 7 kunlik rivojlanishni jonli ko'rishlari mumkin.",
    selectDay: "Kunni Tanlang",
    applyDayData: "Ushbu Kun Ko'rinishini Qo'llash",
    dayOne: "1-Kun: Boshlanish",
    dayThree: "3-Kun: Sur'at Yig'ish",
    dayFive: "5-Kun: Odat Shakllandi",
    daySeven: "7-Kun: Haftalik Natija va Tahlil",

    // ICE Emergency & Doctor
    iceTitle: "ICE (Favqulodda Yordam) Kartasi",
    emergencyContacts: "Tezkor Telefon Raqamlari",
    ambulance: "Tez Tibbiy Yordam (103)",
    fire: "O't o'chirish (101)",
    police: "Militsiya / Ichki Ishlar (102)",
    rescue: "Favqulodda Qutqaruv (112)",
    doctorAppointments: "Shifokor Navbatlari",
    addAppointment: "+ Yangi Navbat Qo'shish",
    doctorName: "Shifokor Ismi / Mutaxassisligi",
    apptTime: "Navbat Vaqti va Sanasi",

    // Habit Guide
    guideTitle: "2-Kunlik Tashlab Ketish Sirlari va Yechimi",
    guideDesc: "Nimaga foydalanuvchilar ilovani 2-kuni tashlab yuborishadi va HayotRitmi buni qanday hal qiladi?",
    
    // Auth & Monetization
    proPlan: "Pro Obuna",
    proFeatures: "Cheksiz ma'lumotlar zaxirasi, AI maslahatchi va oilaviy ulashish",
    loginTitle: "Tizimga Kirish / Ro'yxatdan O'tish",
    
    // Buttons & Common
    save: "Saqlash",
    cancel: "Bekor qilish",
    close: "Yopish",
    reset: "Qayta tiklash"
  },
  rus: {
    brandName: "HayotRitmi",
    brandTagline: "Ежедневный Помощник Здоровья и Привычек",
    home: "Главная",
    proUpgrade: "Pro Подписка",
    login: "Вход в Аккаунт",
    streak: "Дней",
    disclaimerTitle: "Медицинское Предупреждение:",
    disclaimerText: "Это приложение не заменяет врача. Оно не ставит диагнозы и не лечит. Это только помощник по образу жизни, приему лекарств и привычкам.",
    
    // Tabs
    tabTracker: "Ежедневный Трекер",
    tabJourney: "1-7 Дневный Путь (Демо)",
    tabIce: "ICE и Врач",
    tabGuide: "Секрет Привычки (День 2)",
    tabStore: "Спортивный Магазин",

    // Daily Tracker
    waterTracker: "Баланс Воды",
    waterTitle: "Баланс Воды (Гидратация)",
    waterAddCup: "+250 мл (1 Пиала)",
    waterAddBottle: "+500 мл (Бутылка)",
    waterSub: "-250 мл",
    medTracker: "Напоминание о Лекарствах",
    medTitle: "Напоминание о Приеме Лекарств",
    medTaken: "Принято",
    medPending: "Ожидает",
    exerciseTracker: "Физическая Активность",
    exerciseTitle: "Физические Упражнения (Прогулка / Спорт)",
    mins: "мин",
    sleepTracker: "Таймер Сна",
    sleepTitle: "Время Сна",
    sleepHours: "часов",
    target: "Цель",

    // Vitality Tree
    vitalityTreeTitle: "Древо Жизни (Vitality Tree)",
    treeTitle: "Древо Жизни (Vitality Tree)",
    treeSubtitle: "Живое растущее древо привычек",
    treeStageSeed: "Семя",
    treeStageSprout: "Росток",
    treeStageGrowing: "Растущее Дерево",
    treeStageBlooming: "Цветущее Дерево",
    level: "Уровень",
    streakDays: "Серия Дней",
    treeDesc: "Каждый прием воды и выполнение задач растит ваше Древо Жизни!",

    // 7-Day Journey
    journeyTitle: "Симулятор 1-7 Дневного Пути",
    journeySubtitle: "Судьи и пользователи могут вживую увидеть прогресс за 7 дней.",
    selectDay: "Выберите День",
    applyDayData: "Применить Данные Этого Дня",
    dayOne: "День 1: Старт",
    dayThree: "День 3: Набор Набирания",
    dayFive: "День 5: Привычка Сформирована",
    daySeven: "День 7: Итоги Недели и Анализ",

    // ICE Emergency & Doctor
    iceTitle: "ICE (Экстренная Карточка) и Врач",
    emergencyContacts: "Номера Экстренных Служб",
    ambulance: "Скорая Медицинская Помощь (103)",
    fire: "Пожарная Служба (101)",
    police: "Полиция / ОВД (102)",
    rescue: "Служба Спасения (112)",
    doctorAppointments: "Записи к Врачу",
    addAppointment: "+ Добавить Запись к Врачу",
    doctorName: "Имя Врача / Специальность",
    apptTime: "Время и Дата Приема",

    // Habit Guide
    guideTitle: "Секрет Борьбы с Срывом на 2-й День",
    guideDesc: "Почему пользователи бросают приложения на 2-й день и как HayotRitmi решает эту проблему?",
    
    // Auth & Monetization
    proPlan: "Pro Подписка",
    proFeatures: "Неограниченное резервное копирование, ИИ-консультант и семейный доступ",
    loginTitle: "Вход в Систему / Регистрация",

    // Buttons & Common
    save: "Сохранить",
    cancel: "Отмена",
    close: "Закрыть",
    reset: "Сбросить"
  },
  eng: {
    brandName: "HayotRitmi",
    brandTagline: "Daily Health & Habit Companion",
    home: "Home Page",
    proUpgrade: "Pro Subscription",
    login: "Account Login",
    streak: "Days",
    disclaimerTitle: "Medical Disclaimer:",
    disclaimerText: "This application is not a substitute for a medical doctor. It does not diagnose or treat. It serves strictly as a lifestyle, medication reminder, and daily habit companion.",
    
    // Tabs
    tabTracker: "Daily Tracker",
    tabJourney: "1-7 Day Journey (Demo)",
    tabIce: "ICE & Doctor",
    tabGuide: "Habit Secret (Day 2)",
    tabStore: "Sports Store",

    // Daily Tracker
    waterTracker: "Hydration Balance",
    waterTitle: "Water Intake (Hydration)",
    waterAddCup: "+250 ml (1 Cup)",
    waterAddBottle: "+500 ml (Bottle)",
    waterSub: "-250 ml",
    medTracker: "Medication Reminders",
    medTitle: "Medication Schedule",
    medTaken: "Taken",
    medPending: "Pending",
    exerciseTracker: "Physical Exercise",
    exerciseTitle: "Physical Exercise (Walking / Workout)",
    mins: "mins",
    sleepTracker: "Sleep Timer",
    sleepTitle: "Sleep Duration",
    sleepHours: "hours",
    target: "Target",

    // Vitality Tree
    vitalityTreeTitle: "Vitality Tree",
    treeTitle: "Vitality Tree Growth",
    treeSubtitle: "Interactive habit tree growth",
    treeStageSeed: "Seed",
    treeStageSprout: "Sprout",
    treeStageGrowing: "Growing Tree",
    treeStageBlooming: "Blooming Tree",
    level: "Level",
    streakDays: "Day Streak",
    treeDesc: "Every water cup logged and medication taken grows your Vitality Tree!",

    // 7-Day Journey
    journeyTitle: "1-7 Day Journey Simulator",
    journeySubtitle: "Judges and users can interactively simulate the 7-day progression workflow.",
    selectDay: "Select Day",
    applyDayData: "Apply This Day's State",
    dayOne: "Day 1: Kickoff",
    dayThree: "Day 3: Building Momentum",
    dayFive: "Day 5: Habit Formed",
    daySeven: "Day 7: Weekly Report & Mastery",

    // ICE Emergency & Doctor
    iceTitle: "ICE Emergency Card & Doctor Appointments",
    emergencyContacts: "Emergency Helplines",
    ambulance: "Ambulance / Medical Emergency (103)",
    fire: "Fire Rescue (101)",
    police: "Police Emergency (102)",
    rescue: "National Rescue Services (112)",
    doctorAppointments: "Doctor Appointments",
    addAppointment: "+ Add New Appointment",
    doctorName: "Doctor Name / Specialty",
    apptTime: "Appointment Date & Time",

    // Habit Guide
    guideTitle: "Beating Day-2 Retention Drop-Off",
    guideDesc: "Why do users quit habit apps on Day 2, and how does HayotRitmi solve it?",
    
    // Auth & Monetization
    proPlan: "Pro Plan",
    proFeatures: "Unlimited cloud backups, AI health advisor, and family sharing",
    loginTitle: "Account Sign In / Register",

    // Buttons & Common
    save: "Save",
    cancel: "Cancel",
    close: "Close",
    reset: "Reset"
  }
};

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => localStorage.getItem('hr_lang') || 'ozb');

  useEffect(() => {
    localStorage.setItem('hr_lang', lang);
  }, [lang]);

  const t = TRANSLATIONS[lang] || TRANSLATIONS.ozb;

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    // Fallback if rendered outside provider
    const lang = localStorage.getItem('hr_lang') || 'ozb';
    return { lang, setLang: () => {}, t: TRANSLATIONS[lang] || TRANSLATIONS.ozb };
  }
  return context;
}

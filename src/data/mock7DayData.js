export const MOCK_JOURNEY_DAYS = {
  1: {
    dayNumber: 1,
    title: "1-Kun: Boshlanish va Ilk Odat",
    badge: "Yangi Qadam 🌱",
    subtitle: "Murakkabliksiz, faqat 3 ta oddiy maqsaddan boshlaymiz.",
    treeStage: "urug", // seed
    treeLevel: 1,
    treeProgressPercentage: 20,
    streakCount: 1,
    waterIntake: 750, // ml
    waterTarget: 2500,
    medsTaken: 1,
    medsTotal: 2,
    exerciseMinutes: 10,
    exerciseTarget: 30,
    sleepHours: 7.0,
    insights: [
      "Xush kelibsiz! Birinchi kunda maqsadimiz — 1-tap orqali bir marta bo'lsa ham suv ichishni belgilash.",
      "Har kuni faqat 2 daqiqa ajratish kifoya."
    ],
    unlockedBadges: ["Ilk Qadam"]
  },
  3: {
    dayNumber: 3,
    title: "3-Kun: Sur'at Yig'ish (Momentum)",
    badge: "Ritmda ⚡",
    subtitle: "Odat shakllana boshladi, 3 kunlik uzluksiz ketma-ketlik (streak).",
    treeStage: "nihol", // sprout
    treeLevel: 2,
    treeProgressPercentage: 55,
    streakCount: 3,
    waterIntake: 2000,
    waterTarget: 2500,
    medsTaken: 2,
    medsTotal: 2,
    exerciseMinutes: 25,
    exerciseTarget: 30,
    sleepHours: 7.5,
    insights: [
      "Tabriklaymiz! 3 kun ketma-ket ilovadan foydalandingiz.",
      "Suv ichish tartibingiz ilk kunnikiga qaraganda 40% ga yaxshilandi.",
      "Kechki dori vaqti eslatmasi 100% o'z vaqtida bajarildi."
    ],
    unlockedBadges: ["Ilk Qadam", "3 Kunlik Zanjir"]
  },
  5: {
    dayNumber: 5,
    title: "5-Kun: Shaxsiy Shablondan Foydalanish",
    badge: "Odat Shakllandi 🌿",
    subtitle: "Organizm yangi tartibga moslashmoqda, o'zingizga qulay vaqtlar aniqlandi.",
    treeStage: "kattalashgan", // growing plant
    treeLevel: 3,
    treeProgressPercentage: 80,
    streakCount: 5,
    waterIntake: 2500,
    waterTarget: 2500,
    medsTaken: 2,
    medsTotal: 2,
    exerciseMinutes: 30,
    exerciseTarget: 30,
    sleepHours: 8.0,
    insights: [
      "Siz 5 kun ichida 12,500 ml suv balansi ko'rsatkichiga erishdingiz!",
      "Ertalabki mashqlar tushdan keyingi energiyani 25% ga oshirgani kuzatildi.",
      "Uyqu rejamingiz me'yorida: o'rtacha 7.8 soat."
    ],
    unlockedBadges: ["Ilk Qadam", "3 Kunlik Zanjir", "Intizom Qahramoni"]
  },
  7: {
    dayNumber: 7,
    title: "7-Kun: Bir Haftalik G'alaba!",
    badge: "Odat Ustasi 🏆",
    subtitle: "1-hafta muvaffaqiyatli yakunlandi! 94% bajarilish ko'rsatkichiga erishdingiz.",
    treeStage: "gullagan", // blooming tree
    treeLevel: 4,
    treeProgressPercentage: 100,
    streakCount: 7,
    waterIntake: 2500,
    waterTarget: 2500,
    medsTaken: 2,
    medsTotal: 2,
    exerciseMinutes: 35,
    exerciseTarget: 30,
    sleepHours: 8.2,
    insights: [
      "Muvaffaqiyat! 7 kun davomida uzluksiz o'z sog'lig'ingizga e'tibor qaratdingiz.",
      "Haftalik umumiy suv iste'moli: 16.8 Litr (100% barcha maqsadlar).",
      "Dori eslatmalari vaqtidagi aniqlik: 100%.",
      "Siz 2-kuni tashlab ketilmaydigan sog'lom intizomni shakllantirdingiz!"
    ],
    unlockedBadges: ["Ilk Qadam", "3 Kunlik Zanjir", "Intizom Qahramoni", "Odat Ustasi (7 Kun)"]
  }
}

export const INITIAL_USER_DATA = {
  name: "Foydalanuvchi",
  age: 26,
  bloodGroup: "A(II) Rh+",
  allergies: "Penitsillin (engil ko'rinish)",
  iceContactName: "Akmal (Akam)",
  iceContactPhone: "+998 90 123 45 67",
  dailyGoals: {
    waterTargetMl: 2500,
    waterUnit: 250, // 1 cup size
    sleepTargetHours: 8.0,
    exerciseTargetMinutes: 30
  },
  currentStreak: 1,
  todayLogs: {
    waterIntake: 500,
    medications: [
      { id: 1, name: "Vitamini C (1000mg)", time: "09:00", taken: true, note: "Ovqatdan keyin" },
      { id: 2, name: "Omega-3", time: "21:00", taken: false, note: "Uyqudan oldin" }
    ],
    exerciseMinutes: 15,
    sleepHours: 7.5,
    doctorAppointments: [
      { id: 101, doctorName: "Dr. Alimov (Stomatolog)", clinic: "Medion Clinic", date: "2026-08-20", time: "14:30", status: "Tasdiqlangan" }
    ]
  }
}

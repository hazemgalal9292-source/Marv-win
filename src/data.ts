import { GameInfo, LiveFeedMessage } from './types';

export const GAMES_DATA: GameInfo[] = [
  {
    id: 'aviator',
    title: 'Aviator (Crash)',
    arabicTitle: 'رادار كراش الطائرة ✈️',
    icon: 'Navigation',
    description: 'Real-time aviator multiplier predictions using predictive neural paths.',
    arabicDescription: 'توقع توقيت سحب الأموال الأمثل بدقة عالية لتفادي انفجار الطائرة.'
  },
  {
    id: 'apple_of_fortune',
    title: 'Apple of Fortune',
    arabicTitle: 'مسار تفاحة الحظ 🍎',
    icon: 'Sparkles',
    description: 'Finds the safest apples path column-by-column for continuous multiplier gains.',
    arabicDescription: 'تحليل المسار الآمن للتفاح السليم وتفادي التفاح الفاسد والجمجمة.'
  }
];

export const MARV_FAQS = [
  {
    q: 'كيف تعمل خوارزميات منصة Marv لتوليد الإشارات؟',
    a: 'تقوم المنصة بتحليل وتحميل البيانات الإحصائية الأخيرة المرتبطة بالبرومو كود marv66 وحسابات اللاعبين النشطة لتخمين قيم التكرارات التالية بدقة متناهية.'
  },
  {
    q: 'لماذا البرومو كود marv66 إلزامي للتسجيل؟',
    a: 'البرومو كود marv66 هو المفتاح البرمجي الذي يفعل خوارزمية الربط بالخادم. يضمن لك تفعيل حسابك الحصول على بونص 200% مالي في حسابك الأول على 1XBET أو MELBET ويسمح للبوت برصد ثغرات حسابك.'
  },
  {
    q: 'ما هو الوقت الفعال لاستخدام إشارات كراش وتفاحة الحظ؟',
    a: 'مؤشراتنا تكون في ذروة دقتها (مستوى أمان 99%) خلال الساعات الصباحية وفترات منتصف الليل عندما تكون أحمال السيرفرات مستقرة.'
  },
  {
    q: 'هل يتطلب تطبيق الإشارات تثبيت أي ملفات على الهاتف؟',
    a: 'لا، منصة Marv تعمل سحابياً بالكامل من متصفحك مباشرة بدون تحميل وتناسب الهواتف المحمولة والكمبيوتر.'
  }
];

export const INITIAL_LIVE_MESSAGES: LiveFeedMessage[] = [
  {
    id: 'm1',
    gameId: 'aviator',
    platform: '1xbet',
    message: 'بوت كراش رصد فجوة بنسبة 3.44x للحساب المنتهي بـ 89*',
    timestamp: 'منذ دقيقة',
    badge: 'إشارة ناجحة ✅'
  },
  {
    id: 'm2',
    gameId: 'apple_of_fortune',
    platform: 'melbet',
    message: 'لاعب ذكي حقق 5,000$ باتباع نمط التفاح السليم بالمستوي 9',
    timestamp: 'منذ دقيقتين',
    badge: 'ربح فائق 🔥'
  },
  {
    id: 'm3',
    gameId: 'apple_of_fortune',
    platform: '1xbet',
    message: 'تم تحديث خريطة التفاح لـ 1XBET، ثغرة المستوى 5 نشطة الآن',
    timestamp: 'منذ 5 دقائق',
    badge: 'تحديث خادم 📡'
  },
  {
    id: 'm4',
    gameId: 'aviator',
    platform: 'melbet',
    message: 'تنبيه: مضاعف ذهبي قادم لـ لعبة الطائرة خلال 4 دقائق',
    timestamp: 'منذ 8 دقائق',
    badge: 'VIP تنبؤ 🌟'
  }
];

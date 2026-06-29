import React, { useState, useEffect } from 'react';
import MarvLogo from './components/MarvLogo';
import { GAMES_DATA, MARV_FAQS, INITIAL_LIVE_MESSAGES } from './data';
import { GameId, Platform, PredictionResult, LiveFeedMessage } from './types';
import { 
  Check, 
  Send, 
  Youtube, 
  User, 
  Gift, 
  Coins, 
  Play, 
  Flame, 
  TrendingUp, 
  HelpCircle, 
  LogOut, 
  Info, 
  Bomb, 
  ChevronRight, 
  Zap, 
  Clock, 
  Lock, 
  Bell, 
  Globe 
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  // State for onboarding & gate-keeping
  const [accountId, setAccountId] = useState(() => localStorage.getItem('marv_account_id') || '');
  const [promoCode, setPromoCode] = useState(() => localStorage.getItem('marv_promo_code') || '');
  const [selectedPlatform, setSelectedPlatform] = useState<Platform>(() => {
    return (localStorage.getItem('marv_selected_platform') as Platform) || '1xbet';
  });
  
  const [hasSubscribedTelegram, setHasSubscribedTelegram] = useState(() => {
    return localStorage.getItem('marv_tg_subscribed') === 'true';
  });
  const [hasSubscribedYoutube, setHasSubscribedYoutube] = useState(() => {
    return localStorage.getItem('marv_yt_subscribed') === 'true';
  });

  const [isTelegramChecking, setIsTelegramChecking] = useState(false);
  const [isYoutubeChecking, setIsYoutubeChecking] = useState(false);

  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('marv_user_logged_in') === 'true';
  });

  const [toast, setToast] = useState('');
  const [activeGame, setActiveGame] = useState<GameId>('aviator');

  // Generator Loading States
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationStep, setGenerationStep] = useState('');
  const [prediction, setPrediction] = useState<PredictionResult | null>(null);

  // Live Chat/Signals Feed
  const [liveMessages, setLiveMessages] = useState<LiveFeedMessage[]>(INITIAL_LIVE_MESSAGES);
  const [inputChatMessage, setInputChatMessage] = useState('');

  // Interactive Game configurations
  const [minesCount, setMinesCount] = useState<number>(3); // 1, 3, 5, 10
  const [appleLevel, setAppleLevel] = useState<number>(5); // steps 1 to 10

  // Trigger Toast Alert
  const triggerToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(''), 4000);
  };

  // Channel Subscriptions action emulation
  const handleTelegramJoin = () => {
    setIsTelegramChecking(true);
    // Open channel in a new tab
    window.open('https://t.me/MarvPredictor_VIP_channels_example', '_blank');
    
    // Auto-verify with interactive feedback delay
    setTimeout(() => {
      setIsTelegramChecking(false);
      setHasSubscribedTelegram(true);
      localStorage.setItem('marv_tg_subscribed', 'true');
      triggerToast('تم التحقق من انضمامك لقناة تليجرام VIP بنجاح! ✅');
    }, 2000);
  };

  const handleYoutubeSubscribe = () => {
    setIsYoutubeChecking(true);
    // Open youtube channel in a new tab
    window.open('https://youtube.com/@MarvHacks_channels_example', '_blank');
    
    // Auto-verify with interactive feedback delay
    setTimeout(() => {
      setIsYoutubeChecking(false);
      setHasSubscribedYoutube(true);
      localStorage.setItem('marv_yt_subscribed', 'true');
      triggerToast('تم التحقق من اشتراكك في قناة يوتيوب Marv بنجاح! ✅');
    }, 2000);
  };

  // Reset Onboarding fields
  const handleResetActivation = () => {
    setHasSubscribedTelegram(false);
    setHasSubscribedYoutube(false);
    localStorage.removeItem('marv_tg_subscribed');
    localStorage.removeItem('marv_yt_subscribed');
    triggerToast('تم إعادة تعيين خطوات التحقق من قنوات التواصل والمتابعة.');
  };

  // Perform Gate login validation
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!accountId.trim()) {
      triggerToast('⚠️ يرجى إدخال رقم حساب اللاعب ID المكون من 6 أرقام على الأقل.');
      return;
    }

    if (accountId.trim().length < 5) {
      triggerToast('⚠️ رقم حساب اللاعب ID غير صالح. يرجى كتابة الرقم الصحيح.');
      return;
    }

    if (promoCode.trim().toLowerCase() !== 'marv66') {
      triggerToast('❌ البرومو كود غير صحيح! يرجى استخدام برومو كود التفعيل: marv66 لتجاوز القفل الحسابي.');
      return;
    }

    if (!hasSubscribedTelegram || !hasSubscribedYoutube) {
      triggerToast('🔒 يرجى الاشتراك في قناة Telegram وقناة YouTube أولاً لتفعيل مفتاح الدخول للمنصة!');
      return;
    }

    // Success login sequence
    localStorage.setItem('marv_account_id', accountId);
    localStorage.setItem('marv_promo_code', promoCode);
    localStorage.setItem('marv_selected_platform', selectedPlatform);
    localStorage.setItem('marv_user_logged_in', 'true');
    setIsLoggedIn(true);
    triggerToast(`🎉 تم تسجيل الدخول بنجاح! خادم Marv الآمن جاهز لتوليد الثغرات لـ ${selectedPlatform.toUpperCase()}.`);
  };

  // Log out of prediction portal
  const handleLogout = () => {
    localStorage.removeItem('marv_user_logged_in');
    setIsLoggedIn(false);
    setPrediction(null);
    triggerToast('تم تسجيل الخروج بنجاح وجاري حماية جلسة تفعيلك الحالية.');
  };

  // Auto-generate some simulated active chat messages in portal
  useEffect(() => {
    if (!isLoggedIn) return;

    const interval = setInterval(() => {
      const names = ['أحمد_99', 'إمبراطور_النبيتي', 'كابتن_العرب', 'المصري_101', 'يوسف_ستارك', 'مارف_هكر', 'ابن_سينا'];
      const actions = [
        `ربح للتو بقيمة 3,450$ على فئة التفاح بفضل الثغرة!`,
        `قام بتوليد مضاعف كراش بقيمة 8.50x وانسحب بالوقت المناسب.`,
        `ثغرة تفاحة الحظ شغالة على Melbet بنسبة 100%!`,
        `سحب فوري بقيمة 1,220$ من حساب 1XBET آمن بعد الترقية ببرومو marv66.`
      ];
      const randomName = names[Math.floor(Math.random() * names.length)];
      const randomAction = actions[Math.floor(Math.random() * actions.length)];

      const newMessage: LiveFeedMessage = {
        id: 'msg-' + Date.now(),
        gameId: Math.random() > 0.5 ? 'aviator' : 'apple_of_fortune',
        platform: selectedPlatform,
        message: `${randomName} - ${randomAction}`,
        timestamp: 'الآن',
        badge: Math.random() > 0.5 ? 'VIP إشارة' : 'ربح مباشر 💰'
      };

      setLiveMessages(prev => [newMessage, ...prev.slice(0, 7)]);
    }, 12000);

    return () => clearInterval(interval);
  }, [isLoggedIn, selectedPlatform]);

  // Handle manual premium chat message input
  const sendChatMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputChatMessage.trim()) return;

    const myMessage: LiveFeedMessage = {
      id: 'my-msg-' + Date.now(),
      gameId: activeGame,
      platform: selectedPlatform,
      message: `أنا (ID: ${accountId}) : ${inputChatMessage}`,
      timestamp: 'الآن',
      badge: `مستخدم VIP ⭐`
    };

    setLiveMessages(prev => [myMessage, ...prev]);
    setInputChatMessage('');
    triggerToast('تم بث رسالتك بنجاح في شات البوت المباشر.');
  };

  // Dynamic Predictor simulation logic
  const handleGenerateSignal = () => {
    setIsGenerating(true);
    setPrediction(null);

    const steps = [
      'جاري الاتصال بسيرفر الألعاب المركزي للـ ID الخاص بك...',
      'فحص ثغرة الكاش الأخيرة وتنزيل مصفوفة الخادم...',
      'مزامنة البرومو كود العسكري stark66 والتحقق من التشفير...',
      'حساب الاحتمال الرياضي المانع للانفجار وتسجيل المسار الحالي...',
      'تجهيز المخرجات وتوليد إشارة مضمونة بنسبة 99.4%...'
    ];

    let currentStepIndex = 0;
    setGenerationStep(steps[0]);

    const stepInterval = setInterval(() => {
      currentStepIndex++;
      if (currentStepIndex < steps.length) {
        setGenerationStep(steps[currentStepIndex]);
      } else {
        clearInterval(stepInterval);
        
        // Finalize prediction according to the active game
        let result: PredictionResult = {
          winChance: Math.floor(Math.random() * 5) + 95, // 95% to 99%
          generatedAt: new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
          extraTip: 'يرجى تطبيق اللعب فوراً ولا تكرره أكثر من 3 مرات في الساعة للحماية.'
        };

        if (activeGame === 'aviator') {
          // Aviator values
          const multipliers = [1.88, 2.45, 3.12, 1.45, 4.20, 1.95, 5.80, 2.89, 12.30, 24.10, 1.34];
          result.multiplier = multipliers[Math.floor(Math.random() * multipliers.length)];
        } else if (activeGame === 'apple_of_fortune') {
          // Generate a safe column index for each level (level 1 up to level 10)
          const path: number[] = [];
          for (let row = 0; row < 10; row++) {
            path.push(Math.floor(Math.random() * 5)); // 0 to 4 safe column index
          }
          result.applePath = path;
        }

        setPrediction(result);
        setIsGenerating(false);
        triggerToast('🎁 تم توليد إشارة الإختراق بنجاح! اتبع التعليمات الموضحة بكود الغش.');
      }
    }, 600);
  };

  return (
    <div className="bg-slate-50 min-h-screen text-slate-800 flex flex-col font-sans selection:bg-[#7a0826] selection:text-white" dir="rtl">
      
      {/* Toast Alert Banner */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -50, scale: 0.9 }}
            className="fixed top-6 left-6 right-6 sm:left-auto sm:right-6 sm:w-96 z-50 bg-[#7a0826] text-white font-bold text-sm py-4 px-6 rounded-2xl shadow-xl flex items-center gap-3 border-2 border-white/20"
          >
            <div className="w-6 h-6 rounded-full bg-white text-[#7a0826] flex items-center justify-center font-black shrink-0">
              ✓
            </div>
            <span>{toast}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* BEFORE REGISTRATION/LOGIN VIEW (Access Gate lock) */}
      {!isLoggedIn ? (
        <div className="flex-grow flex items-center justify-center py-10 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#1c0006] via-[#3a0211] to-[#60041a] min-h-screen">
          <div className="max-w-2xl w-full">
            
            {/* Main branding header */}
            <div className="text-center mb-8">
              <MarvLogo size="lg" className="mx-auto mb-4" />
              <motion.h1
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl sm:text-5xl font-black text-white tracking-tight mt-3"
              >
                بوابة الحماية لتنشيط <span className="text-rose-400">MARV</span>
              </motion.h1>
              <p className="text-stone-300 text-sm sm:text-base mt-2 font-medium">
                تطبيق الإشارات ومكتشف ثغرات ألعاب المراهنات <span className="text-rose-300 font-bold">1XBET</span> و <span className="text-rose-300 font-bold">MELBET</span> المضمون.
              </p>
            </div>

            {/* Split onboarding card panel */}
            <motion.div 
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white rounded-3xl shadow-2xl p-6 sm:p-8 border-4 border-[#7a0826]/30 overflow-hidden relative"
            >
              <div className="absolute top-0 left-0 w-full h-2.5 bg-gradient-to-r from-red-600 via-amber-400 to-rose-700" />
              
              {/* Step Title Indicator */}
              <div className="mb-8 border-b pb-6 border-slate-100">
                <span className="bg-[#7a0826]/10 text-[#7a0826] px-4 py-1.5 rounded-full text-xs font-black">
                  مطلوب إكمال التحقق السحابي 🔐
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-slate-800 mt-3 leading-snug">
                  تابع الخطوات التالية للتحقق وربط خوارزميات حسابك بالذكاء
                </h2>
                <p className="text-slate-500 text-xs sm:text-sm mt-1">
                  نظام كسر الحماية يضمن عمل الإشارات بدقة 99%. يرجى الإشتراك بالقناتين كحد أدنى.
                </p>
              </div>

              {/* Step 1: Channel subscriptions layout */}
              <div className="space-y-4 mb-8">
                <h3 className="text-xs font-extrabold text-[#7a0826] uppercase tracking-wider flex items-center gap-1">
                  <span>الخطوة الأولى:</span>
                  <span>الاشتراك في قنوات تفعيل النظام</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Telegram Channel Button */}
                  <div className={`p-4 rounded-2xl border-2 transition-all ${
                    hasSubscribedTelegram 
                      ? 'border-emerald-500 bg-emerald-50/50' 
                      : 'border-slate-200 hover:border-[#7a0826]/40 bg-slate-50'
                  }`}>
                    <div className="flex justify-between items-start mb-3">
                      <div className="bg-sky-500 p-2 rounded-xl text-white">
                        <Send className="w-5 h-5" />
                      </div>
                      {hasSubscribedTelegram ? (
                        <span className="text-xs text-emerald-600 font-black flex items-center gap-0.5 bg-emerald-100 py-1 px-2.5 rounded-lg">
                          تم التفعيل <Check className="w-3.5 h-3.5 stroke-[3]" />
                        </span>
                      ) : (
                        <span className="text-xs text-[#7a0826] font-black bg-rose-100 py-1 px-2.5 rounded-lg animate-pulse">
                          مطلوب اشتراك
                        </span>
                      )}
                    </div>
                    <h4 className="text-sm font-bold text-slate-800">قناة تلغرام مارف الأساسية</h4>
                    <p className="text-slate-500 text-[11px] mt-1 mb-4">
                      انضم لقناتنا ببرنامج Telegram لمتابعة أحدث الإشتباكات اليومية والروابط والتحديثات.
                    </p>

                    <button
                      type="button"
                      disabled={hasSubscribedTelegram || isTelegramChecking}
                      onClick={handleTelegramJoin}
                      className={`w-full py-2.5 px-4 rounded-xl text-xs font-black inline-flex items-center justify-center gap-2 transition-all cursor-pointer ${
                        hasSubscribedTelegram
                          ? 'bg-emerald-500 text-white cursor-default'
                          : 'bg-[#7a0826] hover:bg-[#60041a] text-white shadow-md'
                      }`}
                    >
                      {isTelegramChecking ? (
                        <span className="inline-block w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                      ) : (
                        <span>{hasSubscribedTelegram ? '✅ انضممت بنجاح' : 'اشترك في قناة التليجرام ↗'}</span>
                      )}
                    </button>
                  </div>

                  {/* YouTube Channel Button */}
                  <div className={`p-4 rounded-2xl border-2 transition-all ${
                    hasSubscribedYoutube 
                      ? 'border-emerald-500 bg-emerald-50/50' 
                      : 'border-slate-200 hover:border-[#7a0826]/40 bg-slate-50'
                  }`}>
                    <div className="flex justify-between items-start mb-3">
                      <div className="bg-red-600 p-2 rounded-xl text-white">
                        <Youtube className="w-5 h-5" />
                      </div>
                      {hasSubscribedYoutube ? (
                        <span className="text-xs text-emerald-600 font-black flex items-center gap-0.5 bg-emerald-100 py-1 px-2.5 rounded-lg">
                          تم التفعيل <Check className="w-3.5 h-3.5 stroke-[3]" />
                        </span>
                      ) : (
                        <span className="text-xs text-[#7a0826] font-black bg-rose-100 py-1 px-2.5 rounded-lg animate-pulse">
                          مطلوب اشتراك
                        </span>
                      )}
                    </div>
                    <h4 className="text-sm font-bold text-slate-800">قناة يوتيوب Marv الرسمية</h4>
                    <p className="text-slate-500 text-[11px] mt-1 mb-4">
                      اشترك في القناة وشاهد شرح ثغرات المراهنات لتفعيل حظر الكاش الفوري لحسابك.
                    </p>

                    <button
                      type="button"
                      disabled={hasSubscribedYoutube || isYoutubeChecking}
                      onClick={handleYoutubeSubscribe}
                      className={`w-full py-2.5 px-4 rounded-xl text-xs font-black inline-flex items-center justify-center gap-2 transition-all cursor-pointer ${
                        hasSubscribedYoutube
                          ? 'bg-emerald-500 text-white cursor-default'
                          : 'bg-[#7a0826] hover:bg-[#60041a] text-white shadow-md'
                      }`}
                    >
                      {isYoutubeChecking ? (
                        <span className="inline-block w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                      ) : (
                        <span>{hasSubscribedYoutube ? '✅ فعلت الإشتراك' : 'اشترك في قناة اليوتيوب ↗'}</span>
                      )}
                    </button>
                  </div>
                </div>

                <div className="flex justify-end">
                  <button 
                    type="button" 
                    onClick={handleResetActivation} 
                    className="text-slate-400 text-[10px] underline hover:text-[#7a0826] cursor-pointer"
                  >
                    أواجه مشكلة في الإشتراك؟ إعادة تهيئة الخطوات
                  </button>
                </div>
              </div>

              {/* Login Form block with IDs and Promo Codes */}
              <form onSubmit={handleLoginSubmit} className="space-y-5 border-t pt-6 border-slate-100">
                <h3 className="text-xs font-extrabold text-[#7a0826] uppercase tracking-wider flex items-center gap-1">
                  <span>الخطوة الثانية:</span>
                  <span>الارتباط بحساب الالعاب وتفعيل البوت</span>
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Account ID Input field */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      رقم الحساب التعريفي للمراهنات (Account ID)
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none">
                        <User className="w-4 h-4 text-slate-400" />
                      </div>
                      <input
                        type="text"
                        required
                        value={accountId}
                        onChange={(e) => setAccountId(e.target.value)}
                        placeholder="مثال: 49172201"
                        className="w-full text-slate-850 bg-slate-50 border border-slate-300 focus:border-[#7a0826] focus:bg-white rounded-xl py-3 pr-10 pl-3 text-sm outline-none transition-all font-semibold"
                      />
                    </div>
                    <span className="text-[10px] text-slate-400 block mt-1">
                      أدخل الرقم التعريفي الخاص بحسابك على Melbet أو 1xbet لتثبيت الارتباط.
                    </span>
                  </div>

                  {/* Promo Code Input field */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5 flex justify-between">
                      <span>البرومو كود لتجاوز القفل (Promo Code)</span>
                      <span className="text-[#a3153c] font-black underline">مطلوب: marv66</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none">
                        <Gift className="w-4 h-4 text-[#a3153c]" />
                      </div>
                      <input
                        type="text"
                        required
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        placeholder="اكتب كود الإرتباط النشط هنا..."
                        className="w-full text-slate-850 bg-slate-50 border border-slate-300 focus:border-[#7a0826] focus:bg-white rounded-xl py-3 pr-10 pl-3 text-sm outline-none transition-all font-black uppercase text-center placeholder:font-normal placeholder:text-slate-400 text-rose-700 tracking-wider"
                      />
                    </div>
                    <span className="text-[10px] text-slate-400 block mt-1">
                      لا يمكنك الدخول بدون كتابة كود الخصم الفعال والبرمجي <strong className="text-rose-700 text-xs">marv66</strong>.
                    </span>
                  </div>
                </div>

                {/* Choose target platform */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-2">
                    اختر المنصة التي تود اللعب عليها وتوليد ثغراتها:
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {/* Platform button Option 1 */}
                    <button
                      type="button"
                      onClick={() => setSelectedPlatform('1xbet')}
                      className={`py-3 px-4 rounded-xl flex items-center justify-center gap-3 border-2 transition-all cursor-pointer font-bold ${
                        selectedPlatform === '1xbet'
                          ? 'bg-[#1a3b8b]/10 text-[#1a3b8b] border-[#1a3b8b] shadow-sm'
                          : 'bg-white text-slate-650 border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      <span className="w-2.5 h-2.5 rounded-full bg-[#1a3b8b] animate-pulse" />
                      <div className="text-right">
                        <p className="text-sm font-black tracking-tight">1XBET</p>
                        <p className="text-[9px] text-slate-400 font-normal">خادم الارتباط 01</p>
                      </div>
                    </button>

                    {/* Platform button Option 2 */}
                    <button
                      type="button"
                      onClick={() => setSelectedPlatform('melbet')}
                      className={`py-3 px-4 rounded-xl flex items-center justify-center gap-3 border-2 transition-all cursor-pointer font-bold ${
                        selectedPlatform === 'melbet'
                          ? 'bg-[#e2aa0f]/10 text-amber-700 border-[#e2aa0f] shadow-sm'
                          : 'bg-white text-slate-650 border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse" />
                      <div className="text-right">
                        <p className="text-sm font-black tracking-tight">MELBET</p>
                        <p className="text-[9px] text-slate-400 font-normal">خادم الارتباط 02</p>
                      </div>
                    </button>
                  </div>
                </div>

                {/* Submit activation button */}
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-[#7a0826] to-[#a3153c] hover:from-[#60041a] hover:to-[#7a0826] text-white py-4 rounded-2xl font-black text-sm transition-all shadow-md shadow-[#7a0826]/20 flex items-center justify-center gap-2 cursor-pointer mt-4"
                >
                  <Lock className="w-4 h-4 shrink-0 text-rose-200" />
                  <span>تنشيط وتفعيل الدخول الفوري للرادار 🚀</span>
                </button>
              </form>

              <div className="mt-6 border-t pt-4 text-center">
                <p className="text-[12px] text-slate-500 font-semibold">
                  بمجرد استخدام الكود <span className="text-[#a3153c] font-extrabold font-mono">marv66</span> ستستفيد فورياً من بونص استثنائي مالي يصل إلى <span className="text-emerald-600 font-bold">200%</span> عند أول شحن لمضاعفة أرباحك على اللعبة المحددة!
                </p>
              </div>

            </motion.div>

            {/* Bottom Credits */}
            <div className="text-center mt-6 text-stone-400 text-xs font-semibold">
              <p>© منصة MARV لتوقعات الألعاب الذكية 2026. البرمجة برعاية كود marv66.</p>
            </div>

          </div>
        </div>
      ) : (
        
        /* CORE VERIFIED RESELLER / PREDICTOR DASHBOARD TAB VIEW */
        <>
          {/* Header Portal details */}
          <header className="bg-white border-b border-slate-200 shadow-sm sticky top-0 z-40">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between h-20">
                
                {/* Brand and money logo */}
                <div className="flex items-center gap-3">
                  <MarvLogo size="sm" />
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-xl font-extrabold tracking-wider text-slate-800 font-serif lowercase">marv</span>
                      <span className="bg-[#7a0826] text-white text-[9px] font-black px-2 py-0.5 rounded-full uppercase">VIP PRO</span>
                    </div>
                    <p className="text-emerald-600 text-[10px] font-bold flex items-center gap-1 mt-0.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping inline-block" />
                      <span>متصل بالخادم الآمن بنجاح</span>
                    </p>
                  </div>
                </div>

                {/* Dashboard stats center - desktop view */}
                <div className="hidden lg:flex items-center gap-8 text-xs font-bold border-x px-8 border-slate-100 py-2">
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase">رقم اللاعب النشط ID:</span>
                    <span className="text-slate-800 font-mono tracking-wider">{accountId}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase">البرومو كود المستخدم:</span>
                    <span className="text-rose-600 font-black">{promoCode}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase">المنصة المختارة:</span>
                    <span className="bg-slate-100 text-slate-700 py-0.5 px-2.5 rounded-md font-mono text-[11px] uppercase ml-1">
                      {selectedPlatform}
                    </span>
                  </div>
                </div>

                {/* Actions column */}
                <div className="flex items-center gap-3">
                  {/* Direct platform indicator widget */}
                  <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs">
                    <button
                      onClick={() => {
                        setSelectedPlatform('1xbet');
                        triggerToast('📡 تم تحويل النظام لاستقبال بيانات 1XBET الحية');
                      }}
                      className={`px-3 py-1.5 font-extrabold rounded-lg transition-all cursor-pointer ${
                        selectedPlatform === '1xbet'
                          ? 'bg-[#1a3b8b] text-white shadow-sm'
                          : 'text-slate-500 hover:text-slate-800'
                      }`}
                    >
                      1XBET
                    </button>
                    <button
                      onClick={() => {
                        setSelectedPlatform('melbet');
                        triggerToast('📡 تم تحويل النظام لاستقبال بيانات MELBET الحية');
                      }}
                      className={`px-3 py-1.5 font-extrabold rounded-lg transition-all cursor-pointer ${
                        selectedPlatform === 'melbet'
                          ? 'bg-amber-500 text-white shadow-sm'
                          : 'text-slate-500 hover:text-slate-800'
                      }`}
                    >
                      MELBET
                    </button>
                  </div>

                  {/* Logout Button */}
                  <button
                    onClick={handleLogout}
                    className="p-2 text-slate-400 hover:text-rose-600 bg-slate-50 hover:bg-rose-50 rounded-xl transition-colors cursor-pointer border border-slate-200"
                    title="تسجيل الخروج لحماية الجلسة"
                  >
                    <LogOut className="w-5 h-5" />
                  </button>
                </div>

              </div>
            </div>
          </header>

          {/* Running profits ticker alert banner */}
          <div className="bg-[#7a0826] text-white py-2 px-4 shadow-inner">
            <div className="max-w-7xl mx-auto flex items-center justify-between text-xs font-semibold overflow-hidden">
              <div className="flex items-center gap-2 shrink-0">
                <span className="bg-amber-400 text-slate-900 px-2 py-0.5 rounded font-bold text-[10px] animate-pulse">إعلان مالي</span>
                <span className="text-amber-100 font-bold">بونص marv66:</span>
              </div>
              <div className="marquee overflow-hidden relative w-full h-4 mr-3">
                <p className="absolute w-full h-full text-left md:text-right font-medium animate-pulse text-[11px] sm:text-xs">
                  كود الخصم المعتمد <strong className="text-amber-300 underline underline-offset-2">marv66</strong> يمنحك 200% بونص ألعاب فوري ومسار غش إشارات آمن بالخريطة للتفاح وكراش الطيارة!
                </p>
              </div>
            </div>
          </div>

          <main className="flex-grow py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* PRIMARY ACTION TAB Predictors (lg:col-span-8) */}
              <div className="lg:col-span-8 space-y-6">
                
                {/* Mode Selector and Quick statistics */}
                <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm overflow-hidden relative">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-rose-50 blur-3xl rounded-full opacity-60 pointer-events-none" />
                  
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div>
                      <h2 className="text-2xl font-black text-slate-800">
                        رادار توقعات الألعاب المعتمد 🪄
                      </h2>
                      <p className="text-slate-500 text-xs sm:text-sm mt-1">
                        اختر اللعبة التنافسية للبدء في توليد الإشارة الحية الفورية المستخرجة من أوراق السرفر.
                      </p>
                    </div>

                    {/* Stats display */}
                    <div className="flex items-center gap-6 divide-x divide-x-reverse divide-slate-100 text-center">
                      <div>
                        <span className="text-slate-400 text-[10px] block">دقة الإشارة العامة</span>
                        <span className="text-[#a3153c] text-xl font-black">99.4%</span>
                      </div>
                      <div className="pr-6">
                        <span className="text-slate-400 text-[10px] block">لاعبون نشطون بالرادار</span>
                        <span className="text-slate-800 text-xl font-black">1,489</span>
                      </div>
                    </div>
                  </div>

                  {/* Tabs Navigator list */}
                  <div className="grid grid-cols-2 gap-2 mt-6 bg-slate-50 p-1.5 rounded-2xl border" id="predictor-game-tabs">
                    {GAMES_DATA.map((game) => (
                      <button
                        key={game.id}
                        onClick={() => {
                          setActiveGame(game.id);
                          setPrediction(null);
                        }}
                        className={`py-3.5 px-2 sm:px-4 rounded-xl text-xs sm:text-sm transition-all cursor-pointer font-black flex flex-col sm:flex-row items-center justify-center gap-2 ${
                          activeGame === game.id
                            ? 'bg-gradient-to-br from-[#7a0826] to-[#a3153c] text-white shadow-md'
                            : 'bg-white hover:bg-slate-100 text-slate-600'
                        }`}
                      >
                        {game.id === 'aviator' && <span className="text-base sm:text-lg">✈️</span>}
                        {game.id === 'apple_of_fortune' && <span className="text-base sm:text-lg">🍎</span>}
                        <span>{game.arabicTitle.split(' ').slice(1).join(' ') || game.title}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* ACTIVE GAME PREDICTOR WORKSPACE */}
                <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-md relative overflow-hidden">
                  
                  {/* Interactive branding background watermark */}
                  <div className="absolute top-4 left-4 text-xs font-black text-rose-500/10 bg-rose-500/5 px-2.5 py-1 rounded-md uppercase select-none">
                    {selectedPlatform} v2.8 PRO
                  </div>

                  {/* GAME 1: AVIATOR PREDICTOR */}
                  {activeGame === 'aviator' && (
                    <div className="space-y-6">
                      <div className="text-center max-w-md mx-auto">
                        <span className="bg-rose-50 text-[#7a0826] text-xs font-extrabold py-1 px-3 rounded-full border border-[#7a0826]/10">
                          رادار طائرة كراش الذكي ✈️
                        </span>
                        <h3 className="text-lg font-black text-slate-800 mt-2">مرصد المضاعفات الفورية</h3>
                        <p className="text-slate-500 text-xs mt-1">
                          يقوم بمزامنة التكرارات من الخادم للوصول إلى أنسب نقاط السحب في لعبة الطائرة (Crash).
                        </p>
                      </div>

                      {/* Display Flight Canvas Graphics simulation */}
                      <div className="relative py-12 px-4 bg-slate-50 border border-slate-150 rounded-2xl flex flex-col items-center justify-center overflow-hidden min-h-[220px]">
                        
                        {/* Background grid lines */}
                        <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />

                        <AnimatePresence mode="wait">
                          {isGenerating ? (
                            <motion.div
                              key="loading"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              className="text-center space-y-4 relative z-10"
                            >
                              <div className="relative w-20 h-20 mx-auto">
                                <div className="absolute inset-0 rounded-full border-4 border-[#7a0826]/10 animate-pulse" />
                                <div className="absolute inset-0 rounded-full border-4 border-t-red-650 animate-spin" />
                                <span className="text-3xl absolute top-5 right-5 animate-bounce">✈️</span>
                              </div>
                              <p className="text-[#a3153c] font-black text-sm max-w-xs mx-auto animate-pulse">
                                {generationStep}
                              </p>
                            </motion.div>
                          ) : prediction ? (
                            <motion.div
                              key="result"
                              initial={{ scale: 0.9, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              className="text-center space-y-4"
                            >
                              <span className="text-xs bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full font-bold">
                                تم تخمين التكرار الآمن بنجاح مضاعف 🚀
                              </span>
                              
                              <div className="text-5xl sm:text-7xl font-extrabold text-[#7a0826] font-mono select-all tracking-tight my-4 block drop-shadow-sm">
                                {prediction.multiplier?.toFixed(2)}x
                              </div>

                              <p className="text-slate-500 text-xs max-w-sm mx-auto">
                                ارفع الرهان واسحب تلقائياً عند <strong className="text-slate-800 font-bold">{(prediction.multiplier ? prediction.multiplier * 0.9 : 1.5).toFixed(2)}x</strong> للأمان الحاسم وتفادي الخسارة.
                              </p>

                              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 bg-slate-150 py-1.5 px-3 rounded-xl border border-slate-200">
                                <Clock className="w-3.5 h-3.5 text-slate-400" />
                                <span>تم الحساب في: {prediction.generatedAt}</span>
                                <span className="mx-1">•</span>
                                <span className="text-[#a3153c]">معدل دقة {prediction.winChance}%</span>
                              </div>
                            </motion.div>
                          ) : (
                            <motion.div
                              key="idle"
                              className="text-center space-y-3"
                            >
                              <div className="w-16 h-16 rounded-full bg-rose-50 text-[#7a0826] flex items-center justify-center text-3xl mx-auto shadow-inner border border-rose-100">
                                ✈️
                              </div>
                              <p className="text-sm font-bold text-slate-700">الرادار هادئ في وضع الترصد</p>
                              <p className="text-slate-400 text-xs max-w-xs mx-auto">
                                اضغط على توليد لقراءة مفاتيح الهاش وجلب المضاعف الفوري القادم للطائرة.
                              </p>
                            </motion.div>
                          )}
                        </AnimatePresence>

                      </div>

                      {/* Control and VIP Tips bar */}
                      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between border-t pt-6">
                        <div className="flex items-center gap-3">
                          <div className="bg-amber-50 rounded-xl p-2.5 text-amber-600">
                            <Info className="w-4 h-4" />
                          </div>
                          <div>
                            <h4 className="text-xs font-bold text-slate-850">ملاحظة بونص marv66:</h4>
                            <p className="text-slate-400 text-[10px] leading-relaxed">
                              البرومو كود marv66 يفعل فجوة في الحساب تمنع خسارة الطائرة في أول 3 ثواني.
                            </p>
                          </div>
                        </div>

                        <button
                          onClick={handleGenerateSignal}
                          disabled={isGenerating}
                          className="w-full sm:w-auto bg-[#7a0826] hover:bg-[#60041a] text-white py-3.5 px-8 rounded-2xl font-black text-sm transition-all shadow-md active:scale-95 flex items-center justify-center gap-2 cursor-pointer shrink-0"
                        >
                          <Zap className="w-4 h-4" />
                          <span>توليد مضاعف كراش التالي ✈️</span>
                        </button>
                      </div>

                    </div>
                  )}

                  {/* GAME 2: MINES PREDICTOR IS REMOVED */}

                  {/* GAME 3: APPLE OF FORTUNE PREDICTOR */}
                  {activeGame === 'apple_of_fortune' && (
                    <div className="space-y-6">
                      <div className="text-center max-w-md mx-auto">
                        <span className="bg-rose-50 text-[#7a0826] text-xs font-extrabold py-1 px-3 rounded-full border border-[#7a0826]/10">
                          ثغرة تفاحة الحظ 🍎
                        </span>
                        <h3 className="text-lg font-black text-slate-800 mt-2">خريطة التفاح السليم</h3>
                        <p className="text-slate-500 text-xs mt-1">
                          تحليل عمودي للأكواد لتوليد وتعيين المسارات الآمنة من التفاح السليم وتفادي جمجمة التفاح الفاسد.
                        </p>
                      </div>

                      {/* Target height config */}
                      <div className="bg-slate-50 border p-3 rounded-2xl flex flex-wrap items-center justify-between gap-3">
                        <span className="text-xs font-bold text-slate-700 flex items-center gap-1">
                          <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
                          <span>مستوى الصعود المرغوب:</span>
                        </span>
                        
                        <div className="flex items-center gap-1.5">
                          {[3, 5, 7, 9].map((lvl) => (
                            <button
                              key={lvl}
                              onClick={() => {
                                setAppleLevel(lvl);
                                setPrediction(null);
                                triggerToast(`تم ضبط البوت لتكثيف الأمان حتى المستوى ${lvl} من أصل 10.`);
                              }}
                              className={`px-3 py-1.5 rounded-lg text-xs font-extrabold cursor-pointer transition-all ${
                                appleLevel === lvl
                                  ? 'bg-[#7a0826] text-white'
                                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                              }`}
                            >
                              مستوى {lvl} (مضاعف {lvl === 3 ? '1.93x' : lvl === 5 ? '4.02x' : lvl === 7 ? '13.04x' : '100.0x+'})
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Apple Tower Visualization and prediction results */}
                      <div className="py-6 bg-slate-50 border border-slate-200 rounded-2xl relative min-h-[240px] flex items-center justify-center">
                        <div className="absolute top-1 right-2 text-[10px] text-slate-400 font-bold uppercase select-none">
                          مصفوفة الارتفاع (5 أعمدة × 10 مستويات)
                        </div>

                        {isGenerating ? (
                          <div className="text-center space-y-4">
                            <div className="flex flex-col gap-1 opacity-20 blur-[1px] items-center justify-center">
                              {Array(5).fill(null).map((_, r) => (
                                <div key={r} className="flex gap-1.5">
                                  {Array(5).fill(null).map((_, c) => (
                                    <div key={c} className="w-6 h-6 bg-slate-400 rounded" />
                                  ))}
                                </div>
                              ))}
                            </div>
                            <p className="text-[#a3153c] font-black text-sm animate-pulse max-w-xs">{generationStep}</p>
                          </div>
                        ) : prediction?.applePath ? (
                          <div className="space-y-4 w-full px-4 text-center">
                            
                            {/* Tower Container, showing last top levels as blur to guide focus */}
                            <div className="inline-flex flex-col gap-1 bg-white p-4 rounded-2xl shadow-md border max-w-sm w-full mx-auto">
                              
                              {/* Read top-down but labels go ten to one */}
                              {Array(10).fill(null).map((_, revIdx) => {
                                const levelNum = 10 - revIdx; // 10 down to 1
                                const isTargetLevel = levelNum <= appleLevel;
                                const safeColIdx = prediction.applePath ? prediction.applePath[levelNum - 1] : -1;

                                return (
                                  <div 
                                    key={levelNum} 
                                    className={`flex items-center justify-between gap-1 border-b py-0.5 border-slate-50 ${
                                      isTargetLevel ? 'opacity-100' : 'opacity-30'
                                    }`}
                                  >
                                    <span className="text-[10px] font-black text-slate-400 w-12 text-right">
                                      مستوى {levelNum}
                                    </span>

                                    <div className="flex gap-1 sm:gap-2 justify-center flex-grow">
                                      {Array(5).fill(null).map((_, colIdx) => {
                                        const isSafe = colIdx === safeColIdx;
                                        return (
                                          <div
                                            key={colIdx}
                                            className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center text-xs font-black transition-all ${
                                              isSafe && isTargetLevel
                                                ? 'bg-red-500 text-white shadow-md border-2 border-white scale-110 animate-pulse'
                                                : 'bg-slate-100 text-slate-300'
                                            }`}
                                          >
                                            {isSafe && isTargetLevel ? '🍎' : `${colIdx + 1}`}
                                          </div>
                                        );
                                      })}
                                    </div>

                                    <span className="text-[9px] text-[#7a0826] font-bold w-12 text-left">
                                      {isSafeCol(levelNum) ? 'آمن ✓' : ''}
                                    </span>
                                  </div>
                                );
                              })}
                            </div>

                            <p className="text-[11px] text-slate-500">
                              * اتبع التفاحات الحمراء 🍎 من الأسفل (المستوى 1) وصولاً للمستوى الذي حددته لجني الأرباح الآمنة بنجاح.
                            </p>
                          </div>
                        ) : (
                          <div className="text-center space-y-4">
                            <div className="flex flex-col gap-1 items-center justify-center opacity-30 select-none">
                              {Array(5).fill(null).map((_, r) => (
                                <div key={r} className="flex gap-2">
                                  {Array(5).fill(null).map((_, c) => (
                                    <div key={c} className="w-7 h-7 bg-slate-400 rounded-lg flex items-center justify-center font-bold text-xs text-white">
                                      ❓
                                    </div>
                                  ))}
                                </div>
                              ))}
                            </div>
                            <p className="text-xs text-slate-400 max-w-sm font-semibold mx-auto">
                              بوابتك آمنة. اضغط على زر التوليد لعرض مسار تفاح الحظ السليم على لوحة الرهان.
                            </p>
                          </div>
                        )}
                      </div>

                      {/* Control and Tip */}
                      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between border-t pt-6">
                        <div className="flex items-center gap-3">
                          <div className="bg-amber-50 rounded-xl p-2.5 text-amber-600">
                            <Flame className="w-4 h-4" />
                          </div>
                          <div>
                            <h4 className="text-xs font-bold text-slate-850">ميزة الثغرة التفاحية:</h4>
                            <p className="text-slate-400 text-[10px] leading-relaxed">
                              تم التكوين بالبروتوكول marv66. إذا سقطت التفاحة، يعاد رصيدك في الحال بسبب فجوة الخادم.
                            </p>
                          </div>
                        </div>

                        <button
                          onClick={handleGenerateSignal}
                          disabled={isGenerating}
                          className="w-full sm:w-auto bg-[#7a0826] hover:bg-[#60041a] text-white py-3.5 px-8 rounded-2xl font-black text-sm transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer shrink-0"
                        >
                          <Zap className="w-4 h-4" />
                          <span>توليد مسار التفاح الآمن ✨</span>
                        </button>
                      </div>

                    </div>
                  )}

                </div>

                {/* HOW TO SECURE SIGNAL STEPS DETAILS */}
                <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
                  <h3 className="text-base font-black text-slate-800 flex items-center gap-2 mb-4">
                    <TrendingUp className="w-4 h-4 text-[#a3153c]" />
                    <span>كيفية تحقيق أقصى ربحية وتجنب الحظر على الحساب</span>
                  </h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs text-slate-600">
                    <div className="bg-slate-50 p-4 rounded-2xl border">
                      <div className="w-7 h-7 rounded-full bg-[#7a0826]/10 text-[#7a0826] flex items-center justify-center font-bold mb-3">
                        ١
                      </div>
                      <h4 className="font-bold text-slate-800 mb-1">الرهان بذكاء وبطء</h4>
                      <p className="text-[11px] leading-relaxed text-slate-500">
                        لا تقم برهانات متطابقة أو سحب متكرر في أقل من دقيقة. جعل تحركاتك تبدو من مهارة لاعب طبيعي.
                      </p>
                    </div>

                    <div className="bg-slate-50 p-4 rounded-2xl border">
                      <div className="w-7 h-7 rounded-full bg-[#7a0826]/10 text-[#7a0826] flex items-center justify-center font-bold mb-3">
                        ٢
                      </div>
                      <h4 className="font-bold text-slate-800 mb-1">تنشيط marv66</h4>
                      <p className="text-[11px] leading-relaxed text-slate-500">
                        كود marv66 يمنع الفحص التلقائي لمكافحة الغش في 1xbet و melbet، مما يوفر غطاء تشفير ممتاز.
                      </p>
                    </div>

                    <div className="bg-slate-50 p-4 rounded-2xl border">
                      <div className="w-7 h-7 rounded-full bg-[#7a0826]/10 text-[#7a0826] flex items-center justify-center font-bold mb-3">
                        ٣
                      </div>
                      <h4 className="font-bold text-slate-800 mb-1">سحب الأرباح اليومية</h4>
                      <p className="text-[11px] leading-relaxed text-slate-500">
                        يفضل عدم مراكمة مبالغ تزيد عن 8,000$ في الحساب دفعة واحدة. اسحب أرباحك على محفظة الكاش فورياً.
                      </p>
                    </div>
                  </div>
                </div>

              </div>
              
              {/* SIDEBAR FOR FEEDS & BOTS (lg:col-span-4) */}
              <div className="lg:col-span-4 space-y-6">
                
                {/* 1. VIP MARV66 PRIVILEGES CARD */}
                <div className="bg-gradient-to-br from-[#1e0006] to-[#4c0214] text-white rounded-3xl p-6 shadow-xl border-2 border-white relative overflow-hidden">
                  {/* Floating light */}
                  <div className="absolute top-0 right-0 w-24 h-24 bg-rose-500/15 rounded-full blur-2xl pointer-events-none" />
                  
                  <div className="flex justify-between items-start mb-4">
                    <span className="bg-amber-400 text-slate-900 text-[10px] font-black px-2.5 py-1 rounded-md uppercase">
                      VIP العضوية
                    </span>
                    <Coins className="w-5 h-5 text-amber-300" />
                  </div>
                  
                  <h3 className="text-lg font-black tracking-tight text-white mb-2">
                    بروتوكول تفعيل البرومو marv66
                  </h3>
                  <p className="text-[11px] text-rose-100 leading-relaxed mb-4 font-semibold">
                    باستخدامك للبرومو كود <span className="text-amber-300 font-extrabold uppercase font-mono tracking-wider">marv66</span> تم ربط المعرف ID الخاص بك بنجاح و تنشيط ما يلي:
                  </p>

                  <ul className="space-y-2.5 text-xs text-rose-50 font-medium">
                    <li className="flex items-center gap-2">
                      <span className="text-amber-300 font-bold">✓</span>
                      <span>تأمين حسابك ضد كاشفات السيرفر بنسبة 99%</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-amber-300 font-bold">✓</span>
                      <span>مضاعف بونص مالي فوري حتى 200% عند أول إيداع</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-amber-300 font-bold">✓</span>
                      <span>الحصول على 50 لفة مجانية كاملة على ألعاب الكازينو</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-amber-300 font-bold">✓</span>
                      <span>سحب الأرباح بشكل معجل خلال أقل من 15 دقيقة</span>
                    </li>
                  </ul>
                </div>

                {/* 2. LIVE BOT CHAT AND SIGNALS FEED */}
                <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <div className="flex items-center gap-2">
                      <span className="relative flex h-2.5 w-2.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500" />
                      </span>
                      <h4 className="text-sm font-black text-slate-800">شات ومؤشرات خادم MARV</h4>
                    </div>
                    <span className="text-[10px] text-slate-400 font-bold">تحديث فوري 📡</span>
                  </div>

                  {/* Message stack */}
                  <div className="space-y-3 max-h-[290px] overflow-y-auto pr-1 flex flex-col gap-1.5" id="live-chat-panel">
                    {liveMessages.map((msg) => (
                      <div key={msg.id} className="bg-slate-50 p-3 rounded-2xl border text-xs relative overflow-hidden">
                        <div className="flex justify-between items-center mb-1">
                          <span className="font-extrabold text-slate-800 flex items-center gap-1.5">
                            <span className="text-[10px] bg-[#7a0826]/10 text-[#7a0826] px-1.5 py-0.5 rounded font-black uppercase">
                              {msg.platform.toUpperCase()}
                            </span>
                            <span>{msg.badge || 'VIP'}</span>
                          </span>
                          <span className="text-[10px] text-slate-400">{msg.timestamp}</span>
                        </div>
                        <p className="text-slate-600 text-xs mt-1 leading-normal font-semibold">
                          {msg.message}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Quick message reply block */}
                  <form onSubmit={sendChatMessage} className="flex gap-2 pt-2 border-t border-slate-100">
                    <input
                      type="text"
                      value={inputChatMessage}
                      onChange={(e) => setInputChatMessage(e.target.value)}
                      placeholder="لعبت marv66 وربحت..."
                      className="flex-grow bg-slate-50 text-slate-800 text-xs py-2 px-3.5 rounded-xl border focus:border-[#7a0826] outline-none transition-colors"
                    />
                    <button
                      type="submit"
                      className="bg-[#7a0826] hover:bg-[#60041a] text-white p-2.5 rounded-xl transition-all shadow-sm flex items-center justify-center shrink-0 cursor-pointer"
                    >
                      <Send className="w-3.5 h-3.5 text-white" />
                    </button>
                  </form>
                </div>

                {/* 3. MARV QUESTIONS / FAQS */}
                <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm space-y-4">
                  <h4 className="text-sm font-black text-slate-800 flex items-center gap-1.5">
                    <HelpCircle className="w-4 h-4 text-[#a3153c]" />
                    <span>الأسئلة الشائعة حول المنصة</span>
                  </h4>

                  <div className="space-y-4 divide-y divide-slate-100">
                    {MARV_FAQS.map((faq, i) => (
                      <div key={i} className={`pt-3 ${i === 0 ? 'pt-0' : ''}`}>
                        <h5 className="text-xs font-bold text-slate-800 mb-1 leading-snug">
                          • {faq.q}
                        </h5>
                        <p className="text-slate-500 text-[11px] leading-relaxed pr-2.5">
                          {faq.a}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

            </div>
          </main>

          {/* Connected VIP Footer */}
          <footer className="bg-white border-t border-slate-200 mt-12 py-8 text-center text-slate-500 text-xs font-semibold">
            <div className="max-w-7xl mx-auto px-4 space-y-2">
              <div className="flex justify-center items-center gap-1">
                <MarvLogo size="sm" />
                <span className="text-slate-850 font-black font-serif text-lg lowercase">marv predictive radar</span>
              </div>
              <p className="text-slate-400">
                منصة MARV مشفرة عسكرياً ومعتمدة من خوادم 1XBET و MELBET الدولية برعاية البرومو كود marv66.
              </p>
              <p className="text-stone-300 font-mono text-[9px] mt-2">
                Server Connection Protocol: MARV66_SSLv3 // ACTIVE_ENCRYPTION_TRUE
              </p>
            </div>
          </footer>
        </>
      )}

    </div>
  );

  // Helper check function
  function isSafeCol(level: number): boolean {
    if (!prediction || !prediction.applePath) return false;
    return level <= appleLevel;
  }
}

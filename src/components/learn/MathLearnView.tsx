import React, { useState } from 'react';
import {
  MATH_NUMBERS,
  MATH_SHAPES,
  MATH_COLORS,
  MathItem,
  ShapeItem,
  ColorItem,
} from '../../data/learningData';
import { Volume2, ChevronLeft, ChevronRight, Plus, CheckCircle2, Sparkles, Scale, Layers } from 'lucide-react';
import { soundEffects } from '../../utils/soundEffects';
import { speechService } from '../../utils/speech';
import confetti from 'canvas-confetti';

interface MathLearnViewProps {
  onEarnStar: () => void;
  onBackToHome: () => void;
}

type MathSection = 'numbers' | 'counting' | 'shapes' | 'colors' | 'big_small' | 'more_less' | 'addition';

export const MathLearnView: React.FC<MathLearnViewProps> = ({ onEarnStar, onBackToHome }) => {
  const [section, setSection] = useState<MathSection>('numbers');
  const [numberIndex, setNumberIndex] = useState(0);

  // Interactive Counting state
  const [countedCount, setCountedCount] = useState<number>(0);
  const [targetCount, setTargetCount] = useState<number>(5);

  // Big and small state
  const [bigSmallFeedback, setBigSmallFeedback] = useState<string | null>(null);

  // More and less state
  const [moreLessFeedback, setMoreLessFeedback] = useState<string | null>(null);

  // Addition state
  const [addA, setAddA] = useState(2);
  const [addB, setAddB] = useState(3);
  const [additionSolved, setAdditionSolved] = useState(false);

  const currentNumber: MathItem = MATH_NUMBERS[numberIndex];

  const playNumberSound = (item: MathItem) => {
    soundEffects.playPop();
    speechService.speak(`${item.nameBn}, ${item.numBn} টি ${item.itemNameBn}`, 'bn');
  };

  const handleNextNumber = () => {
    soundEffects.playPop();
    if (numberIndex < MATH_NUMBERS.length - 1) {
      const nextIdx = numberIndex + 1;
      setNumberIndex(nextIdx);
      playNumberSound(MATH_NUMBERS[nextIdx]);
    } else {
      soundEffects.playSuccess();
      try {
        confetti({ particleCount: 30, spread: 60 });
      } catch {}
      speechService.speak('দারুণ! তুমি ১ থেকে ২০ পর্যন্ত সব সংখ্যা শিখে ফেলেছ!', 'bn');
      onEarnStar();
    }
  };

  const handlePrevNumber = () => {
    soundEffects.playPop();
    if (numberIndex > 0) {
      const prevIdx = numberIndex - 1;
      setNumberIndex(prevIdx);
      playNumberSound(MATH_NUMBERS[prevIdx]);
    }
  };

  // Interactive Counting item tap
  const handleTapCountItem = (itemNumber: number) => {
    soundEffects.playPop();
    setCountedCount(itemNumber);
    const bengaliNumbers = ['এক', 'দুই', 'তিন', 'চার', 'পাঁচ', 'ছয়', 'সাত', 'আট', 'নয়', 'দশ'];
    speechService.speak(bengaliNumbers[itemNumber - 1] || `${itemNumber}`, 'bn');

    if (itemNumber === targetCount) {
      soundEffects.playSuccess();
      try {
        confetti({ particleCount: 25, spread: 50 });
      } catch {}
      speechService.speak(`অসাধারণ! মোট ${itemNumber}টি গণনা শেষ!`, 'bn');
      onEarnStar();
    }
  };

  // Big and Small check
  const handlePickBigSmall = (picked: 'big' | 'small', target: 'big' | 'small') => {
    if (picked === target) {
      soundEffects.playSuccess();
      setBigSmallFeedback('সঠিক উত্তর! দারুণ পেরেছ! 🎉');
      speechService.speak('সঠিক উত্তর! শাবাশ!', 'bn');
      try {
        confetti({ particleCount: 20 });
      } catch {}
      onEarnStar();
    } else {
      soundEffects.playTryAgain();
      setBigSmallFeedback('আবার চেষ্টা করো, তুমি পারবে! 💖');
      speechService.speak('আবার চেষ্টা করো!', 'bn');
    }
    setTimeout(() => setBigSmallFeedback(null), 2500);
  };

  // More and Less check
  const handlePickMoreLess = (picked: 'more' | 'less', correct: 'more' | 'less') => {
    if (picked === correct) {
      soundEffects.playSuccess();
      setMoreLessFeedback('একদম ঠিক! তুমি খুব বুদ্ধিমান! 🌟');
      speechService.speak('একদম ঠিক উত্তর!', 'bn');
      try {
        confetti({ particleCount: 20 });
      } catch {}
      onEarnStar();
    } else {
      soundEffects.playTryAgain();
      setMoreLessFeedback('আরেকবার ভালো করে দেখো! 💖');
      speechService.speak('আরেকবার দেখে বলো!', 'bn');
    }
    setTimeout(() => setMoreLessFeedback(null), 2500);
  };

  // Addition check
  const handleSolveAddition = (ans: number) => {
    if (ans === addA + addB) {
      soundEffects.playSuccess();
      setAdditionSolved(true);
      speechService.speak(`সঠিক! ${addA} যোগ ${addB} সমান ${ans}!`, 'bn');
      try {
        confetti({ particleCount: 30, spread: 60 });
      } catch {}
      onEarnStar();
      setTimeout(() => {
        // Generate new random problem
        const newA = Math.floor(Math.random() * 4) + 1;
        const newB = Math.floor(Math.random() * 4) + 1;
        setAddA(newA);
        setAddB(newB);
        setAdditionSolved(false);
      }, 2000);
    } else {
      soundEffects.playTryAgain();
      speechService.speak('আবার যোগ করে বলো!', 'bn');
    }
  };

  return (
    <div className="flex-1 flex flex-col p-4 pb-20 select-none">
      {/* Subcategory Horizontal Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar p-1 bg-amber-100/70 rounded-2xl mb-4 border border-amber-200">
        {[
          { id: 'numbers', label: 'সংখ্যা (১-২০)' },
          { id: 'counting', label: 'গণনা (Counting)' },
          { id: 'shapes', label: 'আকার (Shapes)' },
          { id: 'colors', label: 'রং (Colors)' },
          { id: 'big_small', label: 'বড় ও ছোট' },
          { id: 'more_less', label: 'বেশি ও কম' },
          { id: 'addition', label: 'সহজ যোগ' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => {
              soundEffects.playPop();
              setSection(tab.id as MathSection);
            }}
            className={`py-1.5 px-3 rounded-xl text-xs sm:text-sm font-bold font-bangla whitespace-nowrap transition-all cursor-pointer ${
              section === tab.id
                ? 'bg-amber-500 text-white shadow-sm'
                : 'text-amber-900 hover:bg-amber-200/60'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* SECTION 1: NUMBERS 1-20 */}
      {section === 'numbers' && (
        <div className="flex-1 flex flex-col justify-between max-w-md mx-auto w-full">
          <div className="w-full rounded-3xl p-6 border-4 border-amber-300 bg-amber-50 shadow-xl flex flex-col items-center text-center relative transition-all min-h-[380px] justify-between">
            {/* Audio Button */}
            <button
              onClick={() => playNumberSound(currentNumber)}
              title="শুনুন"
              className="absolute top-4 right-4 w-12 h-12 rounded-full bg-white shadow-md flex items-center justify-center text-amber-600 hover:scale-110 active:scale-95 transition-all cursor-pointer border border-amber-200"
            >
              <Volume2 className="w-6 h-6 animate-pulse" />
            </button>

            {/* Dual Bengali & English Digits */}
            <div className="flex items-baseline justify-center gap-4 my-2">
              <span className="text-8xl sm:text-9xl font-black font-bangla text-amber-600 drop-shadow-md">
                {currentNumber.numBn}
              </span>
              <span className="text-4xl sm:text-5xl font-black font-kids text-amber-400">
                ({currentNumber.numEn})
              </span>
            </div>

            {/* Number Name */}
            <div className="text-2xl sm:text-3xl font-black font-bangla text-gray-900">
              {currentNumber.nameBn} • <span className="font-kids">{currentNumber.nameEn}</span>
            </div>

            {/* Countable Items Grid */}
            <div className="my-2 p-3 bg-white/90 rounded-2xl w-full border border-amber-200/80 shadow-xs">
              <div className="text-xs font-bold text-amber-900 font-bangla mb-1">
                {currentNumber.numBn}টি {currentNumber.itemNameBn}:
              </div>
              <div className="flex flex-wrap items-center justify-center gap-1.5 max-h-24 overflow-y-auto">
                {Array.from({ length: currentNumber.numEn }).map((_, i) => (
                  <span
                    key={i}
                    className="text-2xl hover:scale-125 transition-transform cursor-pointer"
                    onClick={() => {
                      soundEffects.playPop();
                      speechService.speak(`${i + 1}`, 'bn');
                    }}
                  >
                    {currentNumber.itemEmoji}
                  </span>
                ))}
              </div>
            </div>

            {/* Speech banner */}
            <div
              onClick={() => playNumberSound(currentNumber)}
              className="w-full bg-white/80 rounded-2xl py-2 px-3 shadow-xs border border-amber-200 cursor-pointer"
            >
              <p className="text-sm font-bold font-bangla text-amber-950 flex items-center justify-center gap-1.5">
                <span>🔊</span> {currentNumber.numBn} - {currentNumber.nameBn} ({currentNumber.nameEn})
              </p>
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between gap-4 mt-5">
            <button
              onClick={handlePrevNumber}
              disabled={numberIndex === 0}
              className={`flex-1 py-3 px-4 rounded-2xl flex items-center justify-center gap-2 font-black font-bangla text-base shadow-md transition-all ${
                numberIndex === 0
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-white text-gray-800 border-2 border-amber-200 hover:bg-amber-50 active:scale-95 cursor-pointer'
              }`}
            >
              <ChevronLeft className="w-5 h-5" />
              <span>আগের সংখ্যা</span>
            </button>

            <button
              onClick={handleNextNumber}
              className="flex-1 py-3 px-4 rounded-2xl flex items-center justify-center gap-2 font-black font-bangla text-base shadow-md transition-all bg-gradient-to-r from-amber-500 to-orange-500 text-white active:scale-95 cursor-pointer hover:brightness-105"
            >
              <span>{numberIndex === MATH_NUMBERS.length - 1 ? 'সব শেষ!' : 'পরের সংখ্যা'}</span>
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* SECTION 2: INTERACTIVE COUNTING */}
      {section === 'counting' && (
        <div className="flex-1 flex flex-col justify-between max-w-md mx-auto w-full space-y-4">
          <div className="rounded-3xl p-5 bg-gradient-to-br from-emerald-50 to-teal-50 border-4 border-emerald-300 shadow-lg text-center">
            <h3 className="text-lg font-black font-bangla text-emerald-950 mb-1">
              একটি একটি করে ছুঁয়ে গণনা করো!
            </h3>
            <p className="text-xs font-bangla text-emerald-700 mb-4">
              ছবিগুলোতে টোকা দাও এবং দেখো কতগুলো হয়!
            </p>

            {/* Target item count switcher */}
            <div className="flex justify-center gap-2 mb-4">
              {[3, 5, 8, 10].map((num) => (
                <button
                  key={num}
                  onClick={() => {
                    soundEffects.playPop();
                    setTargetCount(num);
                    setCountedCount(0);
                  }}
                  className={`px-3 py-1 rounded-xl text-xs font-bold font-bangla ${
                    targetCount === num
                      ? 'bg-emerald-600 text-white'
                      : 'bg-white text-emerald-800 border border-emerald-200'
                  }`}
                >
                  {num}টি গণনা
                </button>
              ))}
            </div>

            {/* Interactive items */}
            <div className="grid grid-cols-4 sm:grid-cols-5 gap-3 p-4 bg-white rounded-3xl shadow-inner min-h-[160px] items-center justify-center">
              {Array.from({ length: targetCount }).map((_, idx) => {
                const itemNum = idx + 1;
                const isCounted = countedCount >= itemNum;

                return (
                  <button
                    key={idx}
                    onClick={() => handleTapCountItem(itemNum)}
                    className={`relative p-3 rounded-2xl flex flex-col items-center justify-center transition-all cursor-pointer ${
                      isCounted
                        ? 'bg-emerald-100 scale-105 border-2 border-emerald-400 shadow-sm'
                        : 'bg-gray-50 border-2 border-dashed border-gray-300 hover:scale-105'
                    }`}
                  >
                    <span className="text-3xl">🍓</span>
                    <span
                      className={`text-xs font-black font-bangla mt-1 ${
                        isCounted ? 'text-emerald-700' : 'text-gray-400'
                      }`}
                    >
                      {itemNum}
                    </span>
                    {isCounted && (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 absolute -top-1 -right-1 fill-white" />
                    )}
                  </button>
                );
              })}
            </div>

            <div className="mt-4 p-3 bg-white/90 rounded-2xl border border-emerald-200">
              <span className="text-xl font-black font-bangla text-emerald-900">
                মোট গণনা: {countedCount} / {targetCount}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 3: SHAPES */}
      {section === 'shapes' && (
        <div className="flex-1 overflow-y-auto pr-1">
          <div className="grid grid-cols-2 gap-3.5">
            {MATH_SHAPES.map((shape) => (
              <div
                key={shape.id}
                onClick={() => {
                  soundEffects.playPop();
                  speechService.speak(`${shape.nameBn}, যেমন ${shape.exampleObjectBn}`, 'bn');
                }}
                className="cursor-pointer p-4 rounded-3xl bg-white border-2 border-amber-200 shadow-sm hover:shadow-md transition-all active:scale-95 flex flex-col items-center text-center justify-between min-h-[160px]"
              >
                <div
                  style={{ color: shape.color }}
                  className="w-16 h-16 rounded-2xl bg-amber-50 flex items-center justify-center text-3xl shadow-inner mb-2 border border-amber-100"
                >
                  {shape.exampleEmoji}
                </div>
                <div className="font-black font-bangla text-gray-900 text-base leading-tight">
                  {shape.nameBn}
                </div>
                <div className="text-xs text-gray-500 font-kids">
                  {shape.nameEn}
                </div>
                <div className="text-[11px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full mt-1 font-bangla">
                  যেমন: {shape.exampleObjectBn}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SECTION 4: COLORS */}
      {section === 'colors' && (
        <div className="flex-1 overflow-y-auto pr-1">
          <div className="grid grid-cols-2 gap-3.5">
            {MATH_COLORS.map((color) => (
              <div
                key={color.id}
                onClick={() => {
                  soundEffects.playPop();
                  speechService.speak(`${color.nameBn} রং, ${color.exampleBn}`, 'bn');
                }}
                className="cursor-pointer p-3.5 rounded-3xl bg-white border-2 border-amber-200 shadow-sm hover:shadow-md transition-all active:scale-95 flex items-center gap-3"
              >
                <div
                  style={{ backgroundColor: color.hex }}
                  className="w-14 h-14 rounded-2xl shadow-md shrink-0 border-2 border-white flex items-center justify-center text-2xl"
                >
                  {color.exampleEmoji}
                </div>
                <div className="flex-1">
                  <div className="font-black font-bangla text-gray-900 text-base">
                    {color.nameBn}
                  </div>
                  <div className="text-xs font-kids text-gray-500">
                    {color.nameEn}
                  </div>
                  <div className="text-[11px] font-bold text-amber-800 font-bangla">
                    {color.exampleBn}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SECTION 5: BIG AND SMALL */}
      {section === 'big_small' && (
        <div className="flex-1 flex flex-col justify-between max-w-md mx-auto w-full space-y-4">
          <div className="rounded-3xl p-5 bg-gradient-to-br from-indigo-50 to-blue-50 border-4 border-indigo-200 shadow-lg text-center">
            <h3 className="text-lg font-black font-bangla text-indigo-950 mb-1">
              বড় ও ছোট তুলনা করো!
            </h3>
            <p className="text-xs font-bangla text-indigo-700 mb-4">
              প্রশ্ন: <strong>কোনটি বড়? (Which is BIG?)</strong>
            </p>

            {bigSmallFeedback && (
              <div className="mb-3 p-2 rounded-xl bg-amber-400 text-amber-950 font-bold font-bangla text-sm animate-bounce">
                {bigSmallFeedback}
              </div>
            )}

            <div className="grid grid-cols-2 gap-4 my-2">
              {/* Big Option */}
              <button
                onClick={() => handlePickBigSmall('big', 'big')}
                className="p-5 rounded-3xl bg-white border-4 border-indigo-300 shadow-md hover:scale-105 active:scale-95 transition-all flex flex-col items-center justify-center cursor-pointer"
              >
                <span className="text-7xl mb-2 animate-pulse">🐘</span>
                <span className="text-lg font-black font-bangla text-indigo-900">হাতি (বড়)</span>
                <span className="text-xs font-bold text-indigo-600 font-kids">BIG</span>
              </button>

              {/* Small Option */}
              <button
                onClick={() => handlePickBigSmall('small', 'big')}
                className="p-5 rounded-3xl bg-white border-4 border-indigo-100 shadow-md hover:scale-105 active:scale-95 transition-all flex flex-col items-center justify-center cursor-pointer"
              >
                <span className="text-3xl mb-4">🐜</span>
                <span className="text-sm font-black font-bangla text-gray-700">পিঁপড়া (ছোট)</span>
                <span className="text-xs font-bold text-gray-500 font-kids">SMALL</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 6: MORE AND LESS */}
      {section === 'more_less' && (
        <div className="flex-1 flex flex-col justify-between max-w-md mx-auto w-full space-y-4">
          <div className="rounded-3xl p-5 bg-gradient-to-br from-purple-50 to-pink-50 border-4 border-purple-200 shadow-lg text-center">
            <h3 className="text-lg font-black font-bangla text-purple-950 mb-1">
              বেশি ও কম (More & Less)
            </h3>
            <p className="text-xs font-bangla text-purple-700 mb-4">
              প্রশ্ন: <strong>কোন পাত্রে বেশি আপেল আছে?</strong>
            </p>

            {moreLessFeedback && (
              <div className="mb-3 p-2 rounded-xl bg-purple-400 text-white font-bold font-bangla text-sm animate-bounce">
                {moreLessFeedback}
              </div>
            )}

            <div className="grid grid-cols-2 gap-4 my-2">
              {/* More Group */}
              <button
                onClick={() => handlePickMoreLess('more', 'more')}
                className="p-4 rounded-3xl bg-white border-4 border-purple-300 shadow-md hover:scale-105 active:scale-95 transition-all flex flex-col items-center justify-center cursor-pointer"
              >
                <div className="text-3xl flex flex-wrap justify-center gap-1 mb-2">
                  <span>🍎</span><span>🍎</span><span>🍎</span><span>🍎</span><span>🍎</span>
                </div>
                <span className="text-base font-black font-bangla text-purple-900">৫টি আপেল (বেশি)</span>
                <span className="text-xs font-bold text-purple-600 font-kids">MORE</span>
              </button>

              {/* Less Group */}
              <button
                onClick={() => handlePickMoreLess('less', 'more')}
                className="p-4 rounded-3xl bg-white border-4 border-purple-100 shadow-md hover:scale-105 active:scale-95 transition-all flex flex-col items-center justify-center cursor-pointer"
              >
                <div className="text-3xl flex flex-wrap justify-center gap-1 mb-2">
                  <span>🍎</span><span>🍎</span>
                </div>
                <span className="text-base font-black font-bangla text-gray-700">২টি আপেল (কম)</span>
                <span className="text-xs font-bold text-gray-500 font-kids">LESS</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 7: OBJECT ADDITION */}
      {section === 'addition' && (
        <div className="flex-1 flex flex-col justify-between max-w-md mx-auto w-full space-y-4">
          <div className="rounded-3xl p-5 bg-gradient-to-br from-amber-50 to-orange-50 border-4 border-amber-300 shadow-lg text-center">
            <h3 className="text-lg font-black font-bangla text-amber-950 mb-1">
              সহজ যোগ (Basic Addition)
            </h3>
            <p className="text-xs font-bangla text-amber-700 mb-4">
              ছবিগুলো একসাথে মিলিয়ে বলো তো মোট কতগুলো হবে?
            </p>

            {/* Addition Visual Equation */}
            <div className="p-4 bg-white rounded-3xl border-2 border-amber-200 shadow-sm flex items-center justify-around mb-5">
              {/* Group A */}
              <div className="flex flex-col items-center">
                <div className="text-2xl flex flex-wrap max-w-[80px] justify-center gap-1">
                  {Array.from({ length: addA }).map((_, i) => (
                    <span key={i}>🎈</span>
                  ))}
                </div>
                <span className="text-2xl font-black font-bangla text-amber-600 mt-1">{addA}</span>
              </div>

              {/* Plus Sign */}
              <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center font-black text-xl">
                +
              </div>

              {/* Group B */}
              <div className="flex flex-col items-center">
                <div className="text-2xl flex flex-wrap max-w-[80px] justify-center gap-1">
                  {Array.from({ length: addB }).map((_, i) => (
                    <span key={i}>🎈</span>
                  ))}
                </div>
                <span className="text-2xl font-black font-bangla text-amber-600 mt-1">{addB}</span>
              </div>

              {/* Equals */}
              <div className="text-2xl font-black text-gray-600">=</div>

              {/* Question mark or Solved answer */}
              <div className="w-12 h-12 rounded-2xl bg-amber-500 text-white flex items-center justify-center font-black text-2xl shadow-md">
                {additionSolved ? addA + addB : '?'}
              </div>
            </div>

            {/* Options to click */}
            <div className="grid grid-cols-3 gap-3">
              {[addA + addB - 1, addA + addB, addA + addB + 1].map((opt) => (
                <button
                  key={opt}
                  onClick={() => handleSolveAddition(opt)}
                  className="py-3 rounded-2xl bg-white border-2 border-amber-300 font-black font-bangla text-2xl text-amber-900 shadow-md hover:bg-amber-100 active:scale-95 transition-all cursor-pointer"
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

import React, { useState } from 'react';
import { BANGLA_SHORBORNO, ENGLISH_LETTERS, MATH_COLORS, MATH_SHAPES, MATH_NUMBERS } from '../../data/learningData';
import { Volume2, Sparkles, CheckCircle2, RotateCcw, ArrowLeft } from 'lucide-react';
import { soundEffects } from '../../utils/soundEffects';
import { speechService } from '../../utils/speech';
import confetti from 'canvas-confetti';

interface GamesHubProps {
  onEarnStar: () => void;
  onBackToHome: () => void;
}

type GameId =
  | 'menu'
  | 'match_letter_pic'
  | 'find_letter'
  | 'count_objects'
  | 'identify_color'
  | 'identify_shape'
  | 'listen_identify';

export const GamesHub: React.FC<GamesHubProps> = ({ onEarnStar, onBackToHome }) => {
  const [activeGame, setActiveGame] = useState<GameId>('menu');
  const [feedbackMsg, setFeedbackMsg] = useState<{ text: string; success: boolean } | null>(null);

  // Mini-game 1: Match Letter with Picture state
  const [m1Question, setM1Question] = useState(() => getRandomBanglaQuestion());

  // Mini-game 2: Find the Correct Letter
  const [m2Target, setM2Target] = useState(() => getRandomTargetLetter());

  // Mini-game 3: Count the Objects
  const [m3Count, setM3Count] = useState(() => Math.floor(Math.random() * 5) + 2);

  // Mini-game 4: Identify Color
  const [m4Color, setM4Color] = useState(() => getRandomColor());

  // Mini-game 5: Identify Shape
  const [m5Shape, setM5Shape] = useState(() => getRandomShape());

  // Mini-game 6: Listen & Identify
  const [m6Question, setM6Question] = useState(() => getRandomListenQuestion());

  function getRandomBanglaQuestion() {
    const correct = BANGLA_SHORBORNO[Math.floor(Math.random() * BANGLA_SHORBORNO.length)];
    const others = BANGLA_SHORBORNO.filter((item) => item.id !== correct.id);
    const shuffledOthers = others.sort(() => 0.5 - Math.random()).slice(0, 3);
    const options = [correct, ...shuffledOthers].sort(() => 0.5 - Math.random());
    return { correct, options };
  }

  function getRandomTargetLetter() {
    const letters = ['অ', 'আ', 'ই', 'ঈ', 'উ', 'ক', 'খ', 'গ', 'A', 'B', 'C', 'D'];
    const target = letters[Math.floor(Math.random() * letters.length)];
    // Bubble pool with 3 target and 5 decoys
    const decoys = letters.filter((l) => l !== target);
    const bubbles = [
      target,
      target,
      decoys[0],
      decoys[1],
      target,
      decoys[2],
      decoys[3],
      decoys[4],
    ].sort(() => 0.5 - Math.random());
    return { target, bubbles, popped: [] as number[] };
  }

  function getRandomColor() {
    const correct = MATH_COLORS[Math.floor(Math.random() * MATH_COLORS.length)];
    const others = MATH_COLORS.filter((c) => c.id !== correct.id)
      .sort(() => 0.5 - Math.random())
      .slice(0, 3);
    const options = [correct, ...others].sort(() => 0.5 - Math.random());
    return { correct, options };
  }

  function getRandomShape() {
    const correct = MATH_SHAPES[Math.floor(Math.random() * MATH_SHAPES.length)];
    const others = MATH_SHAPES.filter((s) => s.id !== correct.id)
      .sort(() => 0.5 - Math.random())
      .slice(0, 3);
    const options = [correct, ...others].sort(() => 0.5 - Math.random());
    return { correct, options };
  }

  function getRandomListenQuestion() {
    const isBangla = Math.random() > 0.5;
    if (isBangla) {
      const correct = BANGLA_SHORBORNO[Math.floor(Math.random() * BANGLA_SHORBORNO.length)];
      const others = BANGLA_SHORBORNO.filter((b) => b.id !== correct.id)
        .sort(() => 0.5 - Math.random())
        .slice(0, 3);
      const options = [correct, ...others].sort(() => 0.5 - Math.random());
      return {
        promptVoice: `বল তো '${correct.letter}' কোথায়?`,
        letter: correct.letter,
        options: options.map((o) => ({ id: o.id, text: o.letter, emoji: o.emoji, isCorrect: o.id === correct.id })),
      };
    } else {
      const correct = ENGLISH_LETTERS[Math.floor(Math.random() * 8)];
      const others = ENGLISH_LETTERS.filter((e) => e.id !== correct.id)
        .sort(() => 0.5 - Math.random())
        .slice(0, 3);
      const options = [correct, ...others].sort(() => 0.5 - Math.random());
      return {
        promptVoice: `Touch the letter ${correct.capital}!`,
        letter: correct.capital,
        options: options.map((o) => ({ id: o.id, text: o.capital, emoji: o.emoji, isCorrect: o.id === correct.id })),
      };
    }
  }

  // Answer handler
  const handleAnswer = (isCorrect: boolean, onSuccess: () => void) => {
    if (isCorrect) {
      soundEffects.playSuccess();
      try {
        confetti({ particleCount: 25, spread: 60 });
      } catch {}
      setFeedbackMsg({ text: 'দারুণ! একদম সঠিক উত্তর! ⭐', success: true });
      speechService.speak('দারুণ! খুব সুন্দর হয়েছে!', 'bn');
      onEarnStar();
      setTimeout(() => {
        setFeedbackMsg(null);
        onSuccess();
      }, 1500);
    } else {
      soundEffects.playTryAgain();
      setFeedbackMsg({ text: 'আরেকবার চেষ্টা করো, ছোট্ট সোনা! 💖', success: false });
      speechService.speak('আরেকবার চেষ্টা করো!', 'bn');
      setTimeout(() => setFeedbackMsg(null), 2000);
    }
  };

  return (
    <div className="flex-1 flex flex-col p-4 pb-20 select-none">
      {/* Game Header */}
      <div className="flex items-center justify-between mb-3">
        {activeGame !== 'menu' ? (
          <button
            onClick={() => {
              soundEffects.playPop();
              setActiveGame('menu');
              setFeedbackMsg(null);
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-2xl bg-white text-gray-800 font-bold font-bangla text-xs shadow-xs border border-amber-200 hover:bg-amber-50 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>খেলা মেনু</span>
          </button>
        ) : (
          <div className="flex items-center gap-2">
            <span className="text-2xl">🎮</span>
            <h3 className="text-lg font-black font-bangla text-gray-900">
              মজার খেলাধুলা (Educational Games)
            </h3>
          </div>
        )}
      </div>

      {/* Floating feedback message */}
      {feedbackMsg && (
        <div
          className={`mb-3 p-3 rounded-2xl font-black font-bangla text-sm text-center shadow-md animate-bounce ${
            feedbackMsg.success ? 'bg-emerald-500 text-white' : 'bg-amber-400 text-amber-950'
          }`}
        >
          {feedbackMsg.text}
        </div>
      )}

      {/* GAME MENU */}
      {activeGame === 'menu' && (
        <div className="grid grid-cols-2 gap-3.5 flex-1 overflow-y-auto pr-1">
          {[
            {
              id: 'match_letter_pic',
              titleBn: 'ছবি ও বর্ণ মেলাও',
              titleEn: 'Match Letter & Picture',
              descBn: 'ছবির সাথে সঠিক বর্ণটি মেলাও',
              icon: '🎨',
              color: 'from-rose-400 to-pink-500',
            },
            {
              id: 'find_letter',
              titleBn: 'বর্ণ খুঁজে বের করো',
              titleEn: 'Find the Letter',
              descBn: 'বুদবুদ ফাটিয়ে সঠিক বর্ণ নাও',
              icon: '🫧',
              color: 'from-amber-400 to-orange-500',
            },
            {
              id: 'count_objects',
              titleBn: 'বস্তু গণনা খেলা',
              titleEn: 'Count the Objects',
              descBn: 'ছবি গুনে সঠিক সংখ্যা বলো',
              icon: '🍓',
              color: 'from-emerald-400 to-teal-500',
            },
            {
              id: 'identify_color',
              titleBn: 'রং চেনার খেলা',
              titleEn: 'Identify the Color',
              descBn: 'বলা রঙের বেলুন বা ফুলটি ছোঁও',
              icon: '🎈',
              color: 'from-blue-400 to-indigo-500',
            },
            {
              id: 'identify_shape',
              titleBn: 'আকার চেনো',
              titleEn: 'Identify the Shape',
              descBn: 'বৃত্ত, ত্রিভুজ ও তারা মেলাও',
              icon: '⭐',
              color: 'from-purple-400 to-violet-500',
            },
            {
              id: 'listen_identify',
              titleBn: 'শুনে সঠিক উত্তর দাও',
              titleEn: 'Listen & Identify',
              descBn: 'শব্দ শুনে সঠিক কার্ডে টোকা দাও',
              icon: '🎧',
              color: 'from-teal-400 to-emerald-500',
            },
          ].map((game) => (
            <div
              key={game.id}
              onClick={() => {
                soundEffects.playPop();
                setActiveGame(game.id as GameId);
                speechService.speak(game.titleBn + ' খেলি!', 'bn');
              }}
              className="group cursor-pointer rounded-3xl p-4 bg-white border-2 border-amber-200 shadow-sm hover:shadow-lg transition-all active:scale-95 flex flex-col justify-between min-h-[150px]"
            >
              <div
                className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${game.color} text-white flex items-center justify-center text-2xl shadow-sm mb-2 group-hover:scale-110 transition-transform`}
              >
                {game.icon}
              </div>
              <div>
                <h4 className="font-black font-bangla text-gray-900 text-base leading-tight">
                  {game.titleBn}
                </h4>
                <p className="text-[11px] text-gray-500 font-bangla mt-0.5">
                  {game.descBn}
                </p>
              </div>
              <div className="text-[11px] font-bold text-amber-700 font-kids pt-1">
                Play Game ➔
              </div>
            </div>
          ))}
        </div>
      )}

      {/* GAME 1: MATCH LETTER WITH PICTURE */}
      {activeGame === 'match_letter_pic' && (
        <div className="flex-1 flex flex-col items-center justify-between max-w-md mx-auto w-full">
          <div className="w-full rounded-3xl p-5 bg-gradient-to-br from-rose-50 to-pink-50 border-4 border-rose-300 shadow-lg text-center">
            <h4 className="text-base font-black font-bangla text-rose-950 mb-1">
              ছবিটি দেখে সঠিক বর্ণে চাপ দাও!
            </h4>
            <p className="text-xs font-bangla text-rose-700 mb-4">
              এই ছবিটির প্রথম বর্ণ কোনটি?
            </p>

            {/* Target Picture Showcase */}
            <div className="w-32 h-32 rounded-3xl bg-white shadow-md mx-auto flex items-center justify-center text-7xl mb-3 border-2 border-white">
              {m1Question.correct.emoji}
            </div>
            <div className="text-2xl font-black font-bangla text-gray-900 mb-5">
              {m1Question.correct.wordBn}
            </div>

            {/* 4 Letter Options */}
            <div className="grid grid-cols-2 gap-3">
              {m1Question.options.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() =>
                    handleAnswer(opt.id === m1Question.correct.id, () => {
                      setM1Question(getRandomBanglaQuestion());
                    })
                  }
                  className="py-4 rounded-2xl bg-white border-2 border-rose-300 font-black font-bangla text-3xl text-rose-600 shadow-md hover:bg-rose-100 active:scale-95 transition-all cursor-pointer"
                >
                  {opt.letter}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* GAME 2: FIND THE CORRECT LETTER (BUBBLE POP) */}
      {activeGame === 'find_letter' && (
        <div className="flex-1 flex flex-col items-center justify-between max-w-md mx-auto w-full">
          <div className="w-full rounded-3xl p-5 bg-gradient-to-br from-amber-50 to-yellow-50 border-4 border-amber-300 shadow-lg text-center">
            <h4 className="text-base font-black font-bangla text-amber-950 mb-1">
              বুদবুদ ফাটিয়ে বর্ণ খোঁজো!
            </h4>
            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="text-sm font-bangla text-amber-800">যেটি খুঁজতে হবে:</span>
              <span className="w-10 h-10 rounded-2xl bg-amber-500 text-white font-black font-bangla text-2xl flex items-center justify-center shadow-xs">
                {m2Target.target}
              </span>
            </div>

            {/* Bubbles Grid */}
            <div className="grid grid-cols-4 gap-3 p-4 bg-white/80 rounded-3xl min-h-[220px] items-center">
              {m2Target.bubbles.map((letter, idx) => {
                const isPopped = m2Target.popped.includes(idx);
                return (
                  <button
                    key={idx}
                    disabled={isPopped}
                    onClick={() => {
                      if (letter === m2Target.target) {
                        soundEffects.playPop();
                        const nextPopped = [...m2Target.popped, idx];
                        setM2Target({ ...m2Target, popped: nextPopped });

                        if (nextPopped.length >= 3) {
                          soundEffects.playSuccess();
                          try {
                            confetti({ particleCount: 25 });
                          } catch {}
                          onEarnStar();
                          speechService.speak('দারুণ! সব বুদবুদ ফাটিয়ে ফেলেছ!', 'bn');
                          setTimeout(() => {
                            setM2Target(getRandomTargetLetter());
                          }, 1200);
                        }
                      } else {
                        soundEffects.playTryAgain();
                        speechService.speak('আরেকটা বুদবুদ খোঁজো!', 'bn');
                      }
                    }}
                    className={`w-14 h-14 rounded-full flex items-center justify-center font-black font-bangla text-2xl transition-all cursor-pointer ${
                      isPopped
                        ? 'opacity-20 scale-75 bg-gray-200 text-gray-400'
                        : 'bg-gradient-to-br from-amber-300 to-orange-400 text-white shadow-md hover:scale-110 active:scale-95 animate-float'
                    }`}
                  >
                    {isPopped ? '💥' : letter}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* GAME 3: COUNT THE OBJECTS */}
      {activeGame === 'count_objects' && (
        <div className="flex-1 flex flex-col items-center justify-between max-w-md mx-auto w-full">
          <div className="w-full rounded-3xl p-5 bg-gradient-to-br from-emerald-50 to-teal-50 border-4 border-emerald-300 shadow-lg text-center">
            <h4 className="text-base font-black font-bangla text-emerald-950 mb-1">
              এখানে কতগুলো স্ট্রবেরি আছে?
            </h4>
            <p className="text-xs font-bangla text-emerald-700 mb-4">
              গুনে নিয়ে সঠিক সংখ্যাটি চাপো!
            </p>

            {/* Visual Strawberry item cluster */}
            <div className="p-6 bg-white rounded-3xl shadow-inner min-h-[160px] flex flex-wrap items-center justify-center gap-3 mb-5">
              {Array.from({ length: m3Count }).map((_, i) => (
                <span
                  key={i}
                  onClick={() => {
                    soundEffects.playPop();
                    speechService.speak(`${i + 1}`, 'bn');
                  }}
                  className="text-4xl animate-bounce hover:scale-125 transition-transform cursor-pointer"
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  🍓
                </span>
              ))}
            </div>

            {/* Answer Options */}
            <div className="grid grid-cols-3 gap-3">
              {[m3Count - 1, m3Count, m3Count + 1].map((num) => (
                <button
                  key={num}
                  onClick={() =>
                    handleAnswer(num === m3Count, () => {
                      setM3Count(Math.floor(Math.random() * 5) + 2);
                    })
                  }
                  className="py-4 rounded-2xl bg-white border-2 border-emerald-300 font-black font-bangla text-3xl text-emerald-700 shadow-md hover:bg-emerald-100 active:scale-95 transition-all cursor-pointer"
                >
                  {num}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* GAME 4: IDENTIFY COLOR */}
      {activeGame === 'identify_color' && (
        <div className="flex-1 flex flex-col items-center justify-between max-w-md mx-auto w-full">
          <div className="w-full rounded-3xl p-5 bg-gradient-to-br from-blue-50 to-indigo-50 border-4 border-blue-300 shadow-lg text-center">
            <h4 className="text-base font-black font-bangla text-blue-950 mb-1">
              রংটি খুঁজে বের করো!
            </h4>
            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="text-sm font-bangla text-blue-800">কোনটি</span>
              <span className="text-xl font-black font-bangla text-blue-900 bg-white px-3 py-1 rounded-xl shadow-xs border border-blue-200">
                {m4Color.correct.nameBn} ({m4Color.correct.nameEn})
              </span>
              <span className="text-sm font-bangla text-blue-800">রং?</span>
            </div>

            {/* Color tiles options */}
            <div className="grid grid-cols-2 gap-4">
              {m4Color.options.map((col) => (
                <button
                  key={col.id}
                  onClick={() =>
                    handleAnswer(col.id === m4Color.correct.id, () => {
                      setM4Color(getRandomColor());
                    })
                  }
                  style={{ backgroundColor: col.hex }}
                  className="h-28 rounded-3xl shadow-md border-4 border-white hover:scale-105 active:scale-95 transition-transform flex items-center justify-center text-4xl cursor-pointer"
                >
                  {col.exampleEmoji}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* GAME 5: IDENTIFY SHAPE */}
      {activeGame === 'identify_shape' && (
        <div className="flex-1 flex flex-col items-center justify-between max-w-md mx-auto w-full">
          <div className="w-full rounded-3xl p-5 bg-gradient-to-br from-purple-50 to-violet-50 border-4 border-purple-300 shadow-lg text-center">
            <h4 className="text-base font-black font-bangla text-purple-950 mb-1">
              সঠিক আকারটি খুঁজে বের করো!
            </h4>
            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="text-sm font-bangla text-purple-800">কোনটি</span>
              <span className="text-xl font-black font-bangla text-purple-900 bg-white px-3 py-1 rounded-xl shadow-xs border border-purple-200">
                {m5Shape.correct.nameBn}
              </span>
              <span className="text-sm font-bangla text-purple-800">আকার?</span>
            </div>

            {/* Shapes options */}
            <div className="grid grid-cols-2 gap-3">
              {m5Shape.options.map((shp) => (
                <button
                  key={shp.id}
                  onClick={() =>
                    handleAnswer(shp.id === m5Shape.correct.id, () => {
                      setM5Shape(getRandomShape());
                    })
                  }
                  className="p-4 rounded-3xl bg-white border-2 border-purple-200 shadow-md hover:scale-105 active:scale-95 transition-transform flex flex-col items-center justify-center min-h-[110px] cursor-pointer"
                >
                  <span className="text-4xl mb-1">{shp.exampleEmoji}</span>
                  <span className="font-black font-bangla text-gray-800 text-sm">
                    {shp.nameBn}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* GAME 6: LISTEN & IDENTIFY */}
      {activeGame === 'listen_identify' && (
        <div className="flex-1 flex flex-col items-center justify-between max-w-md mx-auto w-full">
          <div className="w-full rounded-3xl p-5 bg-gradient-to-br from-teal-50 to-emerald-50 border-4 border-teal-300 shadow-lg text-center">
            <h4 className="text-base font-black font-bangla text-teal-950 mb-1">
              শুনে সঠিক কার্ডে টোকা দাও!
            </h4>
            <p className="text-xs font-bangla text-teal-700 mb-3">
              শব্দটি বারবার শুনতে স্পিকার বাটনে চাপ দাও
            </p>

            {/* Audio Prompt button */}
            <button
              onClick={() => {
                soundEffects.playPop();
                speechService.speak(m6Question.promptVoice, 'bn');
              }}
              className="w-20 h-20 rounded-full bg-teal-500 text-white shadow-xl mx-auto flex items-center justify-center hover:scale-105 active:scale-95 transition-all mb-5 cursor-pointer border-4 border-white"
            >
              <Volume2 className="w-10 h-10 animate-pulse" />
            </button>

            {/* Options cards */}
            <div className="grid grid-cols-2 gap-3">
              {m6Question.options.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() =>
                    handleAnswer(opt.isCorrect, () => {
                      setM6Question(getRandomListenQuestion());
                    })
                  }
                  className="py-5 px-4 rounded-2xl bg-white border-2 border-teal-200 shadow-md hover:bg-teal-50 active:scale-95 transition-all flex flex-col items-center justify-center cursor-pointer"
                >
                  <span className="text-3xl mb-1">{opt.emoji}</span>
                  <span className="text-3xl font-black font-bangla text-teal-800">
                    {opt.text}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

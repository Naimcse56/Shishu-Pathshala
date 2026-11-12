import React, { useState } from 'react';
import {
  BANGLA_SHORBORNO,
  BANGLA_BENJONBORNO,
  ENGLISH_LETTERS,
  MATH_NUMBERS,
  GK_ITEMS,
  BanglaLetter,
  EnglishLetter,
} from '../../data/learningData';
import { Volume2, Shuffle, CheckCircle2, RotateCcw, ArrowLeft, Trophy, Sparkles, Star } from 'lucide-react';
import { soundEffects } from '../../utils/soundEffects';
import { speechService } from '../../utils/speech';
import confetti from 'canvas-confetti';

interface ExamSectionProps {
  onEarnStars: (count: number) => void;
  onRecordExam: (record: {
    subject: string;
    topic: string;
    mode: string;
    score: number;
    total: number;
    starsEarned: number;
  }) => void;
  onBackToHome: () => void;
}

type ExamSubject = 'bangla' | 'english' | 'math' | 'gk';
type ExamMode = 'identify_letter' | 'identify_picture' | 'listen_identify';

export const ExamSection: React.FC<ExamSectionProps> = ({
  onEarnStars,
  onRecordExam,
  onBackToHome,
}) => {
  // Wizard steps: 'subject' -> 'topic' -> 'mode' -> 'exam' -> 'result'
  const [step, setStep] = useState<'subject' | 'topic' | 'mode' | 'exam' | 'result'>('subject');

  const [selectedSubject, setSelectedSubject] = useState<ExamSubject>('bangla');
  const [selectedTopic, setSelectedTopic] = useState<string>('shorborno');
  const [selectedMode, setSelectedMode] = useState<ExamMode>('identify_letter');

  // Exam state
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(5);
  const [score, setScore] = useState(0);
  const [gentleRetryMsg, setGentleRetryMsg] = useState<string | null>(null);

  // Mode A: Identify Letter state (with Shuffle button)
  const [shuffleLetter, setShuffleLetter] = useState<{ letter: string; word: string; emoji: string }>(() =>
    getRandomLetterItem('shorborno')
  );

  // Mode B & C: Multiple choice question state
  const [mcQuestion, setMcQuestion] = useState(() => generateQuestion('shorborno', 'identify_picture'));

  function getRandomLetterItem(topic: string) {
    if (topic === 'shorborno') {
      const item = BANGLA_SHORBORNO[Math.floor(Math.random() * BANGLA_SHORBORNO.length)];
      return { letter: item.letter, word: item.wordBn, emoji: item.emoji };
    } else if (topic === 'benjonborno') {
      const item = BANGLA_BENJONBORNO[Math.floor(Math.random() * BANGLA_BENJONBORNO.length)];
      return { letter: item.letter, word: item.wordBn, emoji: item.emoji };
    } else if (topic === 'english_az') {
      const item = ENGLISH_LETTERS[Math.floor(Math.random() * ENGLISH_LETTERS.length)];
      return { letter: `${item.capital}${item.small}`, word: item.word, emoji: item.emoji };
    } else {
      const item = MATH_NUMBERS[Math.floor(Math.random() * 10)];
      return { letter: item.numBn, word: item.nameBn, emoji: item.itemEmoji };
    }
  }

  function generateQuestion(topic: string, mode: ExamMode) {
    let pool: { id: string; letter: string; word: string; emoji: string; audioPrompt: string }[] = [];

    if (topic === 'shorborno') {
      pool = BANGLA_SHORBORNO.map((b) => ({
        id: b.id,
        letter: b.letter,
        word: b.wordBn,
        emoji: b.emoji,
        audioPrompt: `বল তো '${b.letter}' কোথায়?`,
      }));
    } else if (topic === 'benjonborno') {
      pool = BANGLA_BENJONBORNO.map((b) => ({
        id: b.id,
        letter: b.letter,
        word: b.wordBn,
        emoji: b.emoji,
        audioPrompt: `বল তো '${b.letter}' কোনটি?`,
      }));
    } else if (topic === 'english_az') {
      pool = ENGLISH_LETTERS.map((e) => ({
        id: e.id,
        letter: e.capital,
        word: e.word,
        emoji: e.emoji,
        audioPrompt: `Touch the letter ${e.capital}!`,
      }));
    } else {
      pool = MATH_NUMBERS.slice(0, 10).map((m) => ({
        id: m.id,
        letter: m.numBn,
        word: m.nameBn,
        emoji: m.itemEmoji,
        audioPrompt: `সংখ্যা '${m.numBn}' কোথায়?`,
      }));
    }

    const correct = pool[Math.floor(Math.random() * pool.length)];
    const others = pool.filter((p) => p.id !== correct.id).sort(() => 0.5 - Math.random()).slice(0, 3);
    const options = [correct, ...others].sort(() => 0.5 - Math.random());

    return { correct, options };
  }

  // Shuffle button handler for Mode A
  const handleShuffle = () => {
    soundEffects.playPop();
    const next = getRandomLetterItem(selectedTopic);
    setShuffleLetter(next);
    speechService.speak(`${next.letter}, ${next.word}`, selectedSubject === 'english' ? 'en' : 'bn');
  };

  // Next question or finish
  const handleAdvance = (wasCorrect: boolean) => {
    if (wasCorrect) {
      soundEffects.playSuccess();
      try {
        confetti({ particleCount: 25, spread: 60 });
      } catch {}
      const newScore = score + 1;
      setScore(newScore);

      if (currentQuestionIndex + 1 >= totalQuestions) {
        // Exam finished!
        soundEffects.playFanfare();
        try {
          confetti({ particleCount: 60, spread: 90, origin: { y: 0.5 } });
        } catch {}
        speechService.speak('অভিনন্দন! তুমি সফলভাবে পরীক্ষা শেষ করেছ!', 'bn');
        const starsEarned = newScore * 2;
        onEarnStars(starsEarned);
        onRecordExam({
          subject: selectedSubject,
          topic: selectedTopic,
          mode: selectedMode,
          score: newScore,
          total: totalQuestions,
          starsEarned,
        });
        setStep('result');
      } else {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setMcQuestion(generateQuestion(selectedTopic, selectedMode));
      }
    } else {
      // Gentle retry, no negative marking!
      soundEffects.playTryAgain();
      setGentleRetryMsg('আরেকবার চেষ্টা করো, বন্ধু! তুমি পারবে 🥰');
      speechService.speak('আরেকবার চেষ্টা করো!', 'bn');
      setTimeout(() => setGentleRetryMsg(null), 2500);
    }
  };

  const startExam = (mode: ExamMode) => {
    soundEffects.playPop();
    setSelectedMode(mode);
    setCurrentQuestionIndex(0);
    setScore(0);
    setGentleRetryMsg(null);

    if (mode === 'identify_letter') {
      const initial = getRandomLetterItem(selectedTopic);
      setShuffleLetter(initial);
      speechService.speak('বর্ণ চেনার অনুশীলন শুরু হলো!', 'bn');
    } else {
      const q = generateQuestion(selectedTopic, mode);
      setMcQuestion(q);
      if (mode === 'listen_identify') {
        setTimeout(() => {
          speechService.speak(q.correct.audioPrompt, 'bn');
        }, 400);
      }
    }
    setStep('exam');
  };

  return (
    <div className="flex-1 flex flex-col p-4 pb-20 select-none">
      {/* Top Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Trophy className="w-5 h-5 text-amber-500" />
          <h3 className="text-base sm:text-lg font-black font-bangla text-gray-900">
            {step === 'subject' && 'ধাপ ১: বিষয় নির্বাচন'}
            {step === 'topic' && 'ধাপ ২: অধ্যায় নির্বাচন'}
            {step === 'mode' && 'ধাপ ৩: পরীক্ষার ধরন নির্বাচন'}
            {step === 'exam' && `কুইজ চলছে (${currentQuestionIndex + 1}/${totalQuestions})`}
            {step === 'result' && 'ফলাফল ও পুরস্কার'}
          </h3>
        </div>

        {step !== 'subject' && step !== 'result' && (
          <button
            onClick={() => {
              soundEffects.playPop();
              setStep('subject');
            }}
            className="flex items-center gap-1 text-xs font-bold text-gray-600 hover:text-gray-900 font-bangla"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>নতুন বিষয়</span>
          </button>
        )}
      </div>

      {/* Gentle retry message banner */}
      {gentleRetryMsg && (
        <div className="mb-3 p-3 rounded-2xl bg-amber-400 text-amber-950 font-black font-bangla text-sm text-center shadow-md animate-bounce">
          {gentleRetryMsg}
        </div>
      )}

      {/* STEP 1: SELECT SUBJECT */}
      {step === 'subject' && (
        <div className="space-y-3 flex-1 overflow-y-auto">
          <p className="text-xs text-gray-600 font-bangla">
            ছোট্ট বন্ধু, তুমি কোন বিষয়ের পরীক্ষা দিতে চাও?
          </p>

          <div className="grid grid-cols-2 gap-3.5">
            {[
              { id: 'bangla', nameBn: 'বাংলা বর্ণমালা', nameEn: 'Bangla Letters', icon: 'অ', color: 'border-rose-300 bg-rose-50 text-rose-700' },
              { id: 'english', nameBn: 'ইংরেজি বর্ণমালা', nameEn: 'English Alphabet', icon: 'Aa', color: 'border-sky-300 bg-sky-50 text-sky-700' },
              { id: 'math', nameBn: 'মজার সংখ্যা', nameEn: 'Math & Numbers', icon: '১', color: 'border-amber-300 bg-amber-50 text-amber-700' },
              { id: 'gk', nameBn: 'সাধারণ জ্ঞান', nameEn: 'General Knowledge', icon: '🦁', color: 'border-purple-300 bg-purple-50 text-purple-700' },
            ].map((subj) => (
              <button
                key={subj.id}
                onClick={() => {
                  soundEffects.playPop();
                  setSelectedSubject(subj.id as ExamSubject);
                  setStep('topic');
                }}
                className={`p-4 rounded-3xl border-2 shadow-sm hover:shadow-md active:scale-95 transition-all flex flex-col items-center text-center justify-between min-h-[140px] cursor-pointer ${subj.color}`}
              >
                <span className="text-4xl font-black font-bangla my-1">{subj.icon}</span>
                <span className="font-black font-bangla text-base text-gray-900">{subj.nameBn}</span>
                <span className="text-xs font-bold font-kids text-gray-500">{subj.nameEn}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* STEP 2: SELECT TOPIC */}
      {step === 'topic' && (
        <div className="space-y-3 flex-1">
          <p className="text-xs text-gray-600 font-bangla">
            এবার কোন অধ্যায়টি অনুশীলন করতে চাও?
          </p>

          <div className="space-y-2.5">
            {selectedSubject === 'bangla' && [
              { id: 'shorborno', nameBn: 'বাংলা স্বরবর্ণ (অ থেকে ঔ)', descBn: '১১টি স্বরবর্ণ' },
              { id: 'benjonborno', nameBn: 'বাংলা ব্যঞ্জনবর্ণ (ক থেকে ঁ)', descBn: '৩৯টি ব্যঞ্জনবর্ণ' },
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => {
                  soundEffects.playPop();
                  setSelectedTopic(t.id);
                  setStep('mode');
                }}
                className="w-full p-4 rounded-2xl bg-white border-2 border-rose-200 shadow-xs hover:border-rose-400 hover:bg-rose-50/50 flex items-center justify-between cursor-pointer"
              >
                <div className="text-left font-bangla">
                  <div className="font-black text-gray-900 text-base">{t.nameBn}</div>
                  <div className="text-xs text-gray-500">{t.descBn}</div>
                </div>
                <span className="text-xl">➔</span>
              </button>
            ))}

            {selectedSubject === 'english' && [
              { id: 'english_az', nameBn: 'English Alphabet (A - Z)', descBn: '26 letters with phonics' },
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => {
                  soundEffects.playPop();
                  setSelectedTopic(t.id);
                  setStep('mode');
                }}
                className="w-full p-4 rounded-2xl bg-white border-2 border-sky-200 shadow-xs hover:border-sky-400 hover:bg-sky-50/50 flex items-center justify-between cursor-pointer"
              >
                <div className="text-left font-bangla">
                  <div className="font-black text-gray-900 text-base">{t.nameBn}</div>
                  <div className="text-xs text-gray-500">{t.descBn}</div>
                </div>
                <span className="text-xl">➔</span>
              </button>
            ))}

            {(selectedSubject === 'math' || selectedSubject === 'gk') && [
              { id: 'shorborno', nameBn: 'সকল মৌলিক বিষয়', descBn: 'মৌলিক সংখ্যা ও পরিচিতি' },
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => {
                  soundEffects.playPop();
                  setSelectedTopic(t.id);
                  setStep('mode');
                }}
                className="w-full p-4 rounded-2xl bg-white border-2 border-amber-200 shadow-xs hover:border-amber-400 hover:bg-amber-50/50 flex items-center justify-between cursor-pointer"
              >
                <div className="text-left font-bangla">
                  <div className="font-black text-gray-900 text-base">{t.nameBn}</div>
                  <div className="text-xs text-gray-500">{t.descBn}</div>
                </div>
                <span className="text-xl">➔</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* STEP 3: SELECT EXAM MODE */}
      {step === 'mode' && (
        <div className="space-y-3 flex-1">
          <p className="text-xs text-gray-600 font-bangla">
            ৩টি পরীক্ষার পদ্ধতির যেকোনো একটি বেছে নাও:
          </p>

          <div className="space-y-3">
            {/* Mode A: Identify Letter with Shuffle */}
            <div
              onClick={() => startExam('identify_letter')}
              className="cursor-pointer p-4 rounded-3xl bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-300 shadow-sm hover:shadow-md transition-all active:scale-98 flex items-center gap-4"
            >
              <div className="w-14 h-14 rounded-2xl bg-amber-400 text-white flex items-center justify-center text-3xl shrink-0 shadow-xs">
                🔀
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-amber-200 text-amber-900">
                    Mode A
                  </span>
                  <h4 className="font-black font-bangla text-gray-900 text-base">
                    বর্ণ চেনার অনুশীলন (Identify Letter)
                  </h4>
                </div>
                <p className="text-xs text-gray-600 font-bangla mt-1">
                  একটি করে বর্ণ আসবে। Shuffle বাটন চেপে যত ইচ্ছা নতুন বর্ণ দেখো!
                </p>
              </div>
            </div>

            {/* Mode B: Identify Picture */}
            <div
              onClick={() => startExam('identify_picture')}
              className="cursor-pointer p-4 rounded-3xl bg-gradient-to-r from-rose-50 to-pink-50 border-2 border-rose-300 shadow-sm hover:shadow-md transition-all active:scale-98 flex items-center gap-4"
            >
              <div className="w-14 h-14 rounded-2xl bg-rose-500 text-white flex items-center justify-center text-3xl shrink-0 shadow-xs">
                🖼️
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-rose-200 text-rose-900">
                    Mode B
                  </span>
                  <h4 className="font-black font-bangla text-gray-900 text-base">
                    ছবি দেখে বর্ণ নির্ণয় (Identify Picture)
                  </h4>
                </div>
                <p className="text-xs text-gray-600 font-bangla mt-1">
                  ছবি দেখে ৪টি অপশনের মধ্যে সঠিক বর্ণে টোকা দাও।
                </p>
              </div>
            </div>

            {/* Mode C: Listen and Identify */}
            <div
              onClick={() => startExam('listen_identify')}
              className="cursor-pointer p-4 rounded-3xl bg-gradient-to-r from-sky-50 to-indigo-50 border-2 border-sky-300 shadow-sm hover:shadow-md transition-all active:scale-98 flex items-center gap-4"
            >
              <div className="w-14 h-14 rounded-2xl bg-sky-500 text-white flex items-center justify-center text-3xl shrink-0 shadow-xs">
                🎧
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-sky-200 text-sky-900">
                    Mode C
                  </span>
                  <h4 className="font-black font-bangla text-gray-900 text-base">
                    উচ্চারণ শুনে বাছাই (Listen & Identify)
                  </h4>
                </div>
                <p className="text-xs text-gray-600 font-bangla mt-1">
                  অডিও উচ্চারণ শুনে সঠিক বর্ণটি শনাক্ত করো।
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* STEP 4: ACTIVE EXAM SCREEN */}
      {step === 'exam' && (
        <div className="flex-1 flex flex-col justify-between max-w-md mx-auto w-full">
          {/* MODE A: IDENTIFY LETTER WITH SHUFFLE BUTTON */}
          {selectedMode === 'identify_letter' && (
            <div className="w-full rounded-3xl p-6 bg-gradient-to-br from-amber-50 to-orange-50 border-4 border-amber-300 shadow-xl flex flex-col items-center text-center justify-between min-h-[380px]">
              <div className="w-full flex items-center justify-between">
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-amber-200 text-amber-900 font-bangla">
                  অনুশীলন মোড (Shuffle)
                </span>
                <button
                  onClick={() => {
                    soundEffects.playPop();
                    speechService.speak(
                      `${shuffleLetter.letter}, ${shuffleLetter.word}`,
                      selectedSubject === 'english' ? 'en' : 'bn'
                    );
                  }}
                  className="w-10 h-10 rounded-full bg-white shadow-xs flex items-center justify-center text-amber-600 hover:scale-105 active:scale-95 cursor-pointer border border-amber-200"
                >
                  <Volume2 className="w-5 h-5 animate-pulse" />
                </button>
              </div>

              {/* Large Letter */}
              <div className="my-3">
                <span className="text-9xl font-black font-bangla text-amber-600 drop-shadow-md inline-block hover:scale-105 transition-transform">
                  {shuffleLetter.letter}
                </span>
              </div>

              {/* Mascot & word hints */}
              <div className="flex items-center gap-3 bg-white/90 p-3 rounded-2xl border border-amber-200 shadow-xs mb-3">
                <span className="text-4xl">{shuffleLetter.emoji}</span>
                <div className="text-left font-bangla">
                  <div className="text-xl font-black text-gray-900 leading-tight">
                    {shuffleLetter.word}
                  </div>
                  <div className="text-xs text-gray-500 font-kids">
                    {shuffleLetter.letter} দিয়ে শব্দ
                  </div>
                </div>
              </div>

              {/* Big Shuffle Button */}
              <button
                onClick={handleShuffle}
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 text-white font-black font-bangla text-lg shadow-md hover:shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Shuffle className="w-5 h-5 animate-spin" style={{ animationDuration: '4s' }} />
                <span>নতুন বর্ণ বদলাও (Shuffle Letter)</span>
              </button>
            </div>
          )}

          {/* MODE B: IDENTIFY PICTURE */}
          {selectedMode === 'identify_picture' && (
            <div className="w-full rounded-3xl p-5 bg-gradient-to-br from-rose-50 to-pink-50 border-4 border-rose-300 shadow-xl flex flex-col items-center text-center justify-between min-h-[380px]">
              <div className="w-full flex items-center justify-between mb-2">
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-rose-200 text-rose-900 font-bangla">
                  প্রশ্ন {currentQuestionIndex + 1} / {totalQuestions}
                </span>
                <span className="text-xs font-bold text-gray-500 font-bangla">
                  স্কোর: {score}
                </span>
              </div>

              {/* Picture to identify */}
              <div className="my-2">
                <div className="w-28 h-28 rounded-3xl bg-white shadow-md mx-auto flex items-center justify-center text-6xl mb-2 border-2 border-white">
                  {mcQuestion.correct.emoji}
                </div>
                <div className="text-xl font-black font-bangla text-gray-900">
                  {mcQuestion.correct.word}
                </div>
                <div className="text-xs text-gray-600 font-bangla">
                  প্রথম বর্ণটি বেছে নাও
                </div>
              </div>

              {/* 4 Letter Options */}
              <div className="grid grid-cols-2 gap-3 w-full mt-3">
                {mcQuestion.options.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => handleAdvance(opt.id === mcQuestion.correct.id)}
                    className="py-4 rounded-2xl bg-white border-2 border-rose-300 font-black font-bangla text-3xl text-rose-600 shadow-md hover:bg-rose-100 active:scale-95 transition-all cursor-pointer"
                  >
                    {opt.letter}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* MODE C: LISTEN AND IDENTIFY */}
          {selectedMode === 'listen_identify' && (
            <div className="w-full rounded-3xl p-5 bg-gradient-to-br from-sky-50 to-indigo-50 border-4 border-sky-300 shadow-xl flex flex-col items-center text-center justify-between min-h-[380px]">
              <div className="w-full flex items-center justify-between mb-2">
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-sky-200 text-sky-900 font-bangla">
                  প্রশ্ন {currentQuestionIndex + 1} / {totalQuestions}
                </span>
                <span className="text-xs font-bold text-gray-500 font-bangla">
                  স্কোর: {score}
                </span>
              </div>

              {/* Audio Speaker prompt */}
              <div className="my-3">
                <button
                  onClick={() => {
                    soundEffects.playPop();
                    speechService.speak(mcQuestion.correct.audioPrompt, 'bn');
                  }}
                  className="w-24 h-24 rounded-full bg-gradient-to-tr from-sky-500 to-indigo-500 text-white shadow-xl flex items-center justify-center hover:scale-105 active:scale-95 transition-all mx-auto border-4 border-white cursor-pointer"
                >
                  <Volume2 className="w-12 h-12 animate-pulse" />
                </button>
                <div className="text-sm font-bold font-bangla text-sky-950 mt-3">
                  শব্দটি শুনতে চাপ দাও 🔊
                </div>
              </div>

              {/* 4 Options */}
              <div className="grid grid-cols-2 gap-3 w-full mt-3">
                {mcQuestion.options.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => handleAdvance(opt.id === mcQuestion.correct.id)}
                    className="py-4 rounded-2xl bg-white border-2 border-sky-300 font-black font-bangla text-3xl text-sky-700 shadow-md hover:bg-sky-100 active:scale-95 transition-all cursor-pointer"
                  >
                    {opt.letter}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* STEP 5: RESULT & REWARDS SCREEN */}
      {step === 'result' && (
        <div className="flex-1 flex flex-col items-center justify-center max-w-md mx-auto w-full text-center space-y-4">
          <div className="w-full rounded-3xl p-6 bg-gradient-to-br from-amber-400 via-orange-400 to-rose-400 text-white shadow-2xl border-4 border-amber-200">
            {/* Animated Trophy */}
            <div className="w-24 h-24 rounded-full bg-white/20 backdrop-blur-xs flex items-center justify-center text-5xl mx-auto mb-3 shadow-inner">
              🏆
            </div>

            <h3 className="text-2xl font-black font-bangla drop-shadow-xs">
              দারুণ ফলাফল!
            </h3>
            <p className="text-xs font-bangla text-amber-100 mt-1">
              তুমি খুব মনোযোগ দিয়ে পরীক্ষা সম্পন্ন করেছ!
            </p>

            {/* Score & Stars card */}
            <div className="my-5 p-4 rounded-2xl bg-white text-gray-900 shadow-md">
              <div className="text-3xl font-black text-amber-500 flex items-center justify-center gap-2 mb-1">
                <span>⭐</span>
                <span>+{score * 2} টি নতুন তারা!</span>
              </div>
              <div className="text-sm font-bold font-bangla text-gray-700">
                সঠিক উত্তর: {score} / {totalQuestions}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2">
              <button
                onClick={() => {
                  soundEffects.playPop();
                  setStep('subject');
                }}
                className="w-full py-3 rounded-2xl bg-white text-amber-900 font-black font-bangla text-base shadow-md hover:bg-amber-50 active:scale-95 cursor-pointer"
              >
                আরেকটি পরীক্ষা দাও
              </button>
              <button
                onClick={() => {
                  soundEffects.playPop();
                  onBackToHome();
                }}
                className="w-full py-2.5 rounded-2xl bg-white/20 text-white font-bold font-bangla text-sm hover:bg-white/30 active:scale-95 cursor-pointer"
              >
                মূল পাতায় ফিরে যাও
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

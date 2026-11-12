import React, { useState, useEffect } from 'react';
import { BANGLA_SHORBORNO, BANGLA_BENJONBORNO, BANGLA_SHOROCHINHO, BanglaLetter } from '../../data/learningData';
import { Volume2, ChevronLeft, ChevronRight, Grid, Sparkles, CheckCircle2 } from 'lucide-react';
import { soundEffects } from '../../utils/soundEffects';
import { speechService } from '../../utils/speech';
import confetti from 'canvas-confetti';

interface BanglaLearnViewProps {
  onEarnStar: () => void;
  onBackToHome: () => void;
}

export const BanglaLearnView: React.FC<BanglaLearnViewProps> = ({ onEarnStar, onBackToHome }) => {
  const [activeCategory, setActiveCategory] = useState<'shorborno' | 'benjonborno' | 'shorochinho'>('shorborno');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showGrid, setShowGrid] = useState(false);

  const letterList: BanglaLetter[] =
    activeCategory === 'shorborno'
      ? BANGLA_SHORBORNO
      : activeCategory === 'benjonborno'
      ? BANGLA_BENJONBORNO
      : BANGLA_SHOROCHINHO;

  const currentItem = letterList[currentIndex] || letterList[0];

  useEffect(() => {
    setCurrentIndex(0);
  }, [activeCategory]);

  // Speak pronunciation on letter change
  const playLetterAudio = (item: BanglaLetter) => {
    soundEffects.playPop();
    const speakText = item.exampleSentenceBn || item.pronunciationBn || `${item.letter}, ${item.wordBn}`;
    speechService.speak(speakText, 'bn');
  };

  const handleNext = () => {
    soundEffects.playPop();
    if (currentIndex < letterList.length - 1) {
      const nextIdx = currentIndex + 1;
      setCurrentIndex(nextIdx);
      playLetterAudio(letterList[nextIdx]);
    } else {
      // Completed all letters in this category!
      soundEffects.playSuccess();
      try {
        confetti({ particleCount: 35, spread: 70, origin: { y: 0.6 } });
      } catch {}
      speechService.speak('দারুণ! তুমি সবগুলো বর্ণ পড়ে ফেলেছ!', 'bn');
      onEarnStar();
    }
  };

  const handlePrev = () => {
    soundEffects.playPop();
    if (currentIndex > 0) {
      const prevIdx = currentIndex - 1;
      setCurrentIndex(prevIdx);
      playLetterAudio(letterList[prevIdx]);
    }
  };

  const handleSelectFromGrid = (index: number) => {
    soundEffects.playPop();
    setCurrentIndex(index);
    setShowGrid(false);
    playLetterAudio(letterList[index]);
  };

  return (
    <div className="flex-1 flex flex-col p-4 pb-20 select-none">
      {/* Category Tabs */}
      <div className="flex items-center justify-between gap-1.5 p-1 bg-amber-100/70 rounded-2xl mb-4 border border-amber-200">
        <button
          onClick={() => {
            soundEffects.playPop();
            setActiveCategory('shorborno');
          }}
          className={`flex-1 py-2 px-2 rounded-xl text-xs sm:text-sm font-bold font-bangla transition-all cursor-pointer ${
            activeCategory === 'shorborno'
              ? 'bg-rose-500 text-white shadow-sm'
              : 'text-amber-900 hover:bg-amber-200/60'
          }`}
        >
          স্বরবর্ণ ({BANGLA_SHORBORNO.length})
        </button>
        <button
          onClick={() => {
            soundEffects.playPop();
            setActiveCategory('benjonborno');
          }}
          className={`flex-1 py-2 px-2 rounded-xl text-xs sm:text-sm font-bold font-bangla transition-all cursor-pointer ${
            activeCategory === 'benjonborno'
              ? 'bg-rose-500 text-white shadow-sm'
              : 'text-amber-900 hover:bg-amber-200/60'
          }`}
        >
          ব্যঞ্জনবর্ণ ({BANGLA_BENJONBORNO.length})
        </button>
        <button
          onClick={() => {
            soundEffects.playPop();
            setActiveCategory('shorochinho');
          }}
          className={`flex-1 py-2 px-2 rounded-xl text-xs sm:text-sm font-bold font-bangla transition-all cursor-pointer ${
            activeCategory === 'shorochinho'
              ? 'bg-rose-500 text-white shadow-sm'
              : 'text-amber-900 hover:bg-amber-200/60'
          }`}
        >
          কারচিহ্ন ({BANGLA_SHOROCHINHO.length})
        </button>
      </div>

      {/* Top Header Bar inside Bangla view: Progress & Grid view button */}
      <div className="flex items-center justify-between mb-3 px-1">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold font-bangla px-2.5 py-1 rounded-full bg-amber-200/80 text-amber-900">
            {currentIndex + 1} / {letterList.length}
          </span>
          <span className="text-xs font-bold text-gray-600 font-bangla">
            {currentItem.name}
          </span>
        </div>

        <button
          onClick={() => {
            soundEffects.playPop();
            setShowGrid(!showGrid);
          }}
          className="flex items-center gap-1 px-3 py-1 rounded-xl bg-white text-gray-700 text-xs font-bold shadow-xs border border-amber-200 hover:bg-amber-50 cursor-pointer"
        >
          <Grid className="w-3.5 h-3.5" />
          <span>{showGrid ? 'কার্ড দেখুন' : 'সবগুলো বর্ণ'}</span>
        </button>
      </div>

      {/* Main Learning Area */}
      {showGrid ? (
        /* Grid Overview */
        <div className="flex-1 overflow-y-auto pr-1">
          <div className="grid grid-cols-4 sm:grid-cols-6 gap-2.5">
            {letterList.map((item, idx) => (
              <button
                key={item.id}
                onClick={() => handleSelectFromGrid(idx)}
                className={`p-3 rounded-2xl flex flex-col items-center justify-center border-2 transition-all cursor-pointer ${
                  idx === currentIndex
                    ? 'border-rose-500 bg-rose-50 scale-105 shadow-md'
                    : 'border-amber-100 bg-white hover:bg-amber-50 shadow-xs'
                }`}
              >
                <span className="text-2xl sm:text-3xl font-black font-bangla text-rose-600">
                  {item.letter}
                </span>
                <span className="text-lg mt-0.5">{item.emoji}</span>
                <span className="text-[11px] font-bold font-bangla text-gray-700 truncate w-full text-center">
                  {item.wordBn}
                </span>
              </button>
            ))}
          </div>
        </div>
      ) : (
        /* Single Letter Focus Card */
        <div className="flex-1 flex flex-col justify-between max-w-md mx-auto w-full">
          <div
            style={{ backgroundColor: currentItem.bgColor, borderColor: currentItem.color }}
            className="w-full rounded-3xl p-6 border-4 shadow-xl flex flex-col items-center text-center relative transition-all duration-300 min-h-[360px] justify-between"
          >
            {/* Audio Button floating top right */}
            <button
              onClick={() => playLetterAudio(currentItem)}
              title="শুনুন"
              className="absolute top-4 right-4 w-12 h-12 rounded-full bg-white shadow-md flex items-center justify-center text-rose-600 hover:scale-110 active:scale-95 transition-all cursor-pointer border border-rose-100"
            >
              <Volume2 className="w-6 h-6 animate-pulse" />
            </button>

            {/* Large Bengali Letter */}
            <div className="my-2">
              <span
                style={{ color: currentItem.color }}
                className="text-8xl sm:text-9xl font-black font-bangla drop-shadow-md select-none inline-block hover:scale-105 transition-transform"
              >
                {currentItem.letter}
              </span>
            </div>

            {/* Cartoon Picture / Illustration */}
            <div className="my-1 flex flex-col items-center">
              <div className="w-24 h-24 rounded-3xl bg-white/90 shadow-md flex items-center justify-center text-5xl mb-2 border border-white">
                {currentItem.emoji}
              </div>
              <div className="text-2xl sm:text-3xl font-black font-bangla text-gray-900 leading-tight">
                {currentItem.wordBn}
              </div>
              <div className="text-xs sm:text-sm font-semibold text-gray-600">
                {currentItem.wordEn}
              </div>
            </div>

            {/* Pronunciation Rhyme / Example Sentence */}
            <div
              onClick={() => playLetterAudio(currentItem)}
              className="w-full bg-white/80 backdrop-blur-xs rounded-2xl py-2 px-3 shadow-xs border border-amber-200/60 cursor-pointer hover:bg-white transition-colors"
            >
              <p className="text-sm sm:text-base font-bold font-bangla text-rose-950 flex items-center justify-center gap-1.5">
                <span>🔊</span> {currentItem.exampleSentenceBn || currentItem.pronunciationBn}
              </p>
            </div>
          </div>

          {/* Large Tactile Navigation Buttons */}
          <div className="flex items-center justify-between gap-4 mt-5">
            <button
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className={`flex-1 py-3 px-4 rounded-2xl flex items-center justify-center gap-2 font-black font-bangla text-base shadow-md transition-all ${
                currentIndex === 0
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-white text-gray-800 border-2 border-amber-200 hover:bg-amber-50 active:scale-95 cursor-pointer'
              }`}
            >
              <ChevronLeft className="w-5 h-5" />
              <span>আগের বর্ণ</span>
            </button>

            <button
              onClick={handleNext}
              className="flex-1 py-3 px-4 rounded-2xl flex items-center justify-center gap-2 font-black font-bangla text-base shadow-md transition-all bg-gradient-to-r from-rose-500 to-amber-500 text-white active:scale-95 cursor-pointer hover:brightness-105"
            >
              <span>{currentIndex === letterList.length - 1 ? 'শেষ ও তারা জয়!' : 'পরের বর্ণ'}</span>
              {currentIndex === letterList.length - 1 ? (
                <Sparkles className="w-5 h-5 text-amber-200" />
              ) : (
                <ChevronRight className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

import React, { useState } from 'react';
import { ENGLISH_LETTERS, EnglishLetter } from '../../data/learningData';
import { Volume2, ChevronLeft, ChevronRight, Grid, Sparkles, Type } from 'lucide-react';
import { soundEffects } from '../../utils/soundEffects';
import { speechService } from '../../utils/speech';
import confetti from 'canvas-confetti';

interface EnglishLearnViewProps {
  onEarnStar: () => void;
  onBackToHome: () => void;
}

export const EnglishLearnView: React.FC<EnglishLearnViewProps> = ({ onEarnStar, onBackToHome }) => {
  const [displayMode, setDisplayMode] = useState<'both' | 'capital' | 'small'>('both');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showGrid, setShowGrid] = useState(false);

  const currentItem = ENGLISH_LETTERS[currentIndex];

  const playEnglishAudio = (item: EnglishLetter) => {
    soundEffects.playPop();
    speechService.speak(`${item.capital}, ${item.word}`, 'en');
  };

  const handleNext = () => {
    soundEffects.playPop();
    if (currentIndex < ENGLISH_LETTERS.length - 1) {
      const nextIdx = currentIndex + 1;
      setCurrentIndex(nextIdx);
      playEnglishAudio(ENGLISH_LETTERS[nextIdx]);
    } else {
      soundEffects.playSuccess();
      try {
        confetti({ particleCount: 35, spread: 70, origin: { y: 0.6 } });
      } catch {}
      speechService.speak('Awesome! You learned all letters from A to Z!', 'en');
      onEarnStar();
    }
  };

  const handlePrev = () => {
    soundEffects.playPop();
    if (currentIndex > 0) {
      const prevIdx = currentIndex - 1;
      setCurrentIndex(prevIdx);
      playEnglishAudio(ENGLISH_LETTERS[prevIdx]);
    }
  };

  const handleSelectFromGrid = (idx: number) => {
    soundEffects.playPop();
    setCurrentIndex(idx);
    setShowGrid(false);
    playEnglishAudio(ENGLISH_LETTERS[idx]);
  };

  return (
    <div className="flex-1 flex flex-col p-4 pb-20 select-none">
      {/* Letter Case Selector Pills */}
      <div className="flex items-center justify-between gap-1.5 p-1 bg-sky-100/70 rounded-2xl mb-4 border border-sky-200">
        <button
          onClick={() => {
            soundEffects.playPop();
            setDisplayMode('both');
          }}
          className={`flex-1 py-1.5 px-2 rounded-xl text-xs sm:text-sm font-bold font-kids transition-all cursor-pointer ${
            displayMode === 'both' ? 'bg-sky-600 text-white shadow-sm' : 'text-sky-900 hover:bg-sky-200/60'
          }`}
        >
          Aa (Both)
        </button>
        <button
          onClick={() => {
            soundEffects.playPop();
            setDisplayMode('capital');
          }}
          className={`flex-1 py-1.5 px-2 rounded-xl text-xs sm:text-sm font-bold font-kids transition-all cursor-pointer ${
            displayMode === 'capital' ? 'bg-sky-600 text-white shadow-sm' : 'text-sky-900 hover:bg-sky-200/60'
          }`}
        >
          A - Z (Capital)
        </button>
        <button
          onClick={() => {
            soundEffects.playPop();
            setDisplayMode('small');
          }}
          className={`flex-1 py-1.5 px-2 rounded-xl text-xs sm:text-sm font-bold font-kids transition-all cursor-pointer ${
            displayMode === 'small' ? 'bg-sky-600 text-white shadow-sm' : 'text-sky-900 hover:bg-sky-200/60'
          }`}
        >
          a - z (Small)
        </button>
      </div>

      {/* Header bar */}
      <div className="flex items-center justify-between mb-3 px-1">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold font-kids px-2.5 py-1 rounded-full bg-sky-200 text-sky-900">
            {currentIndex + 1} / {ENGLISH_LETTERS.length}
          </span>
          <span className="text-xs font-bold text-gray-600 font-kids">
            Letter {currentItem.capital}
          </span>
        </div>

        <button
          onClick={() => {
            soundEffects.playPop();
            setShowGrid(!showGrid);
          }}
          className="flex items-center gap-1 px-3 py-1 rounded-xl bg-white text-gray-700 text-xs font-bold shadow-xs border border-sky-200 hover:bg-sky-50 cursor-pointer"
        >
          <Grid className="w-3.5 h-3.5" />
          <span>{showGrid ? 'Card View' : 'All Letters'}</span>
        </button>
      </div>

      {showGrid ? (
        <div className="flex-1 overflow-y-auto pr-1">
          <div className="grid grid-cols-4 sm:grid-cols-6 gap-2.5">
            {ENGLISH_LETTERS.map((item, idx) => (
              <button
                key={item.id}
                onClick={() => handleSelectFromGrid(idx)}
                className={`p-3 rounded-2xl flex flex-col items-center justify-center border-2 transition-all cursor-pointer ${
                  idx === currentIndex
                    ? 'border-sky-500 bg-sky-50 scale-105 shadow-md'
                    : 'border-sky-100 bg-white hover:bg-sky-50 shadow-xs'
                }`}
              >
                <span className="text-2xl font-black font-kids text-sky-600">
                  {displayMode === 'capital' ? item.capital : displayMode === 'small' ? item.small : `${item.capital}${item.small}`}
                </span>
                <span className="text-lg mt-0.5">{item.emoji}</span>
                <span className="text-[11px] font-bold text-gray-700 truncate w-full text-center">
                  {item.word}
                </span>
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex-1 flex flex-col justify-between max-w-md mx-auto w-full">
          <div
            style={{ backgroundColor: currentItem.bgColor, borderColor: currentItem.color }}
            className="w-full rounded-3xl p-6 border-4 shadow-xl flex flex-col items-center text-center relative transition-all duration-300 min-h-[360px] justify-between"
          >
            {/* Audio Button */}
            <button
              onClick={() => playEnglishAudio(currentItem)}
              title="Listen Pronunciation"
              className="absolute top-4 right-4 w-12 h-12 rounded-full bg-white shadow-md flex items-center justify-center text-sky-600 hover:scale-110 active:scale-95 transition-all cursor-pointer border border-sky-100"
            >
              <Volume2 className="w-6 h-6 animate-pulse" />
            </button>

            {/* Letter display */}
            <div className="my-2">
              <span
                style={{ color: currentItem.color }}
                className="text-8xl sm:text-9xl font-black font-kids drop-shadow-md select-none inline-block hover:scale-105 transition-transform"
              >
                {displayMode === 'capital'
                  ? currentItem.capital
                  : displayMode === 'small'
                  ? currentItem.small
                  : `${currentItem.capital}${currentItem.small}`}
              </span>
            </div>

            {/* Cartoon picture */}
            <div className="my-1 flex flex-col items-center">
              <div className="w-24 h-24 rounded-3xl bg-white/90 shadow-md flex items-center justify-center text-5xl mb-2 border border-white">
                {currentItem.emoji}
              </div>
              <div className="text-3xl font-black font-kids text-gray-900 leading-tight">
                {currentItem.word}
              </div>
              <div className="text-xs sm:text-sm font-bold font-bangla text-sky-800">
                বাংলা অর্থ: {currentItem.meaningBn}
              </div>
            </div>

            {/* Phonics & Sentence Bar */}
            <div
              onClick={() => playEnglishAudio(currentItem)}
              className="w-full bg-white/80 backdrop-blur-xs rounded-2xl py-2 px-3 shadow-xs border border-sky-200/60 cursor-pointer hover:bg-white transition-colors"
            >
              <p className="text-sm sm:text-base font-bold text-sky-950 flex items-center justify-center gap-1.5 font-kids">
                <span>🔊</span> {currentItem.pronunciation}
              </p>
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between gap-4 mt-5">
            <button
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className={`flex-1 py-3 px-4 rounded-2xl flex items-center justify-center gap-2 font-black text-base shadow-md transition-all font-kids ${
                currentIndex === 0
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-white text-gray-800 border-2 border-sky-200 hover:bg-sky-50 active:scale-95 cursor-pointer'
              }`}
            >
              <ChevronLeft className="w-5 h-5" />
              <span>Previous</span>
            </button>

            <button
              onClick={handleNext}
              className="flex-1 py-3 px-4 rounded-2xl flex items-center justify-center gap-2 font-black text-base shadow-md transition-all bg-gradient-to-r from-sky-500 to-indigo-500 text-white active:scale-95 cursor-pointer hover:brightness-105 font-kids"
            >
              <span>{currentIndex === ENGLISH_LETTERS.length - 1 ? 'Finish & Win!' : 'Next'}</span>
              {currentIndex === ENGLISH_LETTERS.length - 1 ? (
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

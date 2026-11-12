import React, { useState } from 'react';
import { soundEffects } from '../../utils/soundEffects';
import { speechService } from '../../utils/speech';
import confetti from 'canvas-confetti';

interface CuteMascotProps {
  mood?: 'happy' | 'celebrating' | 'cheering' | 'waving';
  customMessage?: string;
  size?: 'sm' | 'md' | 'lg';
  interactive?: boolean;
}

const MASCOT_CHEERS = [
  'চলো আজ নতুন কিছু শিখি!',
  'তুমি তো দারুণ বুদ্ধিমান!',
  'বাহ! কত সুন্দর শিখছ!',
  'আরেকটা তারা জিতবে চলো!',
  'ছোটু তোমার পরম বন্ধু!',
  'আজ কোন গল্প শুনবে বলো?',
];

export const CuteMascot: React.FC<CuteMascotProps> = ({
  mood = 'happy',
  customMessage,
  size = 'md',
  interactive = true,
}) => {
  const [isWiggling, setIsWiggling] = useState(false);
  const [bubbleText, setBubbleText] = useState(customMessage || 'নমস্কার বন্ধু! আমি ছোটু 🐯');

  const handleMascotTap = () => {
    if (!interactive) return;
    soundEffects.playPop();
    setIsWiggling(true);

    const randomCheer = MASCOT_CHEERS[Math.floor(Math.random() * MASCOT_CHEERS.length)];
    setBubbleText(randomCheer);
    speechService.speak(randomCheer, 'bn');

    try {
      confetti({
        particleCount: 20,
        spread: 60,
        origin: { y: 0.65 },
        colors: ['#FF6B6B', '#FFD166', '#06D6A0', '#118AB2'],
      });
    } catch {
      // Confetti fallback
    }

    setTimeout(() => {
      setIsWiggling(false);
    }, 700);
  };

  const sizeClasses = {
    sm: 'w-16 h-16',
    md: 'w-24 h-24 sm:w-28 sm:h-28',
    lg: 'w-32 h-32 sm:w-40 sm:h-40',
  }[size];

  return (
    <div className="relative inline-flex flex-col items-center select-none">
      {/* Speech Bubble */}
      {bubbleText && (
        <div
          onClick={handleMascotTap}
          className="mb-2 max-w-[240px] px-3.5 py-1.5 rounded-2xl bg-white shadow-md border-2 border-amber-300 text-amber-950 text-xs sm:text-sm font-bold font-bangla text-center animate-bounce cursor-pointer relative"
        >
          {bubbleText}
          {/* Bubble tail */}
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-white" />
        </div>
      )}

      {/* Cute Mascot SVG illustration */}
      <div
        onClick={handleMascotTap}
        className={`${sizeClasses} relative cursor-pointer transition-transform duration-300 hover:scale-105 active:scale-95 ${
          isWiggling ? 'scale-110 rotate-6' : mood === 'cheering' ? 'animate-wiggle' : 'animate-float'
        }`}
        title="Tap me to hear a friendly cheer!"
      >
        <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-md">
          <defs>
            <linearGradient id="mascotTigerGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#FF9F43" />
              <stop offset="100%" stop-color="#EE5A24" />
            </linearGradient>
            <linearGradient id="earInner" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#FED330" />
              <stop offset="100%" stop-color="#FFEAA7" />
            </linearGradient>
          </defs>

          {/* Ears */}
          <circle cx="55" cy="55" r="28" fill="url(#mascotTigerGrad)" stroke="#C44569" strokeWidth="2.5" />
          <circle cx="55" cy="55" r="16" fill="url(#earInner)" />
          <circle cx="145" cy="55" r="28" fill="url(#mascotTigerGrad)" stroke="#C44569" strokeWidth="2.5" />
          <circle cx="145" cy="55" r="16" fill="url(#earInner)" />

          {/* Head */}
          <circle cx="100" cy="110" r="68" fill="url(#mascotTigerGrad)" />

          {/* Cheeks fluff */}
          <circle cx="42" cy="120" r="18" fill="url(#mascotTigerGrad)" />
          <circle cx="158" cy="120" r="18" fill="url(#mascotTigerGrad)" />

          {/* Cute Tiger Stripes */}
          <path d="M 100 48 L 100 70" stroke="#572800" strokeWidth="6" strokeLinecap="round" />
          <path d="M 82 56 L 86 74" stroke="#572800" strokeWidth="5" strokeLinecap="round" />
          <path d="M 118 56 L 114 74" stroke="#572800" strokeWidth="5" strokeLinecap="round" />
          <path d="M 44 105 L 58 108" stroke="#572800" strokeWidth="4.5" strokeLinecap="round" />
          <path d="M 156 105 L 142 108" stroke="#572800" strokeWidth="4.5" strokeLinecap="round" />

          {/* Graduation / Student Cap */}
          <polygon points="100,18 152,38 100,54 48,38" fill="#4834D4" />
          <rect x="94" y="48" width="12" height="12" fill="#F0932B" rx="3" />
          <path d="M 152 38 C 160 55 160 70 158 82" stroke="#F9CA24" strokeWidth="4" fill="none" strokeLinecap="round" />
          <circle cx="158" cy="85" r="6" fill="#F0932B" />

          {/* White Muzzle */}
          <ellipse cx="100" cy="132" rx="38" ry="26" fill="#FFFDF0" />

          {/* Sparkling Big Eyes */}
          <ellipse cx="76" cy="100" rx="12" ry="15" fill="#1E293B" />
          <ellipse cx="124" cy="100" rx="12" ry="15" fill="#1E293B" />
          <circle cx="79" cy="95" r="5" fill="#FFFFFF" />
          <circle cx="72" cy="105" r="2.5" fill="#FFFFFF" />
          <circle cx="127" cy="95" r="5" fill="#FFFFFF" />
          <circle cx="120" cy="105" r="2.5" fill="#FFFFFF" />

          {/* Rosy Cheeks */}
          <ellipse cx="60" cy="122" rx="11" ry="7" fill="#FF7675" opacity="0.65" />
          <ellipse cx="140" cy="122" rx="11" ry="7" fill="#FF7675" opacity="0.65" />

          {/* Nose */}
          <path d="M 94 120 Q 100 114 106 120 Q 100 126 94 120 Z" fill="#EE5253" />

          {/* Happy Mouth */}
          <path d="M 100 124 Q 93 138 86 132" stroke="#4B5563" strokeWidth="3" fill="none" strokeLinecap="round" />
          <path d="M 100 124 Q 107 138 114 132" stroke="#4B5563" strokeWidth="3" fill="none" strokeLinecap="round" />
          {/* Cute Tongue */}
          <path d="M 96 132 Q 100 142 104 132 Z" fill="#FF7979" />
        </svg>
      </div>
    </div>
  );
};

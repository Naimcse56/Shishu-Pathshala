import React from 'react';
import { Volume2, VolumeX, Sparkles } from 'lucide-react';
import { soundEffects } from '../../utils/soundEffects';
import { speechService } from '../../utils/speech';
import { PWAInstallButton } from '../pwa/PWAInstallButton';

interface TopBarProps {
  stars: number;
  soundEnabled: boolean;
  onToggleSound: () => void;
  onOpenRewards: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({
  stars,
  soundEnabled,
  onToggleSound,
  onOpenRewards,
}) => {
  const handleSoundToggle = () => {
    soundEffects.playPop();
    onToggleSound();
  };

  const handleStarsClick = () => {
    soundEffects.playStarDing();
    speechService.speak(`তোমার কাছে ${stars}টি সোনার তারা আছে!`, 'bn');
    onOpenRewards();
  };

  return (
    <header className="sticky top-0 z-30 w-full bg-gradient-to-r from-amber-400 via-rose-400 to-orange-400 px-3.5 py-2.5 text-white shadow-md flex items-center justify-between select-none">
      {/* Brand title with cute tiger icon */}
      <div className="flex items-center gap-2">
        <div className="w-9 h-9 rounded-2xl bg-white shadow-sm flex items-center justify-center text-xl shrink-0 border-2 border-amber-200">
          🐯
        </div>
        <div>
          <h1 className="text-base sm:text-lg font-black tracking-wide font-bangla drop-shadow-xs leading-none">
            শিশু পাঠশালা
          </h1>
          <span className="text-[10px] font-medium tracking-wider text-amber-100 block">
            SHISHU PATHSHALA
          </span>
        </div>
      </div>

      {/* Right controls: PWA button, Android ZIP, Sound toggle, Star badge */}
      <div className="flex items-center gap-1.5 sm:gap-2">
        <PWAInstallButton compact />

        <a
          href="/shishu-pathshala-android-project.zip"
          download="shishu-pathshala-android-project.zip"
          title="Download Android Native Project (ZIP)"
          onClick={() => soundEffects.playSuccess()}
          className="flex items-center gap-1 px-2.5 py-1.5 rounded-2xl bg-white/20 hover:bg-white/30 text-white font-bold text-xs backdrop-blur-xs transition-all active:scale-95 cursor-pointer shadow-xs border border-white/20"
        >
          <span>🤖</span>
          <span className="hidden md:inline font-bangla">Android প্রজেক্ট</span>
        </a>

        {/* Sound toggle button */}
        <button
          onClick={handleSoundToggle}
          title={soundEnabled ? 'সাউন্ড বন্ধ করো' : 'সাউন্ড চালু করো'}
          className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-xs flex items-center justify-center transition-all active:scale-90 text-white cursor-pointer"
        >
          {soundEnabled ? (
            <Volume2 className="w-4 h-4 text-white" />
          ) : (
            <VolumeX className="w-4 h-4 text-rose-200" />
          )}
        </button>

        {/* Stars counter pill */}
        <button
          onClick={handleStarsClick}
          title="আমার সোনার তারা"
          className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white text-amber-900 font-black text-sm shadow-md border-2 border-amber-300 hover:scale-105 active:scale-95 transition-transform cursor-pointer"
        >
          <span className="text-base animate-spin text-amber-500" style={{ animationDuration: '6s' }}>⭐</span>
          <span className="font-kids">{stars}</span>
          <Sparkles className="w-3 h-3 text-amber-500 hidden sm:inline" />
        </button>
      </div>
    </header>
  );
};

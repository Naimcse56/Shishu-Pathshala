import React from 'react';
import { storageService, BadgeItem } from '../../utils/storage';
import { Sparkles, Trophy, Star, CheckCircle, Lock, Award } from 'lucide-react';
import { soundEffects } from '../../utils/soundEffects';
import { speechService } from '../../utils/speech';
import confetti from 'canvas-confetti';

interface RewardsViewProps {
  stars: number;
  completedLessonsCount: number;
}

export const RewardsView: React.FC<RewardsViewProps> = ({ stars, completedLessonsCount }) => {
  const badges: BadgeItem[] = storageService.getBadges();

  const handleBadgeClick = (badge: BadgeItem) => {
    soundEffects.playPop();
    if (badge.unlocked) {
      soundEffects.playSuccess();
      try {
        confetti({ particleCount: 30, spread: 60 });
      } catch {}
      speechService.speak(`${badge.titleBn}! ${badge.descBn}`, 'bn');
    } else {
      speechService.speak(
        `এই ব্যাজটি পেতে আরও ${badge.requiredStars - stars}টি তারা লাগবে!`,
        'bn'
      );
    }
  };

  const handleCheerTap = () => {
    soundEffects.playFanfare();
    try {
      confetti({
        particleCount: 50,
        spread: 80,
        origin: { y: 0.6 },
      });
    } catch {}
    speechService.speak(`বাহ! তুমি ${stars}টি সোনার তারা অর্জন করেছ!`, 'bn');
  };

  return (
    <div className="flex-1 flex flex-col p-4 pb-20 select-none space-y-4">
      {/* Header Star Trophy Banner */}
      <div
        onClick={handleCheerTap}
        className="cursor-pointer overflow-hidden rounded-3xl bg-gradient-to-r from-amber-400 via-orange-400 to-yellow-400 p-5 text-white shadow-lg border-2 border-amber-200 relative text-center active:scale-98 transition-transform"
      >
        <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-xs flex items-center justify-center text-5xl mx-auto mb-2 shadow-inner">
          ⭐
        </div>
        <div className="text-4xl font-black font-kids drop-shadow-xs flex items-center justify-center gap-1.5">
          <span>{stars}</span>
          <span className="text-lg font-bangla">সোনার তারা</span>
        </div>
        <p className="text-xs text-amber-100 font-bangla mt-1">
          টোকা দিয়ে তারা ও আতশবাজি উৎসব করো! 🎉
        </p>

        <div className="mt-3 inline-flex items-center gap-2 bg-amber-900/20 px-3 py-1 rounded-xl text-xs font-bold font-bangla">
          <CheckCircle className="w-3.5 h-3.5 text-amber-200" />
          <span>মোট শেষ করা পাঠ: {completedLessonsCount} টি</span>
        </div>
      </div>

      {/* Badges Collection Title */}
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-2">
          <Award className="w-5 h-5 text-purple-600" />
          <h3 className="font-black text-gray-900 font-bangla text-base">
            আমার অর্জিত ব্যাজসমূহ (Achievement Badges)
          </h3>
        </div>
        <span className="text-xs font-bold text-purple-700 font-bangla">
          {badges.filter((b) => b.unlocked).length} / {badges.length} আনলকড
        </span>
      </div>

      {/* Badges Grid */}
      <div className="grid grid-cols-2 gap-3 flex-1 overflow-y-auto pr-1">
        {badges.map((badge) => (
          <div
            key={badge.id}
            onClick={() => handleBadgeClick(badge)}
            className={`cursor-pointer p-4 rounded-3xl border-2 transition-all active:scale-95 flex flex-col items-center text-center justify-between min-h-[160px] shadow-sm ${
              badge.unlocked
                ? 'bg-gradient-to-br from-amber-50 to-orange-50 border-amber-300 shadow-amber-100 hover:shadow-md'
                : 'bg-gray-100/80 border-gray-200 opacity-60'
            }`}
          >
            <div className="relative">
              <div
                className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl shadow-sm mb-2 border ${
                  badge.unlocked
                    ? 'bg-white border-amber-200'
                    : 'bg-gray-200 border-gray-300 grayscale'
                }`}
              >
                {badge.icon}
              </div>
              {!badge.unlocked && (
                <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-slate-700 text-white flex items-center justify-center">
                  <Lock className="w-3 h-3" />
                </div>
              )}
            </div>

            <div>
              <div className="font-black font-bangla text-gray-900 text-sm leading-tight">
                {badge.titleBn}
              </div>
              <div className="text-[11px] text-gray-500 font-kids">
                {badge.titleEn}
              </div>
              <p className="text-[10px] text-gray-600 font-bangla mt-1 line-clamp-2">
                {badge.descBn}
              </p>
            </div>

            <div className="mt-2 w-full">
              {badge.unlocked ? (
                <span className="inline-flex items-center gap-1 text-[10px] font-black text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full font-bangla">
                  <CheckCircle className="w-3 h-3" /> আনলক করা হয়েছে!
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full font-bangla">
                  ⭐ {badge.requiredStars} তারা প্রয়োজন
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

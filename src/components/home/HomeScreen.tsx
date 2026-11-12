import React from 'react';
import { CuteMascot } from '../mascot/CuteMascot';
import { Play, BookOpen, Sparkles, Award, ArrowRight, Star, ChevronRight } from 'lucide-react';
import { soundEffects } from '../../utils/soundEffects';
import { speechService } from '../../utils/speech';

interface HomeScreenProps {
  stars: number;
  completedLessonsCount: number;
  onNavigateTab: (tab: 'learn' | 'games' | 'exam' | 'rewards') => void;
  onSelectSubject: (subject: 'bangla' | 'english' | 'math' | 'gk') => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  stars,
  completedLessonsCount,
  onNavigateTab,
  onSelectSubject,
}) => {
  const handleSubjectClick = (subj: 'bangla' | 'english' | 'math' | 'gk', nameBn: string) => {
    soundEffects.playPop();
    speechService.speak(nameBn + ' শেখা শুরু করি!', 'bn');
    onSelectSubject(subj);
  };

  const handleGamesBanner = () => {
    soundEffects.playPop();
    speechService.speak('মজার খেলা খেলি চলো!', 'bn');
    onNavigateTab('games');
  };

  const handleExamBanner = () => {
    soundEffects.playPop();
    speechService.speak('আজকের মজার পরীক্ষা দিই!', 'bn');
    onNavigateTab('exam');
  };

  return (
    <div className="flex-1 pb-16 px-4 pt-3 space-y-4">
      {/* Welcome Banner with Chhotu Mascot */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-amber-400 via-orange-400 to-rose-400 p-4 sm:p-5 text-white shadow-lg border-2 border-amber-200">
        {/* Soft background circles */}
        <div className="absolute -right-6 -bottom-8 w-36 h-36 rounded-full bg-white/15 blur-xs pointer-events-none" />
        <div className="absolute left-1/3 -top-10 w-28 h-28 rounded-full bg-white/10 blur-xs pointer-events-none" />

        <div className="flex items-center justify-between gap-3 relative z-10">
          <div className="space-y-1.5 flex-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-white/20 text-xs font-bold font-bangla">
              <span>🌟</span> স্বাগতম ছোট্ট বন্ধু!
            </div>
            <h2 className="text-xl sm:text-2xl font-black font-bangla drop-shadow-xs leading-tight">
              আজকে আমরা কী শিখব?
            </h2>
            <p className="text-xs text-amber-50 font-bangla">
              রং-বেরঙের ছবি, বর্ণ ও মজার খেলার অপূর্ব পাঠশালা!
            </p>

            {/* Quick stats tag */}
            <div className="flex items-center gap-2 pt-1">
              <span className="flex items-center gap-1 bg-amber-900/20 backdrop-blur-xs px-2.5 py-1 rounded-xl text-xs font-bold">
                <Star className="w-3.5 h-3.5 fill-amber-300 text-amber-300" />
                {stars} তারা
              </span>
              <span className="bg-amber-900/20 backdrop-blur-xs px-2.5 py-1 rounded-xl text-xs font-bold">
                {completedLessonsCount} পাঠ শেষ
              </span>
            </div>
          </div>

          {/* Interactive Mascot */}
          <div className="shrink-0 flex flex-col items-center">
            <CuteMascot size="md" mood="cheering" customMessage="চলো আজ নতুন কিছু শিখি! 🐯" />
          </div>
        </div>
      </div>

      {/* Continue Learning Quick Action Card */}
      <div
        onClick={() => handleSubjectClick('bangla', 'বাংলা স্বরবর্ণ')}
        className="group relative cursor-pointer overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-500 to-teal-500 p-3.5 text-white shadow-md transition-all hover:shadow-xl active:scale-98 flex items-center justify-between border-2 border-emerald-300"
      >
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center text-2xl shadow-inner font-bangla font-bold">
            অ
          </div>
          <div>
            <div className="text-[10px] uppercase font-bold text-emerald-100 tracking-wider">
              Continue Learning • পড়াশোনা
            </div>
            <div className="text-base font-black font-bangla leading-tight">
              বাংলা স্বরবর্ণ ও কারচিহ্ন
            </div>
            <div className="text-xs text-emerald-100 font-bangla">
              অ, আ, ই, ঈ দিয়ে ছবি ও শব্দ শেখো
            </div>
          </div>
        </div>

        <div className="w-9 h-9 rounded-full bg-white text-emerald-700 flex items-center justify-center shadow-md group-hover:translate-x-1 transition-transform shrink-0">
          <Play className="w-4 h-4 fill-emerald-700" />
        </div>
      </div>

      {/* Main 4 Learning Subject Cards */}
      <div className="space-y-2">
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-amber-600" />
            <h3 className="font-black text-gray-900 font-bangla text-base">
              পড়ার বিষয়সমূহ (Subjects)
            </h3>
          </div>
          <span className="text-xs text-amber-700 font-medium font-bangla">
            ৪টি মূল বিভাগ
          </span>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {/* Card 1: Bangla */}
          <div
            onClick={() => handleSubjectClick('bangla', 'বাংলা বর্ণমালা')}
            className="group relative cursor-pointer overflow-hidden rounded-3xl bg-gradient-to-br from-rose-50 to-rose-100 p-3.5 border-2 border-rose-200 shadow-sm hover:shadow-md transition-all active:scale-95 flex flex-col justify-between h-36"
          >
            <div className="flex justify-between items-start">
              <span className="text-3xl font-black font-bangla text-rose-600 bg-white w-10 h-10 rounded-2xl shadow-xs flex items-center justify-center border border-rose-100">
                অ
              </span>
              <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-rose-200 text-rose-800 font-bangla">
                স্বরবর্ণ
              </span>
            </div>
            <div>
              <h4 className="font-black text-rose-950 font-bangla text-base leading-tight">
                বাংলা পাঠ
              </h4>
              <p className="text-[11px] text-rose-700 font-bangla">
                স্বরবর্ণ, ব্যঞ্জনবর্ণ ও কারচিহ্ন
              </p>
            </div>
            <div className="flex items-center justify-between text-rose-600 text-xs font-bold font-bangla pt-1">
              <span>শুরু করো</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 2: English */}
          <div
            onClick={() => handleSubjectClick('english', 'ইংরেজি বর্ণমালা')}
            className="group relative cursor-pointer overflow-hidden rounded-3xl bg-gradient-to-br from-sky-50 to-sky-100 p-3.5 border-2 border-sky-200 shadow-sm hover:shadow-md transition-all active:scale-95 flex flex-col justify-between h-36"
          >
            <div className="flex justify-between items-start">
              <span className="text-2xl font-black font-kids text-sky-600 bg-white w-10 h-10 rounded-2xl shadow-xs flex items-center justify-center border border-sky-100">
                Aa
              </span>
              <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-sky-200 text-sky-800 font-kids">
                A to Z
              </span>
            </div>
            <div>
              <h4 className="font-black text-sky-950 font-bangla text-base leading-tight">
                English Learning
              </h4>
              <p className="text-[11px] text-sky-700 font-bangla">
                Capital, Small & Words
              </p>
            </div>
            <div className="flex items-center justify-between text-sky-600 text-xs font-bold font-bangla pt-1">
              <span>Start</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 3: Math */}
          <div
            onClick={() => handleSubjectClick('math', 'মজার গণিত')}
            className="group relative cursor-pointer overflow-hidden rounded-3xl bg-gradient-to-br from-amber-50 to-amber-100 p-3.5 border-2 border-amber-200 shadow-sm hover:shadow-md transition-all active:scale-95 flex flex-col justify-between h-36"
          >
            <div className="flex justify-between items-start">
              <span className="text-2xl font-black font-bangla text-amber-600 bg-white w-10 h-10 rounded-2xl shadow-xs flex items-center justify-center border border-amber-100">
                ১ ২ ৩
              </span>
              <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-amber-200 text-amber-800 font-bangla">
                ১ - ২০
              </span>
            </div>
            <div>
              <h4 className="font-black text-amber-950 font-bangla text-base leading-tight">
                মজার গণিত
              </h4>
              <p className="text-[11px] text-amber-700 font-bangla">
                সংখ্যা, গণনা, আকার ও রং
              </p>
            </div>
            <div className="flex items-center justify-between text-amber-600 text-xs font-bold font-bangla pt-1">
              <span>গণনা করো</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 4: General Knowledge */}
          <div
            onClick={() => handleSubjectClick('gk', 'সাধারণ জ্ঞান')}
            className="group relative cursor-pointer overflow-hidden rounded-3xl bg-gradient-to-br from-purple-50 to-purple-100 p-3.5 border-2 border-purple-200 shadow-sm hover:shadow-md transition-all active:scale-95 flex flex-col justify-between h-36"
          >
            <div className="flex justify-between items-start">
              <span className="text-2xl bg-white w-10 h-10 rounded-2xl shadow-xs flex items-center justify-center border border-purple-100">
                🦁
              </span>
              <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-purple-200 text-purple-800 font-bangla">
                প্রকৃতি
              </span>
            </div>
            <div>
              <h4 className="font-black text-purple-950 font-bangla text-base leading-tight">
                সাধারণ জ্ঞান
              </h4>
              <p className="text-[11px] text-purple-700 font-bangla">
                পশুপাখি, ফুল, ফল ও প্রকৃতি
              </p>
            </div>
            <div className="flex items-center justify-between text-purple-600 text-xs font-bold font-bangla pt-1">
              <span>আবিষ্কার করো</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </div>

      {/* Fun Games Banner */}
      <div
        onClick={handleGamesBanner}
        className="group relative cursor-pointer overflow-hidden rounded-3xl bg-gradient-to-r from-violet-600 to-indigo-600 p-4 text-white shadow-lg transition-all hover:shadow-xl active:scale-98 border-2 border-violet-400"
      >
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/20 text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5" /> ৬টি মজার খেলা
            </div>
            <h4 className="text-lg font-black font-bangla leading-tight">
              মজার খেলা ও ধাঁধা
            </h4>
            <p className="text-xs text-indigo-100 font-bangla">
              ছবি মেলানো, বেলুন ফোটানো, সঠিক বর্ণ খোঁজা!
            </p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center text-3xl shrink-0 group-hover:rotate-12 transition-transform">
            🎮
          </div>
        </div>
      </div>

      {/* Exam & Quiz Section Card */}
      <div
        onClick={handleExamBanner}
        className="group relative cursor-pointer overflow-hidden rounded-3xl bg-gradient-to-r from-amber-500 to-orange-500 p-4 text-white shadow-lg transition-all hover:shadow-xl active:scale-98 border-2 border-amber-300"
      >
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/20 text-xs font-bold">
              <Award className="w-3.5 h-3.5" /> পরীক্ষা ও তারা জয়
            </div>
            <h4 className="text-lg font-black font-bangla leading-tight">
              ছোটদের কুইজ পরীক্ষা
            </h4>
            <p className="text-xs text-amber-100 font-bangla">
              বর্ণ চেনো (Shuffle সহ), ছবি শনাক্ত করো ও শুনে বলো!
            </p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center text-3xl shrink-0 group-hover:scale-110 transition-transform">
            🏆
          </div>
        </div>
      </div>

      {/* Rewards Teaser / My Stars card */}
      <div
        onClick={() => onNavigateTab('rewards')}
        className="cursor-pointer rounded-3xl bg-amber-100/70 p-3.5 border-2 border-amber-200/80 flex items-center justify-between active:scale-98 transition-transform"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-amber-400 text-white flex items-center justify-center text-xl shadow-xs">
            ⭐
          </div>
          <div>
            <div className="text-xs font-bold text-amber-900 font-bangla">
              আমার অর্জন ও ব্যাজ
            </div>
            <div className="text-[11px] text-amber-700 font-bangla">
              {stars}টি তারা পেয়েছ! নতুন ব্যাজ আনলক করো
            </div>
          </div>
        </div>
        <ArrowRight className="w-4 h-4 text-amber-800" />
      </div>
    </div>
  );
};

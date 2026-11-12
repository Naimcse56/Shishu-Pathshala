import React from 'react';
import { Home, BookOpen, Gamepad2, Award, Sparkles, ShieldCheck } from 'lucide-react';
import { soundEffects } from '../../utils/soundEffects';

export type NavTab = 'home' | 'learn' | 'games' | 'exam' | 'rewards' | 'parent';

interface BottomNavProps {
  currentTab: NavTab;
  onTabChange: (tab: NavTab) => void;
}

interface TabConfig {
  id: NavTab;
  labelBn: string;
  labelEn: string;
  icon: React.ElementType;
  color: string;
  activeBg: string;
}

const TABS: TabConfig[] = [
  { id: 'home', labelBn: 'হোম', labelEn: 'Home', icon: Home, color: 'text-rose-600', activeBg: 'bg-rose-100 text-rose-700' },
  { id: 'learn', labelBn: 'শেখা', labelEn: 'Learn', icon: BookOpen, color: 'text-amber-600', activeBg: 'bg-amber-100 text-amber-700' },
  { id: 'games', labelBn: 'খেলা', labelEn: 'Games', icon: Gamepad2, color: 'text-emerald-600', activeBg: 'bg-emerald-100 text-emerald-700' },
  { id: 'exam', labelBn: 'পরীক্ষা', labelEn: 'Exam', icon: Award, color: 'text-blue-600', activeBg: 'bg-blue-100 text-blue-700' },
  { id: 'rewards', labelBn: 'পুরস্কার', labelEn: 'Stars', icon: Sparkles, color: 'text-purple-600', activeBg: 'bg-purple-100 text-purple-700' },
  { id: 'parent', labelBn: 'প্যারেন্ট', labelEn: 'Parent', icon: ShieldCheck, color: 'text-slate-600', activeBg: 'bg-slate-200 text-slate-800' },
];

export const BottomNav: React.FC<BottomNavProps> = ({ currentTab, onTabChange }) => {
  const handleTabClick = (tab: NavTab) => {
    soundEffects.playPop();
    onTabChange(tab);
  };

  return (
    <nav className="sticky bottom-0 z-30 w-full bg-white/95 backdrop-blur-md border-t border-amber-200/80 px-2 py-1.5 shadow-lg select-none">
      <div className="flex items-center justify-around max-w-lg mx-auto">
        {TABS.map((tab) => {
          const isActive = currentTab === tab.id;
          const Icon = tab.icon;

          return (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab.id)}
              className={`flex flex-col items-center justify-center py-1 px-2 rounded-2xl transition-all cursor-pointer ${
                isActive
                  ? `${tab.activeBg} font-bold scale-105 shadow-xs`
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
            >
              <div className="relative">
                <Icon className={`w-5 h-5 transition-transform ${isActive ? 'scale-110' : ''}`} />
                {isActive && (
                  <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-current animate-ping" />
                )}
              </div>
              <span className="text-[11px] font-bangla mt-0.5 tracking-tight font-medium leading-tight">
                {tab.labelBn}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

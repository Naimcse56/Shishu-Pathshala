import React, { useState } from 'react';
import { GK_ITEMS, GKItem } from '../../data/learningData';
import { Volume2, Sparkles, Compass } from 'lucide-react';
import { soundEffects } from '../../utils/soundEffects';
import { speechService } from '../../utils/speech';
import confetti from 'canvas-confetti';

interface GKLearnViewProps {
  onEarnStar: () => void;
  onBackToHome: () => void;
}

type GKCategory = 'animals' | 'birds' | 'fruits' | 'vegetables' | 'body_parts' | 'family' | 'transport' | 'nature';

interface CategoryTab {
  id: GKCategory;
  nameBn: string;
  nameEn: string;
  icon: string;
}

const CATEGORIES: CategoryTab[] = [
  { id: 'animals', nameBn: 'পশুপ্রাণী', nameEn: 'Animals', icon: '🐅' },
  { id: 'birds', nameBn: 'পাখি', nameEn: 'Birds', icon: '🐦' },
  { id: 'fruits', nameBn: 'ফলমূল', nameEn: 'Fruits', icon: '🥭' },
  { id: 'vegetables', nameBn: 'শাকসবজি', nameEn: 'Vegetables', icon: '🥕' },
  { id: 'body_parts', nameBn: 'অঙ্গপ্রত্যঙ্গ', nameEn: 'Body', icon: '👀' },
  { id: 'family', nameBn: 'পরিবার', nameEn: 'Family', icon: '👨‍👩‍👧' },
  { id: 'transport', nameBn: 'যানবাহন', nameEn: 'Transport', icon: '✈️' },
  { id: 'nature', nameBn: 'প্রকৃতি', nameEn: 'Nature', icon: '🌈' },
];

export const GKLearnView: React.FC<GKLearnViewProps> = ({ onEarnStar, onBackToHome }) => {
  const [activeCategory, setActiveCategory] = useState<GKCategory>('animals');
  const [selectedItem, setSelectedItem] = useState<GKItem | null>(null);

  const filteredItems = GK_ITEMS.filter((item) => item.category === activeCategory);

  const handleItemClick = (item: GKItem) => {
    soundEffects.playPop();
    setSelectedItem(item);
    speechService.speak(`${item.nameBn}. ${item.pronunciationBn}`, 'bn');
  };

  const handleCategorySwitch = (cat: GKCategory) => {
    soundEffects.playPop();
    setActiveCategory(cat);
    setSelectedItem(null);
  };

  return (
    <div className="flex-1 flex flex-col p-4 pb-20 select-none">
      {/* Category Horizontal Scrollable Bar */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar p-1 bg-purple-100/70 rounded-2xl mb-4 border border-purple-200">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => handleCategorySwitch(cat.id)}
            className={`py-1.5 px-3 rounded-xl text-xs sm:text-sm font-bold font-bangla whitespace-nowrap flex items-center gap-1.5 transition-all cursor-pointer ${
              activeCategory === cat.id
                ? 'bg-purple-600 text-white shadow-sm'
                : 'text-purple-900 hover:bg-purple-200/60'
            }`}
          >
            <span>{cat.icon}</span>
            <span>{cat.nameBn}</span>
          </button>
        ))}
      </div>

      {/* Detail Showcase Modal / Focus Area if item selected */}
      {selectedItem && (
        <div
          onClick={() => handleItemClick(selectedItem)}
          className="mb-4 p-4 rounded-3xl bg-gradient-to-r from-purple-500 to-indigo-500 text-white shadow-lg border-2 border-purple-300 relative cursor-pointer"
        >
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center text-4xl shadow-inner shrink-0">
              {selectedItem.emoji}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-black font-bangla leading-tight">
                  {selectedItem.nameBn}
                </h3>
                <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full font-kids">
                  {selectedItem.nameEn}
                </span>
              </div>
              <p className="text-xs text-purple-100 font-bangla mt-1">
                {selectedItem.pronunciationBn}
              </p>
              <p className="text-xs text-amber-200 font-bold font-bangla mt-0.5">
                💡 {selectedItem.funFactBn}
              </p>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                soundEffects.playPop();
                speechService.speak(selectedItem.pronunciationBn, 'bn');
              }}
              className="p-2.5 rounded-full bg-white text-purple-700 shadow-md hover:scale-105 active:scale-95 shrink-0"
            >
              <Volume2 className="w-5 h-5 animate-pulse" />
            </button>
          </div>
        </div>
      )}

      {/* Grid of items */}
      <div className="flex-1 overflow-y-auto pr-1">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => handleItemClick(item)}
              className={`cursor-pointer p-4 rounded-3xl bg-white border-2 transition-all active:scale-95 flex flex-col items-center text-center justify-between min-h-[150px] shadow-xs hover:shadow-md ${
                selectedItem?.id === item.id ? 'border-purple-500 bg-purple-50/50 scale-102' : 'border-amber-100 hover:border-purple-200'
              }`}
            >
              <div className="w-16 h-16 rounded-2xl bg-amber-50 flex items-center justify-center text-4xl shadow-inner mb-2 border border-amber-100">
                {item.emoji}
              </div>
              <div className="font-black font-bangla text-gray-900 text-base leading-tight">
                {item.nameBn}
              </div>
              <div className="text-xs text-gray-500 font-kids">
                {item.nameEn}
              </div>
              <div className="text-[10px] text-purple-700 font-bold font-bangla bg-purple-100 px-2 py-0.5 rounded-full mt-1.5 flex items-center gap-1">
                <span>🔊</span> শুনুন
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

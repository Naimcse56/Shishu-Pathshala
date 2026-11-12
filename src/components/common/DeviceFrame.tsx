import React, { useState, useEffect } from 'react';
import { Smartphone, Tablet, Maximize2, Wifi, BatteryCharging } from 'lucide-react';
import { soundEffects } from '../../utils/soundEffects';

interface DeviceFrameProps {
  viewMode: 'phone' | 'tablet' | 'fullscreen';
  onViewModeChange: (mode: 'phone' | 'tablet' | 'fullscreen') => void;
  children: React.ReactNode;
}

export const DeviceFrame: React.FC<DeviceFrameProps> = ({
  viewMode,
  onViewModeChange,
  children,
}) => {
  const [timeStr, setTimeStr] = useState('09:41');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(
        now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleModeSwitch = (mode: 'phone' | 'tablet' | 'fullscreen') => {
    soundEffects.playPop();
    onViewModeChange(mode);
  };

  if (viewMode === 'fullscreen') {
    return (
      <div className="min-h-screen w-full bg-amber-50/50 flex flex-col">
        {/* Floating view switcher at top right */}
        <div className="absolute top-2 right-2 z-40 flex items-center bg-white/90 backdrop-blur-md rounded-full shadow-md border border-amber-200 p-1">
          <button
            onClick={() => handleModeSwitch('phone')}
            title="Switch to Android Phone frame"
            className="p-1.5 rounded-full hover:bg-amber-100 text-gray-700"
          >
            <Smartphone className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleModeSwitch('tablet')}
            title="Switch to Android Tablet frame"
            className="p-1.5 rounded-full hover:bg-amber-100 text-gray-700"
          >
            <Tablet className="w-4 h-4" />
          </button>
        </div>
        {children}
      </div>
    );
  }

  const isPhone = viewMode === 'phone';

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-amber-100/60 via-sky-50 to-rose-50 flex flex-col items-center justify-start p-2 sm:p-4 md:p-6 overflow-y-auto">
      {/* Top Device Bar */}
      <div className="w-full max-w-4xl flex items-center justify-between mb-3 px-2">
        <div className="flex items-center gap-2">
          <span className="text-xl">🤖</span>
          <div className="leading-tight">
            <span className="font-bold text-gray-800 text-xs sm:text-sm font-bangla block">
              শিশু পাঠশালা • Android Preview
            </span>
            <span className="text-[11px] text-gray-500">Material 3 • Jetpack Compose Style</span>
          </div>
        </div>

        {/* Device Switcher Segmented Control */}
        <div className="flex items-center bg-white rounded-2xl shadow-sm border border-amber-200 p-1 gap-1">
          <button
            onClick={() => handleModeSwitch('phone')}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-xl text-xs font-bold transition-all ${
              isPhone
                ? 'bg-amber-500 text-white shadow-xs'
                : 'text-gray-600 hover:bg-amber-50'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">ফোন (Phone)</span>
          </button>
          <button
            onClick={() => handleModeSwitch('tablet')}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-xl text-xs font-bold transition-all ${
              !isPhone
                ? 'bg-amber-500 text-white shadow-xs'
                : 'text-gray-600 hover:bg-amber-50'
            }`}
          >
            <Tablet className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">ট্যাবলেট (Tablet)</span>
          </button>
          <button
            onClick={() => handleModeSwitch('fullscreen')}
            className="p-1.5 rounded-xl text-gray-600 hover:bg-amber-50 hover:text-amber-700 transition-colors"
            title="পূর্ণ পর্দা (Fullscreen)"
          >
            <Maximize2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Realistic Native Android Device Chassis */}
      <div
        className={`relative transition-all duration-300 w-full ${
          isPhone
            ? 'max-w-[430px] rounded-[44px] shadow-2xl border-[10px] border-slate-900 bg-slate-900 ring-4 ring-amber-300/40'
            : 'max-w-[780px] rounded-[36px] shadow-2xl border-[12px] border-slate-900 bg-slate-900 ring-4 ring-amber-300/40'
        }`}
      >
        {/* Device Screen Interior */}
        <div
          className={`w-full overflow-hidden flex flex-col bg-amber-50/30 ${
            isPhone ? 'h-[840px] rounded-[34px]' : 'h-[860px] rounded-[24px]'
          }`}
        >
          {/* Android Status Bar */}
          <div className="w-full bg-amber-100/90 backdrop-blur-xs px-5 pt-2 pb-1.5 flex items-center justify-between text-xs font-semibold text-slate-800 shrink-0 z-30 select-none border-b border-amber-200/60">
            {/* Clock */}
            <span className="tracking-tight text-[12px] font-bold">{timeStr}</span>

            {/* Front Camera Punch-hole on Phone */}
            {isPhone && (
              <div className="w-4 h-4 rounded-full bg-slate-900 shadow-inner flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-slate-800 ring-1 ring-slate-700" />
              </div>
            )}

            {/* Status Icons */}
            <div className="flex items-center gap-2 text-slate-700">
              <span className="text-[10px] font-bold tracking-wider px-1 bg-amber-200/80 rounded-sm">5G</span>
              <Wifi className="w-3.5 h-3.5" />
              <div className="flex items-center gap-0.5">
                <span className="text-[10px]">100%</span>
                <BatteryCharging className="w-3.5 h-3.5 text-emerald-600" />
              </div>
            </div>
          </div>

          {/* Actual Application Content Area */}
          <div className="flex-1 overflow-y-auto overflow-x-hidden relative flex flex-col">
            {children}
          </div>

          {/* Android Navigation Gesture Bar */}
          <div className="w-full py-1.5 flex justify-center items-center bg-white/95 shrink-0 z-30 border-t border-amber-100">
            <div className="w-32 h-1 rounded-full bg-slate-400" />
          </div>
        </div>
      </div>
    </div>
  );
};

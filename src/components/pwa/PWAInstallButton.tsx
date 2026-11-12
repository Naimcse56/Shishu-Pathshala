import React, { useState } from 'react';
import { usePWAInstall } from './usePWAInstall';
import { Download, Smartphone, X, Check } from 'lucide-react';
import { soundEffects } from '../../utils/soundEffects';

export const PWAInstallButton: React.FC<{ compact?: boolean }> = ({ compact = false }) => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showIOSGuide, setShowIOSGuide] = useState(false);
  const [showAndroidGuide, setShowAndroidGuide] = useState(false);

  if (isInstalled) {
    return (
      <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold">
        <Check className="w-3.5 h-3.5" />
        <span>ইনস্টল করা আছে</span>
      </div>
    );
  }

  const handleInstallClick = async () => {
    soundEffects.playPop();
    if (isInstallable) {
      await install();
    } else if (isIOS) {
      setShowIOSGuide(true);
    } else {
      setShowAndroidGuide(true);
    }
  };

  return (
    <>
      <button
        onClick={handleInstallClick}
        title="Install Native Android PWA"
        className={`flex items-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 font-bold text-white shadow-md hover:shadow-lg active:scale-95 transition-all cursor-pointer ${
          compact ? 'px-3 py-1.5 text-xs' : 'px-4 py-2 text-sm'
        }`}
      >
        <Smartphone className="w-4 h-4 animate-pulse" />
        <span className="hidden sm:inline">ইনস্টল করো</span>
        <span className="text-xs bg-white/20 px-1.5 py-0.5 rounded-md flex items-center gap-1">
          <Download className="w-3 h-3" /> Android
        </span>
      </button>

      {/* Android instructions modal */}
      {showAndroidGuide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
          <div className="w-full max-w-sm rounded-3xl bg-white p-6 shadow-2xl border-4 border-amber-200">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-2">
                <span className="text-2xl">📱</span>
                <h3 className="text-lg font-bold text-gray-900 font-bangla">অ্যান্ড্রয়েড ফোনে ইনস্টল</h3>
              </div>
              <button
                onClick={() => {
                  soundEffects.playPop();
                  setShowAndroidGuide(false);
                }}
                className="p-1.5 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-3 text-sm text-gray-700 font-bangla">
              <p className="flex items-start gap-2">
                <span className="font-bold text-emerald-600">১.</span> ব্রাউজারের উপরে বা নিচে <strong>তিনটি ডট (⋮)</strong> মেনু বাটনে চাপ দাও।
              </p>
              <p className="flex items-start gap-2">
                <span className="font-bold text-emerald-600">২.</span> <strong>"Add to Home screen"</strong> বা <strong>"Install app"</strong> চাপ দাও।
              </p>
              <p className="flex items-start gap-2">
                <span className="font-bold text-emerald-600">৩.</span> ব্যাস! আপনার ফোনে এটি নেটিভ অ্যাপ হিসেবে পুরোপুরি অফলাইনে চলবে!
              </p>
            </div>
            <button
              onClick={() => {
                soundEffects.playPop();
                setShowAndroidGuide(false);
              }}
              className="mt-5 w-full rounded-2xl bg-emerald-500 py-2.5 font-bold text-white shadow hover:bg-emerald-600"
            >
              বুঝেছি! 👍
            </button>
          </div>
        </div>
      )}

      {/* iOS instructions modal */}
      {showIOSGuide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
          <div className="w-full max-w-sm rounded-3xl bg-white p-6 shadow-2xl border-4 border-amber-200">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-lg font-bold text-gray-900 font-bangla">আইফোন / আইপ্যাডে ইনস্টল</h3>
              <button
                onClick={() => {
                  soundEffects.playPop();
                  setShowIOSGuide(false);
                }}
                className="p-1 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <p className="text-sm text-gray-600 font-bangla leading-relaxed">
              ১. Safari ব্রাউজারের নিচে <strong>Share (শেয়ার)</strong> আইকনে চাপ দাও।<br />
              ২. নিচে স্ক্রল করে <strong>"Add to Home Screen"</strong> বেছে নাও।
            </p>
            <button
              onClick={() => {
                soundEffects.playPop();
                setShowIOSGuide(false);
              }}
              className="mt-4 w-full rounded-2xl bg-amber-500 py-2.5 text-sm font-bold text-white"
            >
              ঠিক আছে
            </button>
          </div>
        </div>
      )}
    </>
  );
};

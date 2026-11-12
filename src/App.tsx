import React, { useState, useEffect } from 'react';
import { storageService, UserProgress } from './utils/storage';
import { soundEffects } from './utils/soundEffects';
import { speechService } from './utils/speech';
import { DeviceFrame } from './components/common/DeviceFrame';
import { TopBar } from './components/common/TopBar';
import { BottomNav, NavTab } from './components/common/BottomNav';
import { HomeScreen } from './components/home/HomeScreen';
import { BanglaLearnView } from './components/learn/BanglaLearnView';
import { EnglishLearnView } from './components/learn/EnglishLearnView';
import { MathLearnView } from './components/learn/MathLearnView';
import { GKLearnView } from './components/learn/GKLearnView';
import { GamesHub } from './components/games/GamesHub';
import { ExamSection } from './components/exam/ExamSection';
import { RewardsView } from './components/rewards/RewardsView';
import { ParentDashboard } from './components/parent/ParentDashboard';
import { WifiOff, ChevronLeft } from 'lucide-react';
import { App as CapApp } from '@capacitor/app';
import { SplashScreen } from '@capacitor/splash-screen';
import { StatusBar, Style } from '@capacitor/status-bar';
import { Capacitor } from '@capacitor/core';

export default function App() {
  const [progress, setProgress] = useState<UserProgress>(() => storageService.getProgress());
  const [currentTab, setCurrentTab] = useState<NavTab>('home');
  const [activeSubject, setActiveSubject] = useState<'bangla' | 'english' | 'math' | 'gk'>('bangla');
  const [isOnline, setIsOnline] = useState(typeof navigator !== 'undefined' ? navigator.onLine : true);

  // Initialize Capacitor native platform controls & Android back button
  useEffect(() => {
    if (Capacitor.isNativePlatform()) {
      SplashScreen.hide().catch(() => {});
      StatusBar.setBackgroundColor({ color: '#FF6B6B' }).catch(() => {});
      StatusBar.setStyle({ style: Style.Dark }).catch(() => {});
    }

    let backHandler: { remove: () => void } | null = null;
    CapApp.addListener('backButton', () => {
      soundEffects.playPop();
      if (currentTab !== 'home') {
        setCurrentTab('home');
      } else {
        CapApp.exitApp();
      }
    })
      .then((h) => {
        backHandler = h;
      })
      .catch(() => {});

    return () => {
      if (backHandler) {
        backHandler.remove();
      }
    };
  }, [currentTab]);

  // Initialize sound preferences
  useEffect(() => {
    soundEffects.enabled = progress.soundEnabled;
    speechService.enabled = progress.speechEnabled;
    speechService.rate = progress.speechRate || 0.85;
  }, []);

  // Monitor connectivity
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Track active learning time (every 5 seconds)
  useEffect(() => {
    const timer = setInterval(() => {
      storageService.incrementLearningTime(5);
      setProgress((prev) => ({
        ...prev,
        totalLearningSeconds: prev.totalLearningSeconds + 5,
      }));
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handleEarnStar = (count: number = 1) => {
    const newTotal = storageService.addStars(count);
    setProgress((prev) => ({ ...prev, stars: newTotal }));
  };

  const handleRecordExam = (record: {
    subject: string;
    topic: string;
    mode: string;
    score: number;
    total: number;
    starsEarned: number;
  }) => {
    storageService.addExamRecord(record);
    setProgress(storageService.getProgress());
  };

  const handleToggleSound = () => {
    const next = !progress.soundEnabled;
    soundEffects.enabled = next;
    storageService.save({ soundEnabled: next });
    setProgress((prev) => ({ ...prev, soundEnabled: next }));
  };

  const handleViewModeChange = (mode: 'phone' | 'tablet' | 'fullscreen') => {
    storageService.save({ viewMode: mode });
    setProgress((prev) => ({ ...prev, viewMode: mode }));
  };

  const handleSelectSubject = (subject: 'bangla' | 'english' | 'math' | 'gk') => {
    setActiveSubject(subject);
    setCurrentTab('learn');
  };

  const handleResetProgress = () => {
    storageService.resetAll();
    setProgress(storageService.getProgress());
    setCurrentTab('home');
  };

  return (
    <DeviceFrame
      viewMode={progress.viewMode}
      onViewModeChange={handleViewModeChange}
    >
      {/* Offline Banner when offline */}
      {!isOnline && (
        <div className="bg-amber-500 text-white px-3 py-1 text-xs font-bold text-center flex items-center justify-center gap-1.5 shadow-xs shrink-0 select-none">
          <WifiOff className="w-3.5 h-3.5" />
          <span>অফলাইন মোড চালু — সকল ছবি, শব্দ ও খেলা ইন্টারনেট ছাড়াই চলবে!</span>
        </div>
      )}

      {/* Main Top Bar */}
      <TopBar
        stars={progress.stars}
        soundEnabled={progress.soundEnabled}
        onToggleSound={handleToggleSound}
        onOpenRewards={() => setCurrentTab('rewards')}
      />

      {/* Subject switcher bar when in 'learn' tab */}
      {currentTab === 'learn' && (
        <div className="bg-white/95 border-b border-amber-200/80 px-3 py-2 flex items-center justify-between shadow-xs z-10 shrink-0">
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar w-full">
            <button
              onClick={() => {
                soundEffects.playPop();
                setActiveSubject('bangla');
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold font-bangla whitespace-nowrap transition-all cursor-pointer ${
                activeSubject === 'bangla'
                  ? 'bg-rose-500 text-white shadow-xs'
                  : 'bg-rose-50 text-rose-800 hover:bg-rose-100'
              }`}
            >
              বাংলা বর্ণ
            </button>
            <button
              onClick={() => {
                soundEffects.playPop();
                setActiveSubject('english');
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold font-kids whitespace-nowrap transition-all cursor-pointer ${
                activeSubject === 'english'
                  ? 'bg-sky-600 text-white shadow-xs'
                  : 'bg-sky-50 text-sky-800 hover:bg-sky-100'
              }`}
            >
              English A-Z
            </button>
            <button
              onClick={() => {
                soundEffects.playPop();
                setActiveSubject('math');
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold font-bangla whitespace-nowrap transition-all cursor-pointer ${
                activeSubject === 'math'
                  ? 'bg-amber-500 text-white shadow-xs'
                  : 'bg-amber-50 text-amber-800 hover:bg-amber-100'
              }`}
            >
              মজার গণিত
            </button>
            <button
              onClick={() => {
                soundEffects.playPop();
                setActiveSubject('gk');
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold font-bangla whitespace-nowrap transition-all cursor-pointer ${
                activeSubject === 'gk'
                  ? 'bg-purple-600 text-white shadow-xs'
                  : 'bg-purple-50 text-purple-800 hover:bg-purple-100'
              }`}
            >
              সাধারণ জ্ঞান
            </button>
          </div>
        </div>
      )}

      {/* Main Content Area Based on Active Tab */}
      <main className="flex-1 flex flex-col overflow-y-auto">
        {currentTab === 'home' && (
          <HomeScreen
            stars={progress.stars}
            completedLessonsCount={progress.completedLessons.length}
            onNavigateTab={(tab) => setCurrentTab(tab)}
            onSelectSubject={handleSelectSubject}
          />
        )}

        {currentTab === 'learn' && (
          <>
            {activeSubject === 'bangla' && (
              <BanglaLearnView
                onEarnStar={() => handleEarnStar(2)}
                onBackToHome={() => setCurrentTab('home')}
              />
            )}
            {activeSubject === 'english' && (
              <EnglishLearnView
                onEarnStar={() => handleEarnStar(2)}
                onBackToHome={() => setCurrentTab('home')}
              />
            )}
            {activeSubject === 'math' && (
              <MathLearnView
                onEarnStar={() => handleEarnStar(2)}
                onBackToHome={() => setCurrentTab('home')}
              />
            )}
            {activeSubject === 'gk' && (
              <GKLearnView
                onEarnStar={() => handleEarnStar(2)}
                onBackToHome={() => setCurrentTab('home')}
              />
            )}
          </>
        )}

        {currentTab === 'games' && (
          <GamesHub
            onEarnStar={() => handleEarnStar(1)}
            onBackToHome={() => setCurrentTab('home')}
          />
        )}

        {currentTab === 'exam' && (
          <ExamSection
            onEarnStars={handleEarnStar}
            onRecordExam={handleRecordExam}
            onBackToHome={() => setCurrentTab('home')}
          />
        )}

        {currentTab === 'rewards' && (
          <RewardsView
            stars={progress.stars}
            completedLessonsCount={progress.completedLessons.length}
          />
        )}

        {currentTab === 'parent' && (
          <ParentDashboard
            progress={progress}
            onUpdateProgress={(updated) => {
              const res = storageService.save(updated);
              setProgress({ ...res });
            }}
            onResetProgress={handleResetProgress}
          />
        )}
      </main>

      {/* Material 3 Bottom Navigation Bar */}
      <BottomNav
        currentTab={currentTab}
        onTabChange={(tab) => setCurrentTab(tab)}
      />
    </DeviceFrame>
  );
}

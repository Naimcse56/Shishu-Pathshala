import React, { useState } from 'react';
import { storageService, ExamRecord, UserProgress } from '../../utils/storage';
import { soundEffects } from '../../utils/soundEffects';
import { speechService } from '../../utils/speech';
import {
  ShieldCheck,
  Clock,
  BookOpen,
  Award,
  Volume2,
  VolumeX,
  RotateCcw,
  Code2,
  Smartphone,
  CheckCircle,
  X,
  Copy,
  Check,
  Download,
  FileArchive,
  Terminal,
} from 'lucide-react';

interface ParentDashboardProps {
  progress: UserProgress;
  onUpdateProgress: (updated: Partial<UserProgress>) => void;
  onResetProgress: () => void;
}

export const ParentDashboard: React.FC<ParentDashboardProps> = ({
  progress,
  onUpdateProgress,
  onResetProgress,
}) => {
  // Simple parent gate challenge so toddlers don't accidentally enter settings
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [gateA] = useState(() => Math.floor(Math.random() * 5) + 3);
  const [gateB] = useState(() => Math.floor(Math.random() * 4) + 2);
  const [userGateInput, setUserGateInput] = useState('');
  const [gateError, setGateError] = useState(false);

  // Jetpack Compose Code Hub modal
  const [showKotlinModal, setShowKotlinModal] = useState(false);
  const [copiedSnippet, setCopiedSnippet] = useState(false);

  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    if (mins >= 60) {
      const hours = Math.floor(mins / 60);
      const remainingMins = mins % 60;
      return `${hours} ঘণ্টা ${remainingMins} মিনিট`;
    }
    return `${mins} মিনিট ${secs} সেকেন্ড`;
  };

  const handleGateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (parseInt(userGateInput.trim(), 10) === gateA + gateB) {
      soundEffects.playSuccess();
      setIsUnlocked(true);
      setGateError(false);
    } else {
      soundEffects.playTryAgain();
      setGateError(true);
    }
  };

  const handleSoundToggle = () => {
    soundEffects.playPop();
    const nextState = !progress.soundEnabled;
    soundEffects.enabled = nextState;
    onUpdateProgress({ soundEnabled: nextState });
  };

  const handleSpeechToggle = () => {
    soundEffects.playPop();
    const nextState = !progress.speechEnabled;
    speechService.enabled = nextState;
    onUpdateProgress({ speechEnabled: nextState });
  };

  const handleSpeechRateChange = (rate: number) => {
    speechService.rate = rate;
    onUpdateProgress({ speechRate: rate });
    speechService.speak('উচ্চারণ পরীক্ষার গতি', 'bn');
  };

  const copyKotlinCode = () => {
    soundEffects.playPop();
    navigator.clipboard.writeText(KOTLIN_JETPACK_COMPOSE_SNIPPET);
    setCopiedSnippet(true);
    setTimeout(() => setCopiedSnippet(false), 2000);
  };

  if (!isUnlocked) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-6 text-center select-none">
        <div className="w-full max-w-sm rounded-3xl bg-white p-6 shadow-xl border-4 border-amber-200">
          <div className="w-16 h-16 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center text-3xl mx-auto mb-3">
            🛡️
          </div>
          <h3 className="text-xl font-black font-bangla text-gray-900 leading-tight">
            অভিভাবক কর্নার (Parent Gate)
          </h3>
          <p className="text-xs text-gray-600 font-bangla mt-1 mb-5">
            ছোট শিশুদের সুরক্ষার জন্য নিচের সাধারণ অংকটির সঠিক উত্তর দিন:
          </p>

          <form onSubmit={handleGateSubmit} className="space-y-4">
            <div className="p-3 bg-amber-50 rounded-2xl border border-amber-200 text-2xl font-black text-amber-900 font-kids">
              {gateA} + {gateB} = ?
            </div>

            <input
              type="number"
              inputMode="numeric"
              placeholder="উত্তর লিখুন"
              value={userGateInput}
              onChange={(e) => setUserGateInput(e.target.value)}
              className="w-full px-4 py-2.5 rounded-2xl border-2 border-gray-300 text-center text-lg font-bold focus:border-amber-500 focus:outline-hidden"
              autoFocus
            />

            {gateError && (
              <p className="text-xs font-bold text-rose-600 font-bangla">
                উত্তরটি সঠিক হয়নি, আবার চেষ্টা করুন!
              </p>
            )}

            <button
              type="submit"
              className="w-full py-3 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-bold font-bangla shadow-md active:scale-95 cursor-pointer"
            >
              প্রবেশ করুন
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col p-4 pb-20 select-none space-y-4">
      {/* Title */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-emerald-600" />
          <h3 className="text-lg font-black font-bangla text-gray-900">
            অভিভাবক ড্যাশবোর্ড (Parent Dashboard)
          </h3>
        </div>
        <button
          onClick={() => {
            soundEffects.playPop();
            setIsUnlocked(false);
          }}
          className="text-xs font-bold text-gray-500 hover:text-gray-700 font-bangla"
        >
          লক করুন
        </button>
      </div>

      {/* Overview Metric Cards */}
      <div className="grid grid-cols-2 gap-3">
        <div className="p-4 rounded-3xl bg-white border-2 border-amber-200 shadow-xs flex flex-col justify-between">
          <div className="flex items-center gap-2 text-amber-600 mb-1">
            <Clock className="w-4 h-4" />
            <span className="text-xs font-bold font-bangla">পড়ার মোট সময়</span>
          </div>
          <div className="text-lg font-black font-bangla text-gray-900">
            {formatTime(progress.totalLearningSeconds)}
          </div>
          <div className="text-[10px] text-gray-500 font-bangla mt-1">
            শিশুর সক্রিয় শেখার সময়
          </div>
        </div>

        <div className="p-4 rounded-3xl bg-white border-2 border-emerald-200 shadow-xs flex flex-col justify-between">
          <div className="flex items-center gap-2 text-emerald-600 mb-1">
            <BookOpen className="w-4 h-4" />
            <span className="text-xs font-bold font-bangla">সম্পন্ন পাঠ</span>
          </div>
          <div className="text-2xl font-black font-kids text-gray-900">
            {progress.completedLessons.length}
          </div>
          <div className="text-[10px] text-gray-500 font-bangla mt-1">
            বাংলা, ইংরেজি ও গণিত পাঠ
          </div>
        </div>
      </div>

      {/* Native Android Jetpack Compose Code Hub Banner */}
      <div
        onClick={() => {
          soundEffects.playPop();
          setShowKotlinModal(true);
        }}
        className="cursor-pointer p-4 rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white shadow-md border-2 border-indigo-400/50 flex items-center justify-between active:scale-98 transition-transform"
      >
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-indigo-600/60 flex items-center justify-center text-xl shadow-xs border border-indigo-400">
            🤖
          </div>
          <div>
            <div className="text-xs font-bold text-indigo-300 font-bangla flex items-center gap-1.5">
              <Code2 className="w-3.5 h-3.5" /> Kotlin • Jetpack Compose Code
            </div>
            <div className="text-sm font-black text-white font-bangla">
              Android Native সোর্স কোড ও স্ট্রাকচার
            </div>
          </div>
        </div>
        <span className="text-xs bg-indigo-500 px-2.5 py-1 rounded-xl font-bold font-kids">
          View Code
        </span>
      </div>

      {/* Capacitor Android Native App & APK Builder Section */}
      <div className="p-4 rounded-3xl bg-gradient-to-br from-emerald-50 via-teal-50 to-emerald-100 border-2 border-emerald-300 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-emerald-500 text-white flex items-center justify-center shadow-xs">
              <Smartphone className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-black font-bangla text-gray-900 text-sm">
                Android Native Project (Capacitor)
              </h4>
              <span className="text-[11px] font-mono font-bold text-emerald-800">
                com.shishupathshala.app
              </span>
            </div>
          </div>
          <span className="text-[10px] bg-emerald-200 text-emerald-900 font-bold px-2 py-0.5 rounded-full font-kids">
            v1.0.0
          </span>
        </div>

        <p className="text-xs text-gray-700 font-bangla leading-relaxed">
          সম্পূর্ণ অ্যান্ড্রয়েড নেটিভ প্রজেক্ট (Android Studio & Gradle প্রস্তুত) তৈরি করা হয়েছে। আপনি নিচের বাটনে চাপ দিয়ে সম্পূর্ণ <strong>ZIP</strong> ডাউনলোড করতে পারেন এবং Android Studio অথবা কমান্ড লাইনে সরাসরি APK বিল্ড করতে পারবেন।
        </p>

        {/* Action Button: Download Android Project ZIP */}
        <a
          href="/shishu-pathshala-android-project.zip"
          download="shishu-pathshala-android-project.zip"
          onClick={() => {
            soundEffects.playSuccess();
          }}
          className="flex items-center justify-center gap-2 w-full py-2.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white text-xs font-black font-bangla shadow-md hover:shadow-lg active:scale-95 transition-all text-center cursor-pointer"
        >
          <FileArchive className="w-4 h-4" />
          <span>অ্যান্ড্রয়েড প্রজেক্ট ডাউনলোড করুন (ZIP)</span>
          <Download className="w-3.5 h-3.5" />
        </a>

        {/* Quick Instructions Accordion / Box */}
        <div className="p-3 bg-white/90 rounded-2xl border border-emerald-200 text-xs space-y-1.5 font-bangla text-gray-700">
          <div className="font-bold text-emerald-950 flex items-center gap-1">
            <Terminal className="w-3.5 h-3.5 text-emerald-600" />
            <span>কীভাবে APK তৈরি করবেন?</span>
          </div>
          <ol className="list-decimal list-inside space-y-1 text-[11px] text-gray-600 pl-1">
            <li>ZIP টি আনজিপ করে <strong>Android Studio</strong> তে খুলুন।</li>
            <li><strong>Build ➔ Build Bundle(s) / APK(s) ➔ Build APK(s)</strong> চাপুন।</li>
            <li>বা টার্মিনালে চালান: <code className="bg-emerald-50 text-emerald-900 px-1 py-0.5 rounded font-mono font-bold">./gradlew assembleDebug</code></li>
            <li>তৈরি হওয়া <strong>app-debug.apk</strong> ফাইলটি যেকোনো ফোনে ইনস্টল করুন!</li>
          </ol>
        </div>
      </div>

      {/* Sound Settings */}
      <div className="p-4 rounded-3xl bg-white border-2 border-amber-200 shadow-xs space-y-3">
        <h4 className="font-black font-bangla text-gray-900 text-sm">
          সাউন্ড ও ভয়েস সেটিংস (Audio Preferences)
        </h4>

        <div className="flex items-center justify-between py-1">
          <div className="font-bangla">
            <div className="text-xs font-bold text-gray-800">শব্দ প্রভাব (Sound Effects)</div>
            <div className="text-[11px] text-gray-500">বোতাম চাপ ও অর্জনের শব্দ</div>
          </div>
          <button
            onClick={handleSoundToggle}
            className={`w-12 h-7 rounded-full transition-colors relative cursor-pointer ${
              progress.soundEnabled ? 'bg-emerald-500' : 'bg-gray-300'
            }`}
          >
            <div
              className={`w-5 h-5 rounded-full bg-white shadow-md absolute top-1 transition-transform ${
                progress.soundEnabled ? 'right-1' : 'left-1'
              }`}
            />
          </button>
        </div>

        <div className="flex items-center justify-between py-1 border-t border-gray-100">
          <div className="font-bangla">
            <div className="text-xs font-bold text-gray-800">উচ্চারণ কণ্ঠ (Voice Pronunciation)</div>
            <div className="text-[11px] text-gray-500">বাংলা ও ইংরেজি পড়ার শব্দ</div>
          </div>
          <button
            onClick={handleSpeechToggle}
            className={`w-12 h-7 rounded-full transition-colors relative cursor-pointer ${
              progress.speechEnabled ? 'bg-emerald-500' : 'bg-gray-300'
            }`}
          >
            <div
              className={`w-5 h-5 rounded-full bg-white shadow-md absolute top-1 transition-transform ${
                progress.speechEnabled ? 'right-1' : 'left-1'
              }`}
            />
          </button>
        </div>

        {/* Speech rate slider */}
        <div className="pt-2 border-t border-gray-100">
          <div className="flex justify-between text-xs font-bold font-bangla text-gray-700 mb-1">
            <span>উচ্চারণের গতি (Speech Speed)</span>
            <span className="font-kids">{progress.speechRate || 0.85}x</span>
          </div>
          <input
            type="range"
            min="0.6"
            max="1.2"
            step="0.05"
            value={progress.speechRate || 0.85}
            onChange={(e) => handleSpeechRateChange(parseFloat(e.target.value))}
            className="w-full accent-amber-500"
          />
        </div>
      </div>

      {/* Exam History */}
      <div className="p-4 rounded-3xl bg-white border-2 border-amber-200 shadow-xs space-y-2">
        <div className="flex items-center justify-between mb-1">
          <h4 className="font-black font-bangla text-gray-900 text-sm">
            সাম্প্রতিক পরীক্ষার ফলাফল (Recent Exam Records)
          </h4>
          <span className="text-[11px] font-bold text-gray-500 font-bangla">
            মোট {progress.examHistory.length}টি
          </span>
        </div>

        {progress.examHistory.length === 0 ? (
          <p className="text-xs text-gray-500 font-bangla py-2 text-center">
            এখনও কোনো পরীক্ষা সম্পন্ন হয়নি। কুইজ বিভাগে পরীক্ষা দিলে তা এখানে জমা হবে।
          </p>
        ) : (
          <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
            {progress.examHistory.map((item) => (
              <div
                key={item.id}
                className="p-2.5 rounded-2xl bg-amber-50/60 border border-amber-100 flex items-center justify-between text-xs"
              >
                <div>
                  <div className="font-black font-bangla text-gray-900 capitalize">
                    {item.subject} • {item.topic}
                  </div>
                  <div className="text-[10px] text-gray-500 font-kids">
                    {new Date(item.timestamp).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </div>
                </div>
                <div className="text-right">
                  <span className="font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full font-kids">
                    {item.score} / {item.total}
                  </span>
                  <div className="text-[10px] text-amber-700 font-bold mt-0.5">
                    +{item.starsEarned} ⭐
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Reset Progress Section */}
      <div className="pt-2">
        <button
          onClick={() => {
            soundEffects.playPop();
            if (window.confirm('আপনি কি নিশ্চিত যে সকল তারা ও অর্জিত অগ্রগতি নতুন করে শুরু করতে চান?')) {
              onResetProgress();
              soundEffects.playSuccess();
            }
          }}
          className="w-full py-2.5 rounded-2xl bg-rose-50 text-rose-700 font-bold font-bangla text-xs border border-rose-200 hover:bg-rose-100 active:scale-95 cursor-pointer flex items-center justify-center gap-1.5"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>সকল অগ্রগতি রিসেট করুন (Reset All Progress)</span>
        </button>
      </div>

      {/* Kotlin Jetpack Compose Code Modal */}
      {showKotlinModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="w-full max-w-lg rounded-3xl bg-slate-900 text-white p-5 shadow-2xl border border-indigo-500 flex flex-col max-h-[85vh]">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <span className="text-xl">🤖</span>
                <div>
                  <h3 className="font-bold text-sm text-indigo-300 font-kids">
                    Native Android Jetpack Compose Architecture
                  </h3>
                  <span className="text-[11px] text-slate-400">
                    ShishuPathshala/app/src/main/java/MainActivity.kt
                  </span>
                </div>
              </div>
              <button
                onClick={() => {
                  soundEffects.playPop();
                  setShowKotlinModal(false);
                }}
                className="p-1.5 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="my-3 flex-1 overflow-y-auto bg-slate-950 p-3 rounded-2xl text-[11px] font-mono text-emerald-300 border border-slate-800">
              <pre className="whitespace-pre-wrap">{KOTLIN_JETPACK_COMPOSE_SNIPPET}</pre>
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="text-xs text-slate-400">
                100% Offline-First Material 3 Architecture
              </span>
              <button
                onClick={copyKotlinCode}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold"
              >
                {copiedSnippet ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedSnippet ? 'Copied!' : 'Copy Kotlin Code'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Complete Jetpack Compose implementation reference for Android developers
const KOTLIN_JETPACK_COMPOSE_SNIPPET = `package com.shishupathshala.app

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.animation.*
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import androidx.navigation.compose.*

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            ShishuPathshalaTheme {
                val navController = rememberNavController()
                Scaffold(
                    bottomBar = { KidsBottomNavigation(navController) }
                ) { padding ->
                    NavHost(
                        navController = navController,
                        startDestination = "home",
                        modifier = Modifier.padding(padding)
                    ) {
                        composable("home") { HomeScreen(navController) }
                        composable("bangla") { BanglaLearnScreen() }
                        composable("english") { EnglishLearnScreen() }
                        composable("math") { MathLearnScreen() }
                        composable("gk") { GeneralKnowledgeScreen() }
                        composable("games") { FunGamesScreen() }
                        composable("exam") { ExamScreen() }
                        composable("rewards") { RewardsScreen() }
                        composable("parent") { ParentDashboardScreen() }
                    }
                }
            }
        }
    }
}

@Composable
fun ShishuPathshalaTheme(content: @Composable () -> Unit) {
    val kidsColorScheme = lightColorScheme(
        primary = Color(0xFFFF6B6B),
        secondary = Color(0xFFFFD166),
        tertiary = Color(0xFF06D6A0),
        background = Color(0xFFFFFDF5)
    )
    MaterialTheme(
        colorScheme = kidsColorScheme,
        shapes = Shapes(
            extraLarge = RoundedCornerShape(32.dp),
            large = RoundedCornerShape(24.dp)
        ),
        content = content
    )
}`;

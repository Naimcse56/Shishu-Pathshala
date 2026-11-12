/**
 * Local storage manager for Shishu Pathshala.
 * 100% offline, privacy-first, zero cloud dependencies.
 */

export interface ExamRecord {
  id: string;
  subject: string;
  topic: string;
  mode: string;
  score: number;
  total: number;
  timestamp: number;
  starsEarned: number;
}

export interface BadgeItem {
  id: string;
  titleBn: string;
  titleEn: string;
  descBn: string;
  icon: string;
  requiredStars: number;
  unlocked: boolean;
}

export interface UserProgress {
  childName: string;
  stars: number;
  completedLessons: string[]; // e.g. ['bangla_shorborno', 'english_letters_az']
  examHistory: ExamRecord[];
  totalLearningSeconds: number;
  soundEnabled: boolean;
  speechEnabled: boolean;
  speechRate: number;
  viewMode: 'phone' | 'tablet' | 'fullscreen';
}

const STORAGE_KEY = 'shishu_pathshala_v1_progress';

const DEFAULT_BADGES: BadgeItem[] = [
  {
    id: 'first_step',
    titleBn: 'প্রথম পদক্ষেপ',
    titleEn: 'First Step',
    descBn: 'প্রথম পাঠ শুরু করার জন্য',
    icon: '🌱',
    requiredStars: 1,
    unlocked: true,
  },
  {
    id: 'star_collector_10',
    titleBn: 'তারা সংগ্রাহক',
    titleEn: 'Star Explorer',
    descBn: '১০টি সোনার তারা অর্জন করেছ',
    icon: '⭐',
    requiredStars: 10,
    unlocked: false,
  },
  {
    id: 'bangla_hero',
    titleBn: 'বাংলা বীর',
    titleEn: 'Bangla Hero',
    descBn: 'স্বরবর্ণ ও ব্যঞ্জনবর্ণ চিনে ফেলেছ',
    icon: '🐯',
    requiredStars: 25,
    unlocked: false,
  },
  {
    id: 'word_wizard',
    titleBn: 'শব্দ জাদুকর',
    titleEn: 'Word Wizard',
    descBn: 'ইংরেজি বর্ণ ও শব্দের রাজা',
    icon: '🧙‍♂️',
    requiredStars: 40,
    unlocked: false,
  },
  {
    id: 'math_champ',
    titleBn: 'গণিত চ্যাম্পিয়ন',
    titleEn: 'Math Champion',
    descBn: 'সংখ্যা ও গণনা শিখে ফেলেছ',
    icon: '🏆',
    requiredStars: 60,
    unlocked: false,
  },
  {
    id: 'nature_friend',
    titleBn: 'প্রকৃতি বন্ধু',
    titleEn: 'Nature Friend',
    descBn: 'পশুপাখি ও ফলমূল চিনে ফেলেছ',
    icon: '🦜',
    requiredStars: 80,
    unlocked: false,
  },
  {
    id: 'super_scholar',
    titleBn: 'সুপার স্কলার',
    titleEn: 'Super Scholar',
    descBn: '১০০টির বেশি তারা পেয়ে অসাধারণ কৃতিত্ব!',
    icon: '👑',
    requiredStars: 100,
    unlocked: false,
  },
];

const DEFAULT_PROGRESS: UserProgress = {
  childName: 'ছোট বন্ধু',
  stars: 12,
  completedLessons: ['bangla_shorborno_sample'],
  examHistory: [],
  totalLearningSeconds: 180,
  soundEnabled: true,
  speechEnabled: true,
  speechRate: 0.85,
  viewMode: 'phone',
};

export class StorageService {
  private progress: UserProgress;

  constructor() {
    this.progress = this.load();
  }

  private load(): UserProgress {
    if (typeof window === 'undefined') return DEFAULT_PROGRESS;
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (data) {
        return { ...DEFAULT_PROGRESS, ...JSON.parse(data) };
      }
    } catch {
      // Fallback
    }
    return DEFAULT_PROGRESS;
  }

  public save(updated?: Partial<UserProgress>): UserProgress {
    if (updated) {
      this.progress = { ...this.progress, ...updated };
    }
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.progress));
      } catch {
        // Storage full or restricted
      }
    }
    return this.progress;
  }

  public getProgress(): UserProgress {
    return { ...this.progress };
  }

  public addStars(count: number): number {
    this.progress.stars += count;
    this.save();
    return this.progress.stars;
  }

  public markLessonComplete(lessonId: string): void {
    if (!this.progress.completedLessons.includes(lessonId)) {
      this.progress.completedLessons.push(lessonId);
      this.progress.stars += 3; // Bonus stars for lesson completion!
      this.save();
    }
  }

  public addExamRecord(record: Omit<ExamRecord, 'id' | 'timestamp'>): ExamRecord {
    const fullRecord: ExamRecord = {
      ...record,
      id: 'exam_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4),
      timestamp: Date.now(),
    };
    this.progress.examHistory.unshift(fullRecord);
    // Keep last 30 exam records
    if (this.progress.examHistory.length > 30) {
      this.progress.examHistory.pop();
    }
    this.progress.stars += record.starsEarned;
    this.save();
    return fullRecord;
  }

  public incrementLearningTime(seconds: number): void {
    this.progress.totalLearningSeconds += seconds;
    this.save();
  }

  public getBadges(): BadgeItem[] {
    const currentStars = this.progress.stars;
    return DEFAULT_BADGES.map(badge => ({
      ...badge,
      unlocked: currentStars >= badge.requiredStars,
    }));
  }

  public resetAll(): void {
    this.progress = { ...DEFAULT_PROGRESS, stars: 0, completedLessons: [], examHistory: [], totalLearningSeconds: 0 };
    this.save();
  }
}

export const storageService = new StorageService();

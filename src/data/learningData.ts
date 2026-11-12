/**
 * Core educational dataset for Shishu Pathshala (শিশু পাঠশালা).
 * Structured for preschool children aged 3 to 4 years.
 * All illustrations and sounds are designed to work 100% offline.
 */

export interface BanglaLetter {
  id: string;
  letter: string;
  name: string;
  wordBn: string;
  wordEn: string;
  meaningEn: string;
  pronunciationBn: string;
  category: 'shorborno' | 'benjonborno' | 'shorochinho';
  color: string;
  bgColor: string;
  emoji: string;
  exampleSentenceBn?: string;
  sign?: string; // For car-chinho
}

export interface EnglishLetter {
  id: string;
  capital: string;
  small: string;
  word: string;
  meaningBn: string;
  pronunciation: string;
  phonics: string;
  color: string;
  bgColor: string;
  emoji: string;
}

export interface MathItem {
  id: string;
  numEn: number;
  numBn: string;
  nameEn: string;
  nameBn: string;
  color: string;
  itemEmoji: string;
  itemNameBn: string;
}

export interface ShapeItem {
  id: string;
  nameEn: string;
  nameBn: string;
  color: string;
  exampleObjectBn: string;
  exampleObjectEn: string;
  exampleEmoji: string;
  svgShape: 'circle' | 'square' | 'triangle' | 'rectangle' | 'star' | 'heart' | 'oval' | 'diamond';
}

export interface ColorItem {
  id: string;
  nameEn: string;
  nameBn: string;
  hex: string;
  exampleEmoji: string;
  exampleBn: string;
}

export interface GKItem {
  id: string;
  category: 'animals' | 'birds' | 'fruits' | 'vegetables' | 'body_parts' | 'family' | 'transport' | 'nature';
  nameEn: string;
  nameBn: string;
  emoji: string;
  pronunciationBn: string;
  funFactBn: string;
  color: string;
}

// 1. BANGLA SHORBORNO (স্বরবর্ণ - ১১টি)
export const BANGLA_SHORBORNO: BanglaLetter[] = [
  {
    id: 'bn_v_1',
    letter: 'অ',
    name: 'স্বর অ',
    wordBn: 'অলি',
    wordEn: 'Oli (Bee)',
    meaningEn: 'Bee',
    pronunciationBn: 'অ-তে অলি, অলি ওড়ে ফুলে ফুলে',
    category: 'shorborno',
    color: '#E11D48',
    bgColor: '#FFE4E6',
    emoji: '🐝',
    exampleSentenceBn: 'অলি ওড়ে ফুলে ফুলে',
  },
  {
    id: 'bn_v_2',
    letter: 'আ',
    name: 'স্বর আ',
    wordBn: 'আম',
    wordEn: 'Aam (Mango)',
    meaningEn: 'Mango',
    pronunciationBn: 'আ-তে আম, আমটি খাব পেড়ে',
    category: 'shorborno',
    color: '#D97706',
    bgColor: '#FEF3C7',
    emoji: '🥭',
    exampleSentenceBn: 'আমটি আমি খাব পেড়ে',
  },
  {
    id: 'bn_v_3',
    letter: 'ই',
    name: 'হ্রস্ব ই',
    wordBn: 'ইলিশ',
    wordEn: 'Ilish (Hilsa)',
    meaningEn: 'Hilsa Fish',
    pronunciationBn: 'ই-তে ইলিশ, ইলিশ ভাজা খেতে মজা',
    category: 'shorborno',
    color: '#2563EB',
    bgColor: '#DBEAFE',
    emoji: '🐟',
    exampleSentenceBn: 'ইলিশ ভাজা খেতে মজা',
  },
  {
    id: 'bn_v_4',
    letter: 'ঈ',
    name: 'দীর্ঘ ঈ',
    wordBn: 'ঈগল',
    wordEn: 'Igol (Eagle)',
    meaningEn: 'Eagle',
    pronunciationBn: 'ঈ-তে ঈগল, ঈগল পাখি আকাশে ওড়ে',
    category: 'shorborno',
    color: '#7C3AED',
    bgColor: '#EDE9FE',
    emoji: '🦅',
    exampleSentenceBn: 'ঈগল পাখি আকাশে ওড়ে',
  },
  {
    id: 'bn_v_5',
    letter: 'উ',
    name: 'হ্রস্ব উ',
    wordBn: 'উট',
    wordEn: 'Ut (Camel)',
    meaningEn: 'Camel',
    pronunciationBn: 'উ-তে উট, উট চলেছে মরুর দেশে',
    category: 'shorborno',
    color: '#EA580C',
    bgColor: '#FFEDD5',
    emoji: '🐪',
    exampleSentenceBn: 'উট চলেছে মরুর দেশে',
  },
  {
    id: 'bn_v_6',
    letter: 'ঊ',
    name: 'দীর্ঘ ঊ',
    wordBn: 'ঊষা',
    wordEn: 'Usha (Dawn)',
    meaningEn: 'Dawn / Sunrise',
    pronunciationBn: 'ঊ-তে ঊষা, ঊষার আলো পুব আকাশে',
    category: 'shorborno',
    color: '#DB2777',
    bgColor: '#FCE7F3',
    emoji: '🌅',
    exampleSentenceBn: 'ঊষার আলো পুব আকাশে',
  },
  {
    id: 'bn_v_7',
    letter: 'ঋ',
    name: 'ঋ',
    wordBn: 'ঋষি',
    wordEn: 'Rishi (Sage)',
    meaningEn: 'Sage / Wise Hermit',
    pronunciationBn: 'ঋ-তে ঋষি, ঋষি মশাই বসেন ধ্যানে',
    category: 'shorborno',
    color: '#059669',
    bgColor: '#D1FAE5',
    emoji: '🧘‍♂️',
    exampleSentenceBn: 'ঋষি মশাই বসেন ধ্যানে',
  },
  {
    id: 'bn_v_8',
    letter: 'এ',
    name: 'এ',
    wordBn: 'একতারা',
    wordEn: 'Ektara (Instrument)',
    meaningEn: 'Ektara (Folk lute)',
    pronunciationBn: 'এ-তে একতারা, একতারা বাজে সুরে সুরে',
    category: 'shorborno',
    color: '#4F46E5',
    bgColor: '#E0E7FF',
    emoji: '🪕',
    exampleSentenceBn: 'একতারা বাজে সুরে সুরে',
  },
  {
    id: 'bn_v_9',
    letter: 'ঐ',
    name: 'ঐ',
    wordBn: 'ঐরাবত',
    wordEn: 'Oirabot (Elephant)',
    meaningEn: 'Royal Elephant',
    pronunciationBn: 'ঐ-তে ঐরাবত, ঐরাবত ওই বিরাট হাতি',
    category: 'shorborno',
    color: '#0D9488',
    bgColor: '#CCFBF1',
    emoji: '🐘',
    exampleSentenceBn: 'ঐরাবত চলে হেলেদুলে',
  },
  {
    id: 'bn_v_10',
    letter: 'ও',
    name: 'ও',
    wordBn: 'ওল',
    wordEn: 'Ol (Yam)',
    meaningEn: 'Yam / Taro',
    pronunciationBn: 'ও-তে ওল, ওল খেলে ধরে গলা',
    category: 'shorborno',
    color: '#CA8A04',
    bgColor: '#FEF9C3',
    emoji: '🥔',
    exampleSentenceBn: 'ওল খেলে ধরে গলা',
  },
  {
    id: 'bn_v_11',
    letter: 'ঔ',
    name: 'ঔ',
    wordBn: 'ঔষধ',
    wordEn: 'Oushodh (Medicine)',
    meaningEn: 'Medicine',
    pronunciationBn: 'ঔ-তে ঔষধ, ঔষধ খেলে সারে রোগ',
    category: 'shorborno',
    color: '#16A34A',
    bgColor: '#DCFCE7',
    emoji: '💊',
    exampleSentenceBn: 'ঔষধ খেলে অসুখ সারে',
  },
];

// 2. BANGLA BENJONBORNO (ব্যঞ্জনবর্ণ - ৩৯টি)
export const BANGLA_BENJONBORNO: BanglaLetter[] = [
  { id: 'bn_c_1', letter: 'ক', name: 'ক', wordBn: 'কাকাতুয়া', wordEn: 'Kakatuya (Cockatoo)', meaningEn: 'Cockatoo', pronunciationBn: 'ক-তে কাকাতুয়া', category: 'benjonborno', color: '#EF4444', bgColor: '#FEE2E2', emoji: '🦜' },
  { id: 'bn_c_2', letter: 'খ', name: 'খ', wordBn: 'খরগোশ', wordEn: 'Khorgosh (Rabbit)', meaningEn: 'Rabbit', pronunciationBn: 'খ-তে খরগোশ', category: 'benjonborno', color: '#F97316', bgColor: '#FFEDD5', emoji: '🐇' },
  { id: 'bn_c_3', letter: 'গ', name: 'গ', wordBn: 'গরু', wordEn: 'Goru (Cow)', meaningEn: 'Cow', pronunciationBn: 'গ-তে গরু', category: 'benjonborno', color: '#F59E0B', bgColor: '#FEF3C7', emoji: '🐄' },
  { id: 'bn_c_4', letter: 'ঘ', name: 'ঘ', wordBn: 'ঘুড়ি', wordEn: 'Ghuri (Kite)', meaningEn: 'Kite', pronunciationBn: 'ঘ-তে ঘুড়ি', category: 'benjonborno', color: '#10B981', bgColor: '#D1FAE5', emoji: '🪁' },
  { id: 'bn_c_5', letter: 'ঙ', name: 'ঙ', wordBn: 'ব্যাঙ', wordEn: 'Byang (Frog)', meaningEn: 'Frog', pronunciationBn: 'ঙ-তে ব্যাঙ', category: 'benjonborno', color: '#06B6D4', bgColor: '#CFFAFE', emoji: '🐸' },
  { id: 'bn_c_6', letter: 'চ', name: 'চ', wordBn: 'চশমা', wordEn: 'Choshma (Glasses)', meaningEn: 'Spectacles', pronunciationBn: 'চ-তে চশমা', category: 'benjonborno', color: '#3B82F6', bgColor: '#DBEAFE', emoji: '👓' },
  { id: 'bn_c_7', letter: 'ছ', name: 'ছ', wordBn: 'ছাতা', wordEn: 'Chhata (Umbrella)', meaningEn: 'Umbrella', pronunciationBn: 'ছ-তে ছাতা', category: 'benjonborno', color: '#8B5CF6', bgColor: '#EDE9FE', emoji: '☂️' },
  { id: 'bn_c_8', letter: 'জ', name: 'জ', wordBn: 'জাহাজ', wordEn: 'Jahaj (Ship)', meaningEn: 'Ship', pronunciationBn: 'জ-তে জাহাজ', category: 'benjonborno', color: '#EC4899', bgColor: '#FCE7F3', emoji: '🚢' },
  { id: 'bn_c_9', letter: 'ঝ', name: 'ঝ', wordBn: 'ঝুড়ি', wordEn: 'Jhuri (Basket)', meaningEn: 'Basket', pronunciationBn: 'ঝ-তে ঝুড়ি', category: 'benjonborno', color: '#14B8A6', bgColor: '#CCFBF1', emoji: '🧺' },
  { id: 'bn_c_10', letter: 'ঞ', name: 'ঞ', wordBn: 'মিঞা', wordEn: 'Mian', meaningEn: 'Gentleman', pronunciationBn: 'ঞ-তে মিঞা', category: 'benjonborno', color: '#6366F1', bgColor: '#E0E7FF', emoji: '🐱' },
  { id: 'bn_c_11', letter: 'ট', name: 'ট', wordBn: 'টিয়া', wordEn: 'Tiya (Parrot)', meaningEn: 'Parrot', pronunciationBn: 'ট-তে টিয়া', category: 'benjonborno', color: '#EF4444', bgColor: '#FEE2E2', emoji: '🦜' },
  { id: 'bn_c_12', letter: 'ঠ', name: 'ঠ', wordBn: 'ঠাকুমা', wordEn: 'Thakuma (Grandma)', meaningEn: 'Grandmother', pronunciationBn: 'ঠ-তে ঠাকুমা', category: 'benjonborno', color: '#F97316', bgColor: '#FFEDD5', emoji: '👵' },
  { id: 'bn_c_13', letter: 'ড', name: 'ড', wordBn: 'ডালিম', wordEn: 'Dalim (Pomegranate)', meaningEn: 'Pomegranate', pronunciationBn: 'ড-তে ডালিম', category: 'benjonborno', color: '#F59E0B', bgColor: '#FEF3C7', emoji: '🍎' },
  { id: 'bn_c_14', letter: 'ঢ', name: 'ঢ', wordBn: 'ঢোল', wordEn: 'Dhol (Drum)', meaningEn: 'Drum', pronunciationBn: 'ঢ-তে ঢোল', category: 'benjonborno', color: '#10B981', bgColor: '#D1FAE5', emoji: '🥁' },
  { id: 'bn_c_15', letter: 'ণ', name: 'ণ', wordBn: 'হরিণ', wordEn: 'Horin (Deer)', meaningEn: 'Deer', pronunciationBn: 'ণ-তে হরিণ', category: 'benjonborno', color: '#06B6D4', bgColor: '#CFFAFE', emoji: '🦌' },
  { id: 'bn_c_16', letter: 'ত', name: 'ত', wordBn: 'তবলা', wordEn: 'Tobla (Tabla)', meaningEn: 'Tabla', pronunciationBn: 'ত-তে তবলা', category: 'benjonborno', color: '#3B82F6', bgColor: '#DBEAFE', emoji: '🪘' },
  { id: 'bn_c_17', letter: 'থ', name: 'থ', wordBn: 'থালা', wordEn: 'Thala (Plate)', meaningEn: 'Plate', pronunciationBn: 'থ-তে থালা', category: 'benjonborno', color: '#8B5CF6', bgColor: '#EDE9FE', emoji: '🍽️' },
  { id: 'bn_c_18', letter: 'দ', name: 'দ', wordBn: 'দোয়েল', wordEn: 'Doyel (Magpie)', meaningEn: 'Magpie Robin', pronunciationBn: 'দ-তে দোয়েল', category: 'benjonborno', color: '#EC4899', bgColor: '#FCE7F3', emoji: '🐦' },
  { id: 'bn_c_19', letter: 'ধ', name: 'ধ', wordBn: 'ধান', wordEn: 'Dhan (Paddy)', meaningEn: 'Paddy / Grain', pronunciationBn: 'ধ-তে ধান', category: 'benjonborno', color: '#14B8A6', bgColor: '#CCFBF1', emoji: '🌾' },
  { id: 'bn_c_20', letter: 'ন', name: 'ন', wordBn: 'নৌকা', wordEn: 'Nouka (Boat)', meaningEn: 'Boat', pronunciationBn: 'ন-তে নৌকা', category: 'benjonborno', color: '#6366F1', bgColor: '#E0E7FF', emoji: '⛵' },
  { id: 'bn_c_21', letter: 'প', name: 'প', wordBn: 'পাখি', wordEn: 'Pakhi (Bird)', meaningEn: 'Bird', pronunciationBn: 'প-তে পাখি', category: 'benjonborno', color: '#EF4444', bgColor: '#FEE2E2', emoji: '🕊️' },
  { id: 'bn_c_22', letter: 'ফ', name: 'ফ', wordBn: 'ফুল', wordEn: 'Phul (Flower)', meaningEn: 'Flower', pronunciationBn: 'ফ-তে ফুল', category: 'benjonborno', color: '#F97316', bgColor: '#FFEDD5', emoji: '🌸' },
  { id: 'bn_c_23', letter: 'ব', name: 'ব', wordBn: 'বই', wordEn: 'Boi (Book)', meaningEn: 'Book', pronunciationBn: 'ব-তে বই', category: 'benjonborno', color: '#F59E0B', bgColor: '#FEF3C7', emoji: '📚' },
  { id: 'bn_c_24', letter: 'ভ', name: 'ভ', wordBn: 'ভালুক', wordEn: 'Bhaluk (Bear)', meaningEn: 'Bear', pronunciationBn: 'ভ-তে ভালুক', category: 'benjonborno', color: '#10B981', bgColor: '#D1FAE5', emoji: '🐻' },
  { id: 'bn_c_25', letter: 'ম', name: 'ম', wordBn: 'মাছ', wordEn: 'Machh (Fish)', meaningEn: 'Fish', pronunciationBn: 'ম-তে মাছ', category: 'benjonborno', color: '#06B6D4', bgColor: '#CFFAFE', emoji: '🐠' },
  { id: 'bn_c_26', letter: 'য', name: 'য', wordBn: 'যাঁতা', wordEn: 'Jata (Grinder)', meaningEn: 'Hand Grinder', pronunciationBn: 'য-তে যাঁতা', category: 'benjonborno', color: '#3B82F6', bgColor: '#DBEAFE', emoji: '⚙️' },
  { id: 'bn_c_27', letter: 'র', name: 'র', wordBn: 'রথ', wordEn: 'Roth (Chariot)', meaningEn: 'Chariot', pronunciationBn: 'র-তে রথ', category: 'benjonborno', color: '#8B5CF6', bgColor: '#EDE9FE', emoji: '🎪' },
  { id: 'bn_c_28', letter: 'ল', name: 'ল', wordBn: 'লাটিম', wordEn: 'Latim (Top)', meaningEn: 'Spinning Top', pronunciationBn: 'ল-তে লাটিম', category: 'benjonborno', color: '#EC4899', bgColor: '#FCE7F3', emoji: '🪀' },
  { id: 'bn_c_29', letter: 'শ', name: 'শ', wordBn: 'শাপলা', wordEn: 'Shapla (Water Lily)', meaningEn: 'Water Lily', pronunciationBn: 'শ-তে শাপলা', category: 'benjonborno', color: '#14B8A6', bgColor: '#CCFBF1', emoji: '🪷' },
  { id: 'bn_c_30', letter: 'ষ', name: 'ষ', wordBn: 'ষাঁড়', wordEn: 'Shar (Bull)', meaningEn: 'Bull', pronunciationBn: 'ষ-তে ষাঁড়', category: 'benjonborno', color: '#6366F1', bgColor: '#E0E7FF', emoji: '🐂' },
  { id: 'bn_c_31', letter: 'স', name: 'স', wordBn: 'সিংহ', wordEn: 'Singho (Lion)', meaningEn: 'Lion', pronunciationBn: 'স-তে সিংহ', category: 'benjonborno', color: '#EF4444', bgColor: '#FEE2E2', emoji: '🦁' },
  { id: 'bn_c_32', letter: 'হ', name: 'হ', wordBn: 'হাতি', wordEn: 'Hathi (Elephant)', meaningEn: 'Elephant', pronunciationBn: 'হ-তে হাতি', category: 'benjonborno', color: '#F97316', bgColor: '#FFEDD5', emoji: '🐘' },
  { id: 'bn_c_33', letter: 'ড়', name: 'ড়', wordBn: 'ঘড়ি', wordEn: 'Ghori (Clock)', meaningEn: 'Clock', pronunciationBn: 'ড়-তে ঘড়ি', category: 'benjonborno', color: '#F59E0B', bgColor: '#FEF3C7', emoji: '⏰' },
  { id: 'bn_c_34', letter: 'ঢ়', name: 'ঢ়', wordBn: 'আষাঢ়', wordEn: 'Asharh (Monsoon)', meaningEn: 'Monsoon Month', pronunciationBn: 'ঢ়-তে আষাঢ়', category: 'benjonborno', color: '#10B981', bgColor: '#D1FAE5', emoji: '🌧️' },
  { id: 'bn_c_35', letter: 'য়', name: 'য়', wordBn: 'ময়না', wordEn: 'Moyna (Myna)', meaningEn: 'Myna Bird', pronunciationBn: 'য়-তে ময়না', category: 'benjonborno', color: '#06B6D4', bgColor: '#CFFAFE', emoji: '🦜' },
  { id: 'bn_c_36', letter: 'ৎ', name: 'ৎ', wordBn: 'উৎসব', wordEn: 'Utshob (Festival)', meaningEn: 'Festival', pronunciationBn: 'ৎ-তে উৎসব', category: 'benjonborno', color: '#3B82F6', bgColor: '#DBEAFE', emoji: '🎉' },
  { id: 'bn_c_37', letter: 'ং', name: 'ং', wordBn: 'রংধনু', wordEn: 'Rongdhonu (Rainbow)', meaningEn: 'Rainbow', pronunciationBn: 'ং-তে রংধনু', category: 'benjonborno', color: '#8B5CF6', bgColor: '#EDE9FE', emoji: '🌈' },
  { id: 'bn_c_38', letter: 'ঃ', name: 'ঃ', wordBn: 'দুঃখী', wordEn: 'Dukkhi (Sad)', meaningEn: 'Hurt / Sad', pronunciationBn: 'ঃ-তে দুঃখী', category: 'benjonborno', color: '#EC4899', bgColor: '#FCE7F3', emoji: '🥺' },
  { id: 'bn_c_39', letter: 'ঁ', name: 'ঁ', wordBn: 'চাঁদ', wordEn: 'Chand (Moon)', meaningEn: 'Moon', pronunciationBn: 'ঁ-তে চাঁদ', category: 'benjonborno', color: '#14B8A6', bgColor: '#CCFBF1', emoji: '🌙' },
];

// 3. BANGLA SHOROCHINHO (কারচিহ্ন - ১০টি)
export const BANGLA_SHOROCHINHO: BanglaLetter[] = [
  { id: 'bn_k_1', letter: 'া', sign: 'া', name: 'আকার', wordBn: 'মা', wordEn: 'M + aa = Maa (Mother)', meaningEn: 'Mother', pronunciationBn: 'আ-কার, ম যোগ আকার সমান মা', category: 'shorochinho', color: '#E11D48', bgColor: '#FFE4E6', emoji: '👩‍👧', exampleSentenceBn: 'ম + া = মা (আমার মিষ্টি মা)' },
  { id: 'bn_k_2', letter: 'ি', sign: 'ি', name: 'হ্রস্ব ই-কার', wordBn: 'বিড়াল', wordEn: 'B + i = Biral (Cat)', meaningEn: 'Cat', pronunciationBn: 'হ্রস্ব ই-কার, ব যোগ ই-কার সমান বি', category: 'shorochinho', color: '#2563EB', bgColor: '#DBEAFE', emoji: '🐱', exampleSentenceBn: 'ব + ি = বি (বিড়াল ছানা)' },
  { id: 'bn_k_3', letter: 'ী', sign: 'ী', name: 'দীর্ঘ ঈ-কার', wordBn: 'নদী', wordEn: 'D + ee = Nodi (River)', meaningEn: 'River', pronunciationBn: 'দীর্ঘ ঈ-কার, দ যোগ ঈ-কার সমান দী', category: 'shorochinho', color: '#7C3AED', bgColor: '#EDE9FE', emoji: '🌊', exampleSentenceBn: 'দ + ী = দী (নদী বয়ে চলে)' },
  { id: 'bn_k_4', letter: 'ু', sign: 'ু', name: 'হ্রস্ব উ-কার', wordBn: 'ফুল', wordEn: 'Ph + u = Phul (Flower)', meaningEn: 'Flower', pronunciationBn: 'হ্রস্ব উ-কার, ফ যোগ উ-কার সমান ফু', category: 'shorochinho', color: '#EA580C', bgColor: '#FFEDD5', emoji: '🌺', exampleSentenceBn: 'ফ + ু = ফু (ফুল ফুটেছে)' },
  { id: 'bn_k_5', letter: 'ূ', sign: 'ূ', name: 'দীর্ঘ ঊ-কার', wordBn: 'সূর্য', wordEn: 'S + oo = Surjo (Sun)', meaningEn: 'Sun', pronunciationBn: 'দীর্ঘ ঊ-কার, স যোগ ঊ-কার সমান সূ', category: 'shorochinho', color: '#D97706', bgColor: '#FEF3C7', emoji: '☀️', exampleSentenceBn: 'স + ূ = সূ (সূর্য ওঠে পুব আকাশে)' },
  { id: 'bn_k_6', letter: 'ৃ', sign: 'ৃ', name: 'ঋ-কার', wordBn: 'মৃগ', wordEn: 'M + ri = Mrigo (Deer)', meaningEn: 'Deer', pronunciationBn: 'ঋ-কার, ম যোগ ঋ-কার সমান মৃ', category: 'shorochinho', color: '#059669', bgColor: '#D1FAE5', emoji: '🦌', exampleSentenceBn: 'ম + ৃ = মৃ (মৃগ মানে হরিণ)' },
  { id: 'bn_k_7', letter: 'ে', sign: 'ে', name: 'এ-কার', wordBn: 'মেঘ', wordEn: 'M + e = Megh (Cloud)', meaningEn: 'Cloud', pronunciationBn: 'এ-কার, ম যোগ এ-কার সমান মে', category: 'shorochinho', color: '#4F46E5', bgColor: '#E0E7FF', emoji: '☁️', exampleSentenceBn: 'ম + ে = মে (মেঘ ডাকে গুরুগুরু)' },
  { id: 'bn_k_8', letter: 'ৈ', sign: 'ৈ', name: 'ঐ-কার', wordBn: 'সৈনিক', wordEn: 'S + oi = Soinik (Soldier)', meaningEn: 'Soldier', pronunciationBn: 'ঐ-কার, স যোগ ঐ-কার সমান সৈ', category: 'shorochinho', color: '#0D9488', bgColor: '#CCFBF1', emoji: '💂‍♂️', exampleSentenceBn: 'স + ৈ = সৈ (সৈনিক চলে বীরের মতো)' },
  { id: 'bn_k_9', letter: 'ো', sign: 'ো', name: 'ও-কার', wordBn: 'গোলাপ', wordEn: 'G + o = Golap (Rose)', meaningEn: 'Rose flower', pronunciationBn: 'ও-কার, গ যোগ ও-কার সমান গো', category: 'shorochinho', color: '#DB2777', bgColor: '#FCE7F3', emoji: '🌹', exampleSentenceBn: 'গ + ো = গো (গোলাপ ফুল লাল)' },
  { id: 'bn_k_10', letter: 'ৌ', sign: 'ৌ', name: 'ঔ-কার', wordBn: 'নৌকা', wordEn: 'N + ou = Nouka (Boat)', meaningEn: 'Boat', pronunciationBn: 'ঔ-কার, ন যোগ ঔ-কার সমান নৌ', category: 'shorochinho', color: '#16A34A', bgColor: '#DCFCE7', emoji: '⛵', exampleSentenceBn: 'ন + ৌ = নৌ (নৌকা ভাসে জলে)' },
];

// 4. ENGLISH ALPHABET (A-Z)
export const ENGLISH_LETTERS: EnglishLetter[] = [
  { id: 'en_a', capital: 'A', small: 'a', word: 'Apple', meaningBn: 'আপেল', pronunciation: 'A for Apple', phonics: 'æ', color: '#EF4444', bgColor: '#FEE2E2', emoji: '🍎' },
  { id: 'en_b', capital: 'B', small: 'b', word: 'Ball', meaningBn: 'বল', pronunciation: 'B for Ball', phonics: 'b', color: '#F97316', bgColor: '#FFEDD5', emoji: '⚽' },
  { id: 'en_c', capital: 'C', small: 'c', word: 'Cat', meaningBn: 'বিড়াল', pronunciation: 'C for Cat', phonics: 'k', color: '#F59E0B', bgColor: '#FEF3C7', emoji: '🐱' },
  { id: 'en_d', capital: 'D', small: 'd', word: 'Duck', meaningBn: 'হাঁস', pronunciation: 'D for Duck', phonics: 'd', color: '#10B981', bgColor: '#D1FAE5', emoji: '🦆' },
  { id: 'en_e', capital: 'E', small: 'e', word: 'Elephant', meaningBn: 'হাতি', pronunciation: 'E for Elephant', phonics: 'e', color: '#06B6D4', bgColor: '#CFFAFE', emoji: '🐘' },
  { id: 'en_f', capital: 'F', small: 'f', word: 'Fish', meaningBn: 'মাছ', pronunciation: 'F for Fish', phonics: 'f', color: '#3B82F6', bgColor: '#DBEAFE', emoji: '🐟' },
  { id: 'en_g', capital: 'G', small: 'g', word: 'Giraffe', meaningBn: 'জিরাফ', pronunciation: 'G for Giraffe', phonics: 'dʒ', color: '#8B5CF6', bgColor: '#EDE9FE', emoji: '🦒' },
  { id: 'en_h', capital: 'H', small: 'h', word: 'Hat', meaningBn: 'টুপি', pronunciation: 'H for Hat', phonics: 'h', color: '#EC4899', bgColor: '#FCE7F3', emoji: '🎩' },
  { id: 'en_i', capital: 'I', small: 'i', word: 'Ice Cream', meaningBn: 'আইসক্রিম', pronunciation: 'I for Ice Cream', phonics: 'aɪ', color: '#14B8A6', bgColor: '#CCFBF1', emoji: '🍦' },
  { id: 'en_j', capital: 'J', small: 'j', word: 'Juice', meaningBn: 'জুস / রস', pronunciation: 'J for Juice', phonics: 'dʒ', color: '#6366F1', bgColor: '#E0E7FF', emoji: '🧃' },
  { id: 'en_k', capital: 'K', small: 'k', word: 'Kite', meaningBn: 'ঘুড়ি', pronunciation: 'K for Kite', phonics: 'k', color: '#EF4444', bgColor: '#FEE2E2', emoji: '🪁' },
  { id: 'en_l', capital: 'L', small: 'l', word: 'Lion', meaningBn: 'সিংহ', pronunciation: 'L for Lion', phonics: 'l', color: '#F97316', bgColor: '#FFEDD5', emoji: '🦁' },
  { id: 'en_m', capital: 'M', small: 'm', word: 'Monkey', meaningBn: 'বানর', pronunciation: 'M for Monkey', phonics: 'm', color: '#F59E0B', bgColor: '#FEF3C7', emoji: '🐵' },
  { id: 'en_n', capital: 'N', small: 'n', word: 'Nest', meaningBn: 'পাখির বাসা', pronunciation: 'N for Nest', phonics: 'n', color: '#10B981', bgColor: '#D1FAE5', emoji: '🪹' },
  { id: 'en_o', capital: 'O', small: 'o', word: 'Orange', meaningBn: 'কমলালেবু', pronunciation: 'O for Orange', phonics: 'ɒ', color: '#EA580C', bgColor: '#FFEDD5', emoji: '🍊' },
  { id: 'en_p', capital: 'P', small: 'p', word: 'Panda', meaningBn: 'পান্ডা', pronunciation: 'P for Panda', phonics: 'p', color: '#06B6D4', bgColor: '#CFFAFE', emoji: '🐼' },
  { id: 'en_q', capital: 'Q', small: 'q', word: 'Queen', meaningBn: 'রানি', pronunciation: 'Q for Queen', phonics: 'kw', color: '#8B5CF6', bgColor: '#EDE9FE', emoji: '👑' },
  { id: 'en_r', capital: 'R', small: 'r', word: 'Rainbow', meaningBn: 'রংধনু', pronunciation: 'R for Rainbow', phonics: 'r', color: '#EC4899', bgColor: '#FCE7F3', emoji: '🌈' },
  { id: 'en_s', capital: 'S', small: 's', word: 'Sun', meaningBn: 'সূর্য', pronunciation: 'S for Sun', phonics: 's', color: '#F59E0B', bgColor: '#FEF3C7', emoji: '☀️' },
  { id: 'en_t', capital: 'T', small: 't', word: 'Train', meaningBn: 'রেলগাড়ি', pronunciation: 'T for Train', phonics: 't', color: '#3B82F6', bgColor: '#DBEAFE', emoji: '🚂' },
  { id: 'en_u', capital: 'U', small: 'u', word: 'Umbrella', meaningBn: 'ছাতা', pronunciation: 'U for Umbrella', phonics: 'ʌ', color: '#14B8A6', bgColor: '#CCFBF1', emoji: '☂️' },
  { id: 'en_v', capital: 'V', small: 'v', word: 'Violin', meaningBn: 'বেহালা', pronunciation: 'V for Violin', phonics: 'v', color: '#6366F1', bgColor: '#E0E7FF', emoji: '🎻' },
  { id: 'en_w', capital: 'W', small: 'w', word: 'Whale', meaningBn: 'তিমি মাছ', pronunciation: 'W for Whale', phonics: 'w', color: '#0284C7', bgColor: '#E0F2FE', emoji: '🐋' },
  { id: 'en_x', capital: 'X', small: 'x', word: 'Xylophone', meaningBn: 'জাইলোফোন', pronunciation: 'X for Xylophone', phonics: 'z', color: '#D97706', bgColor: '#FEF3C7', emoji: '🎵' },
  { id: 'en_y', capital: 'Y', small: 'y', word: 'Yacht', meaningBn: 'নৌকা / প্রমোদতরী', pronunciation: 'Y for Yacht', phonics: 'j', color: '#059669', bgColor: '#D1FAE5', emoji: '⛵' },
  { id: 'en_z', capital: 'Z', small: 'z', word: 'Zebra', meaningBn: 'জেব্রা', pronunciation: 'Z for Zebra', phonics: 'z', color: '#475569', bgColor: '#F1F5F9', emoji: '🦓' },
];

// 5. MATH NUMBERS (1-20)
export const MATH_NUMBERS: MathItem[] = [
  { id: 'num_1', numEn: 1, numBn: '১', nameEn: 'One', nameBn: 'এক', color: '#EF4444', itemEmoji: '🍎', itemNameBn: 'আপেল' },
  { id: 'num_2', numEn: 2, numBn: '২', nameEn: 'Two', nameBn: 'দুই', color: '#F97316', itemEmoji: '🐱', itemNameBn: 'বিড়াল' },
  { id: 'num_3', numEn: 3, numBn: '৩', nameEn: 'Three', nameBn: 'তিন', color: '#F59E0B', itemEmoji: '⭐', itemNameBn: 'তারা' },
  { id: 'num_4', numEn: 4, numBn: '৪', nameEn: 'Four', nameBn: 'চার', color: '#10B981', itemEmoji: '🚗', itemNameBn: 'গাড়ি' },
  { id: 'num_5', numEn: 5, numBn: '৫', nameEn: 'Five', nameBn: 'পাঁচ', color: '#06B6D4', itemEmoji: '🎈', itemNameBn: 'বেলুন' },
  { id: 'num_6', numEn: 6, numBn: '৬', nameEn: 'Six', nameBn: 'ছয়', color: '#3B82F6', itemEmoji: '🦆', itemNameBn: 'হাঁস' },
  { id: 'num_7', numEn: 7, numBn: '৭', nameEn: 'Seven', nameBn: 'সাত', color: '#8B5CF6', itemEmoji: '🌸', itemNameBn: 'ফুল' },
  { id: 'num_8', numEn: 8, numBn: '৮', nameEn: 'Eight', nameBn: 'আট', color: '#EC4899', itemEmoji: '🍓', itemNameBn: 'স্ট্রবেরি' },
  { id: 'num_9', numEn: 9, numBn: '৯', nameEn: 'Nine', nameBn: 'নয়', color: '#14B8A6', itemEmoji: '🦋', itemNameBn: 'প্রজাপতি' },
  { id: 'num_10', numEn: 10, numBn: '১০', nameEn: 'Ten', nameBn: 'দশ', color: '#E11D48', itemEmoji: '🍌', itemNameBn: 'কলা' },
  { id: 'num_11', numEn: 11, numBn: '১১', nameEn: 'Eleven', nameBn: 'এগারো', color: '#6366F1', itemEmoji: '🍬', itemNameBn: 'ক্যান্ডি' },
  { id: 'num_12', numEn: 12, numBn: '১২', nameEn: 'Twelve', nameBn: 'বারো', color: '#059669', itemEmoji: '🍦', itemNameBn: 'আইসক্রিম' },
  { id: 'num_13', numEn: 13, numBn: '১৩', nameEn: 'Thirteen', nameBn: 'তেরো', color: '#D97706', itemEmoji: '⚽', itemNameBn: 'বল' },
  { id: 'num_14', numEn: 14, numBn: '১৪', nameEn: 'Fourteen', nameBn: 'চৌদ্দ', color: '#EA580C', itemEmoji: '🍒', itemNameBn: 'চেরি' },
  { id: 'num_15', numEn: 15, numBn: '১৫', nameEn: 'Fifteen', nameBn: 'পনেরো', color: '#7C3AED', itemEmoji: '🍄', itemNameBn: 'মাশরুম' },
  { id: 'num_16', numEn: 16, numBn: '১৬', nameEn: 'Sixteen', nameBn: 'ষোলো', color: '#DB2777', itemEmoji: '🍭', itemNameBn: 'ললিপপ' },
  { id: 'num_17', numEn: 17, numBn: '১৭', nameEn: 'Seventeen', nameBn: 'সতেরো', color: '#2563EB', itemEmoji: '🧁', itemNameBn: 'কাপকেক' },
  { id: 'num_18', numEn: 18, numBn: '১৮', nameEn: 'Eighteen', nameBn: 'আঠারো', color: '#0D9488', itemEmoji: '🧸', itemNameBn: 'টেডি বিয়ার' },
  { id: 'num_19', numEn: 19, numBn: '১৯', nameEn: 'Nineteen', nameBn: 'উনিশ', color: '#CA8A04', itemEmoji: '🐥', itemNameBn: 'পাখির ছানা' },
  { id: 'num_20', numEn: 20, numBn: '২০', nameEn: 'Twenty', nameBn: 'বিশ', color: '#16A34A', itemEmoji: '🌟', itemNameBn: 'সোনার তারা' },
];

// 6. SHAPES (আকার)
export const MATH_SHAPES: ShapeItem[] = [
  { id: 'shape_circle', nameEn: 'Circle', nameBn: 'বৃত্ত (গোল)', color: '#EF4444', exampleObjectBn: 'ঘড়ি', exampleObjectEn: 'Clock', exampleEmoji: '⏰', svgShape: 'circle' },
  { id: 'shape_square', nameEn: 'Square', nameBn: 'বর্গ (চারকোনা)', color: '#3B82F6', exampleObjectBn: 'উপহার বাক্স', exampleObjectEn: 'Gift Box', exampleEmoji: '🎁', svgShape: 'square' },
  { id: 'shape_triangle', nameEn: 'Triangle', nameBn: 'ত্রিভুজ (তিনকোনা)', color: '#10B981', exampleObjectBn: 'পিজ্জার টুকরো', exampleObjectEn: 'Pizza Slice', exampleEmoji: '🍕', svgShape: 'triangle' },
  { id: 'shape_rectangle', nameEn: 'Rectangle', nameBn: 'আয়তক্ষেত্র', color: '#F59E0B', exampleObjectBn: 'দরজা', exampleObjectEn: 'Door', exampleEmoji: '🚪', svgShape: 'rectangle' },
  { id: 'shape_star', nameEn: 'Star', nameBn: 'তারা', color: '#FBBF24', exampleObjectBn: 'আকাশের তারা', exampleObjectEn: 'Night Star', exampleEmoji: '⭐', svgShape: 'star' },
  { id: 'shape_heart', nameEn: 'Heart', nameBn: 'হৃদয় (ভালোবাসা)', color: '#EC4899', exampleObjectBn: 'ভালোবাসার চিহ্ন', exampleObjectEn: 'Heart', exampleEmoji: '❤️', svgShape: 'heart' },
  { id: 'shape_oval', nameEn: 'Oval', nameBn: 'ডিম্বাকার', color: '#8B5CF6', exampleObjectBn: 'ডিম', exampleObjectEn: 'Egg', exampleEmoji: '🥚', svgShape: 'oval' },
  { id: 'shape_diamond', nameEn: 'Diamond', nameBn: 'হীরক (রম্বস)', color: '#06B6D4', exampleObjectBn: 'ঘুড়ি', exampleObjectEn: 'Diamond Kite', exampleEmoji: '🪁', svgShape: 'diamond' },
];

// 7. COLORS (রং)
export const MATH_COLORS: ColorItem[] = [
  { id: 'col_red', nameEn: 'Red', nameBn: 'লাল', hex: '#EF4444', exampleEmoji: '🍎', exampleBn: 'লাল আপেল' },
  { id: 'col_blue', nameEn: 'Blue', nameBn: 'নীল', hex: '#3B82F6', exampleEmoji: '🌊', exampleBn: 'নীল সাগর' },
  { id: 'col_green', nameEn: 'Green', nameBn: 'সবুজ', hex: '#10B981', exampleEmoji: '🍃', exampleBn: 'সবুজ পাতা' },
  { id: 'col_yellow', nameEn: 'Yellow', nameBn: 'হলুদ', hex: '#FACC15', exampleEmoji: '🍌', exampleBn: 'হলুদ কলা' },
  { id: 'col_orange', nameEn: 'Orange', nameBn: 'কমলা', hex: '#F97316', exampleEmoji: '🍊', exampleBn: 'কমলালেবু' },
  { id: 'col_purple', nameEn: 'Purple', nameBn: 'বেগুনি', hex: '#8B5CF6', exampleEmoji: '🍆', exampleBn: 'বেগুনি বেগুন' },
  { id: 'col_pink', nameEn: 'Pink', nameBn: 'গোলাপি', hex: '#EC4899', exampleEmoji: '🌸', exampleBn: 'গোলাপি ফুল' },
  { id: 'col_brown', nameEn: 'Brown', nameBn: 'বাদামি', hex: '#92400E', exampleEmoji: '🥥', exampleBn: 'বাদামি নারকেল' },
  { id: 'col_black', nameEn: 'Black', nameBn: 'কালো', hex: '#1E293B', exampleEmoji: '🐈‍⬛', exampleBn: 'কালো বিড়াল' },
  { id: 'col_white', nameEn: 'White', nameBn: 'সাদা', hex: '#F8FAFC', exampleEmoji: '🐇', exampleBn: 'সাদা খরগোশ' },
];

// 8. GENERAL KNOWLEDGE (সাধারণ জ্ঞান)
export const GK_ITEMS: GKItem[] = [
  // Animals
  { id: 'gk_a_1', category: 'animals', nameEn: 'Tiger', nameBn: 'বাঘ (রয়েল বেঙ্গল)', emoji: '🐅', pronunciationBn: 'বাঘ আমাদের জাতীয় পশু', funFactBn: 'বাঘ খুব জোরে গর্জন করতে পারে!', color: '#F97316' },
  { id: 'gk_a_2', category: 'animals', nameEn: 'Lion', nameBn: 'সিংহ', emoji: '🦁', pronunciationBn: 'সিংহ হলো বনের রাজা', funFactBn: 'সিংহের মাথায় সুন্দর কেশর থাকে।', color: '#F59E0B' },
  { id: 'gk_a_3', category: 'animals', nameEn: 'Elephant', nameBn: 'হাতি', emoji: '🐘', pronunciationBn: 'হাতির লম্বা শুঁড় আছে', funFactBn: 'হাতি হলো স্থলের সবচেয়ে বড় প্রাণী!', color: '#64748B' },
  { id: 'gk_a_4', category: 'animals', nameEn: 'Cow', nameBn: 'গরু', emoji: '🐄', pronunciationBn: 'গরু আমাদের পুষ্টিকর দুধ দেয়', funFactBn: 'গরু ঘাস খেতে খুব ভালোবাসে।', color: '#10B981' },
  { id: 'gk_a_5', category: 'animals', nameEn: 'Cat', nameBn: 'বিড়াল', emoji: '🐱', pronunciationBn: 'বিড়াল ডাকে মিউ মিউ', funFactBn: 'বিড়াল দুধ ও মাছ খেতে ভালোবাসে।', color: '#EC4899' },
  { id: 'gk_a_6', category: 'animals', nameEn: 'Dog', nameBn: 'কুকুর', emoji: '🐶', pronunciationBn: 'কুকুর মানুষের বিশ্বস্ত বন্ধু', funFactBn: 'কুকুর ঘেউ ঘেউ করে বাড়ি পাহারা দেয়।', color: '#8B5CF6' },
  { id: 'gk_a_7', category: 'animals', nameEn: 'Rabbit', nameBn: 'খরগোশ', emoji: '🐇', pronunciationBn: 'খরগোশ গাজর খেতে পছন্দ করে', funFactBn: 'খরগোশের কান দুটো বেশ লম্বা!', color: '#06B6D4' },
  { id: 'gk_a_8', category: 'animals', nameEn: 'Deer', nameBn: 'হরিণ', emoji: '🦌', pronunciationBn: 'হরিণ খুব দ্রুত দৌড়াতে পারে', funFactBn: 'হরিণের গায়ে সুন্দর সুন্দর ফোঁটা থাকে।', color: '#D97706' },

  // Birds
  { id: 'gk_b_1', category: 'birds', nameEn: 'Magpie Robin', nameBn: 'দোয়েল (জাতীয় পাখি)', emoji: '🐦', pronunciationBn: 'দোয়েল আমাদের জাতীয় পাখি', funFactBn: 'দোয়েল পাখি মিষ্টি সুরে গান গায়।', color: '#3B82F6' },
  { id: 'gk_b_2', category: 'birds', nameEn: 'Parrot', nameBn: 'টিয়া পাখি', emoji: '🦜', pronunciationBn: 'টিয়ার লাল ঠোঁট ও সবুজ ডানা', funFactBn: 'টিয়া পাখি মানুষের মতো কথা শিখতে পারে!', color: '#10B981' },
  { id: 'gk_b_3', category: 'birds', nameEn: 'Peacock', nameBn: 'ময়ূর', emoji: '🦚', pronunciationBn: 'ময়ূরের পেখম রঙিন ও সুন্দর', funFactBn: 'মেঘ ডাকলে ময়ূর পেখম মেলে নাচে।', color: '#8B5CF6' },
  { id: 'gk_b_4', category: 'birds', nameEn: 'Duck', nameBn: 'হাঁস', emoji: '🦆', pronunciationBn: 'হাঁস জলে সাঁতার কাটে প্যাক প্যাক', funFactBn: 'হাঁসের পায়ের পাতা দিয়ে জলে সহজে সাঁতার কাটা যায়।', color: '#F59E0B' },
  { id: 'gk_b_5', category: 'birds', nameEn: 'Owl', nameBn: 'পেঁচা', emoji: '🦉', pronunciationBn: 'পেঁচা রাতের বেলা জেগে থাকে', funFactBn: 'পেঁচার বড় বড় চোখ অন্ধকারেও দেখতে পায়।', color: '#92400E' },
  { id: 'gk_b_6', category: 'birds', nameEn: 'Kingfisher', nameBn: 'মাছরাঙা', emoji: '🪶', pronunciationBn: 'মাছরাঙা টুপ করে মাছ ধরে', funFactBn: 'মাছরাঙার ঠোঁট ছুঁচালো ও মজবুত।', color: '#06B6D4' },

  // Fruits
  { id: 'gk_f_1', category: 'fruits', nameEn: 'Jackfruit', nameBn: 'কাঁঠাল (জাতীয় ফল)', emoji: '🍈', pronunciationBn: 'কাঁঠাল আমাদের জাতীয় ফল', funFactBn: 'কাঁঠালের ভেতরে অনেকগুলো মিষ্টি কোয়া থাকে।', color: '#16A34A' },
  { id: 'gk_f_2', category: 'fruits', nameEn: 'Mango', nameBn: 'আম (ফলের রাজা)', emoji: '🥭', pronunciationBn: 'আম হলো সুস্বাদু ফলের রাজা', funFactBn: 'পাকা আম খুব রসালো ও মিষ্টি!', color: '#F59E0B' },
  { id: 'gk_f_3', category: 'fruits', nameEn: 'Banana', nameBn: 'কলা', emoji: '🍌', pronunciationBn: 'কলা খেলে শক্তি বাড়ে', funFactBn: 'কলাতে থাকে অনেক ভিটামিন ও পটাসিয়াম।', color: '#FBBF24' },
  { id: 'gk_f_4', category: 'fruits', nameEn: 'Watermelon', nameBn: 'তরমুজ', emoji: '🍉', pronunciationBn: 'তরমুজ ভেতর থেকে লাল ও মিষ্টি', funFactBn: 'গরমে ঠান্ডা তরমুজ খেলে মন জুড়ায়।', color: '#EF4444' },
  { id: 'gk_f_5', category: 'fruits', nameEn: 'Apple', nameBn: 'আপেল', emoji: '🍎', pronunciationBn: 'একটি আপেল ডাক্তার দূরে রাখে', funFactBn: 'আপেল লাল এবং সবুজ রঙের হয়ে থাকে।', color: '#E11D48' },
  { id: 'gk_f_6', category: 'fruits', nameEn: 'Orange', nameBn: 'কমলা', emoji: '🍊', pronunciationBn: 'কমলায় থাকে ভিটামিন সি', funFactBn: 'কমলার রসে শরীর তাজা থাকে।', color: '#EA580C' },

  // Vegetables
  { id: 'gk_v_1', category: 'vegetables', nameEn: 'Potato', nameBn: 'আলু', emoji: '🥔', pronunciationBn: 'আলু খেতে সবাই ভালোবাসে', funFactBn: 'আলু মাটির নিচে জন্মায়।', color: '#B45309' },
  { id: 'gk_v_2', category: 'vegetables', nameEn: 'Tomato', nameBn: 'টমেটো', emoji: '🍅', pronunciationBn: 'টমেটো লাল ও রসালো', funFactBn: 'টমেটো কাঁচাও খাওয়া যায়, সালাদে দারুণ লাগে।', color: '#EF4444' },
  { id: 'gk_v_3', category: 'vegetables', nameEn: 'Carrot', nameBn: 'গাজর', emoji: '🥕', pronunciationBn: 'গাজর খেলে চোখের জ্যোতি বাড়ে', funFactBn: 'খরগোশের খুব পছন্দের খাবার হলো গাজর।', color: '#F97316' },
  { id: 'gk_v_4', category: 'vegetables', nameEn: 'Eggplant', nameBn: 'বেগুন', emoji: '🍆', pronunciationBn: 'বেগুন দিয়ে সুস্বাদু বেগুনি হয়', funFactBn: 'বেগুন বেগুনি রঙের সুন্দর সবজি।', color: '#8B5CF6' },
  { id: 'gk_v_5', category: 'vegetables', nameEn: 'Pumpkin', nameBn: 'মিষ্টি কুমড়া', emoji: '🎃', pronunciationBn: 'মিষ্টি কুমড়া বড় ও গোলগাল', funFactBn: 'কুমড়া দিয়ে পুষ্টিকর তরকারি ও হালুয়া তৈরি হয়।', color: '#EA580C' },
  { id: 'gk_v_6', category: 'vegetables', nameEn: 'Green Peas', nameBn: 'মটরশুঁটি', emoji: '🫛', pronunciationBn: 'সবুজ মটরশুঁটি ছোট ছোট দানা', funFactBn: 'খোসা ছাড়িয়ে ছোট দানাদার মিষ্টি মটর পাওয়া যায়।', color: '#10B981' },

  // Body Parts
  { id: 'gk_bp_1', category: 'body_parts', nameEn: 'Eyes', nameBn: 'চোখ', emoji: '👀', pronunciationBn: 'চোখ দিয়ে আমরা সুন্দর পৃথিবী দেখি', funFactBn: 'আমাদের দুটি সুন্দর চোখ আছে।', color: '#3B82F6' },
  { id: 'gk_bp_2', category: 'body_parts', nameEn: 'Ears', nameBn: 'কান', emoji: '👂', pronunciationBn: 'কান দিয়ে আমরা শব্দ ও গান শুনি', funFactBn: 'আমাদের দুটি কান আছে।', color: '#F59E0B' },
  { id: 'gk_bp_3', category: 'body_parts', nameEn: 'Nose', nameBn: 'নাক', emoji: '👃', pronunciationBn: 'নাক দিয়ে আমরা ফুলের গন্ধ নিই', funFactBn: 'নাক দিয়ে আমরা শ্বাস-প্রশ্বাস নিই।', color: '#10B981' },
  { id: 'gk_bp_4', category: 'body_parts', nameEn: 'Mouth / Smile', nameBn: 'মুখ ও হাসি', emoji: '👄', pronunciationBn: 'মুখ দিয়ে কথা বলি ও মিষ্টি খাবার খাই', funFactBn: 'হাসিমুখে থাকলে সবাই ভালোবাসে!', color: '#EC4899' },
  { id: 'gk_bp_5', category: 'body_parts', nameEn: 'Hands', nameBn: 'হাত', emoji: '🤲', pronunciationBn: 'হাত দিয়ে আমরা লিখি, আঁকি ও খেলি', funFactBn: 'আমাদের দুই হাতে দশটি আঙুল আছে।', color: '#8B5CF6' },
  { id: 'gk_bp_6', category: 'body_parts', nameEn: 'Legs / Feet', nameBn: 'পা', emoji: '🦶', pronunciationBn: 'পা দিয়ে আমরা হাঁটি ও দৌড়াই', funFactBn: 'পা আমাদের সোজা দাঁড়িয়ে থাকতে সাহায্য করে।', color: '#06B6D4' },

  // Family
  { id: 'gk_fam_1', category: 'family', nameEn: 'Father', nameBn: 'বাবা', emoji: '👨', pronunciationBn: 'বাবা আমাদের অনেক স্নেহ করেন', funFactBn: 'বাবা আমাদের সুপারহিরো!', color: '#3B82F6' },
  { id: 'gk_fam_2', category: 'family', nameEn: 'Mother', nameBn: 'মা', emoji: '👩', pronunciationBn: 'মা আমাদের সবচেয়ে আপন ও প্রিয়', funFactBn: 'মায়ের মতো আপন কেহ নাই!', color: '#EC4899' },
  { id: 'gk_fam_3', category: 'family', nameEn: 'Grandfather', nameBn: 'দাদু / নানু', emoji: '👴', pronunciationBn: 'দাদু আমাদের মজার গল্প শোনান', funFactBn: 'দাদুর কাছে কত রূপকথার গল্প আছে!', color: '#8B5CF6' },
  { id: 'gk_fam_4', category: 'family', nameEn: 'Grandmother', nameBn: 'দিদা / নানি', emoji: '👵', pronunciationBn: 'দিদা আমাদের আদর করে পায়েস খাওয়ান', funFactBn: 'দিদার স্নেহের হাত সবচেয়ে মিষ্টি।', color: '#10B981' },
  { id: 'gk_fam_5', category: 'family', nameEn: 'Brother & Sister', nameBn: 'ভাই ও বোন', emoji: '👫', pronunciationBn: 'ভাই ও বোনের সাথে আমরা খেলি ও পড়ি', funFactBn: 'পরিবার হলো আমাদের সবচেয়ে সুখের জায়গা।', color: '#F59E0B' },

  // Transport
  { id: 'gk_t_1', category: 'transport', nameEn: 'Airplane', nameBn: 'উড়োজাহাজ / বিমান', emoji: '✈️', pronunciationBn: 'বিমান আকাশে মেঘের ওপর দিয়ে ওড়ে', funFactBn: 'বিমানে চড়ে অনেক দূরে খুব দ্রুত যাওয়া যায়!', color: '#3B82F6' },
  { id: 'gk_t_2', category: 'transport', nameEn: 'Train', nameBn: 'রেলগাড়ি', emoji: '🚂', pronunciationBn: 'রেলগাড়ি চলে ঝিকঝিক শব্দ করে', funFactBn: 'রেলগাড়ির লম্বা বগি রেললাইনে চলে।', color: '#EF4444' },
  { id: 'gk_t_3', category: 'transport', nameEn: 'Car', nameBn: 'গাড়ি (কার)', emoji: '🚗', pronunciationBn: 'গাড়ি চার চাকায় পিপ পিপ করে চলে', funFactBn: 'গাড়িতে বসে জানলা দিয়ে বাইরের সুন্দর দৃশ্য দেখা যায়।', color: '#10B981' },
  { id: 'gk_t_4', category: 'transport', nameEn: 'Bus', nameBn: 'বাস', emoji: '🚌', pronunciationBn: 'বাসে চড়ে স্কুলে যাই', funFactBn: 'বাসে একসঙ্গে অনেক যাত্রী চড়তে পারে।', color: '#F59E0B' },
  { id: 'gk_t_5', category: 'transport', nameEn: 'Boat', nameBn: 'নৌকা', emoji: '⛵', pronunciationBn: 'নৌকা নদীর জলে ভেসে চলে', funFactBn: 'মাঝি ভাই বৈঠা বেয়ে নৌকা চালান।', color: '#06B6D4' },
  { id: 'gk_t_6', category: 'transport', nameEn: 'Bicycle', nameBn: 'বাইসাইকেল', emoji: '🚲', pronunciationBn: 'দুই চাকার সাইকেল ট্রিন ট্রিন করে বাজে', funFactBn: 'সাইকেল চালালে স্বাস্থ্য খুব ভালো থাকে।', color: '#8B5CF6' },

  // Nature
  { id: 'gk_n_1', category: 'nature', nameEn: 'Sun', nameBn: 'সূর্য', emoji: '☀️', pronunciationBn: 'সূর্য আমাদের আলো ও উত্তাপ দেয়', funFactBn: 'সূর্য প্রতিদিন সকালবেলা পুব আকাশে ওঠে।', color: '#F59E0B' },
  { id: 'gk_n_2', category: 'nature', nameEn: 'Moon', nameBn: 'চাঁদ (চাঁদমামা)', emoji: '🌙', pronunciationBn: 'চাঁদমামা রাতের আকাশে আলো ছড়ায়', funFactBn: 'পূর্ণিমার চাঁদের স্নিগ্ধ আলো দেখতে দারুণ লাগে।', color: '#6366F1' },
  { id: 'gk_n_3', category: 'nature', nameEn: 'Cloud & Rain', nameBn: 'মেঘ ও বৃষ্টি', emoji: '🌧️', pronunciationBn: 'বৃষ্টি পড়ে টাপুর টুপুর', funFactBn: 'মেঘ থেকে বৃষ্টি ঝরে গাছপালা সবুজ হয়ে ওঠে।', color: '#06B6D4' },
  { id: 'gk_n_4', category: 'nature', nameEn: 'Flower', nameBn: 'ফুল (শাপলা)', emoji: '🪷', pronunciationBn: 'শাপলা আমাদের জাতীয় ফুল', funFactBn: 'শাপলা ফুল পুকুর ও বিলের জলে ফোটে।', color: '#EC4899' },
  { id: 'gk_n_5', category: 'nature', nameEn: 'Tree', nameBn: 'গাছপালা', emoji: '🌳', pronunciationBn: 'গাছ আমাদের মিষ্টি ফল ও বিশুদ্ধ বাতাস দেয়', funFactBn: 'পাখিরা গাছে বাসা বানিয়ে বাস করে।', color: '#10B981' },
  { id: 'gk_n_6', category: 'nature', nameEn: 'Rainbow', nameBn: 'রংধনু', emoji: '🌈', pronunciationBn: 'রংধনুতে সাতটি মিষ্টি রং আছে', funFactBn: 'বৃষ্টির পর রোদের আলোয় আকাশে রংধনু দেখা যায়!', color: '#8B5CF6' },
];

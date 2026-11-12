/**
 * Speech synthesis utility for Bengali and English pronunciations.
 * Uses browser's native offline Web Speech API (zero network calls).
 */

class SpeechService {
  public enabled: boolean = true;
  public rate: number = 0.85; // Slightly slower for toddler clarity
  public pitch: number = 1.1; // Cheerful, child-friendly pitch
  private voicesLoaded: boolean = false;
  private voices: SpeechSynthesisVoice[] = [];

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.loadVoices();
      window.speechSynthesis.onvoiceschanged = () => {
        this.loadVoices();
      };
    }
  }

  private loadVoices() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.voices = window.speechSynthesis.getVoices();
      if (this.voices.length > 0) {
        this.voicesLoaded = true;
      }
    }
  }

  public speak(text: string, lang: 'bn' | 'en' = 'bn') {
    if (!this.enabled || typeof window === 'undefined' || !('speechSynthesis' in window)) {
      return;
    }

    try {
      window.speechSynthesis.cancel(); // Cancel any ongoing speech

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = this.rate;
      utterance.pitch = this.pitch;

      if (!this.voicesLoaded) {
        this.loadVoices();
      }

      if (lang === 'bn') {
        utterance.lang = 'bn-BD';
        // Look for Bengali voices (bn-BD, bn-IN, or Bangla)
        const bnVoice = this.voices.find(
          v => v.lang.startsWith('bn') || v.name.toLowerCase().includes('bangla') || v.name.toLowerCase().includes('bengali')
        );
        if (bnVoice) {
          utterance.voice = bnVoice;
        }
      } else {
        utterance.lang = 'en-US';
        const enVoice = this.voices.find(
          v => (v.lang.startsWith('en') || v.lang === 'en-US') && !v.name.includes('Bad')
        );
        if (enVoice) {
          utterance.voice = enVoice;
        }
      }

      window.speechSynthesis.speak(utterance);
    } catch {
      // Ignore speech failures in restricted environments
    }
  }

  public stop() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  }
}

export const speechService = new SpeechService();

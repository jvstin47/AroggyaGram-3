import { Capacitor } from '@capacitor/core';
import { SpeechRecognition } from '@capacitor-community/speech-recognition';

export interface SpeechStartOptions {
  language?: 'en' | 'ml' | 'hi' | string;
  prompt?: string;
  onResult: (text: string) => void;
  onError?: (err: any) => void;
  onEnd?: () => void;
}

export class SpeechService {
  private static browserRecognition: any = null;

  public static async isAvailable(): Promise<boolean> {
    if (Capacitor.isNativePlatform()) {
      try {
        const { available } = await SpeechRecognition.available();
        return available;
      } catch (err) {
        console.warn('Native speech recognition availability check failed:', err);
        return false;
      }
    } else {
      return typeof window !== 'undefined' && Boolean(
        (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
      );
    }
  }

  public static async startListening(options: SpeechStartOptions): Promise<void> {
    const langCode = options.language === 'ml' 
      ? 'ml-IN' 
      : options.language === 'hi' 
        ? 'hi-IN' 
        : 'en-IN';

    if (Capacitor.isNativePlatform()) {
      try {
        // 1. Check & Request Permissions
        const permStatus = await SpeechRecognition.checkPermissions();
        if (permStatus.speechRecognition !== 'granted') {
          const reqStatus = await SpeechRecognition.requestPermissions();
          if (reqStatus.speechRecognition !== 'granted') {
            options.onError?.('Microphone permission was denied.');
            options.onEnd?.();
            return;
          }
        }

        // 2. Start speech recognition popup dialog on Android
        const promptText = options.prompt || (
          options.language === 'ml' 
            ? 'ലക്ഷണങ്ങൾ സംസാരിക്കുക...' 
            : options.language === 'hi' 
              ? 'लक्षण बताएं...' 
              : 'Speak your health symptoms...'
        );

        const result = await SpeechRecognition.start({
          language: langCode,
          maxResults: 2,
          prompt: promptText,
          popup: true,
          partialResults: false
        });

        if (result.matches && result.matches.length > 0) {
          options.onResult(result.matches[0]);
        }
        options.onEnd?.();
      } catch (err: any) {
        console.warn('Native speech recognition error:', err);
        options.onError?.(err);
        options.onEnd?.();
      }
    } else {
      // Browser Web Speech fallback for desktop testing
      const SpeechRec = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (!SpeechRec) {
        options.onError?.('Speech recognition not supported in this browser.');
        options.onEnd?.();
        return;
      }

      try {
        if (this.browserRecognition) {
          this.browserRecognition.abort();
        }

        const recognition = new SpeechRec();
        this.browserRecognition = recognition;
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = langCode;

        recognition.onresult = (event: any) => {
          const transcript = event.results?.[0]?.[0]?.transcript;
          if (transcript) {
            options.onResult(transcript);
          }
        };

        recognition.onerror = (e: any) => {
          options.onError?.(e.error || 'Speech error');
          options.onEnd?.();
        };

        recognition.onend = () => {
          options.onEnd?.();
        };

        recognition.start();
      } catch (e: any) {
        options.onError?.(e);
        options.onEnd?.();
      }
    }
  }

  public static async stopListening(): Promise<void> {
    if (Capacitor.isNativePlatform()) {
      try {
        await SpeechRecognition.stop();
      } catch {
        // ignore
      }
    } else if (this.browserRecognition) {
      try {
        this.browserRecognition.stop();
      } catch {
        // ignore
      }
    }
  }
}

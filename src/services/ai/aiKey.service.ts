/**
 * AI Key Service for managing custom and fallback Gemini API Keys.
 * Stores user-configured key in localStorage so users can supply their own Google AI Studio API key.
 */

const STORAGE_KEY = 'aroggya_gemini_api_key';
const MODEL_STORAGE_KEY = 'aroggya_gemini_model_mode';

export type GeminiModelMode = 'gemini-2.5-flash' | 'gemini-3.6-flash';

export class AIKeyService {
  /**
   * Get currently selected Gemini model mode.
   * Defaults to 'gemini-2.5-flash'.
   */
  public static getModel(): GeminiModelMode {
    if (typeof window !== 'undefined' && window.localStorage) {
      const saved = localStorage.getItem(MODEL_STORAGE_KEY);
      if (saved === 'gemini-3.6-flash' || saved === 'gemini-2.5-flash') {
        return saved;
      }
    }
    return 'gemini-2.5-flash';
  }

  /**
   * Set user preferred Gemini model mode ('gemini-2.5-flash' or 'gemini-3.6-flash').
   */
  public static setModel(model: GeminiModelMode): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem(MODEL_STORAGE_KEY, model);
    }
  }

  /**
   * Get human readable display label for a model mode.
   */
  public static getModelDisplayName(model?: GeminiModelMode): string {
    const m = model || this.getModel();
    return m === 'gemini-3.6-flash' ? 'Gemini 3.6 Flash' : 'Gemini 2.5 Flash';
  }

  /**
   * Get the active API key (User custom key has priority over env variable).
   */
  public static getApiKey(): string {
    if (typeof window !== 'undefined' && window.localStorage) {
      const customKey = localStorage.getItem(STORAGE_KEY);
      if (customKey && customKey.trim().length > 0) {
        return customKey.trim();
      }
    }
    return import.meta.env.VITE_GEMINI_API_KEY || '';
  }

  /**
   * Save a user-provided API key to localStorage.
   */
  public static setApiKey(key: string): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      const cleanKey = key.trim();
      if (cleanKey.length > 0) {
        localStorage.setItem(STORAGE_KEY, cleanKey);
      } else {
        localStorage.removeItem(STORAGE_KEY);
      }
    }
  }

  /**
   * Check if a custom key is explicitly set by the user.
   */
  public static hasCustomKey(): boolean {
    if (typeof window === 'undefined' || !window.localStorage) return false;
    const customKey = localStorage.getItem(STORAGE_KEY);
    return Boolean(customKey && customKey.trim().length > 0);
  }

  /**
   * Check if ANY API key is available (custom or environment).
   */
  public static hasAnyKey(): boolean {
    return Boolean(this.getApiKey().length > 0);
  }

  /**
   * Remove custom API key from localStorage.
   */
  public static clearApiKey(): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.removeItem(STORAGE_KEY);
    }
  }

  /**
   * Return a masked version of the current key for display (e.g. AIzaSy...9x12).
   */
  public static getMaskedKey(): string {
    const key = this.getApiKey();
    if (!key) return '';
    if (key.length <= 8) return '••••••••';
    return `${key.slice(0, 6)}••••••••${key.slice(-4)}`;
  }

  /**
   * Test an API key against Google Gemini REST endpoint to ensure it is valid.
   */
  public static async testApiKey(keyToTest?: string): Promise<{ valid: boolean; message: string }> {
    const key = keyToTest?.trim() || this.getApiKey();
    if (!key) {
      return { valid: false, message: 'No API key provided.' };
    }

    const model = this.getModel();

    try {
      let res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${key}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: 'Ping' }] }],
            generationConfig: { maxOutputTokens: 5 }
          })
        }
      );

      // If the selected model (e.g. 3.6-flash) is not found, fallback to 2.5-flash for key validity check
      if (res.status === 404 && model !== 'gemini-2.5-flash') {
        res = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${key}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [{ parts: [{ text: 'Ping' }] }],
              generationConfig: { maxOutputTokens: 5 }
            })
          }
        );
      }

      if (res.ok) {
        return { valid: true, message: `API key verified with ${this.getModelDisplayName(model)}!` };
      } else {
        const errorData = await res.json().catch(() => ({}));
        const errMsg = errorData?.error?.message || `HTTP ${res.status}: ${res.statusText}`;
        return { valid: false, message: `Key validation failed: ${errMsg}` };
      }
    } catch (err: any) {
      return { valid: false, message: `Network error verifying key: ${err?.message || 'Check connection'}` };
    }
  }
}

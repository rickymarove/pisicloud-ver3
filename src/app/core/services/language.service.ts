import { inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';

export interface LanguageOption {
  code: string;
  langKey: string;
  label: string;
  flag: string;
}

export const SUPPORTED_LANGUAGES: LanguageOption[] = [
  { code: 'EN', langKey: 'en', label: 'English', flag: '🇬🇧' },
  { code: 'ID', langKey: 'id', label: 'Bahasa Indonesia', flag: '🇮🇩' },
  { code: 'JA', langKey: 'ja', label: '日本語', flag: '🇯🇵' },
  { code: 'KO', langKey: 'ko', label: '한국어', flag: '🇰🇷' },
  { code: 'ZH', langKey: 'zh', label: '中文', flag: '🇨🇳' },
];

export const DEFAULT_LANGUAGE: LanguageOption = SUPPORTED_LANGUAGES[0];
const STORAGE_KEY = 'pisicloud_lang';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  private readonly translate = inject(TranslateService);
  private readonly platformId = inject(PLATFORM_ID);

  readonly languages: LanguageOption[] = SUPPORTED_LANGUAGES;
  readonly currentLanguage = signal<LanguageOption>(DEFAULT_LANGUAGE);

  constructor() {
    this.translate.addLangs(this.languages.map((l) => l.langKey));
    this.translate.setFallbackLang(DEFAULT_LANGUAGE.langKey);

    let initialLangKey = DEFAULT_LANGUAGE.langKey;
    const savedLang = this.getStoredLang();
    if (savedLang && this.languages.some((l) => l.langKey === savedLang)) {
      initialLangKey = savedLang;
    }

    this.setLanguage(initialLangKey);
  }

  setLanguage(lang: LanguageOption | string): void {
    const target =
      typeof lang === 'string'
        ? this.languages.find((l) => l.langKey.toLowerCase() === lang.toLowerCase() || l.code.toLowerCase() === lang.toLowerCase()) || DEFAULT_LANGUAGE
        : lang;

    this.currentLanguage.set(target);
    this.translate.use(target.langKey);
    this.setStoredLang(target.langKey);
  }

  private getStoredLang(): string | null {
    if (isPlatformBrowser(this.platformId) && typeof window !== 'undefined' && typeof localStorage !== 'undefined' && localStorage) {
      try {
        return localStorage.getItem(STORAGE_KEY);
      } catch {
        return null;
      }
    }
    return null;
  }

  private setStoredLang(langKey: string): void {
    if (isPlatformBrowser(this.platformId) && typeof window !== 'undefined' && typeof localStorage !== 'undefined' && localStorage) {
      try {
        localStorage.setItem(STORAGE_KEY, langKey);
      } catch {
        // localStorage not available or throws in private browsing
      }
    }
  }
}

'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { LANGUAGES, LangCode, LangDef, TranslationKeys, translations } from '@/lib/translations';

type LangContextType = {
  lang: LangCode;
  setLang: (code: LangCode) => void;
  t: TranslationKeys;
  currentLang: LangDef;
};

const LangContext = createContext<LangContextType>({
  lang: 'en',
  setLang: () => {},
  t: translations.en,
  currentLang: LANGUAGES[0],
});

export function useLang() {
  return useContext(LangContext);
}

export default function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<LangCode>('en');

  useEffect(() => {
    // Baca dari localStorage, fallback ke browser language
    const stored = localStorage.getItem('app-lang') as LangCode | null;
    const validCodes = LANGUAGES.map((l) => l.code);

    if (stored && validCodes.includes(stored)) {
      applyLang(stored);
      setLangState(stored);
    } else {
      // Deteksi bahasa browser
      const browserLang = navigator.language.split('-')[0] as LangCode;
      const detected = validCodes.includes(browserLang) ? browserLang : 'en';
      applyLang(detected);
      setLangState(detected);
    }
  }, []);

  function applyLang(code: LangCode) {
    const def = LANGUAGES.find((l) => l.code === code)!;
    // Set dir untuk RTL support
    document.documentElement.setAttribute('dir', def.dir);
    document.documentElement.setAttribute('lang', code);
  }

  function setLang(code: LangCode) {
    setLangState(code);
    applyLang(code);
    localStorage.setItem('app-lang', code);
  }

  const currentLang = LANGUAGES.find((l) => l.code === lang) ?? LANGUAGES[0];

  return (
    <LangContext.Provider value={{ lang, setLang, t: translations[lang], currentLang }}>
      {children}
    </LangContext.Provider>
  );
}

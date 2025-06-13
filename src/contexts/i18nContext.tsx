'use client';

import { createContext, useContext, useEffect, useState } from 'react';

type Locale = 'en' | 'vi';
type Messages = Record<string, any>;

interface I18nContextProps {
  locale: Locale;
  t: (key: string) => string;
  setLocale: (locale: Locale) => void;
}

const I18nContext = createContext<I18nContextProps | undefined>(undefined);

export const I18nProvider = ({ children }: { children: React.ReactNode }) => {
  const [locale, setLocaleState] = useState<Locale>('en');
  const [messages, setMessages] = useState<Messages>({});

  // Load messages based on locale
  const loadMessages = async (loc: Locale) => {
    try {
      const m = await import(`@/messages/${loc}.json`);
      setMessages(m.default);
      setLocaleState(loc);
      localStorage.setItem('locale', loc);
    } catch (error) {
      console.error(`Failed to load messages for locale: ${loc}`, error);
    }
  };

  // On mount, load stored locale or default
  useEffect(() => {
    const stored = localStorage.getItem('locale') as Locale;
    const initialLocale = stored || 'en';
    loadMessages(initialLocale);
  }, []);

  const setLocale = (loc: Locale) => {
    if (loc !== locale) {
      loadMessages(loc);
    }
  };

  // Translation function: supports dot notation (e.g., "navbar.about")
  const t = (key: string): string => {
    return key.split('.').reduce((obj: any, k: string) => obj?.[k], messages) || key;
  };

  return (
    <I18nContext.Provider value={{ locale, t, setLocale }}>
      {children}
    </I18nContext.Provider>
  );
};

export const useI18n = (): I18nContextProps => {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
};

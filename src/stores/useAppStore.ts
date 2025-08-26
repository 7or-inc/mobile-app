import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Localization from 'expo-localization';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { languages } from '@/i18n/const';

const fetchCurrentLanguage = (): Language => {
  const locales = Localization.getLocales();

  const matched = locales.find((locale) => languages.includes(locale.languageCode as Language));

  return (matched?.languageCode ?? languages[0]) as Language;
};

interface AppStates {
  language: Language;
  themeMode: ThemeModeWithSystem;
}

interface AppActions {
  setLanguage: (language: Language) => void;
  setThemeMode: (theme: ThemeModeWithSystem) => void;
}

export const useAppStore = create<AppStates & AppActions>()(
  persist(
    (set) => ({
      language: fetchCurrentLanguage(),
      themeMode: 'system',
      setLanguage: (language) => set({ language }),
      setThemeMode: (themeMode) => set({ themeMode }),
    }),
    { name: 'appState', storage: createJSONStorage(() => AsyncStorage) }
  )
);

export const getLanguage = () => useAppStore.getState().language;

import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Localization from 'expo-localization';
import { Appearance } from 'react-native';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { languages } from '@/i18n/const';

const fetchCurrentLanguage = (): Language => {
  const locales = Localization.getLocales();

  const matched = locales.find((locale) => languages.includes(locale.languageCode as Language));

  return (matched?.languageCode ?? languages[0]) as Language;
};

interface AppState {
  language: Language;
  theme: ThemeMode;
}

interface AppActions {
  setLanguage: (language: Language) => void;
  setTheme: (theme: ThemeMode) => void;
}

export const useAppStore = create<AppState & AppActions>()(
  persist(
    (set) => ({
      language: fetchCurrentLanguage(),
      theme: (Appearance.getColorScheme() ?? 'dark') as ThemeMode,
      setLanguage: (language) => set({ language }),
      setTheme: (theme) => set({ theme }),
    }),
    { name: 'appState', storage: createJSONStorage(() => AsyncStorage) }
  )
);

export const getLanguage = () => useAppStore.getState().language;

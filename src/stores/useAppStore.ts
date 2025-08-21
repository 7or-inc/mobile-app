import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Localization from 'expo-localization';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { languages } from '@/i18n/const';

const getLanguage = (): Language => {
  const locales = Localization.getLocales();

  const matched = locales.find((locale) => languages.includes(locale.languageCode as Language));

  return (matched?.languageCode as Language) ?? languages[0];
};

interface AppState {
  language: Language;
}

interface AppActions {
  setLanguage: (language: Language) => void;
}

export const useAppStore = create<AppState & AppActions>()(
  persist(
    (set) => ({
      language: getLanguage(),
      setLanguage: (language) => set({ language }),
    }),
    { name: 'appState', storage: createJSONStorage(() => AsyncStorage) }
  )
);

import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Localization from 'expo-localization';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface AppState {
  language: Language;
}

interface AppActions {
  setLanguage: (language: Language) => void;
}

export const useAppStore = create<AppState & AppActions>()(
  persist(
    (set) => ({
      language: Localization.getLocales()[0].languageCode as Language,
      setLanguage: (language) => set({ language }),
    }),
    { name: 'appState', storage: createJSONStorage(() => AsyncStorage) }
  )
);

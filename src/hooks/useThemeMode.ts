import { useColorScheme } from 'react-native';

import { useAppStore } from '@/stores';

export const useThemeMode = () => {
  const preferredMode = useAppStore((state) => state.themeMode);
  const setMode = useAppStore((state) => state.setThemeMode);
  const systemThemeMode = useColorScheme();

  const mode = (preferredMode === 'system' ? systemThemeMode : preferredMode) ?? 'dark';

  const setPreferredMode = (newMode: ThemeModeWithSystem) => {
    if (newMode === preferredMode) return;

    setMode(newMode);
  };

  return { mode, setPreferredMode, preferredMode, isDarkMode: mode === 'dark' };
};

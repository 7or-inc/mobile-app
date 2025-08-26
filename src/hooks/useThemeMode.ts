import { useAppStore } from '@/stores';

export const useThemeMode = () => {
  const mode = useAppStore((state) => state.theme);
  const setMode = useAppStore((state) => state.setTheme);

  return { mode, setMode };
};

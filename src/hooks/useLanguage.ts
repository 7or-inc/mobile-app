import { useAppStore } from '@/stores';

export const useLanguage = () => {
  const setLanguage = useAppStore((state) => state.setLanguage);
  const language = useAppStore((state) => state.language);

  return { setLanguage, language };
};

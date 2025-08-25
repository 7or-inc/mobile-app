import * as Updates from 'expo-updates'; // only if you use Expo
import { I18nManager } from 'react-native';

import { useAppStore } from '@/stores';

export const useLanguage = () => {
  const changeLanguage = useAppStore((state) => state.setLanguage);
  const language = useAppStore((state) => state.language);

  const setLanguage = async (newLanguage: Language) => {
    if (language === newLanguage) return;

    const isAr = newLanguage === 'ar';
    I18nManager.allowRTL(isAr);
    I18nManager.forceRTL(isAr);
    I18nManager.swapLeftAndRightInRTL(isAr);

    changeLanguage(newLanguage);
    await Updates.reloadAsync();
  };

  return { setLanguage, language: language, isAr: language === 'ar' };
};

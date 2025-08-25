import * as Updates from 'expo-updates'; // only if you use Expo
import { I18nManager } from 'react-native';

import { useAppStore } from '@/stores';

export const useLanguage = () => {
  const changeLanguage = useAppStore((state) => state.setLanguage);
  const currentLanguage = useAppStore((state) => state.language);

  const setLanguage = async (language: Language) => {
    if (currentLanguage === language) return;

    const isAr = language === 'ar';
    I18nManager.allowRTL(isAr);
    I18nManager.forceRTL(isAr);
    I18nManager.swapLeftAndRightInRTL(isAr);

    changeLanguage(language);
    await Updates.reloadAsync();
  };

  return { setLanguage, language: currentLanguage, isAr: currentLanguage === 'ar' };
};

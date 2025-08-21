import { useFormatNumber } from '@/hooks';
import { useAppStore } from '@/stores';

import { resources } from './const';
import type { I18nKey, LanguageTranslations, TranslateOptions } from './types';

export const useTranslate = () => {
  const appLanguage = useAppStore((state) => state.language);
  const formatNumber = useFormatNumber();

  return <Key extends I18nKey>(key: Key, options: TranslateOptions = {}, language: Language = appLanguage) => {
    const translation = resources[language][key] ?? key;

    return Object.entries(options).reduce(
      (acc, [key, value]) =>
        acc.replace(
          new RegExp(`{${key}}`, 'g'),
          String(typeof value === 'number' ? formatNumber(value, { useGrouping: false }) : value)
        ) as LanguageTranslations[Key],
      translation
    );
  };
};

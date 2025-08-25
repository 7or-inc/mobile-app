import { getLanguage } from '@/stores';

import { languageFontFamily } from './const';
import type { FontFamily, FontWeight } from './types';

export const getFontFamily = (language?: Language) => {
  const appLanguage = getLanguage();

  return languageFontFamily[language ?? appLanguage];
};

export const getFontWeight = <T extends FontWeight>(weight: T, language?: Language) => {
  const fontFamily = getFontFamily(language);

  return fontFamily[weight] as FontFamily[T];
};

export const getFontWeightFamily = <T extends FontWeight>(weight: T, language?: Language) => {
  const fontFamily = getFontWeight(weight, language);

  return { fontFamily };
};

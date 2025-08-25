import type { Cairo } from './Cairo';
import type { Rubik } from './Rubik';

export type CairoFontFamily = typeof Cairo;
export type RubikFontFamily = typeof Rubik;

export type CairoFontWeights = keyof CairoFontFamily;
export type RubikFontWeights = keyof RubikFontFamily;
export type FontWeight = CairoFontWeights & RubikFontWeights;

export type FontFamily = {
  [k in FontWeight]: CairoFontFamily[k] | RubikFontFamily[k];
};

export type LanguageFontFamily = Record<Language, FontFamily>;

import type { resources } from './const';

export type Resources = typeof resources;

export type EN = Resources['en'];
export type AR = Resources['ar'];

export type I18nKey = keyof EN & keyof AR;
export type LanguageTranslations = EN | AR;
export type Translation = Record<string, string>;

export type TranslateOptions = Record<string, string | number | boolean | undefined>;

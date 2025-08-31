import type { resources } from './const';
import type { useTranslate } from './index';

export type Resources = typeof resources;

export type EN = Resources['en'];
export type AR = Resources['ar'];

export type I18nKey = keyof EN & keyof AR;
export type LanguageTranslations = EN | AR;
export type Translation = Record<string, string>;

export interface TranslationOptions {
  language?: Language;
  string?: boolean;
}

export type TranslationFn = ReturnType<typeof useTranslate>;

type Trim<S extends string> = S extends ` ${infer R}` ? Trim<R> : S extends `${infer R} ` ? Trim<R> : S;

type StripTrailingSlash<S extends string> = S extends `${infer R}/` ? StripTrailingSlash<R> : S;

type CleanTag<S extends string> = Trim<StripTrailingSlash<Trim<S>>>;

type ExtractPlaceholders<S extends string> = S extends `${string}{${infer K}}${infer Rest}`
  ? K | ExtractPlaceholders<Rest>
  : never;

type ExtractTags<S extends string> = S extends `${string}<${infer Open}>${infer Mid}</${infer Close}>${infer Rest}`
  ? CleanTag<Open> | CleanTag<Close> | ExtractTags<Mid> | ExtractTags<Rest>
  : S extends `${string}<${infer Raw}/>${infer Rest2}`
    ? CleanTag<Raw> | ExtractTags<Rest2>
    : S extends `${string}<${infer Raw2} />${infer Rest3}`
      ? CleanTag<Raw2> | ExtractTags<Rest3>
      : never;

type Lang = keyof Resources;
type KeysOf<L extends Lang> = keyof Resources[L] & string;
type TextOf<L extends Lang, K extends KeysOf<L>> = Resources[L][K] & string;

export type TranslateOptions<L extends Lang, K extends KeysOf<L>> = {
  [P in ExtractPlaceholders<TextOf<L, K>>]: string | number;
} & {
  [T in ExtractTags<TextOf<L, K>>]: (chunks: string) => React.ReactNode;
};

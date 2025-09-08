import { Fragment, useCallback } from 'react';

import { useFormatNumber } from '@/hooks';
import { useAppStore } from '@/stores';

import { resources } from './const';
import type { I18nKey, LanguageTranslations, TranslateOptions, TranslationOptions } from './types';

export const useTranslate = () => {
  const appLanguage = useAppStore((state) => state.language);
  const formatNumber = useFormatNumber();

  const formatValue = useCallback(
    (value: string | number) => {
      if (typeof value !== 'number') return value;

      return formatNumber(value, { useGrouping: false });
    },
    [formatNumber]
  );

  return <Key extends I18nKey>(
    key: Key,
    placeholderValues: TranslateOptions<Language, Key> = {} as TranslateOptions<Language, Key>,
    options: TranslationOptions = {
      language: appLanguage,
      string: false,
    }
  ) => {
    let translation: string = resources[options?.language ?? appLanguage][key];

    const placeholderRegex = /{(\w+)}/g;
    translation = translation.replace(placeholderRegex, (_, optKey) =>
      formatValue(placeholderValues[optKey as keyof TranslateOptions<Language, Key>] ?? `{${optKey}}`)
    );

    if (options.string) return translation as unknown as LanguageTranslations[Key];

    const renderNodes = (text: string): React.ReactNode[] => {
      const nodes: React.ReactNode[] = [];
      let lastIndex = 0;

      const tagRegex = /<(\w+)(?:\s*\/>|>(.*?)<\/\1>)/g;
      let match: RegExpExecArray | null;

      while ((match = tagRegex.exec(text)) !== null) {
        const [fullMatch, tagName, innerContent] = match;
        const index = match.index;

        if (index > lastIndex) nodes.push(text.slice(lastIndex, index));

        const option = placeholderValues[tagName as keyof TranslateOptions<Language, Key>];

        nodes.push(<Fragment key={tagName + lastIndex}>{option(innerContent)}</Fragment>);

        lastIndex = index + fullMatch.length;
      }

      if (lastIndex < text.length) nodes.push(text.slice(lastIndex));

      return nodes;
    };

    return renderNodes(translation) as unknown as LanguageTranslations[Key];
  };
};

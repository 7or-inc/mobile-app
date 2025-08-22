import { Fragment, useCallback } from 'react';

import { useFormatNumber } from '@/hooks';
import { useAppStore } from '@/stores';

import { resources } from './const';
import type { I18nKey, LanguageTranslations, TranslateOptions } from './types';

export const useTranslate = () => {
  const appLanguage = useAppStore((state) => state.language);
  const formatNumber = useFormatNumber();

  const formatValue = useCallback(
    (value: unknown) => {
      if (typeof value === 'number') return formatNumber(value, { useGrouping: false });
      return String(value);
    },
    [formatNumber]
  );

  return <Key extends I18nKey>(
    key: Key,
    options: TranslateOptions<Language, Key> = {} as TranslateOptions<Language, Key>,
    language: Language = appLanguage
  ) => {
    let translation: string = resources[language][key];

    const placeholderRegex = /{(\w+)}/g;
    translation = translation.replace(placeholderRegex, (_, optKey) =>
      formatValue(options[optKey as keyof TranslateOptions<Language, Key>] ?? `{${optKey}}`)
    );

    const renderNodes = (text: string): React.ReactNode[] => {
      const nodes: React.ReactNode[] = [];
      let lastIndex = 0;

      const tagRegex = /<(\w+)(?:\s*\/>|>(.*?)<\/\1>)/g;
      let match: RegExpExecArray | null;

      while ((match = tagRegex.exec(text)) !== null) {
        const [fullMatch, tagName, innerContent] = match;
        const index = match.index;

        if (index > lastIndex) nodes.push(text.slice(lastIndex, index));

        const option = options[tagName as keyof TranslateOptions<Language, Key>];

        nodes.push(<Fragment key={tagName + lastIndex}>{option(innerContent)}</Fragment>);

        lastIndex = index + fullMatch.length;
      }

      if (lastIndex < text.length) nodes.push(text.slice(lastIndex));

      return nodes;
    };

    return renderNodes(translation) as unknown as LanguageTranslations[Key];
  };
};

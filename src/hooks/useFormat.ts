import { useLanguage } from './useLanguage';

export const useFormatNumber = () => {
  const { language: appLanguage } = useLanguage();

  return (num: number, options: Intl.NumberFormatOptions = {}, language: Language = appLanguage) =>
    String(num)
      .split('')
      .map((char) => new Intl.NumberFormat(language, options).format(Number(char)))
      .join('');
};

import { useLanguage } from './useLanguage';

export const useFormatNumber = () => {
  const { language: appLanguage } = useLanguage();

  return (num: number, options: Intl.NumberFormatOptions = {}, language: Language = appLanguage) =>
    new Intl.NumberFormat(language, options).format(num);
};

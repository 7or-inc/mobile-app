import { border, createRestyleComponent, createText, type BorderProps } from '@shopify/restyle';

import { getFontWeightFamily } from '@/assets/fonts/helpers';
import { useLanguage } from '@/hooks';
import { fonts, type FontsProps, type Theme } from '@/theme';
import { textVariants } from '@/theme/variants/text';

export const BaseText = createText<Theme>();

type TextProps = React.ComponentProps<typeof BaseText> & FontsProps & BorderProps<Theme>;

const RestyleText = createRestyleComponent<TextProps, Theme>([...fonts, border], BaseText);

export const Text = (props: TextProps) => {
  const { language } = useLanguage();
  const variant = (textVariants[props.variant as keyof typeof textVariants] ?? 'normal') as { fontFamily: string };
  const fontWeightFamily = getFontWeightFamily(props.weight ?? 400, language);

  return <RestyleText {...props} {...(fontWeightFamily ?? variant)} />;
};

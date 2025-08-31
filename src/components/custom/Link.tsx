import { Link as ExpoLink, LinkProps as ExpoLinkProps } from 'expo-router';

import {
  border,
  color,
  createRestyleComponent,
  layout,
  typography,
  type BorderProps,
  type ColorProps,
  type LayoutProps,
  type TypographyProps,
} from '@shopify/restyle';

import { useLanguage } from '@/hooks';
import { base, fonts, type BaseProps, type FontsProps, type Theme } from '@/theme';

export type LinkProps = ExpoLinkProps &
  BaseProps &
  FontsProps &
  ColorProps<Theme> &
  LayoutProps<Theme> &
  BorderProps<Theme> &
  TypographyProps<Theme>;

const RestyleLink = createRestyleComponent<LinkProps, Theme>(
  [...base, fonts, typography, layout, border, color],
  ExpoLink
);

export const Link = (props: LinkProps) => {
  const { isAr } = useLanguage();

  return (
    <RestyleLink
      color="primary"
      textDecorationLine="underline"
      alignSelf={isAr ? 'flex-end' : 'flex-start'}
      {...props}
    />
  );
};

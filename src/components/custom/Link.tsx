import { Link as ExpoLink, LinkProps as ExpoLinkProps } from 'expo-router';

import {
  border,
  color,
  createRestyleComponent,
  layout,
  type BorderProps,
  type ColorProps,
  type LayoutProps,
} from '@shopify/restyle';

import { base, type BaseProps, type Theme } from '@/theme';

export type LinkProps = ExpoLinkProps & BaseProps & ColorProps<Theme> & LayoutProps<Theme> & BorderProps<Theme>;

const RestyleLink = createRestyleComponent<LinkProps, Theme>([...base, layout, border, color], ExpoLink);

export const Link = (props: LinkProps) => <RestyleLink {...props} />;

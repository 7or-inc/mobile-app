import {
  backgroundColor,
  backgroundColorShorthand,
  spacing,
  type BackgroundColorProps,
  type BackgroundColorShorthandProps,
  type SpacingProps,
} from '@shopify/restyle';

import type { Theme } from '@/theme';

export type BaseProps = BackgroundColorProps<Theme> & BackgroundColorShorthandProps<Theme> & SpacingProps<Theme>;
export const base = [backgroundColor, backgroundColorShorthand, spacing];

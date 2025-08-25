import {
  backgroundColor,
  backgroundColorShorthand,
  spacing,
  spacingShorthand,
  type BackgroundColorProps,
  type BackgroundColorShorthandProps,
  type SpacingProps,
  type SpacingShorthandProps,
} from '@shopify/restyle';

import { type Theme } from '../index';

import {
  fontHeights,
  fontWeights,
  textSize,
  type FontHeightsProps,
  type FontWeightsProps,
  type TextSizesProps,
} from './font';

export type BaseProps = BackgroundColorProps<Theme> &
  BackgroundColorShorthandProps<Theme> &
  SpacingProps<Theme> &
  SpacingShorthandProps<Theme>;
export const base = [backgroundColor, backgroundColorShorthand, spacing, spacingShorthand];

export type FontsProps = TextSizesProps & FontHeightsProps & FontWeightsProps;
export const fonts = [textSize, fontHeights, fontWeights];

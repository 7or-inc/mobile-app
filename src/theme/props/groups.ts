import {
  backgroundColor,
  backgroundColorShorthand,
  opacity,
  spacing,
  spacingShorthand,
  type BackgroundColorProps,
  type BackgroundColorShorthandProps,
  type OpacityProps,
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
  SpacingShorthandProps<Theme> &
  OpacityProps<Theme>;

export const base = [backgroundColor, backgroundColorShorthand, spacing, spacingShorthand, opacity];

export type FontsProps = TextSizesProps & FontHeightsProps & FontWeightsProps;
export const fonts = [textSize, fontHeights, fontWeights];

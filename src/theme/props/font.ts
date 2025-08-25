import { createRestyleFunction } from '@shopify/restyle';

import { getFontWeight } from '@/assets/fonts/helpers';
import type { FontWeight } from '@/assets/fonts/types';

import type { Theme } from '..';
import type { FontSizes, LineHeights } from '../tokens';

export interface TextSizesProps {
  size?: keyof FontSizes;
}
export const textSize = createRestyleFunction<Theme, TextSizesProps>({
  property: 'size',
  styleProperty: 'fontSize',
  themeKey: 'fontSizes' as unknown as undefined,
});

export interface FontHeightsProps {
  fontHeight?: keyof LineHeights;
}
export const fontHeights = createRestyleFunction<Theme, FontHeightsProps>({
  property: 'fontHeight',
  styleProperty: 'lineHeight',
  themeKey: 'lineHeights' as unknown as undefined,
});

export interface FontWeightsProps {
  weight?: FontWeight;
}

export const fontWeights = createRestyleFunction<Theme, FontWeightsProps, 'weight'>({
  property: 'weight',
  styleProperty: 'fontFamily',
  transform: ({ value }) => getFontWeight(value ?? 400) as unknown as FontWeight,
});

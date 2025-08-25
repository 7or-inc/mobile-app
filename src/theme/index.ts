import { createTheme } from '@shopify/restyle';

import { borderRadii, breakpoints, colors, spacing } from './tokens';
import * as fonts from './tokens/fonts';
import { variants } from './variants';

const theme = createTheme({
  colors,
  spacing,
  borderRadii,
  breakpoints,
  ...fonts,
  ...variants,
});

export type Theme = typeof theme;
export default theme;

export * from './props';
export * from './tokens';

import { createTheme, useTheme as useRestyleTheme } from '@shopify/restyle';

import { borderRadii, breakpoints, colors, lightColors, spacing } from './tokens';
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

const lightTheme: Theme = {
  ...theme,
  colors: lightColors,
};

export const getTheme = (mode: ThemeMode) => (mode === 'light' ? lightTheme : theme);
export const useTheme = useRestyleTheme<Theme>;

export type Theme = typeof theme;
export default theme;

export * from './props';
export * from './tokens';

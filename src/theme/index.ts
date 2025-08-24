import { createTheme } from '@shopify/restyle';

import { borderRadii, colors, spacing } from './tokens';

const theme = createTheme({
  colors,
  spacing,
  borderRadii,
  breakpoints: {
    phone: 0,
    tablet: 768,
    desktop: 1024,
  },
  textVariants: {
    h1: {
      fontSize: 32,
      fontWeight: 'bold',
      lineHeight: 40,
    },
    defaults: {
      fontSize: 16,
      color: 'white',
    },
  },
});

export type Theme = typeof theme;
export default theme;

export * from './props';

export const fontSizes = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 20,
  '2xl': 24,
  '3xl': 28,
  '4xl': 36,
  '5xl': 48,
  '6xl': 64,
} as const;
export type FontSizes = typeof fontSizes;

export const lineHeights = {
  xs: 14,
  sm: 16,
  md: 18,
  lg: 20,
  xl: 24,
  '2xl': 32,
  '3xl': 36,
  '4xl': 48,
  '5xl': 56,
  '6xl': 72,
} as const;
export type LineHeights = typeof lineHeights;

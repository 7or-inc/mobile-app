export const palette = {
  blue: '#5DADE2',
  lightBlue: '#A4D7E1',
  green: '#58D68D',
  lightGreen: '#45C877',
  turquoise: '#16A085',
  lightTurquoise: '#1ABC9C',
  lightGrey: '#FDFEFE',
  grey: '#ECF0F1',
  darkGrey: '#2C3E50',
  black: '#11181E',
  pitchBlack: '#000000',
  white: '#FFFFFF',
  transparent: 'transparent',
  red: '#BC3841',
} as const;

export type Palette = typeof palette;

export const colors: Colors = {
  primary: palette.blue,
  secondary: palette.green,
  accent: palette.turquoise,
  background: palette.black,
  foreground: palette.darkGrey,
  error: palette.red,
  ...palette,
} as const satisfies Colors;

export const lightColors: Colors = {
  ...colors,
  background: palette.lightBlue,
  foreground: palette.white,
} as const;

export type Color = 'primary' | 'secondary' | 'accent' | 'background' | 'foreground' | 'error' | keyof Palette;
export type Colors = Record<Color, Palette[keyof Palette]>;

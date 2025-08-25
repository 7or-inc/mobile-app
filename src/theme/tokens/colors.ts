export const colors = {
  primary: '#5DADE2',
  'primary.light': '#A4D7E1',
  secondary: '#58D68D',
  'secondary.light': '#45C877',
  accent: '#16A085',
  'accent.light': '#1ABC9C',
  foreground: '#FDFEFE',
  'foreground.dark': '#ECF0F1',
  background: '#2C3E50',
  'background.dark': '#11181E',
  white: '#FFFFFF',
  black: '#000000',
  transparent: 'transparent',
} as const;

export type Colors = typeof colors;

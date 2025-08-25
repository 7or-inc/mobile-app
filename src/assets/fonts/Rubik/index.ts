const RubikFonts = {
  RubikBlack: require('./Rubik-Black.ttf'),
  RubikBlackItalic: require('./Rubik-BlackItalic.ttf'),
  RubikExtraBold: require('./Rubik-ExtraBold.ttf'),
  RubikExtraBoldItalic: require('./Rubik-ExtraBoldItalic.ttf'),
  RubikBold: require('./Rubik-Bold.ttf'),
  RubikBoldItalic: require('./Rubik-BoldItalic.ttf'),
  RubikSemiBold: require('./Rubik-SemiBold.ttf'),
  RubikSemiBoldItalic: require('./Rubik-SemiBoldItalic.ttf'),
  RubikMedium: require('./Rubik-Medium.ttf'),
  RubikMediumItalic: require('./Rubik-MediumItalic.ttf'),
  RubikRegular: require('./Rubik-Regular.ttf'),
  RubikItalic: require('./Rubik-Italic.ttf'),
  RubikLight: require('./Rubik-Light.ttf'),
  RubikLightItalic: require('./Rubik-LightItalic.ttf'),
};

export const Rubik = {
  900: 'RubikBlack',
  800: 'RubikExtraBold',
  700: 'RubikBold',
  600: 'RubikSemiBold',
  500: 'RubikMedium',
  400: 'RubikRegular',
  300: 'RubikLight',
} as const;

export default RubikFonts;

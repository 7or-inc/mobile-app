const CairoFonts = {
  CairoBlack: require('./Cairo-Black.ttf'),
  CairoExtraBold: require('./Cairo-ExtraBold.ttf'),
  CairoBold: require('./Cairo-Bold.ttf'),
  CairoSemiBold: require('./Cairo-SemiBold.ttf'),
  CairoMedium: require('./Cairo-Medium.ttf'),
  CairoRegular: require('./Cairo-Regular.ttf'),
  CairoLight: require('./Cairo-Light.ttf'),
  CairoExtraLight: require('./Cairo-ExtraLight.ttf'),
};

export const Cairo = {
  900: 'CairoBlack',
  800: 'CairoExtraBold',
  700: 'CairoBold',
  600: 'CairoSemiBold',
  500: 'CairoMedium',
  400: 'CairoRegular',
  300: 'CairoLight',
} as const;

export default CairoFonts;

import * as Font from 'expo-font';
import { useEffect, useState } from 'react';

import CairoFonts from '@/assets/fonts/Cairo';
import RubikFonts from '@/assets/fonts/Rubik';

export const useLoadFonts = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    Font.loadAsync({
      ...CairoFonts,
      ...RubikFonts,
    }).then(() => setLoaded(true));
  }, []);

  return loaded;
};

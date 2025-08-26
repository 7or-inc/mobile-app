import { ThemeProvider } from '@shopify/restyle';
import type React from 'react';

import { useLoadFonts, useThemeMode } from '@/hooks';
import { getTheme } from '@/theme';

interface ProvidersProps {
  children: React.ReactNode;
}

export const Providers = ({ children }: ProvidersProps) => {
  const loaded = useLoadFonts();
  const { mode } = useThemeMode();

  if (!loaded) {
    return null; // or a loading indicator
  }

  return <ThemeProvider theme={getTheme(mode)}>{children}</ThemeProvider>;
};

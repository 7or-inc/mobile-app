import { ThemeProvider } from '@shopify/restyle';
import type React from 'react';

import { useLoadFonts } from '@/hooks';
import theme from '@/theme';

interface ProvidersProps {
  children: React.ReactNode;
}

export const Providers = ({ children }: ProvidersProps) => {
  const loaded = useLoadFonts();

  if (!loaded) {
    return null; // or a loading indicator
  }

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

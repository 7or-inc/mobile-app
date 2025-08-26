import { ThemeProvider } from '@shopify/restyle';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { ReactNode } from 'react';
import { StatusBar } from 'react-native';

import { useLoadFonts, useThemeMode } from '@/hooks';
import { getTheme } from '@/theme';

interface ProvidersProps {
  children: ReactNode;
}

export const Providers = ({ children }: ProvidersProps) => {
  const loaded = useLoadFonts();
  const { mode, isDarkMode } = useThemeMode();

  if (!loaded) {
    return null; // or a loading indicator
  }

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={getTheme(mode)}>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />

        {children}
      </ThemeProvider>
    </QueryClientProvider>
  );
};

const queryClient = new QueryClient();

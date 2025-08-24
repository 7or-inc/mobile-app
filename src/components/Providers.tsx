import { ThemeProvider } from '@shopify/restyle';
import type React from 'react';

import theme from '@/theme';

interface ProvidersProps {
  children: React.ReactNode;
}

export const Providers = ({ children }: ProvidersProps) => <ThemeProvider theme={theme}>{children}</ThemeProvider>;

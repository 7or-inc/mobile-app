import type React from 'react';
import { TamaguiProvider } from 'tamagui';

import { config } from '@/theme';

interface ProvidersProps {
  children: React.ReactNode;
}

export const Providers = ({ children }: ProvidersProps) => (
  <TamaguiProvider config={config}>{children}</TamaguiProvider>
);

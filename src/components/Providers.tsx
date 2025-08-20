import type React from 'react';
import { createTamagui, TamaguiProvider } from 'tamagui';

import { defaultConfig } from '@tamagui/config/v4';

const config = createTamagui(defaultConfig);

interface ProvidersProps {
  children: React.ReactNode;
}

export const Providers = ({ children }: ProvidersProps) => (
  <TamaguiProvider config={config}>{children}</TamaguiProvider>
);

import { defaultConfig } from '@tamagui/config/v4';
import { createTamagui } from 'tamagui';

import { tokens } from './tokens';

export const config = createTamagui({
  ...defaultConfig,
  tokens,
});

type Config = typeof config;

declare module 'tamagui' {
  interface TamaguiCustomConfig extends Config {}
}

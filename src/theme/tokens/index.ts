import { defaultConfig } from '@tamagui/config/v4';
import { createTokens } from 'tamagui';

import { colors } from './colors';

export const tokens = createTokens({
  ...defaultConfig.tokens,
  colors,
});

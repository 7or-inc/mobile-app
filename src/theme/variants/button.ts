import type { ResponsiveValue } from '@shopify/restyle';

import type theme from '..';
import { fontSizes } from '../tokens';

export const buttonVariants = {
  primary: {
    backgroundColor: 'primary',
    borderColor: 'primary',
  },
  secondary: {
    backgroundColor: 'transparent',
    borderColor: 'primary',
  },
  defaults: {
    py: 2,
    px: 4,
    borderRadius: 'md',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    backgroundColor: 'primary',
    borderColor: 'primary',
  },
} as const;

export const buttonTextVariants = {
  primaryButton: {
    fontSize: fontSizes['xl'],
    lineHeight: fontSizes['2xl'],
    color: 'white',
  },
  secondaryButton: {
    fontSize: fontSizes['xl'],
    lineHeight: fontSizes['2xl'],
    color: 'white',
  },
} as const;

export const map = (variant: ResponsiveValue<keyof typeof buttonVariants, typeof theme.breakpoints>) =>
  (variant + 'Button') as keyof typeof buttonTextVariants;

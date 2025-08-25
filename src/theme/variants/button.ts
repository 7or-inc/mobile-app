import { fontSizes, lineHeights } from '../tokens';

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
    lineHeight: lineHeights['xl'],
    color: 'white',
  },
} as const;

export type ButtonVariants = Exclude<keyof typeof buttonVariants, 'defaults'>;
type ButtonTextVariant = keyof typeof buttonTextVariants;

const buttonTextVariantsKeys = Object.keys(buttonTextVariants) as ButtonTextVariant[];

export const getButtonTextVariant = (variant: ButtonVariants | undefined): ButtonTextVariant => {
  const expectedVariant = (variant + 'Button') as ButtonTextVariant;

  if (!variant || !buttonTextVariantsKeys.includes(expectedVariant)) return 'primaryButton';

  return expectedVariant;
};

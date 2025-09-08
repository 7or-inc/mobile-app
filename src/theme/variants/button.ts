import { fontSizes, lineHeights } from '../tokens';

export const buttonVariants = {
  primary: {
    backgroundColor: 'primary',
    borderColor: 'primary',
  },
  secondary: {
    backgroundColor: 'transparent',
    borderColor: 'primary',
    borderWidth: 2,
  },
  link: {
    px: 0,
    py: 0,
    backgroundColor: 'transparent',
    borderColor: 'transparent',
  },
  defaults: {
    py: 2,
    px: 4,
    borderRadius: 'md',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'primary',
  },
} as const;

const textDefaults = {
  fontSize: fontSizes['xl'],
  lineHeight: lineHeights['xl'],
};

export const buttonTextVariants = {
  primaryButton: textDefaults,
  linkButton: {
    ...textDefaults,
    fontSize: fontSizes['xs'],
    lineHeight: lineHeights['xs'],
    color: 'primary',
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

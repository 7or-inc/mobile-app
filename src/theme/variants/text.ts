import { getFontWeightFamily } from '@/assets/fonts/helpers';

import { fontSizes, lineHeights } from '../tokens';
import { buttonTextVariants } from './button';

const headings = {
  h1: {
    fontSize: fontSizes['5xl'],
    lineHeight: lineHeights['5xl'],
  },
  h2: {
    fontSize: fontSizes['4xl'],
    lineHeight: lineHeights['4xl'],
  },
  h3: {
    fontSize: fontSizes['2xl'],
    lineHeight: lineHeights['2xl'],
  },
  h4: {
    fontSize: fontSizes['xl'],
    lineHeight: lineHeights['xl'],
  },
  h5: {
    fontSize: fontSizes['md'],
    lineHeight: lineHeights['md'],
  },
  h6: {
    fontSize: fontSizes['sm'],
    lineHeight: lineHeights['sm'],
  },
};

const defaults = {
  fontSize: fontSizes['md'],
  lineHeight: lineHeights['lg'],
  color: 'white',
  ...getFontWeightFamily(400),
};

export const textVariants = {
  defaults,
  normal: defaults,

  ...headings,
  ...buttonTextVariants,
} as const;

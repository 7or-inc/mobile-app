import { fontSizes, lineHeights } from '../tokens';

export const inputVariants = {
  defaults: {
    backgroundColor: 'black',
    borderColor: 'darkGrey',
    borderWidth: 3,
    borderRadius: 'md',
    padding: '2.5',
    color: 'grey',
    fontSize: fontSizes['xs'],
    lineHeight: lineHeights['xs'],
  },
  focused: {
    borderColor: 'primary',
  },
  error: {
    borderColor: 'red',
    color: 'red',
  },
} as const;

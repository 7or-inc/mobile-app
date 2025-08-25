import {
  color,
  createRestyleComponent,
  createVariant,
  layout,
  type ColorProps,
  type LayoutProps,
  type VariantProps,
} from '@shopify/restyle';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';

import { base, type BaseProps, type Theme } from '@/theme';
import { getButtonTextVariant, type ButtonVariants } from '@/theme/variants/button';
import { Text } from './Text';

type ButtonProps = TouchableOpacityProps &
  BaseProps &
  LayoutProps<Theme> &
  ColorProps<Theme> &
  VariantProps<Theme, 'buttonVariants'>;

const RestyleButton = createRestyleComponent<ButtonProps, Theme>(
  [...base, layout, color, createVariant({ themeKey: 'buttonVariants' })],
  TouchableOpacity
);

export const Button = ({ children, ...props }: ButtonProps) => (
  <RestyleButton activeOpacity={0.7} {...props}>
    <Text variant={getButtonTextVariant(props.variant as ButtonVariants)}>{children}</Text>
  </RestyleButton>
);

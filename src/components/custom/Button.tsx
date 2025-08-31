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
import { Loader } from './Loader';
import { Text } from './Text';

type RestyleButtonProps = TouchableOpacityProps &
  BaseProps &
  LayoutProps<Theme> &
  ColorProps<Theme> &
  VariantProps<Theme, 'buttonVariants'>;

const RestyleButton = createRestyleComponent<RestyleButtonProps, Theme>(
  [...base, layout, color, createVariant({ themeKey: 'buttonVariants' })],
  TouchableOpacity
);

interface ButtonProps extends RestyleButtonProps {
  loading?: boolean;
}

export const Button = ({ children, loading, disabled, ...props }: ButtonProps) => (
  <RestyleButton activeOpacity={0.7} {...props} disabled={loading || disabled} opacity={disabled || loading ? 0.5 : 1}>
    {loading ? <Loader /> : <Text variant={getButtonTextVariant(props.variant as ButtonVariants)}>{children}</Text>}
  </RestyleButton>
);

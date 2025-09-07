import {
  color,
  createRestyleComponent,
  createVariant,
  layout,
  type ColorProps,
  type LayoutProps,
  type VariantProps,
} from '@shopify/restyle';
import { useState } from 'react';
import { TextInput, type TextInputProps } from 'react-native';

import { useLanguage, useThemeMode } from '@/hooks';
import { base, fonts, useTheme, type BaseProps, type Color, type FontsProps, type Theme } from '@/theme';

import { Text } from './Text';
import { View } from './View';

type RestyleInputProps = BaseProps &
  FontsProps &
  LayoutProps<Theme> &
  ColorProps<Theme> &
  VariantProps<Theme, 'inputVariants'> &
  TextInputProps;

const RestyleInput = createRestyleComponent<RestyleInputProps, Theme>(
  [...base, ...fonts, layout, color, createVariant({ themeKey: 'inputVariants' })],
  TextInput
);

type State = 'default' | 'focused' | 'error';
export interface InputProps extends Omit<RestyleInputProps, 'placeholderTextColor'> {
  ref?: React.Ref<TextInput>;
  placeholderColor?: Color;
  onStateChange?: (state: State) => void;
  errorText?: string;
  isError?: boolean;
}

export const Input = ({ children, placeholderColor, isError, errorText, ...props }: InputProps) => {
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const { inputVariants, colors } = useTheme();
  const { isDarkMode } = useThemeMode();
  const { isAr } = useLanguage();

  return (
    <View gap="1">
      <RestyleInput
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        variant={isError ? 'error' : isFocused ? 'focused' : undefined}
        {...props}
        textAlign={isAr ? 'right' : 'left'}
        placeholderTextColor={colors[isError ? 'red' : (placeholderColor ?? inputVariants['defaults']['color'])]}
        keyboardAppearance={isDarkMode ? 'dark' : 'light'}
        secureTextEntry={props.secureTextEntry || props.textContentType === 'password'}
        autoCapitalize={props.textContentType === 'password' ? 'none' : 'sentences'}
        autoCorrect={props.textContentType !== 'password'}
      >
        {children}
      </RestyleInput>

      {!!errorText && (
        <Text color="red" size="xs" textAlign={isAr ? 'right' : 'left'}>
          {errorText}
        </Text>
      )}
    </View>
  );
};

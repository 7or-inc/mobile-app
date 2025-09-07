import { OtpInput as ReactNativeOtpInput, OtpInputProps as ReactNativeOtpInputProps } from 'react-native-otp-entry';

import { useLanguage } from '@/hooks';
import { useTheme } from '@/theme';

import { Text } from './Text';
import { View } from './View';

interface OTPInputProps extends ReactNativeOtpInputProps {
  isError?: boolean;
  errorText?: string;
}

export const OtpInput = ({ numberOfDigits = 6, isError, errorText, ...props }: OTPInputProps) => {
  const { isAr } = useLanguage();
  const { colors, inputVariants } = useTheme();

  return (
    <View gap="1">
      <ReactNativeOtpInput
        numberOfDigits={numberOfDigits}
        type="numeric"
        blurOnFilled
        autoFocus
        theme={{
          containerStyle: { flexDirection: isAr ? 'row-reverse' : 'row' },
          pinCodeTextStyle: {
            color: colors[inputVariants.defaults.color],
          },
          pinCodeContainerStyle: {
            borderColor: colors[isError ? inputVariants.error.borderColor : inputVariants.defaults.borderColor],
          },
          filledPinCodeContainerStyle: {
            borderColor: colors[inputVariants.focused.borderColor],
          },
          focusedPinCodeContainerStyle: {
            borderColor: colors[inputVariants.focused.borderColor],
          },
          focusStickStyle: {
            backgroundColor: colors[inputVariants.defaults.color],
          },
        }}
        {...props}
      />

      {!!errorText && (
        <Text color="red" size="xs" textAlign={isAr ? 'right' : 'left'}>
          {errorText}
        </Text>
      )}
    </View>
  );
};

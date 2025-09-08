import { zodResolver } from '@hookform/resolvers/zod';
import { useLocalSearchParams } from 'expo-router';
import { Controller, useForm, type SubmitHandler } from 'react-hook-form';

import { OTP_LENGTH, otpSchema, type OTPSchema } from '@/api';
import { useCountDown, useLanguage, useSendOTPMutation, useVerifyOTPMutation } from '@/hooks';
import { useTranslate } from '@/i18n';

import { Button, OtpInput, Text, View } from '../custom';
import type { VerifyOTPParams } from './types';

const defaultValues: OTPSchema = {
  otp: '',
};

export const VerifyOTP = () => {
  const { authId, phoneNumber } = useLocalSearchParams<Omit<VerifyOTPParams, ''>>();

  const t = useTranslate();
  const { isAr } = useLanguage();
  const countDown = useCountDown(60);
  const form = useForm<OTPSchema>({
    defaultValues,
    mode: 'onBlur',
    resolver: zodResolver(otpSchema(t)),
    shouldFocusError: true,
  });
  const sendOTPMutation = useSendOTPMutation();
  const otpMutation = useVerifyOTPMutation({ authId });

  const onSubmit: SubmitHandler<OTPSchema> = (data: OTPSchema) => {
    if (otpMutation.isPending) return;

    otpMutation.mutate(data, {
      onError: (error) => {
        if (error.response?.status === 400)
          form.setError('otp', {
            type: 'custom',
            message: t('auth.errors.otp-invalid-or-expired'),
          });
      },
    });
  };

  return (
    <View px="2.5" py="4" flex={1} width="100%" justifyContent="space-between">
      <View gap="12">
        <Text variant="h1" size="6xl" fontHeight="6xl" textAlign={isAr ? 'right' : 'left'}>
          {t('auth.verify-otp')}
        </Text>

        <View gap="6" justifyContent={isAr ? 'flex-end' : 'flex-start'}>
          <Text color="foreground" size="md" textAlign={isAr ? 'right' : 'left'}>
            {t('auth.verify-otp.enter-otp-sent-to', {
              num: OTP_LENGTH,
              phoneNumber,
              Number: (chunks) => <Text color="primary">{chunks}</Text>,
              Style: (chunks) => <Text color="accent">{chunks}</Text>,
            })}
          </Text>

          <Controller
            control={form.control}
            name="otp"
            render={({ field, fieldState }) => (
              <OtpInput
                isError={!!fieldState.error}
                errorText={fieldState.error?.message}
                onTextChange={field.onChange}
                disabled={otpMutation.isPending || otpMutation.isSuccess}
                onFilled={() => form.handleSubmit(onSubmit)()}
              />
            )}
          />
        </View>
      </View>

      <View width="100%" alignItems="center" gap="5">
        <Button
          width="100%"
          disabled={!form.formState.isValid || otpMutation.isSuccess}
          loading={otpMutation.isPending}
          onPress={form.handleSubmit(onSubmit)}
        >
          {t('action.verify')}
        </Button>

        <View flexDirection={isAr ? 'row-reverse' : 'row'} alignItems="center" gap="2">
          {countDown.isRunning ? (
            <Text color="darkGrey" size="xs" textAlign="center">
              {t('auth.verify-otp.resend-otp-countdown', {
                countdown: countDown.count,
                Style: (chunks) => (
                  <Text color="primary" size="xs">
                    {chunks}
                  </Text>
                ),
              })}
            </Text>
          ) : (
            <>
              <Text color="darkGrey" size="xs" textAlign="center">
                {t('auth.verify-otp.resend-otp')}
              </Text>

              <Button
                variant="link"
                disabled={sendOTPMutation.isPending || otpMutation.isSuccess}
                onPress={() => sendOTPMutation.mutate(authId, { onSettled: () => countDown.restart() })}
              >
                {t('action.resend')}
              </Button>
            </>
          )}
        </View>
      </View>
    </View>
  );
};

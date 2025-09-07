import { zodResolver } from '@hookform/resolvers/zod';
import { useLocalSearchParams } from 'expo-router';
import { Controller, useForm, type SubmitHandler } from 'react-hook-form';

import { otpSchema, type OTPRequest, type OTPSchema } from '@/api';
import { useLanguage, useOTPMutation } from '@/hooks';
import { useTranslate } from '@/i18n';

import { Button, OtpInput, Text, View } from '../custom';

const defaultValues: OTPSchema = {
  otp: '',
};

export const VerifyOTP = () => {
  const t = useTranslate();
  const params = useLocalSearchParams<Omit<OTPRequest, 'otp'>>();

  const form = useForm<OTPSchema>({
    defaultValues,
    mode: 'onBlur',
    resolver: zodResolver(otpSchema(t)),
    shouldFocusError: true,
  });

  const { isAr } = useLanguage();
  const otpMutation = useOTPMutation(params);

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
              num: 6,
              phoneNumber: params.phoneNumber ?? '',
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
      </View>
    </View>
  );
};

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'expo-router';
import { useRef } from 'react';
import { Controller, useForm, type SubmitHandler } from 'react-hook-form';
import type { TextInput } from 'react-native';

import { forgotPasswordSchema, type ForgotPasswordSchema } from '@/api';
import { useLanguage, useResetPasswordMutation } from '@/hooks';
import { useTranslate } from '@/i18n';

import { Button, Input, Text, View } from '../custom';

const defaultValues: ForgotPasswordSchema = {
  phoneNumber: '',
  newPassword: '',
};

export const ForgotPassword = () => {
  const router = useRouter();

  const t = useTranslate();
  const { isAr } = useLanguage();
  const newPasswordFieldRef = useRef<TextInput>(null);
  const form = useForm<ForgotPasswordSchema>({
    defaultValues,
    mode: 'onChange',
    resolver: zodResolver(forgotPasswordSchema(t)),
    shouldFocusError: true,
  });
  const resetPasswordMutation = useResetPasswordMutation();

  const onSubmit: SubmitHandler<ForgotPasswordSchema> = (data: ForgotPasswordSchema) => {
    if (resetPasswordMutation.isPending) return;

    resetPasswordMutation.mutate(data, {
      onSuccess: ({ authId }) =>
        router.push({
          pathname: '/(auth)/verify-otp',
          params: { authId, phoneNumber: data.phoneNumber },
        }),
      onError: (error) => {
        if (error.response?.status === 404)
          form.setError('phoneNumber', {
            type: 'custom',
            message: t('auth.log-in.errors.phone-number-not-found'),
          });
      },
    });
  };

  return (
    <View px="2.5" py="4" flex={1} width="100%" justifyContent="space-between">
      <View gap="12">
        <Text variant="h1" size="6xl" fontHeight="6xl" textAlign={isAr ? 'right' : 'left'}>
          {t('auth.reset-password')}
        </Text>

        <View gap="7">
          <Controller
            control={form.control}
            name="phoneNumber"
            render={({ field, fieldState }) => (
              <Input
                placeholder={t('auth.phone-number', {}, { string: true })}
                isError={fieldState.invalid}
                onChangeText={field.onChange}
                keyboardType="phone-pad"
                enterKeyHint="next"
                onSubmitEditing={() => newPasswordFieldRef.current?.focus()}
                value={field.value}
                errorText={fieldState.error?.message}
              />
            )}
          />

          <Controller
            control={form.control}
            name="newPassword"
            render={({ field, fieldState }) => (
              <Input
                ref={newPasswordFieldRef}
                placeholder={t('auth.new-password', {}, { string: true })}
                isError={fieldState.invalid}
                onChangeText={field.onChange}
                textContentType="password"
                enterKeyHint="enter"
                value={field.value}
                onSubmitEditing={form.handleSubmit(onSubmit)}
                errorText={fieldState.error?.message}
              />
            )}
          />
        </View>
      </View>

      <Button
        width="100%"
        disabled={!form.formState.isValid || resetPasswordMutation.isSuccess}
        loading={resetPasswordMutation.isPending}
        onPress={form.handleSubmit(onSubmit)}
      >
        {t('action.reset')}
      </Button>
    </View>
  );
};

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'expo-router';
import { useRef } from 'react';
import { Controller, useForm, type SubmitHandler } from 'react-hook-form';
import type { TextInput } from 'react-native';

import { signupSchema, type SignupSchema } from '@/api';
import { useLanguage, useSignupMutation } from '@/hooks';
import { useTranslate } from '@/i18n';

import { Button, Input, Link, Text, View } from '../custom';

const defaultValues: SignupSchema = {
  phoneNumber: '',
  password: '',
  firstName: '',
  lastName: '',
};

export const SignUp = () => {
  const router = useRouter();
  const lastNameFieldRef = useRef<TextInput>(null);
  const phoneNumberFieldRef = useRef<TextInput>(null);
  const passwordFieldRef = useRef<TextInput>(null);

  const t = useTranslate();
  const { isAr } = useLanguage();
  const form = useForm<SignupSchema>({
    defaultValues,
    mode: 'onChange',
    resolver: zodResolver(signupSchema(t)),
    shouldFocusError: true,
  });
  const signupMutation = useSignupMutation();

  const onSubmit: SubmitHandler<SignupSchema> = (data: SignupSchema) => {
    if (signupMutation.isPending) return;

    signupMutation.mutate(data, {
      onSuccess: ({ authId }) => {
        router.push({
          pathname: '/(auth)/verify-otp',
          params: { authId, phoneNumber: data.phoneNumber },
        });
      },
      onError: (error) => {
        if (error.response?.status === 409)
          form.setError('phoneNumber', {
            type: 'custom',
            message: t('auth.errors.phone-number-already-in-use'),
          });
      },
    });
  };

  return (
    <View px="2.5" py="4" flex={1} width="100%" justifyContent="space-between">
      <View gap="12">
        <Text variant="h1" size="6xl" fontHeight="6xl" textAlign={isAr ? 'right' : 'left'}>
          {t('auth.sign-up')}
        </Text>

        <View gap="6" justifyContent={isAr ? 'flex-end' : 'flex-start'}>
          <Controller
            control={form.control}
            name="firstName"
            render={({ field, fieldState }) => (
              <Input
                placeholder={t('auth.first-name', {}, { string: true })}
                isError={fieldState.invalid}
                onChangeText={field.onChange}
                keyboardType="default"
                enterKeyHint="next"
                onSubmitEditing={() => lastNameFieldRef.current?.focus()}
                value={field.value}
                errorText={fieldState.error?.message}
              />
            )}
          />

          <Controller
            control={form.control}
            name="lastName"
            render={({ field, fieldState }) => (
              <Input
                placeholder={t('auth.last-name', {}, { string: true })}
                isError={fieldState.invalid}
                onChangeText={field.onChange}
                keyboardType="default"
                enterKeyHint="next"
                onSubmitEditing={() => phoneNumberFieldRef.current?.focus()}
                value={field.value}
                errorText={fieldState.error?.message}
                ref={lastNameFieldRef}
              />
            )}
          />

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
                onSubmitEditing={() => passwordFieldRef.current?.focus()}
                value={field.value}
                errorText={fieldState.error?.message}
                ref={phoneNumberFieldRef}
              />
            )}
          />

          <Controller
            control={form.control}
            name="password"
            render={({ field, fieldState }) => (
              <Input
                ref={passwordFieldRef}
                placeholder={t('auth.password', {}, { string: true })}
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

      <View width="100%" alignItems="center" gap="5">
        <Button
          width="100%"
          disabled={!form.formState.isValid || signupMutation.isSuccess}
          loading={signupMutation.isPending}
          onPress={form.handleSubmit(onSubmit)}
        >
          {t('auth.sign-up')}
        </Button>

        <Text color="darkGrey" size="xs">
          {t('auth.sign-up.already-have-account', {
            Style: (chunks) => <Link href="/(auth)/log-in">{chunks}</Link>,
          })}
        </Text>
      </View>
    </View>
  );
};

import { zodResolver } from '@hookform/resolvers/zod';
import { useRef } from 'react';
import { Controller, useForm, type SubmitHandler } from 'react-hook-form';
import type { TextInput } from 'react-native';

import { loginSchema, type LoginSchema } from '@/api';
import { useLanguage, useLoginMutation } from '@/hooks';
import { useTranslate } from '@/i18n';

import { Button, Input, Link, Text, View } from '../custom';

const defaultValues: LoginSchema = {
  phoneNumber: '',
  password: '',
};

export const Login = () => {
  const t = useTranslate();

  const form = useForm<LoginSchema>({
    defaultValues,
    mode: 'onChange',
    resolver: zodResolver(loginSchema(t)),
  });

  const { isAr } = useLanguage();
  const loginMutation = useLoginMutation();
  const passwordFieldRef = useRef<TextInput>(null);

  const onSubmit: SubmitHandler<LoginSchema> = (data: LoginSchema) => {
    if (!form.formState.isValid || loginMutation.isPending) return;

    loginMutation.mutate(data, {
      onError: (error) => {
        if (error.response?.status === 401) {
          form.resetField('password');
          form.setError('password', {
            type: 'custom',
            message: t('auth.log-in.errors.invalid-password'),
          });
        }

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
        <Text variant="h1" size="6xl" fontHeight="6xl">
          {t('auth.log-in')}
        </Text>

        <View gap="3.5" justifyContent={isAr ? 'flex-end' : 'flex-start'}>
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
                  onSubmitEditing={() => passwordFieldRef.current?.focus()}
                  value={field.value}
                  errorText={fieldState.error?.message}
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

          <Link href="/(auth)/forgot-password" size="xs" weight={400}>
            {t('auth.forgot-password')}
          </Link>
        </View>
      </View>

      <View width="100%" alignItems="center" gap="5">
        <Button
          width="100%"
          disabled={!form.formState.isValid || loginMutation.isSuccess}
          loading={loginMutation.isPending}
          onPress={form.handleSubmit(onSubmit)}
        >
          {t('auth.log-in')}
        </Button>

        <Text color="darkGrey" size="xs">
          {t('auth.log-in.new-with-us', {
            Style: (chunks) => <Link href="/(auth)/sign-up">{chunks}</Link>,
          })}
        </Text>
      </View>
    </View>
  );
};

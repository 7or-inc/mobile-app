import { useMutation, type MutationOptions } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { hor, type ErrorResponse, type ForgotPasswordResponse, type ForgotPasswordSchema } from '@/api';
import { COUNTRY_CODE } from '@/consts';

import { useSendOTPMutation } from './useSendOTPMutation';

const mutationKey = ['reset-password'];

const mutationFn = async ({ phoneNumber, newPassword }: ForgotPasswordSchema) =>
  hor
    .post<ForgotPasswordResponse>('/auth/reset-password', {
      phone_number: `${COUNTRY_CODE}${phoneNumber}`,
      new_password: newPassword,
    })
    .then((res) => res.data);

export const useResetPasswordMutation = (
  options: MutationOptions<ForgotPasswordResponse, AxiosError<ErrorResponse>, ForgotPasswordSchema> = {}
) => {
  const sendOTPMutation = useSendOTPMutation();

  return useMutation<ForgotPasswordResponse, AxiosError<ErrorResponse>, ForgotPasswordSchema>({
    ...options,
    mutationKey,
    mutationFn,
    onSuccess: (...data) => {
      sendOTPMutation.mutate(data[0].authId);

      options.onSuccess?.(...data);
    },
  });
};

useResetPasswordMutation.mutationKey = mutationKey;
useResetPasswordMutation.mutationFn = mutationFn;

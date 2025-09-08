import { useMutation, type MutationOptions } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { hor, type ErrorResponse, type SignupResponse, type SignupSchema } from '@/api';
import { COUNTRY_CODE } from '@/consts';

import { useSendOTPMutation } from './useSendOTPMutation';

const mutationKey = ['signup'];

const mutationFn = async ({ phoneNumber, firstName, lastName, ...data }: SignupSchema) =>
  hor
    .post<SignupResponse>('/auth/signup', {
      ...data,
      phone_number: `${COUNTRY_CODE}${phoneNumber}`,
      first_name: firstName,
      last_name: lastName,
    })
    .then((res) => res.data);

export const useSignupMutation = (
  options: MutationOptions<SignupResponse, AxiosError<ErrorResponse>, SignupSchema> = {}
) => {
  const sendOTPMutation = useSendOTPMutation();

  return useMutation<SignupResponse, AxiosError<ErrorResponse>, SignupSchema>({
    ...options,
    mutationKey,
    mutationFn,
    onSuccess: (...data) => {
      sendOTPMutation.mutate(data[0].authId);

      options.onSuccess?.(...data);
    },
  });
};

useSignupMutation.mutationKey = mutationKey;
useSignupMutation.mutationFn = mutationFn;

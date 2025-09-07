import { useMutation, type MutationOptions } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { hor, type ErrorResponse, type OTPRequest, type OTPResponse, type OTPSchema } from '@/api';
import { COUNTRY_CODE } from '@/consts';
import { useAuthStore } from '@/stores';

type OTPBase = Omit<OTPRequest, 'otp'>;

const mutationKey = (data: OTPBase) => ['otp', data] as const;

const mutationFn = (data: OTPBase) => async (rest: OTPSchema) =>
  hor
    .post<OTPResponse>('/auth/otp-verify', {
      ...data,
      phone_number: `${COUNTRY_CODE}${data.phoneNumber}`,
      ...rest,
    })
    .then((res) => res.data);

export const useOTPMutation = (
  data: OTPBase,
  options: MutationOptions<OTPResponse, AxiosError<ErrorResponse>, OTPSchema> = {}
) => {
  const login = useAuthStore((state) => state.login);

  return useMutation<OTPResponse, AxiosError<ErrorResponse>, OTPSchema>({
    ...options,
    mutationKey: mutationKey(data),
    mutationFn: mutationFn(data),
    onSuccess: (...data) => {
      login(data[0].token);

      options.onSuccess?.(...data);
    },
  });
};

useOTPMutation.mutationKey = mutationKey;
useOTPMutation.mutationFn = mutationFn;

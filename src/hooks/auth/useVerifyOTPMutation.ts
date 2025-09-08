import { useMutation, type MutationOptions } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { hor, type ErrorResponse, type OTPRequest, type OTPResponse, type OTPSchema } from '@/api';
import { useAuthStore } from '@/stores';

type OTPBase = Omit<OTPRequest, 'otp'>;

const mutationKey = (data: OTPBase) => ['verify-otp', data] as const;

const mutationFn = (data: OTPBase) => async (rest: OTPSchema) =>
  hor.post<OTPResponse>('/auth/otp-verify', { ...data, ...rest }).then((res) => res.data);

export const useVerifyOTPMutation = (
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

useVerifyOTPMutation.mutationKey = mutationKey;
useVerifyOTPMutation.mutationFn = mutationFn;

import { useMutation, type MutationOptions } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { hor, type ErrorResponse, type SendOTPResponse } from '@/api';

const mutationKey = ['send-otp'];

const mutationFn = async (authId: string) =>
  hor.post<SendOTPResponse>('/auth/send-otp', { authId }).then((res) => res.data);

export const useSendOTPMutation = (options: MutationOptions<SendOTPResponse, AxiosError<ErrorResponse>, string> = {}) =>
  useMutation<SendOTPResponse, AxiosError<ErrorResponse>, string>({
    ...options,
    mutationKey,
    mutationFn: mutationFn,
  });

useSendOTPMutation.mutationKey = mutationKey;
useSendOTPMutation.mutationFn = mutationFn;

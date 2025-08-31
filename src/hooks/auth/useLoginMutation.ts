import { useMutation, type MutationOptions } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { hor, type ErrorResponse, type LoginResponse, type LoginSchema } from '@/api';
import { useAuthStore } from '@/stores';

const mutationKey = ['login'];

const mutationFn = async ({ phoneNumber, ...data }: LoginSchema) =>
  hor.post<LoginResponse>('/auth/login', { ...data, phone_number: phoneNumber }).then((res) => res.data.token);

export const useLoginMutation = (options: MutationOptions<string, AxiosError<ErrorResponse>, LoginSchema> = {}) => {
  const login = useAuthStore((state) => state.login);

  return useMutation<string, AxiosError<ErrorResponse>, LoginSchema>({
    mutationKey,
    mutationFn,
    onSuccess: (...data) => {
      login(data[0]);

      options.onSuccess?.(...data);
    },
  });
};

useLoginMutation.mutationKey = mutationKey;
useLoginMutation.mutationFn = mutationFn;

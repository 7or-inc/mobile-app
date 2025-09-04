import { useMutation, type MutationOptions } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { hor, type ErrorResponse, type SignupResponse, type SignupSchema } from '@/api';

const mutationKey = ['signup'];

const mutationFn = async ({ phoneNumber, isAdmin, firstName, lastName, ...data }: SignupSchema) =>
  hor
    .post<SignupResponse>('/auth/signup', {
      ...data,
      phone_number: `2${phoneNumber}`,
      is_admin: isAdmin,
      first_name: firstName,
      last_name: lastName,
    })
    .then((res) => res.data);

export const useSignupMutation = (
  options: MutationOptions<SignupResponse, AxiosError<ErrorResponse>, SignupSchema> = {}
) =>
  useMutation<SignupResponse, AxiosError<ErrorResponse>, SignupSchema>({
    ...options,
    mutationKey,
    mutationFn,
  });

useSignupMutation.mutationKey = mutationKey;
useSignupMutation.mutationFn = mutationFn;

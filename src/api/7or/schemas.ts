import { z } from 'zod';

import type { TranslationFn } from '@/i18n/types';

import { OTP_LENGTH } from './const';

export const loginSchema = (t: TranslationFn) =>
  z.object({
    phoneNumber: z
      .string({ error: t('auth.errors.phone-number-required', {}, { string: true }) })
      .refine((val) => /^01\d*$/.test(val), {
        message: t('auth.errors.phone-number-invalid', {}, { string: true }),
      })
      .length(11, { message: t('auth.errors.phone-number-must-equal-to', { num: 11 }, { string: true }) }),
    password: z
      .string({
        error: t('auth.errors.password-required', {}, { string: true }),
      })
      .min(3, { message: t('auth.errors.password-must-be-at-least', { num: 3 }, { string: true }) }),
  });

export type LoginSchema = z.infer<ReturnType<typeof loginSchema>>;

export const signupSchema = (t: TranslationFn) =>
  z.object({
    ...loginSchema(t).shape,
    firstName: z
      .string({ error: t('auth.errors.first-name-required', {}, { string: true }) })
      .min(2, { message: t('auth.errors.first-name-must-be-at-least', { num: 2 }, { string: true }) }),
    lastName: z
      .string({ error: t('auth.errors.last-name-required', {}, { string: true }) })
      .min(2, { message: t('auth.errors.last-name-must-be-at-least', { num: 2 }, { string: true }) }),
  });

export type SignupSchema = z.infer<ReturnType<typeof signupSchema>>;

export const otpSchema = (t: TranslationFn) =>
  z.object({
    otp: z
      .string()
      .length(OTP_LENGTH, { message: t('auth.errors.otp-must-be', { num: OTP_LENGTH }, { string: true }) }),
  });

export type OTPSchema = z.infer<ReturnType<typeof otpSchema>>;

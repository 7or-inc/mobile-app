import { z } from 'zod';

import type { TranslationFn } from '@/i18n/types';

export const loginSchema = (t: TranslationFn) =>
  z.object({
    phoneNumber: z
      .string({ error: t('auth.errors.phone-number-required', {}, { string: true }) })
      .refine((val) => Number(val), { message: t('auth.errors.phone-number-invalid', {}, { string: true }) })
      .min(11, { message: t('auth.errors.phone-number-must-be-at-least', { num: 11 }, { string: true }) }),
    password: z
      .string({
        error: t('auth.errors.password-required', {}, { string: true }),
      })
      .min(3, { message: t('auth.errors.password-must-be-at-least', { num: 3 }, { string: true }) }),
  });

export type LoginSchema = z.infer<ReturnType<typeof loginSchema>>;

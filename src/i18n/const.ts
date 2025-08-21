import ar from './ar';
import en from './en';

import type { Translation } from './types';

export const resources = { en, ar } satisfies Record<Language, Translation>;
export const languages: Language[] = ['en', 'ar'];

import { defineRouting } from 'next-intl/routing';
import { config } from '@/config';

export const routing = defineRouting({
  locales: config.languages.map((e) => e.value),
  defaultLocale: 'en',
});

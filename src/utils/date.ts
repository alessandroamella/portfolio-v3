import { capitalize } from './string';

// Use IntL API to get the i18n-ed month name, without having to create a
// mapping of month names for each locale
export function formatMonthYear(locale: string, date: Date): string {
  return capitalize(
    new Intl.DateTimeFormat(locale, { month: 'long', year: 'numeric' }).format(
      date,
    ),
  );
}

import { capitalize } from './string';

// Use IntL API to get the i18n-ed month name, without having to create a
// mapping of month names for each locale
function monthYearFormat(locale: string): Intl.DateTimeFormat {
  return new Intl.DateTimeFormat(locale, { month: 'long', year: 'numeric' });
}

// e.g. "July 2021" / "Luglio 2021"
export function formatMonthYear(locale: string, date: Date): string {
  return capitalize(monthYearFormat(locale).format(date));
}

// e.g. "March 2023 - July 2023" / "Marzo 2023 - Luglio 2023".
// Note that Intl collapses the range when both ends fall in the same month, so
// passing the same date twice returns just "July 2021"
export function formatMonthYearRange(
  locale: string,
  start: Date,
  end: Date,
): string {
  return capitalize(monthYearFormat(locale).formatRange(start, end));
}

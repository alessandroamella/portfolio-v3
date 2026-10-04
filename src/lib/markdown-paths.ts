// Kept free of message/content imports so the proxy can use it cheaply

import { config } from '@/config';

export const markdownPages = ['home', 'countries'] as const;
export type MarkdownPage = (typeof markdownPages)[number];

const locales = config.languages.map((e) => e.value);
export const defaultLocale = 'en';

// Internal route handler that renders the Markdown, see src/app/md
export function markdownHandlerPath(locale: string, page: MarkdownPage) {
  return `/md/${locale}/${page}`;
}

// The default locale is unprefixed, matching `localePrefix: 'as-needed'`
function localePrefix(locale: string) {
  return locale === defaultLocale ? '' : `/${locale}`;
}

// Public URL of a page's Markdown alternate, e.g. /index.md, /it/countries.md
export function markdownPath(locale: string, page: MarkdownPage): string {
  const prefix = localePrefix(locale);
  if (page !== 'home') return `${prefix}/${page}.md`;
  return prefix ? `${prefix}.md` : '/index.md';
}

// Public URL of a page's HTML version
export function htmlPath(locale: string, page: MarkdownPage): string {
  const prefix = localePrefix(locale);
  if (page !== 'home') return `${prefix}/${page}`;
  return prefix || '/';
}

// Maps an HTML page path (/, /it, /countries, /it/countries) to its page.
// The locale is null when the path has no prefix (next-intl decides then)
export function parsePagePath(
  pathname: string,
): { locale: string | null; page: MarkdownPage } | null {
  const segments = pathname.split('/').filter(Boolean);
  const locale = locales.includes(segments[0]) ? segments.shift() : null;
  if (segments.length > 1) return null;
  // "home" is only an internal name, its URL is the locale root
  if (segments[0] === 'home') return null;
  const page = (segments[0] ?? 'home') as MarkdownPage;
  if (!markdownPages.includes(page)) return null;
  return { locale: locale ?? null, page };
}

// Maps a Markdown URL (/index.md, /it.md, /countries.md, /it/countries.md),
// prefixed default locale URLs like /en.md work too
export function parseMarkdownPath(
  pathname: string,
): { locale: string; page: MarkdownPage } | null {
  if (!pathname.endsWith('.md')) return null;
  const base = pathname.slice(0, -'.md'.length);
  if (base === '/index') return { locale: defaultLocale, page: 'home' };
  const parsed = parsePagePath(base);
  if (!parsed) return null;
  return { locale: parsed.locale ?? defaultLocale, page: parsed.page };
}

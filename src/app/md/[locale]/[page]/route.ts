import { hasLocale } from 'next-intl';
import { config } from '@/config';
import { routing } from '@/i18n/routing';
import { renderPageMarkdown } from '@/lib/markdown';
import {
  htmlPath,
  type MarkdownPage,
  markdownPages,
} from '@/lib/markdown-paths';

// Not meant to be hit directly: src/proxy.ts rewrites /<page>.md and
// `Accept: text/markdown` requests here
export async function GET(
  _req: Request,
  { params }: { params: Promise<{ locale: string; page: string }> },
) {
  const { locale, page } = await params;
  if (
    !hasLocale(routing.locales, locale) ||
    !markdownPages.includes(page as MarkdownPage)
  ) {
    return new Response('Not found\n', { status: 404 });
  }

  const html = `${config.siteUrl}${htmlPath(locale, page as MarkdownPage)}`;
  return new Response(await renderPageMarkdown(locale, page as MarkdownPage), {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'Content-Language': locale,
      Vary: 'Accept',
      Link: `<${html}>; rel="canonical", <${html}>; rel="alternate"; type="text/html"`,
    },
  });
}

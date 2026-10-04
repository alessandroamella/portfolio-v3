import { type NextRequest, NextResponse } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { config as nextConfig } from './config';
import {
  defaultLocale,
  type MarkdownPage,
  markdownHandlerPath,
  markdownPath,
  parseMarkdownPath,
  parsePagePath,
} from './lib/markdown-paths';

const intlMiddleware = createMiddleware({
  // A list of all locales that are supported
  locales: nextConfig.languages.map((e) => e.value),

  // Used when no locale matches
  defaultLocale,

  // This function is called for each incoming request to determine the locale
  localePrefix: 'as-needed',

  // Configure domain-specific locale detection - setting to true to use default behavior
  localeDetection: true,
});

type Representation = 'html' | 'markdown' | null;

// q-value of the most specific media range in `accept` matching `type`
function qualityOf(
  ranges: { type: string; q: number }[],
  type: string,
): number {
  const [main] = type.split('/');
  const match =
    ranges.find((r) => r.type === type) ??
    ranges.find((r) => r.type === `${main}/*`) ??
    ranges.find((r) => r.type === '*/*');
  return match?.q ?? 0;
}

// Picks HTML or Markdown from the Accept header comparing q-values (not by
// substring), null when neither is acceptable
function negotiate(accept: string | null): Representation {
  if (!accept?.trim()) return 'html';

  const ranges = accept.split(',').map((part) => {
    const [type, ...params] = part.trim().toLowerCase().split(';');
    const q = params
      .map((p) => p.trim().split('='))
      .find(([key]) => key === 'q')?.[1];
    return { type: type.trim(), q: q === undefined ? 1 : Number(q) || 0 };
  });

  const markdownQ = qualityOf(ranges, 'text/markdown');
  const htmlQ = qualityOf(ranges, 'text/html');
  // ties go to Markdown only when the client actually named it, so a
  // browser's `*/*` keeps getting HTML
  const namedMarkdown = ranges.some((r) => r.type === 'text/markdown');

  if (namedMarkdown && markdownQ > 0 && markdownQ >= htmlQ) return 'markdown';
  if (htmlQ > 0) return 'html';
  if (markdownQ > 0) return 'markdown';
  return null;
}

function rewriteToMarkdown(
  req: NextRequest,
  locale: string,
  page: MarkdownPage,
) {
  return NextResponse.rewrite(
    new URL(markdownHandlerPath(locale, page), req.url),
  );
}

export default function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Explicit Markdown URL, no negotiation needed
  const markdown = parseMarkdownPath(pathname);
  if (markdown) return rewriteToMarkdown(req, markdown.locale, markdown.page);
  if (pathname.endsWith('.md')) {
    return new NextResponse('Not found\n', { status: 404 });
  }

  const page = parsePagePath(pathname);
  // RSC requests come from client-side navigation, always HTML/RSC
  if (!page || req.headers.has('rsc')) return intlMiddleware(req);

  const locale = page.locale ?? defaultLocale;
  const representation = negotiate(req.headers.get('accept'));
  if (representation === 'markdown') {
    return rewriteToMarkdown(req, locale, page.page);
  }
  if (representation === null) {
    return new NextResponse('Not Acceptable: text/html or text/markdown\n', {
      status: 406,
      headers: { Vary: 'Accept' },
    });
  }

  const res = intlMiddleware(req);
  res.headers.append('Vary', 'Accept');
  // next-intl already sets a Link header with the hreflang alternates
  res.headers.append(
    'Link',
    `<${nextConfig.siteUrl}${markdownPath(locale, page.page)}>; rel="alternate"; type="text/markdown"`,
  );
  return res;
}

export const config = {
  matcher: [
    // Skip all paths that should not be internationalized
    '/((?!api|trpc|_next|_vercel|.*\\..*).*)',
    // Markdown versions of the pages
    '/((?!api|trpc|_next|_vercel).*\\.md)',
  ],
};

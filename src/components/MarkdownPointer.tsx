import { useTranslations } from 'next-intl';
import { config } from '@/config';
import { type MarkdownPage, markdownPath } from '@/lib/markdown-paths';

interface MarkdownPointerProps {
  locale: string;
  page: MarkdownPage;
}

// Hidden from sighted users and screen readers alike: it's only for LLMs
// reading the page text (e.g. someone pasting the URL into a chatbot)
export default function MarkdownPointer({
  locale,
  page,
}: MarkdownPointerProps) {
  const t = useTranslations('markdown');

  return (
    <div className='sr-only' aria-hidden='true'>
      {t('pointer', { url: `${config.siteUrl}${markdownPath(locale, page)}` })}
    </div>
  );
}

import ThemeScript from '@/components/ThemeScript';
import { ThemeProvider } from '@/context/ThemeContext';
import { routing } from '@/i18n/routing';
import type { Metadata } from 'next';
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from 'next-intl/server';
import { notFound } from 'next/navigation';
import '../globals.css';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata' });

  return {
    metadataBase: new URL('https://www.bitrey.dev'),
    title: t('title'),
    description: t('description'),
    robots: {
      index: true,
      follow: true,
      nocache: false,
      googleBot: {
        index: true,
        follow: true,
        noarchive: false,
        nosnippet: false,
        nocache: false,
        notranslate: false,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      title: t('title'),
      description: t('description'),
      type: 'website',
      locale,
      siteName: t('siteName'),
      images: [
        {
          url: 'banner.jpg',
          width: 1200,
          height: 630,
          alt: t('siteName'),
        },
      ],
    },
    applicationName: t('siteName'),
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('description'),
      images: ['banner.jpg'],
    },
    alternates: {
      canonical: `https://www.bitrey.dev/${locale}`,
      languages: {
        en: '/en',
        it: '/it',
        cs: '/cs',
      },
    },
    keywords: t('keywords'),
    authors: [{ name: t('siteName') }],
    creator: t('siteName'),
    publisher: t('siteName'),
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

interface RootLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

async function RootLayout({ children, params }: RootLayoutProps) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  // Get messages for the client
  const messages = await getMessages();

  return (
    <html suppressHydrationWarning lang={locale}>
      <head>
        <ThemeScript />
        <link
          rel='icon'
          type='image/png'
          href='/favicon-96x96.png'
          sizes='96x96'
        />
        <link rel='icon' type='image/svg+xml' href='/favicon.svg' />
        <link rel='shortcut icon' href='/favicon.ico' />
        <link
          rel='apple-touch-icon'
          sizes='180x180'
          href='/apple-touch-icon.png'
        />
        <meta name='apple-mobile-web-app-title' content='bitrey.dev' />
        <meta name='color-scheme' content='light dark' />
        <link rel='manifest' href='/site.webmanifest' />
      </head>
      <body suppressHydrationWarning>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ThemeProvider>{children}</ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
export default RootLayout;

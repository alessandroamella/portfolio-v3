import type { Metadata } from 'next';
import { useTranslations } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { use } from 'react';
import CountriesClient from '@/components/CountriesClient';
import { config } from '@/config';
import MainLayout from '../MainLayout';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'visitedCountries' });

  return {
    title: t('title'),
    openGraph: {
      title: t('title'),
    },
    twitter: {
      title: t('title'),
    },
    alternates: {
      canonical: `https://www.bitrey.dev/${locale}/countries`,
      languages: Object.fromEntries(
        config.languages.map((lang) => [lang.value, `/${lang.value}`]),
      ),
    },
  };
}

export default function CountriesPage(props: {
  params: Promise<{ locale: string }>;
}) {
  const params = use(props.params);

  const { locale } = params;
  setRequestLocale(locale);

  const t = useTranslations('visitedCountries');

  return (
    <MainLayout>
      <div className='max-w-6xl mx-auto pt-8 md:pt-12 px-8'>
        <h1 className='text-4xl font-bold text-gray-800 dark:text-white mb-2'>
          {t('title')}
        </h1>
        <p className='text-gray-600 dark:text-gray-300 mb-8 md:mb-12'>
          {t('description', {
            x: config.visitedCountries.length,
          })}
        </p>
      </div>
      <div className='pb-0 -mb-1 md:pb-16'>
        <CountriesClient />
      </div>
    </MainLayout>
  );
}

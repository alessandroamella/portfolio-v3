'use client';

import { Link, usePathname } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import ChangeLanguageBtn from './ChangeLanguageBtn';
import ThemeToggle from './ThemeToggle';

export default function Header() {
  const t = useTranslations('header');
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  return (
    <header className='bg-gray-100 dark:bg-gray-800/90 bg-opacity-50 flex justify-around p-4 md:px-0 items-center z-20 h-14 relative'>
      <div className='flex text-gray-600 dark:text-gray-200 lowercase items-center gap-4'>
        <Link href='/' className='hover:text-gray-700'>
          {t('home')}
        </Link>
        {isHomePage ? (
          <a href='#about' className='hover:text-gray-700'>
            {t('about')}
          </a>
        ) : (
          <Link href='/#about' className='hover:text-gray-700'>
            {t('about')}
          </Link>
        )}
        {isHomePage ? (
          <a href='#projects' className='hover:text-gray-700'>
            {t('projects')}
          </a>
        ) : (
          <Link href='/#projects' className='hover:text-gray-700'>
            {t('projects')}
          </Link>
        )}
        {isHomePage ? (
          <a href='#contact' className='hover:text-gray-700'>
            {t('contact')}
          </a>
        ) : (
          <Link href='/#contact' className='hover:text-gray-700'>
            {t('contact')}
          </Link>
        )}
        <ChangeLanguageBtn />
        <ThemeToggle />
      </div>
    </header>
  );
}

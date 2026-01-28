'use client';

import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';
import ChangeLanguageBtn from './ChangeLanguageBtn';
import ThemeToggle from './ThemeToggle';

export default function Header() {
  const t = useTranslations('header');
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  const navigationItems = [
    { key: 'home', href: '/' },
    { key: 'about', href: '#about' },
    { key: 'projects', href: '#projects' },
    { key: 'contact', href: '#contact' },
  ];

  const linkClassName =
    'hover:text-gray-700 dark:hover:text-gray-400 whitespace-nowrap';

  const renderNavLink = (item: { key: string; href: string }) => {
    const isHashLink = item.href.startsWith('#');

    if (isHashLink && isHomePage) {
      return (
        <a href={item.href} className={linkClassName}>
          {t(item.key)}
        </a>
      );
    }

    if (isHashLink && !isHomePage) {
      // If not on home page, redirect to home page with hash
      return (
        <Link href={`/${item.href}`} className={linkClassName}>
          {t(item.key)}
        </Link>
      );
    }

    return (
      <Link href={item.href} className={linkClassName}>
        {t(item.key)}
      </Link>
    );
  };

  return (
    <header className='bg-gray-100 dark:bg-gray-800/90 bg-opacity-50 flex justify-around p-4 md:px-0 items-center z-20 h-14 relative'>
      <div className='flex text-gray-600 dark:text-gray-200 lowercase items-center gap-4'>
        {navigationItems.map((item) => (
          <div key={item.key}>{renderNavLink(item)}</div>
        ))}
        <ChangeLanguageBtn />
        <ThemeToggle />
      </div>
    </header>
  );
}

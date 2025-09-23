'use client';

import { config } from '@/config';
import { usePathname, useRouter } from '@/i18n/navigation';
import classNames from 'classnames';
import { useLocale } from 'next-intl';
import { useEffect, useRef, useState } from 'react';

import CS from 'country-flag-icons/react/3x2/CZ';
import EN from 'country-flag-icons/react/3x2/GB';
import IT from 'country-flag-icons/react/3x2/IT';

const LanguageLabel = ({
  lang,
  hideNameOnMobile,
}: { lang: (typeof config.languages)[number]; hideNameOnMobile?: boolean }) => {
  const flagComponents = { IT, EN, CS };
  const Flag = flagComponents[lang.flag as keyof typeof flagComponents];

  return (
    <span className='inline-flex items-center space-x-2 flex-nowrap'>
      <span className='w-5'>{<Flag />}</span>
      <span className={classNames({ 'hidden md:inline': hideNameOnMobile })}>
        {lang.label}
      </span>
    </span>
  );
};

const ChangeLanguageBtn = () => {
  const lang = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentLanguage = config.languages.find((l) => l.value === lang)!;

  const handleLanguageChange = (locale: string) => {
    router.push(pathname, { locale });
    setIsOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className='relative' ref={dropdownRef}>
      <button
        type='button'
        onClick={() => setIsOpen(!isOpen)}
        className='flex items-center space-x-1 bg-transparent border border-transparent hover:border-gray-200 dark:hover:border-gray-700 py-1 px-2 rounded text-gray-600 hover:text-gray-700 dark:text-gray-200 dark:hover:text-gray-100 transition-colors duration-75 focus:outline-none'
      >
        {/* <span className='hidden md:block'>{currentLanguage.label}</span>
        <span className='md:hidden'>{currentLanguage.label.split(' ')[0]}</span> */}
        <LanguageLabel lang={currentLanguage} hideNameOnMobile />
        <svg
          aria-hidden='true'
          className={`w-4 h-4 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M19 9l-7 7-7-7'
          />
        </svg>
      </button>

      {isOpen && (
        <div className='absolute min-w-fit right-0 md:right-auto md:left-0 z-10 mt-1 w-max bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg py-1'>
          {config.languages.map((language) => (
            <button
              type='button'
              key={language.value}
              onClick={() => handleLanguageChange(language.value)}
              className={`block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 ${
                language.value === lang
                  ? 'font-medium text-gray-900 dark:text-white'
                  : 'text-gray-700 dark:text-gray-300'
              }`}
            >
              {/* {language.label} */}
              <LanguageLabel lang={language} />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ChangeLanguageBtn;

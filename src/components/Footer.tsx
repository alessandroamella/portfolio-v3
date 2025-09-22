'use client';

import { config } from '@/config';
import { getYear } from 'date-fns';
import { useTranslations } from 'next-intl';
import { FaEnvelope, FaGithub } from 'react-icons/fa';
import Obfuscate from 'react-obfuscate';

export default function Footer() {
  const t = useTranslations('footer');

  return (
    <footer className='bg-gray-700 border-gray-200 border-t-4 text-white px-8 md:px-24 py-6 z-50 flex flex-col items-center md:flex-row justify-start gap-4 md:justify-around'>
      <div className='flex flex-col'>
        <h3 className='select-none tracking-tighter lowercase font-bold text-2xl'>
          Bitrey
          <span className='text-gray-400'>.dev</span>
        </h3>
        <h4 className='select-none -mt-[2px] text-gray-400 tracking-tighter lowercase text-sm font-medium'>
          <span className='font-normal'>&</span> Bitrey
          <span>.it</span>
        </h4>
      </div>
      <div className='flex flex-col justify-center items-center'>
        <p className='font-light text-center'>
          {getYear(new Date())} &copy; Alessandro Amella
        </p>
        <p className='font-light text-center'>
          <span className='text-gray-300'>{t('vatNumber')}</span>:{' '}
          <span className='font-medium'>04183560368</span>
        </p>
      </div>
      <div className='flex flex-col justify-center space-y-1 items-center'>
        <div className='flex space-x-1 items-center px-4 tracking-tighter font-light'>
          <FaEnvelope />
          <Obfuscate
            style={{ display: 'inline-block' }}
            email={config.email}
            headers={{
              subject: t('emailSubject'),
              body: t('emailBody'),
            }}
          />
        </div>

        <a
          href={config.githubUrl}
          className='flex space-x-1 items-center px-4 tracking-tighter font-light'
        >
          <FaGithub />
          <span>{config.githubUsername}</span>
        </a>
      </div>
    </footer>
  );
}

'use client';

import { config } from '@/config';
import { getYear } from 'date-fns';
import { useTranslations } from 'next-intl';
import { FaEnvelope, FaGithub } from 'react-icons/fa';

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
      <div className='flex flex-col justify-center items-center'>
        <a
          href={`mailto:${config.email}`}
          className='flex items-center rounded-xl px-4 tracking-tighter'
        >
          <FaEnvelope />
          <span className='ml-2'>{config.email}</span>
        </a>
        <a
          href={config.githubUrl}
          className='flex items-center rounded-xl px-4 tracking-tighter font-light'
        >
          <FaGithub />
          <span className='ml-2'>{config.githubUsername}</span>
        </a>
      </div>
    </footer>
  );
}

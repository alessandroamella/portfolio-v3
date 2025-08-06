'use client';

import { Spinner } from 'flowbite-react';
import dynamic from 'next/dynamic';

const CountriesMap = dynamic(() => import('@/components/CountriesMap'), {
  ssr: false,
  loading: () => (
    <div className='w-full h-[500px] flex items-center justify-center'>
      <p className='text-gray-500 dark:text-gray-400'>
        <Spinner size='lg' />
      </p>
    </div>
  ),
});

export default function CountriesClient() {
  return (
    <div className='w-full'>
      <CountriesMap />
    </div>
  );
}

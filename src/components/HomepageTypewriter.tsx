'use client';

import { useTranslations } from 'next-intl';
import Typewriter from 'typewriter-effect';

const HomepageTypewriter = () => {
  const t = useTranslations('homepage');

  return (
    <Typewriter
      onInit={(typewriter) => {
        typewriter.typeString(t('splash')).start();
      }}
      options={{ delay: 50 }}
    />
  );
};

export default HomepageTypewriter;

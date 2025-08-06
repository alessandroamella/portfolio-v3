'use client';

import axios from 'axios';
import { Alert, Label, TextInput, Textarea } from 'flowbite-react';
import { type KeyboardEvent, useState } from 'react';
import { Fade } from 'react-awesome-reveal';
import { type FieldValues, type SubmitHandler, useForm } from 'react-hook-form';
import BeatLoader from 'react-spinners/BeatLoader';

import { useTheme } from '@/context/ThemeContext';
import { useTranslations } from 'next-intl';
import { Turnstile } from 'next-turnstile';
import { FaPaperPlane } from 'react-icons/fa';
import Button from './Button';

const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

const HomepageContact = () => {
  const { register, handleSubmit } = useForm();

  const t = useTranslations('contact');

  const [captchaVal, setCaptchaVal] = useState<string | null>(null);

  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const [alert, setAlert] = useState<{
    type: 'success' | 'failure';
    message: string;
  } | null>(null);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    if (!captchaVal) {
      setAlert({
        type: 'failure',
        message: t('captchaError'),
      });
      return;
    }

    setDisabled(true);
    setLoading(true);
    setAlert(null);

    console.log(data);

    const { name, email, message } = data;

    try {
      await axios.post('/api/contact', {
        name,
        email,
        message,
        turnstile: captchaVal,
      });
    } catch (err) {
      console.log(err);

      setDisabled(false);

      const error = (err as { response?: { data?: { err?: string } } })
        ?.response?.data?.err;
      if (error && typeof error === 'string') {
        setAlert({
          type: 'failure',
          message: error,
        });
      } else {
        setAlert({
          type: 'failure',
          message: t('sendError'),
        });
        return;
      }
    } finally {
      setLoading(false);
    }

    setAlert({
      type: 'success',
      message: t('success'),
    });
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    // Submit on Ctrl+Enter or Cmd+Enter
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      handleSubmit(onSubmit)();
    }
  };

  const { theme } = useTheme();

  return (
    <Fade>
      <form
        onSubmit={handleSubmit(onSubmit)}
        onKeyDown={handleKeyDown}
        className='w-full p-6 shadow-xl rounded-xl bg-white dark:bg-gray-900 flex mx-auto max-w-md flex-col gap-4'
      >
        {alert && (
          <Alert color={alert.type} className='mb-4'>
            {alert.message}
          </Alert>
        )}

        <div>
          <div className='mb-2 block'>
            <Label htmlFor='email' value={t('yourEmail')} />
          </div>
          <TextInput
            id='email'
            placeholder={t('emailPlaceholder')}
            required
            type='email'
            autoComplete='email'
            className='focus:border-blue-500 ring-blue-500'
            minLength={3}
            maxLength={254}
            disabled={disabled}
            {...register('email')}
          />
        </div>
        <div>
          <div className='mb-2 block'>
            <Label htmlFor='name' value={t('yourName')} />
          </div>
          <TextInput
            id='name'
            placeholder='Alessandro Amella'
            required
            type='text'
            autoComplete='name'
            minLength={3}
            maxLength={50}
            disabled={disabled}
            {...register('name')}
          />
        </div>
        <div>
          <div className='mb-2 block'>
            <Label htmlFor='message' value={t('yourMessage')} />
          </div>
          <Textarea
            id='message'
            placeholder={t('messagePlaceholder')}
            required
            rows={4}
            autoComplete='off'
            minLength={10}
            maxLength={500}
            disabled={disabled}
            {...register('message')}
          />
        </div>
        <div className='my-2 mx-auto'>
          <Turnstile
            siteKey={turnstileSiteKey!}
            onVerify={setCaptchaVal}
            className='max-w-full'
            sandbox={process.env.NODE_ENV === 'development'}
            theme={theme}
          />
        </div>
        <Button
          type='submit'
          className='rounded-lg flex items-center gap-2 justify-center'
          color='blue'
          disabled={disabled}
        >
          <FaPaperPlane />
          <BeatLoader color='#ffffff' loading={loading} />
          {!loading && t('send')}
        </Button>
      </form>
    </Fade>
  );
};

export default HomepageContact;

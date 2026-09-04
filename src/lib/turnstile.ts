import { validateTurnstileToken } from 'next-turnstile';
import { envs } from '@/config/envs';

export async function verifyTurnstile(token: string): Promise<boolean> {
  try {
    // Allow dummy token in development
    if (
      process.env.NODE_ENV === 'development' &&
      token === 'XXXX.DUMMY.TOKEN.XXXX'
    ) {
      console.warn('Using dummy Turnstile token in development mode');
      return true;
    }

    const result = await validateTurnstileToken({
      token,
      secretKey: envs.TURNSTILE_SECRET_KEY,
    });

    if (result.success) {
      console.debug('Turnstile verification passed');
      return true;
    }
    console.error('Turnstile verification failed:', result);
    return false;
  } catch (error) {
    console.error('Error verifying Turnstile:', error);
    throw new Error('Failed to verify Turnstile');
  }
}

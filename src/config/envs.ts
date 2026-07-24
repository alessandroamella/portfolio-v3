import { cleanEnv, str } from 'envalid';

export const envs = cleanEnv(process.env, {
  NODE_ENV: str({
    choices: ['development', 'test', 'production', 'staging'],
  }),
  TURNSTILE_SECRET_KEY: str(),
  MAIL_SERVER: str(),
  MAIL_USERNAME: str(),
  MAIL_PASSWORD: str(),
  TELEGRAM_BOT_TOKEN: str(),
  TELEGRAM_CHAT_ID: str(),
  SEND_EMAIL_FROM: str(),
  SEND_EMAIL_FROM_NAME: str(),
  SEND_EMAIL_TO: str(),
  WEATHER_API_KEY: str(),
});

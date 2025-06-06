import { cleanEnv, num, str } from 'envalid';

import 'dotenv/config';

export const envs = cleanEnv(process.env, {
  NODE_ENV: str({
    choices: ['development', 'test', 'production', 'staging'],
  }),
  PORT: num({ default: 3578 }),
  TURNSTILE_SECRET_KEY: str(),
  MAIL_SERVER: str(),
  MAIL_USERNAME: str(),
  MAIL_PASSWORD: str(),
  SEND_EMAIL_FROM: str(),
  SEND_EMAIL_FROM_NAME: str(),
  SEND_EMAIL_TO: str(),
  WEATHER_API_KEY: str(),
});

import { cleanEnv, str, num } from "envalid";

import "dotenv/config";

export const envs = cleanEnv(process.env, {
    NODE_ENV: str({
        choices: ["development", "test", "production", "staging"]
    }),
    PORT: num(),
    RECAPTCHA_SECRET: str(),
    MAIL_SERVER: str(),
    MAIL_USERNAME: str(),
    MAIL_PASSWORD: str(),
    SEND_EMAIL_FROM: str(),
    SEND_EMAIL_TO: str()
});

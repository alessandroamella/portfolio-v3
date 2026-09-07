# amella.it portfolio

Source code for my personal portfolio website, online at [amella.it](https://www.amella.it).

It uses Next.js with the App Router, TypeScript, Tailwind CSS, form validation with `zod`, and some APIs:

- Weather data from [OpenWeatherMap](https://openweathermap.org/current).
- Email sending using the [Nodemailer](https://nodemailer.com/about/) package, through a Next.js API route.
- [Cloudflare Turnstile](https://www.cloudflare.com/application-services/products/turnstile/) for a non-intrusive CAPTCHA on the contact form.
- Telegram Bot API to get a notification whenever someone writes through the contact form.

## Some features

- Uses `next-intl` both in [routing](https://next-intl.dev/docs/routing) and messages, currently in Italian, English, and Czech.
- Client-side theme switching (Light/Dark) with system preference detection.
- A carousel displaying information and tech stacks for some projects I've worked on (defined in [config/projects.ts](https://github.com/alessandroamella/portfolio-v3/blob/master/src/config/projects.ts)).
- A contact form secured with Cloudflare Turnstile, which routes through a Next.js API handler, and uses Nodemailer for sending emails plus a Telegram bot for instant notifications.
- The UI is built mainly using [Flowbite React](https://flowbite-react.com/) and custom components, styled with Tailwind CSS v4.
- Dates in the CV timeline are formatted with `Intl.DateTimeFormat` (see [utils/date.ts](https://github.com/alessandroamella/portfolio-v3/blob/master/src/utils/date.ts)), so month names are localised without extra translation keys.
- Personal touches:
  - Real-time weather information from the city I live in (Aarhus) using the OpenWeatherMap API.
  - Visualization of countries I've visited using `react-simple-maps`.

## Setup

#### Clone the repository

```bash
git clone https://github.com/alessandroamella/portfolio-v3
cd portfolio-v3
```

#### Install dependencies

```bash
pnpm install
```

#### Set the environment variables

Create a `.env` file containing the environment variables as defined in [config/envs.ts](https://github.com/alessandroamella/portfolio-v3/blob/master/src/config/envs.ts).

```sh
# Example
NEXT_PUBLIC_TURNSTILE_SITE_KEY=your_turnstile_site_key
TURNSTILE_SECRET_KEY=your_turnstile_secret_key
MAIL_SERVER=smtp.example.com
MAIL_USERNAME=your_username
MAIL_PASSWORD=your_password
TELEGRAM_BOT_TOKEN=your_telegram_bot_token
TELEGRAM_CHAT_ID=your_telegram_chat_id
SEND_EMAIL_FROM=no-reply@example.com
SEND_EMAIL_FROM_NAME=Your App Name
SEND_EMAIL_TO=recipient@example.com
WEATHER_API_KEY=your_weather_api_key
```

#### Run the development server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) and voila!

#### Other scripts

```bash
pnpm build   # production build
pnpm start   # serve the production build on port 3578
pnpm check   # lint + format check with Biome
```

Linting and formatting are both handled by [Biome](https://biomejs.dev/) (`biome.json`), a husky pre-commit hook runs it on staged files.

## License

This project is open-source. See the [LICENSE](https://github.com/alessandroamella/portfolio-v3/blob/master/LICENSE) file for details.

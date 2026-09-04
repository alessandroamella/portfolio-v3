import { Api } from 'node-telegram-bot-api';
import { envs } from '@/config/envs';

let telegramBot: Api | null = null;

function getTelegramBot() {
  if (!telegramBot) {
    telegramBot = new Api(envs.TELEGRAM_BOT_TOKEN);
  }
  return telegramBot;
}

function buildTelegramMessage({
  name,
  email,
  message,
}: {
  name: string;
  email: string;
  message: string;
}) {
  return [
    'Nuova richiesta di contatto da amella.it',
    `Nome: ${name}`,
    `Email: ${email}`,
    '',
    'Messaggio:',
    message,
  ].join('\n');
}

export async function sendTelegramNotification({
  name,
  email,
  message,
}: {
  name: string;
  email: string;
  message: string;
}) {
  const bot = getTelegramBot();
  const telegramMessage = buildTelegramMessage({ name, email, message });

  await bot.sendMessage({
    chat_id: envs.TELEGRAM_CHAT_ID,
    text: telegramMessage,
  });
}

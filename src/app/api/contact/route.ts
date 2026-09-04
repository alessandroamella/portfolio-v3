import { type NextRequest, NextResponse } from 'next/server';
import type Mail from 'nodemailer/lib/mailer';
import { z } from 'zod';
import { envs } from '@/config/envs';
import { generateContactFormEmail } from '@/lib/emails/contact-form';
import { getMailTransporter } from '@/lib/mailer';
import { sendTelegramNotification } from '@/lib/telegram';
import { verifyTurnstile } from '@/lib/turnstile';

const contactSchema = z.object({
  name: z.string().min(3).max(50),
  email: z.email(),
  message: z.string().min(10).max(1000),
  turnstile: z.string(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate the input data
    const result = contactSchema.safeParse(body);
    if (!result.success) {
      console.warn('Validation failed:', result.error.issues);
      return NextResponse.json(
        { err: 'validation', details: result.error.issues },
        { status: 400 },
      );
    }

    const { name, email, message, turnstile } = result.data;

    const turnstileIsValid = await verifyTurnstile(turnstile);
    if (!turnstileIsValid) {
      console.warn('Turnstile check failed for email:', email);
      return NextResponse.json(
        { err: 'servererror.turnstile' },
        { status: 400 },
      );
    }
    console.log('Turnstile check passed for email:', email);

    const transporter = await getMailTransporter();
    const mailOptions: Mail.Options = {
      from: `"${envs.SEND_EMAIL_FROM_NAME || 'Amella Contact'}" <${envs.SEND_EMAIL_FROM}>`,
      to: envs.SEND_EMAIL_TO,
      replyTo: email,
      text: generateContactFormEmail({ name, email, message }),
      subject: 'AMELLA.IT - NUOVA RICHIESTA DI CONTATTO',
      html: generateContactFormEmail({ name, email, message }),
    };

    await transporter.sendMail(mailOptions);
    console.info(`Contact form email sent successfully by ${email}`);

    await sendTelegramNotification({ name, email, message });
    console.info(
      `Telegram contact notification sent successfully for ${email}`,
    );

    return NextResponse.json(
      { message: 'Email sent successfully' },
      { status: 200 },
    );
  } catch (error) {
    console.error(
      'Error in /api/contact:',
      error instanceof Error ? error.message : error,
    );
    return NextResponse.json({ err: 'servererror.internal' }, { status: 500 });
  }
}

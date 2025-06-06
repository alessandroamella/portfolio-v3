import { envs } from '@/config/envs';
import { generateContactFormEmail } from '@/lib/emails/contact-form';
import { validateTurnstileToken } from 'next-turnstile';
import { type NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import type Mail from 'nodemailer/lib/mailer';
import { z } from 'zod';

const contactSchema = z.object({
  name: z.string().min(3).max(50),
  email: z.string().email(),
  message: z.string().min(10).max(1000),
  turnstile: z.string(),
});

async function verifyTurnstile(token: string): Promise<boolean> {
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

let mailTransporter: nodemailer.Transporter | null = null;

async function getMailTransporter() {
  if (!mailTransporter) {
    mailTransporter = nodemailer.createTransport({
      host: envs.MAIL_SERVER,
      port: 587,
      secure: false,
      auth: {
        user: envs.MAIL_USERNAME,
        pass: envs.MAIL_PASSWORD,
      },
    });
    try {
      await mailTransporter.verify();
      console.log('Nodemailer transporter verified and ready.');
    } catch (err) {
      console.error('Nodemailer transporter verification failed:', err);
      mailTransporter = null;
      throw new Error('Failed to initialize mail service.');
    }
  }
  return mailTransporter;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate the input data
    const result = contactSchema.safeParse(body);
    if (!result.success) {
      console.warn('Validation failed:', result.error.errors);
      return NextResponse.json(
        { err: 'validation', details: result.error.errors },
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
      from: `"${envs.SEND_EMAIL_FROM_NAME || 'Bitrey Contact'}" <${envs.SEND_EMAIL_FROM}>`,
      to: envs.SEND_EMAIL_TO,
      replyTo: email,
      text: generateContactFormEmail({ name, email, message }),
      subject: 'BITREY.DEV - NUOVA RICHIESTA DI CONTATTO',
      html: generateContactFormEmail({ name, email, message }),
    };

    await transporter.sendMail(mailOptions);
    console.info(`Contact form email sent successfully by ${email}`);

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

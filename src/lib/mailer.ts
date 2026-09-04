import nodemailer from 'nodemailer';
import { envs } from '@/config/envs';

let mailTransporter: nodemailer.Transporter | null = null;

export async function getMailTransporter() {
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

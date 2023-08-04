import nodemailer from "nodemailer";
import Mail from "nodemailer/lib/mailer";
import { envs } from "../config/envs";
import { logger } from "../shared/logger";
import { UserMail } from "../interfaces/UserMail";

export class EmailService {
    private static transporter: nodemailer.Transporter | null = null;

    private static _initialize(): Promise<void> {
        return new Promise((resolve, reject) => {
            EmailService.transporter = nodemailer.createTransport({
                host: envs.MAIL_SERVER,
                auth: {
                    user: envs.MAIL_USERNAME,
                    pass: envs.MAIL_PASSWORD
                },
                tls: {
                    rejectUnauthorized: false
                }
            });

            EmailService.transporter.verify((err, success): void => {
                if (err) {
                    logger.error(err);
                    return reject(err);
                }
                logger.info("Email ready: " + success);
                return resolve();
            });
        });
    }

    public static async sendMail(message: Mail.Options): Promise<void> {
        if (!EmailService.transporter) {
            await EmailService._initialize();
        }
        return new Promise((resolve, reject) => {
            if (!EmailService.transporter) {
                logger.error("EmailService.transporter null in sendMail");
                return reject("EmailService.transporter null");
            }
            EmailService.transporter.sendMail(message, err => {
                if (err) {
                    logger.error("Error while sending email");
                    logger.error(err);
                    return reject(err);
                }
                return resolve();
            });
        });
    }

    public static async sendEmailToWebmaster(mail: UserMail, date: Date) {
        const message: Mail.Options = {
            from: `"BITREY.IT TI HANNO SCRITTO" ${envs.SEND_EMAIL_FROM}`,
            to: envs.SEND_EMAIL_TO,
            subject: "BITREY.IT - NUOVA RICHIESTA DI CONTATTO",
            html:
                `<p>Contenuto mail: <pre><code>${JSON.stringify(
                    mail
                )}</pre><code><br />` + `Inviato il ${date.toISOString()}.</p>`
        };

        await EmailService.sendMail(message);
        logger.info(
            `New request sent to webmaster from ${mail.email}, sent message:`
        );
        logger.info(message);
    }
}

export default EmailService;

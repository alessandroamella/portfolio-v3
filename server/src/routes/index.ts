import { Router } from "express";
import { body, check, query, validationResult } from "express-validator";
import { BAD_REQUEST, INTERNAL_SERVER_ERROR, OK } from "http-status";
import { logger } from "../shared/logger";
import { checkCaptcha } from "../helpers/checkCaptcha";
import EmailService from "../helpers/mail";
import { UserMail } from "../interfaces/UserMail";
import { WeatherData, getWeather } from "../weather";

const router = Router();

let weatherCache: WeatherData | null = null;

router.get(
    "/weather",
    // query("lang").isString().isLength({ min: 2, max: 2 }),
    async (req, res) => {
        try {
            const weather =
                weatherCache || (await getWeather({ lat: 44.56204, lon: 11.03422, lang: "it" }));
            return res.json(weather);
        } catch (err) {
            logger.error("Error while getting weather");
            logger.error(err);
            return res.status(INTERNAL_SERVER_ERROR).json({ err: "servererror.internal" });
        }
    }
);

router.post(
    "/contact",
    body("name").isString().isLength({ min: 3, max: 50 }),
    body("email").isEmail().isLength({ min: 3, max: 254 }),
    body("message").isString().isLength({ min: 10, max: 500 }),
    body("captcha").notEmpty(),
    async (req, res) => {
        const result = validationResult(req);
        if (!result.isEmpty()) {
            logger.debug("Validation failed");
            result.array().forEach(error => {
                logger.debug(error);
            });
            return res.status(BAD_REQUEST).json({ err: "servererror.validation" });
        }
        logger.debug("Validation passed");

        try {
            const captcha = checkCaptcha(req.body.captcha);
            if (!captcha) {
                logger.debug("Captcha check failed");
                return res.status(BAD_REQUEST).json({ err: "servererror.captcha" });
            }
        } catch (err) {
            logger.error("Error while checking captcha");
            logger.error(err);
            return res.status(INTERNAL_SERVER_ERROR).json({ err: "servererror.internal" });
        }
        logger.debug("Captcha check passed");

        const { email, message, name }: UserMail = req.body;

        logger.info(`Received email from ${email} (${name}) at ${new Date()}:`);
        logger.info({ name, email, message });

        try {
            await EmailService.sendEmailToWebmaster({ name, email, message }, new Date());
        } catch (err) {
            logger.error("Error while sending email");
            logger.error(err);
            return res.status(INTERNAL_SERVER_ERROR).json({ err: "servererror.internal" });
        }

        logger.info("Email sent successfully");

        res.sendStatus(OK);
    }
);

export default router;

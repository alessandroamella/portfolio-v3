import { Router } from "express";
import { body, query, validationResult } from "express-validator";
import { BAD_REQUEST, INTERNAL_SERVER_ERROR, OK } from "http-status";
import moment from "moment";
import { config } from "../config";
import { checkCaptcha } from "../helpers/checkCaptcha";
import EmailService from "../helpers/mail";
import { UserMail } from "../interfaces/UserMail";
import { WeatherCache } from "../interfaces/Weather";
import { logger } from "../shared/logger";
import { getWeather } from "../weather";

const router = Router();

let weatherCache: WeatherCache = {};

router.get(
  "/weather",
  query("lang").isString().isIn(config.languages).optional(),
  async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      logger.debug("Validation failed");
      result.array().forEach((error) => {
        logger.debug(error);
      });
      return res.status(BAD_REQUEST).json({ err: "servererror.validation" });
    }
    const lang = req.query?.lang || "en";

    const { lat, lon } = config.coords;

    try {
      if (
        !weatherCache[lang] ||
        moment().diff(weatherCache[lang].date, "minutes") > 5
      ) {
        const weather = await getWeather({ lat, lon, lang });
        weatherCache[lang] = {
          weather,
          date: moment(),
        };
        weatherCache = Object.fromEntries(
          Object.entries(weatherCache).map(([k, v]) => [
            k,
            {
              ...v,
              weather: {
                ...v.weather,
                temp: weather.temp,
              },
            },
          ]),
        );
      }

      return res.json(weatherCache[lang].weather);
    } catch (err) {
      logger.error("Error while getting weather");
      logger.error(err);
      return res
        .status(INTERNAL_SERVER_ERROR)
        .json({ err: "servererror.internal" });
    }
  },
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
      result.array().forEach((error) => {
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
      return res
        .status(INTERNAL_SERVER_ERROR)
        .json({ err: "servererror.internal" });
    }
    logger.debug("Captcha check passed");

    const { email, message, name }: UserMail = req.body;

    logger.info(`Received email from ${email} (${name}) at ${new Date()}:`);
    logger.info({ name, email, message });

    try {
      await EmailService.sendEmailToWebmaster(
        { name, email, message },
        new Date(),
      );
    } catch (err) {
      logger.error("Error while sending email");
      logger.error(err);
      return res
        .status(INTERNAL_SERVER_ERROR)
        .json({ err: "servererror.internal" });
    }

    logger.info("Email sent successfully");

    res.sendStatus(OK);
  },
);

export default router;

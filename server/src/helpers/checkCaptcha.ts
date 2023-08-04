import axios from "axios";
import { envs } from "../config/envs";

export async function checkCaptcha(captcha: string): Promise<boolean> {
    const secret = envs.RECAPTCHA_SECRET;
    if (!secret) {
        throw new Error("No secret provided");
    }

    const { data } = await axios.post(
        "https://www.google.com/recaptcha/api/siteverify",
        {
            secret,
            response: captcha
        }
    );

    return data.success as boolean;
}

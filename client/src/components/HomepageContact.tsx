"use client";

import React, { FC, useState } from "react";
import { Alert, Label, TextInput, Textarea } from "flowbite-react";
import ReCAPTCHA from "react-google-recaptcha";
import axios from "axios";
import { useForm } from "react-hook-form";
import BeatLoader from "react-spinners/BeatLoader";
import { Fade } from "react-awesome-reveal";

import Button from "./Button";
import { config } from "@/config";
import { FaPaperPlane } from "react-icons/fa";

interface HomepageContactProps {
    captchaErrorStr: string;
    sendErrorStr: string;
    successStr: string;
    yourEmailStr: string;
    yourNameStr: string;
    yourMessageStr: string;
    messagePlaceholderStr: string;
    sendStr: string;
}

const HomepageContact: FC<HomepageContactProps> = ({
    captchaErrorStr,
    messagePlaceholderStr,
    sendErrorStr,
    sendStr,
    successStr,
    yourEmailStr,
    yourMessageStr,
    yourNameStr,
}) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const [captchaVal, setCaptchaVal] = useState<string | null>(null);

    const [loading, setLoading] = useState(false);
    const [disabled, setDisabled] = useState(false);

    const [alert, setAlert] = useState<{
        type: "success" | "failure";
        message: string;
    } | null>(null);

    const onSubmit = async (data: any) => {
        if (!captchaVal) {
            setAlert({
                type: "failure",
                message: captchaErrorStr,
            });
            return;
        }

        setDisabled(true);
        setLoading(true);
        setAlert(null);

        console.log(data);

        const { name, email, message } = data;

        try {
            await axios.post("/api/contact", {
                name,
                email,
                message,
                captcha: captchaVal,
            });
        } catch (err) {
            console.log(err);

            setDisabled(false);

            const error = (err as any)?.response?.data?.err;
            if (error && typeof error === "string") {
                setAlert({
                    type: "failure",
                    message: error,
                });
            } else {
                setAlert({
                    type: "failure",
                    message: sendErrorStr,
                });
                return;
            }
        } finally {
            setLoading(false);
        }

        setAlert({
            type: "success",
            message: successStr,
        });
    };

    return (
        <Fade>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="w-full p-6 shadow-xl rounded-xl bg-white dark:bg-gray-900 flex mx-auto max-w-md flex-col gap-4"
            >
                {alert && (
                    <Alert color={alert.type} className="mb-4">
                        {alert.message}
                    </Alert>
                )}

                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="email" value={yourEmailStr} />
                    </div>
                    <TextInput
                        id="email"
                        placeholder="info@bitrey.it"
                        required
                        type="email"
                        autoComplete="email"
                        className="focus:border-blue-500 ring-blue-500"
                        minLength={3}
                        maxLength={254}
                        disabled={disabled}
                        {...register("email")}
                    />
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="name" value={yourNameStr} />
                    </div>
                    <TextInput
                        id="name"
                        placeholder="Alessandro Amella"
                        required
                        type="text"
                        autoComplete="name"
                        minLength={3}
                        maxLength={50}
                        disabled={disabled}
                        {...register("name")}
                    />
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="message" value={yourMessageStr} />
                    </div>
                    <Textarea
                        id="message"
                        placeholder={messagePlaceholderStr}
                        required
                        rows={4}
                        autoComplete="off"
                        minLength={10}
                        maxLength={500}
                        disabled={disabled}
                        {...register("message")}
                    />
                </div>
                <div className="my-2 mx-auto">
                    <ReCAPTCHA
                        sitekey={config.recaptchaSiteKey}
                        onChange={setCaptchaVal}
                        className="max-w-full"
                    />
                </div>
                <Button
                    type="submit"
                    className="rounded-lg flex items-center gap-2 justify-center"
                    // color="red"
                    color="blue"
                    disabled={disabled}
                >
                    <FaPaperPlane />
                    <BeatLoader color="#ffffff" loading={loading} />
                    {!loading && sendStr}
                </Button>
            </form>
        </Fade>
    );
};

export default HomepageContact;

"use client";

import { useTranslations } from "next-intl";
import React from "react";
import Typewriter from "typewriter-effect";

const HomepageTypewriter = () => {
    const t = useTranslations("common");

    return (
        <Typewriter
            onInit={(typewriter) => {
                typewriter.typeString(t("homepage.splash")).start();
            }}
            options={{ delay: 50 }}
        />
    );
};

export default HomepageTypewriter;

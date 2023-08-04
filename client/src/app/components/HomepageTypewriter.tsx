"use client";

import React from "react";
import Typewriter from "typewriter-effect";
import labels from "../labels";

const HomepageTypewriter = () => {
    return (
        <Typewriter
            onInit={typewriter => {
                typewriter.typeString(labels.it.homepage.splash).start();
            }}
            options={{ delay: 50 }}
        />
    );
};

export default HomepageTypewriter;

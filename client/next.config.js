const createNextIntlPlugin = require("next-intl/plugin");
const { createSecureHeaders } = require("next-secure-headers");

const withNextIntl = createNextIntlPlugin("./src/i18n.ts");

/** @type {import('next').NextConfig} */
const nextConfig = {
    async headers() {
        return [
            {
                source: "/(.*)",
                headers: createSecureHeaders({
                    contentSecurityPolicy: {
                        directives: {
                            defaultSrc: ["'self'"],
                            scriptSrc: [
                                "'self'",
                                "https://www.google.com",
                                "https://www.gstatic.com",
                                "'unsafe-inline'",
                            ],
                            styleSrc: ["'self'", "'unsafe-inline'"],
                            imgSrc: ["'self'", "data:"],
                            fontSrc: ["'self'", "data:"],
                            connectSrc: ["'self'"],
                            frameSrc: ["'self'", "https://www.google.com"],
                            mediaSrc: ["'self'"],
                            objectSrc: ["'none'"],
                            baseUri: ["'self'"],
                            formAction: ["'self'"],
                            frameAncestors: ["'none'"],
                            upgradeInsecureRequests: true,
                        },
                    },
                    forceHTTPSRedirect: [
                        true,
                        { maxAge: 60 * 60 * 24 * 4, includeSubDomains: true },
                    ],
                    referrerPolicy: "same-origin",
                }),
            },
        ];
    },
    webpack(config) {
        // Grab the existing rule that handles SVG imports
        const fileLoaderRule = config.module.rules.find((rule) =>
            rule.test?.test?.(".svg"),
        );

        config.module.rules.push(
            // Reapply the existing rule, but only for svg imports ending in ?url
            {
                ...fileLoaderRule,
                test: /\.svg$/i,
                resourceQuery: /url/, // *.svg?url
            },
            // Convert all other *.svg imports to React components
            {
                test: /\.svg$/i,
                issuer: fileLoaderRule.issuer,
                resourceQuery: {
                    not: [...fileLoaderRule.resourceQuery.not, /url/],
                }, // exclude if *.svg?url
                use: ["@svgr/webpack"],
            },
        );

        // Modify the file loader rule to ignore *.svg, since we have it handled now.
        fileLoaderRule.exclude = /\.svg$/i;

        return config;
    },
    async rewrites() {
        return [
            {
                source: "/api/:path*",
                destination: "http://localhost:3417/api/:path*",
            },
        ];
    },
};

module.exports = withNextIntl(nextConfig);

const createNextIntlPlugin = require('next-intl/plugin');
const { createSecureHeaders } = require('next-secure-headers');

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          ...createSecureHeaders({
            contentSecurityPolicy: {
              directives: {
                defaultSrc: ["'self'"],
                scriptSrc: [
                  "'self'",
                  'https://www.google.com',
                  'https://www.gstatic.com',
                  'https://challenges.cloudflare.com',
                  "'unsafe-inline'",
                  "'unsafe-eval'", // needed for Next.js development
                ],
                styleSrc: ["'self'", "'unsafe-inline'"],
                imgSrc: ["'self'", 'data:', 'https://openweathermap.org'],
                fontSrc: ["'self'", 'data:'],
                connectSrc: [
                  "'self'",
                  'https://cdn.jsdelivr.net',
                  'https://challenges.cloudflare.com',
                  'https://*.cloudflare.com',
                ],
                frameSrc: [
                  "'self'",
                  'https://www.google.com',
                  'https://challenges.cloudflare.com',
                ],
                mediaSrc: ["'self'"],
                objectSrc: ["'self'", 'data:'], // needed for react-simple-maps
                baseUri: ["'self'"],
                formAction: ["'self'"],
                frameAncestors: ["'none'"],
                upgradeInsecureRequests: true,
                sandbox: [
                  'allow-same-origin',
                  'allow-scripts',
                  'allow-forms',
                  'allow-popups',
                ],
              },
            },
            forceHTTPSRedirect: [
              true,
              {
                maxAge: 30 * 24 * 60 * 60, // 30 days
                includeSubDomains: true,
              },
            ],
            referrerPolicy: 'same-origin',
          }),
          {
            key: 'Permissions-Policy',
            value:
              'accelerometer=(), camera=(), geolocation=(), gyroscope=(), magnetometer=(), microphone=(), payment=(), usb=()', // disable all permissions
          },
        ],
      },
    ];
  },
  webpack(config) {
    // Grab the existing rule that handles SVG imports
    const fileLoaderRule = config.module.rules.find((rule) =>
      rule.test?.test?.('.svg'),
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
        use: ['@svgr/webpack'],
      },
    );

    // Modify the file loader rule to ignore *.svg, since we have it handled now.
    fileLoaderRule.exclude = /\.svg$/i;

    return config;
  },
};

module.exports = withNextIntl(nextConfig);

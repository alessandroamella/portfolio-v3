const withFlowbiteReact = require('flowbite-react/plugin/nextjs');
const createNextIntlPlugin = require('next-intl/plugin');
const { createSecureHeaders } = require('next-secure-headers');

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Next writes AGENTS.md / CLAUDE.md on every dev run without this
  agentRules: false,
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
};

module.exports = withFlowbiteReact(withNextIntl(nextConfig));

import createMiddleware from "next-intl/middleware";
import { config as nextConfig } from "./config";

export default createMiddleware({
  // A list of all locales that are supported
  locales: nextConfig.languages.map((e) => e.value),

  // Used when no locale matches
  defaultLocale: "en",

  // This function is called for each incoming request to determine the locale
  localePrefix: "as-needed",

  // Configure domain-specific locale detection - setting to true to use default behavior
  localeDetection: true,
});

export const config = {
  // Skip all paths that should not be internationalized
  matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
};

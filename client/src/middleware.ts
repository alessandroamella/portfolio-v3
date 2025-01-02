import createMiddleware from "next-intl/middleware";
import { config as nextConfig } from "./config";

export default createMiddleware({
    // A list of all locales that are supported
    locales: nextConfig.languages,

    // Used when no locale matches
    defaultLocale: "en",
});

export const config = {
    // Match only internationalized pathnames
    matcher: ["/", "/(it|en)/:path*"],
};

import { createSharedPathnamesNavigation } from "next-intl/navigation";
import { config } from "./config";

export const locales = config.languages;
export const localePrefix = "as-needed";

export const { Link, redirect, usePathname, useRouter } =
    createSharedPathnamesNavigation({
        locales,
        localePrefix,
    });

import { config } from "@/config";
import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: config.languages.map((e) => e.value),
  defaultLocale: "en",
});

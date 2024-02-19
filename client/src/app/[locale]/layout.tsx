import { config } from "@/config";
import "../globals.css";
import { unstable_setRequestLocale } from "next-intl/server";

import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
    const t = await getTranslations({ locale, namespace: "common" });

    return {
        title: t("metadata.title"),
        description: t("metadata.description")
    };
}

const locales = config.languages;

export function generateStaticParams() {
    return locales.map(locale => ({ locale }));
}

function RootLayout({
    children,
    params: { locale }
}: {
    children: React.ReactNode;
    params: { locale: string };
}) {
    unstable_setRequestLocale(locale);

    return (
        <html lang={locale}>
            <body>{children}</body>
        </html>
    );
}

export default RootLayout;

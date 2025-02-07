import { config } from "@/config";
import "../globals.css";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";

export async function generateMetadata({
    params,
}: {
    params: { locale: string };
}): Promise<Metadata> {
    const t = await getTranslations({
        locale: params.locale,
        namespace: "common",
    });

    return {
        title: t("metadata.title"),
        description: t("metadata.description"),
        robots: {
            index: true,
            follow: true,
            nocache: false,
            googleBot: {
                index: true,
                follow: true,
                noarchive: false,
                nosnippet: false,
                nocache: false,
                notranslate: false,
                "max-video-preview": -1,
                "max-image-preview": "large",
                "max-snippet": -1,
            },
        },
        openGraph: {
            title: t("metadata.title"),
            description: t("metadata.description"),
            type: "website",
            locale: params.locale,
            siteName: t("metadata.siteName"),
            images: [
                {
                    url: "banner.jpg",
                    width: 1200,
                    height: 630,
                    alt: t("metadata.siteName"),
                },
            ],
        },
        applicationName: t("metadata.siteName"),
        twitter: {
            card: "summary_large_image",
            title: t("metadata.title"),
            description: t("metadata.description"),
            images: ["banner.jpg"],
        },
        alternates: {
            canonical: `https://www.bitrey.it/${params.locale}`,
            languages: {
                en: "/en",
                it: "/it",
                cs: "/cs",
            },
        },
        keywords: t("metadata.keywords"),
        authors: [{ name: t("metadata.siteName") }],
        creator: t("metadata.siteName"),
        publisher: t("metadata.siteName"),
        formatDetection: {
            email: false,
            address: false,
            telephone: false,
        },
    };
}

const locales = config.languages;

export function generateStaticParams() {
    return locales.map((locale) => ({ locale }));
}

interface RootLayoutProps {
    children: React.ReactNode;
    params: { locale: string };
}

function RootLayout({ children, params: { locale } }: RootLayoutProps) {
    unstable_setRequestLocale(locale);

    return (
        <html lang={locale}>
            <body>{children}</body>
        </html>
    );
}

export default RootLayout;

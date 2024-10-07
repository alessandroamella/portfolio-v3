import { config } from "@/config";
import "../globals.css";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";

import type { ResolvingMetadata, Metadata } from "next";

type Props = {
    params: { id: string; locale: string };
    searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({ params: { locale } }: Props): Promise<Metadata> {
    const t = await getTranslations({ locale, namespace: "common" });

    return {
        // Basic metadata
        title: t("metadata.title"),
        description: t("metadata.description"),

        // Advanced robots directives
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
                "max-snippet": -1
            }
        },

        // Open Graph metadata for social sharing
        openGraph: {
            title: t("metadata.title"),
            description: t("metadata.description"),
            type: "website",
            locale: locale,
            siteName: t("metadata.siteName"),
            images: [
                {
                    url: "banner.jpg",
                    width: 1200,
                    height: 630,
                    alt: t("metadata.siteName")
                }
            ]
        },

        // Twitter card metadata
        twitter: {
            card: "summary_large_image",
            title: t("metadata.title"),
            description: t("metadata.description"),
            images: ["banner.jpg"]
        },

        // Alternate languages for international SEO
        alternates: {
            canonical: `https://www.bitrey.it/${locale}`,
            languages: {
                en: "/en",
                it: "/it",
                cs: "/cs"
            }
        },

        // Additional metadata
        keywords: t("metadata.keywords"),
        authors: [{ name: t("metadata.siteName") }],
        creator: t("metadata.siteName"),
        publisher: t("metadata.siteName"),
        formatDetection: {
            email: false,
            address: false,
            telephone: false
        }
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

import "../globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Alessandro Amella - Sviluppo Siti Web e Soluzioni Informatiche",
    description: "Sviluppo siti web per privati e aziende"
};

const locales = ["en", "it"];

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
    return (
        <html lang={locale}>
            <body>{children}</body>
        </html>
    );
}

export default RootLayout;

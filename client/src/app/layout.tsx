import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Alessandro Amella - Sviluppo Siti Web",
    description: "Sviluppo siti web per privati e aziende"
};

export default function RootLayout({
    children
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="it">
            <body>{children}</body>
        </html>
    );
}

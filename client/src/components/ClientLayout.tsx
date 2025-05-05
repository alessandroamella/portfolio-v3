"use client";

import Footer from "@/components/Footer";
import Header from "@/components/Header";

interface ClientLayoutProps {
  children: React.ReactNode;
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  return (
    <main className="bg-[#f7f7f7] dark:bg-gray-900 min-h-screen">
      <Header />
      {children}
      <Footer />
    </main>
  );
}

import CountriesClient from "@/components/CountriesClient";
import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { use } from "react";
import MainLayout from "../MainLayout";

// Type for visited countries
interface VisitedCountry {
  id: string;
  name: string;
  experience: string;
}

export default function CountriesPage(props: {
  params: Promise<{ locale: string }>;
}) {
  const params = use(props.params);

  const { locale } = params;
  setRequestLocale(locale);

  const t = useTranslations("countries");

  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto pt-16 px-8">
        <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-6">
          {t("title")}
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mb-8">
          {t("description")}
        </p>
      </div>
      <div className="pb-16">
        <CountriesClient />
      </div>
    </MainLayout>
  );
}

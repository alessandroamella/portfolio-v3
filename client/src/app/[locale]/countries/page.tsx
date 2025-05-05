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

// List of countries I've visited with ISO codes
const visitedCountries: VisitedCountry[] = [
  { id: "ITA", name: "Italy", experience: "Home country" },
  { id: "FRA", name: "France", experience: "Visited Paris and Nice" },
  { id: "ESP", name: "Spain", experience: "Barcelona and Madrid" },
  {
    id: "CHE",
    name: "Switzerland",
    experience: "Beautiful mountains in the Alps",
  },
  { id: "AUT", name: "Austria", experience: "Vienna was amazing" },
  { id: "DEU", name: "Germany", experience: "Berlin and Munich" },
  { id: "GBR", name: "United Kingdom", experience: "London and Edinburgh" },
  { id: "CZE", name: "Czech Republic", experience: "Prague is a gem" },
];

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
        <CountriesClient visitedCountries={visitedCountries} />
      </div>
    </MainLayout>
  );
}

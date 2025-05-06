"use client";

import dynamic from "next/dynamic";

// Type for visited countries
interface VisitedCountry {
  id: string;
  name: string;
  experience: string;
}

// Dynamically import the map component with no SSR
const CountriesMap = dynamic(() => import("@/components/CountriesMap"), {
  ssr: false,
  loading: () => (
    <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg shadow-md h-[400px] flex items-center justify-center">
      <p className="text-gray-500 dark:text-gray-400">Loading map...</p>
    </div>
  ),
});

export default function CountriesClient() {
  return <CountriesMap />;
}

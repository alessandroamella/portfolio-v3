"use client";

import { Spinner } from "flowbite-react";
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
    <div className="w-full h-[400px] md:h-[500px] lg:h-[600px] flex items-center justify-center">
      <p className="text-gray-500 dark:text-gray-400">
        <Spinner size="lg" />
      </p>
    </div>
  ),
});

export default function CountriesClient() {
  return (
    <div className="w-full h-[400px] md:h-[500px] lg:h-[600px]">
      <CountriesMap />
    </div>
  );
}

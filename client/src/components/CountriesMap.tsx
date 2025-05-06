"use client";

import { config } from "@/config";
import { useMemo } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
} from "react-simple-maps";

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

const CountriesMap = () => {
  // Create a memoized lookup object for visited countries
  const visitedCountriesLookup = useMemo(() => {
    const lookup: Record<string, boolean> = {};
    config.visitedCountries.forEach((country) => {
      lookup[country.name] = true;
    });
    return lookup;
  }, []);

  return (
    <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg shadow-md">
      <ComposableMap>
        <ZoomableGroup zoom={1.2}>
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const countryName = geo.properties.name;
                const isVisited = visitedCountriesLookup[countryName];

                return (
                  <Geography
                    geography={geo}
                    key={geo.rsmKey}
                    textAnchor="middle"
                    fill={isVisited ? "#3B82F6" : "#D1D5DB"}
                    stroke="#FFFFFF"
                    style={{
                      default: { outline: "none" },
                      hover: {
                        fill: isVisited ? "#2563EB" : "#9CA3AF",
                        outline: "none",
                      },
                      pressed: { outline: "none" },
                    }}
                  />
                );
              })
            }
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>
    </div>
  );
};

export default CountriesMap;

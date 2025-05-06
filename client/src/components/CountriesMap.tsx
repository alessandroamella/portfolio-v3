"use client";

import { config } from "@/config";
import { useMemo } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
} from "react-simple-maps";

const geoUrl =
  "https://cdn.jsdelivr.net/npm/world-atlas@2.0.2/countries-50m.json";

// European coordinates and zoom level
const EUROPE_COORDINATES: [number, number] = [15, 52] as const; // Longitude, Latitude approximately centered on Europe
const EUROPE_ZOOM = 4 as const;

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
        <ZoomableGroup center={EUROPE_COORDINATES} zoom={EUROPE_ZOOM}>
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const countryName = geo.properties.name;
                const isVisited = visitedCountriesLookup[countryName];

                return (
                  <Geography
                    geography={geo}
                    key={geo.rsmKey}
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

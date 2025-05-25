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
const EUROPE_COORDINATES: [number, number] = [15, 45] as const; // Longitude, Latitude approximately centered on Europe
const EUROPE_ZOOM = 5 as const;

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
    <div className="h-[80vh] md:h-[400px] lg:h-[550px] overflow-hidden md:mx-4 md:p-4 md:rounded-2xl md:shadow-md md:bg-gray-200 md:dark:bg-gray-700">
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

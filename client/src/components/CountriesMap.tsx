"use client";

import { Tooltip } from "flowbite-react";
import React from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
} from "react-simple-maps";

// Type for visited countries
interface VisitedCountry {
  id: string;
  name: string;
  experience: string;
}

interface CountriesMapProps {
  visitedCountries: VisitedCountry[];
}

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

const CountriesMap: React.FC<CountriesMapProps> = ({ visitedCountries }) => {
  return (
    <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg shadow-md">
      <ComposableMap>
        <ZoomableGroup zoom={1.2}>
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const isVisited = visitedCountries.find(
                  (country) => country.id === geo.id,
                );

                return (
                  <Tooltip
                    key={geo.rsmKey}
                    content={
                      isVisited
                        ? `${isVisited.name}: ${isVisited.experience}`
                        : geo.properties.name
                    }
                  >
                    <Geography
                      geography={geo}
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
                  </Tooltip>
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

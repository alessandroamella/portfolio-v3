'use client';
import { config } from '@/config';
import { useIsMobile } from '@/hooks/useIsMobile';
import { sum, zip } from 'lodash';
import { useTranslations } from 'next-intl';
import { useEffect, useMemo, useState } from 'react';
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
} from 'react-simple-maps';

const geoUrl =
  'https://cdn.jsdelivr.net/npm/world-atlas@2.0.2/countries-110m.json';

// Base European coordinates
const EUROPE_BASE_COORDINATES: [number, number] = [15, 45] as const;

interface TooltipData {
  name: string;
  x: number;
  y: number;
}

const sumArrays = (...arrays: [number, number][]): [number, number] => {
  const result = zip(...arrays).map((group) => sum(group));
  return [result[0] || 0, result[1] || 0];
};

const CountriesMap = () => {
  const t = useTranslations('countriesMap');
  const [tooltip, setTooltip] = useState<TooltipData | null>(null);
  const isMobile = useIsMobile(); // Use the custom hook
  const [zoom, setZoom] = useState(1);
  const [coordinates, setCoordinates] = useState<[number, number]>(
    EUROPE_BASE_COORDINATES,
  );

  // Set initial zoom and coordinates based on device
  useEffect(() => {
    if (isMobile) {
      setZoom(7);
      setCoordinates(sumArrays(EUROPE_BASE_COORDINATES, [-2, 0]));
    } else {
      setZoom(4);
      setCoordinates(sumArrays(EUROPE_BASE_COORDINATES, [0, 5]));
    }
  }, [isMobile]);

  // Create a memoized lookup object for visited countries
  const visitedCountriesLookup = useMemo(() => {
    const lookup: Record<string, boolean> = {};
    for (const country of config.visitedCountries) {
      lookup[country.name] = true;
    }
    return lookup;
  }, []);

  const handleMouseEnter = (
    geo: { properties: { name: string } },
    event: React.MouseEvent,
  ) => {
    const { clientX, clientY } = event;
    setTooltip({
      name: geo.properties.name,
      x: clientX,
      y: clientY,
    });
  };

  const handleMouseMove = (event: React.MouseEvent) => {
    if (tooltip) {
      setTooltip((prev) =>
        prev
          ? {
              ...prev,
              x: event.clientX,
              y: event.clientY,
            }
          : null,
      );
    }
  };

  const handleMouseLeave = () => {
    setTooltip(null);
  };

  return (
    <div className='relative mx-auto max-w-6xl h-[60vh] md:h-[500px] xl:h-[550px]'>
      <div className='h-full md:mx-8 md:rounded-2xl lg:rounded-3xl xl:rounded-full md:shadow-lg border-y shadow-lg dark:shadow-gray-700 dark:md:dark:shadow-gray-800 overflow-hidden md:border md:bg-gradient-to-br md:from-blue-50 md:to-indigo-100 md:dark:from-gray-800 md:dark:to-gray-900 transition-all duration-300'>
        <ComposableMap
          projectionConfig={{
            scale: 200,
          }}
          style={{
            width: '100%',
            height: '100%',
          }}
        >
          <ZoomableGroup
            center={coordinates}
            zoom={zoom}
            minZoom={3}
            maxZoom={8}
            translateExtent={[
              [-1000, -500],
              [1000, 500],
            ]}
          >
            <Geographies geography={geoUrl}>
              {({ geographies }) =>
                geographies.map((geo) => {
                  // console.log('geo', geo.properties);
                  const countryName = geo.properties.name;
                  const isVisited = visitedCountriesLookup[countryName];

                  return (
                    <Geography
                      geography={geo}
                      key={geo.rsmKey}
                      onMouseEnter={(event) => handleMouseEnter(geo, event)}
                      onMouseMove={handleMouseMove}
                      onMouseLeave={handleMouseLeave}
                      style={{
                        default: {
                          fill: isVisited ? 'url(#visitedGradient)' : '#E5E7EB',
                          stroke: '#FFFFFF',
                          strokeWidth: 0.5,
                          outline: 'none',
                        },
                        hover: {
                          fill: isVisited
                            ? 'url(#visitedHoverGradient)'
                            : '#D1D5DB',
                          stroke: isVisited ? '#1E40AF' : '#6B7280',
                          strokeWidth: 1,
                          outline: 'none',
                          cursor: 'pointer',
                        },
                        pressed: {
                          fill: isVisited ? '#1E40AF' : '#9CA3AF',
                          outline: 'none',
                        },
                      }}
                    />
                  );
                })
              }
            </Geographies>

            {/* SVG Gradients */}
            <defs>
              <linearGradient
                id='visitedGradient'
                x1='0%'
                y1='0%'
                x2='100%'
                y2='100%'
              >
                <stop offset='0%' stopColor='#3B82F6' />
                <stop offset='100%' stopColor='#1E40AF' />
              </linearGradient>
              <linearGradient
                id='visitedHoverGradient'
                x1='0%'
                y1='0%'
                x2='100%'
                y2='100%'
              >
                <stop offset='0%' stopColor='#2563EB' />
                <stop offset='100%' stopColor='#1D4ED8' />
              </linearGradient>
            </defs>
          </ZoomableGroup>
        </ComposableMap>
      </div>

      {/* Tooltip */}
      {tooltip && (
        <div
          className='fixed z-50 px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-lg pointer-events-none transform -translate-x-1/2 -translate-y-full transition-all duration-200 ease-out'
          style={{
            left: tooltip.x,
            top: tooltip.y - 10,
          }}
        >
          {tooltip.name}
          <div className='absolute top-full left-1/2 transform -translate-x-1/2'>
            <div className='border-4 border-transparent border-t-gray-900' />
          </div>
        </div>
      )}

      {/* Legend */}
      <div className='absolute bottom-4 left-4 md:left-1/2 md:translate-x-[-50%] bg-white dark:bg-gray-800 rounded-lg shadow-lg p-3 text-sm'>
        <div className='flex items-center space-x-4'>
          <div className='flex items-center space-x-2'>
            <div className='w-4 h-3 rounded bg-gradient-to-r from-blue-500 to-blue-700' />
            <span className='text-gray-700 dark:text-gray-300'>
              {t('legend.visited')}
            </span>
          </div>
          <div className='flex items-center space-x-2'>
            <div className='w-4 h-3 rounded bg-gray-300 dark:bg-gray-600' />
            <span className='text-gray-700 dark:text-gray-300'>
              {t('legend.notVisited')}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountriesMap;

import {
  type CountryName,
  countriesMapping,
} from '@/constants/countries-mapping';

export function getI18nCountryName(
  worldAtlasName: string,
  locale: string,
): string {
  const alpha2 = countriesMapping[worldAtlasName as CountryName];
  if (!alpha2) return worldAtlasName;

  try {
    const displayNames = new Intl.DisplayNames([locale], { type: 'region' });
    return displayNames.of(alpha2) || worldAtlasName;
  } catch (error) {
    console.debug('Error getting localized country name:', error);
    return worldAtlasName;
  }
}

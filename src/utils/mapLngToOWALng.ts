/**
 * For some obscure reason, OpenWeatherAPI uses different language codes than the rest of the world.
 * @param lng - language code
 * @returns language code for OpenWeatherAPI
 */
export function mapLngToOWALng(lng: string) {
  switch (lng) {
    case 'cs':
      return 'cz';
    default:
      return lng;
  }
}

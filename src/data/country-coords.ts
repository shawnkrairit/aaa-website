/**
 * Country pin coordinates aligned to the ASEANMapBg viewBox (1000 × 800).
 * Each pin sits over the country's capital region.
 * Lat/Lng are real geographic coordinates of the capital — used as
 * cartographic ornament in the UI (not for actual mapping math).
 */
export interface CountryPin {
  slug: string;
  iso: string;
  /** map x in the 1000-unit viewBox */
  x: number;
  /** map y in the 800-unit viewBox */
  y: number;
  capital: string;
  /** Real-world coordinate label, e.g. "13.7563° N · 100.5018° E" */
  coord: string;
}

export const countryPins: CountryPin[] = [
  { slug: "myanmar",     iso: "MM", x: 110, y: 230, capital: "Naypyidaw",          coord: "19.7633° N · 96.0785° E" },
  { slug: "thailand",    iso: "TH", x: 195, y: 305, capital: "Bangkok",            coord: "13.7563° N · 100.5018° E" },
  { slug: "laos",        iso: "LA", x: 248, y: 215, capital: "Vientiane",          coord: "17.9757° N · 102.6331° E" },
  { slug: "vietnam",     iso: "VN", x: 305, y: 215, capital: "Hanoi",              coord: "21.0285° N · 105.8542° E" },
  { slug: "cambodia",    iso: "KH", x: 280, y: 320, capital: "Phnom Penh",         coord: "11.5564° N · 104.9282° E" },
  { slug: "malaysia",    iso: "MY", x: 252, y: 470, capital: "Kuala Lumpur",       coord: "3.1390° N · 101.6869° E" },
  { slug: "singapore",   iso: "SG", x: 251, y: 538, capital: "Singapore",          coord: "1.3521° N · 103.8198° E" },
  { slug: "brunei",      iso: "BN", x: 470, y: 478, capital: "Bandar Seri Begawan",coord: "4.9031° N · 114.9398° E" },
  { slug: "indonesia",   iso: "ID", x: 440, y: 615, capital: "Jakarta",            coord: "6.2088° S · 106.8456° E" },
  { slug: "philippines", iso: "PH", x: 600, y: 320, capital: "Manila",             coord: "14.5995° N · 120.9842° E" },
  { slug: "timor-leste", iso: "TL", x: 700, y: 715, capital: "Dili",               coord: "8.5586° S · 125.5736° E" },
];

export function getPinBySlug(slug: string): CountryPin | undefined {
  return countryPins.find((p) => p.slug === slug);
}

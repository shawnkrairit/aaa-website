/**
 * Country pin coordinates for the ASEANMapBg viewBox (1000 × 800).
 *
 * Each pin sits on the country's capital. Coordinates were derived from
 * an equirectangular projection anchored on Singapore (252, 540) at
 * (1.35° N, 103.82° E), then sanity-checked against each country path's
 * actual rendered getBBox so every pin lands inside its country shape.
 *
 * Lat/Lng strings are real-world coordinates of the capital — used as
 * cartographic ornament in the UI.
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
  { slug: "myanmar",     iso: "MM", x: 130, y: 220, capital: "Naypyidaw",          coord: "19.7633° N · 96.0785° E" },
  { slug: "thailand",    iso: "TH", x: 195, y: 305, capital: "Bangkok",            coord: "13.7563° N · 100.5018° E" },
  { slug: "laos",        iso: "LA", x: 260, y: 215, capital: "Vientiane",          coord: "17.9757° N · 102.6331° E" },
  { slug: "vietnam",     iso: "VN", x: 290, y: 165, capital: "Hanoi",              coord: "21.0285° N · 105.8542° E" },
  { slug: "cambodia",    iso: "KH", x: 275, y: 330, capital: "Phnom Penh",         coord: "11.5564° N · 104.9282° E" },
  { slug: "malaysia",    iso: "MY", x: 220, y: 480, capital: "Kuala Lumpur",       coord: "3.1390° N · 101.6869° E" },
  { slug: "singapore",   iso: "SG", x: 252, y: 540, capital: "Singapore",          coord: "1.3521° N · 103.8198° E" },
  { slug: "brunei",      iso: "BN", x: 465, y: 478, capital: "Bandar Seri Begawan",coord: "4.9031° N · 114.9398° E" },
  { slug: "indonesia",   iso: "ID", x: 310, y: 700, capital: "Jakarta",            coord: "6.2088° S · 106.8456° E" },
  { slug: "philippines", iso: "PH", x: 590, y: 280, capital: "Manila",             coord: "14.5995° N · 120.9842° E" },
  { slug: "timor-leste", iso: "TL", x: 680, y: 740, capital: "Dili",               coord: "8.5586° S · 125.5736° E" },
];

export function getPinBySlug(slug: string): CountryPin | undefined {
  return countryPins.find((p) => p.slug === slug);
}

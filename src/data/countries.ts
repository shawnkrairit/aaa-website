export interface Country {
  slug: string;
  name: string;
  nameLocal: string;
  flag: string;
  isoCode: string;
  capital: string;
  legalSystem: string;
  firmCount: number;
  keyCities: string[];
  languages: string[];
}

export const countries: Country[] = [
  {
    slug: "brunei",
    name: "Brunei",
    nameLocal: "Brunei Darussalam",
    flag: "🇧🇳",
    isoCode: "BN",
    capital: "Bandar Seri Begawan",
    legalSystem: "Common law based on English common law, with Islamic (Sharia) law",
    firmCount: 1,
    keyCities: ["Bandar Seri Begawan"],
    languages: ["Malay", "English"],
  },
  {
    slug: "cambodia",
    name: "Cambodia",
    nameLocal: "កម្ពុជា",
    flag: "🇰🇭",
    isoCode: "KH",
    capital: "Phnom Penh",
    legalSystem: "Civil law system based on French civil code",
    firmCount: 1,
    keyCities: ["Phnom Penh", "Siem Reap"],
    languages: ["Khmer", "English", "French"],
  },
  {
    slug: "indonesia",
    name: "Indonesia",
    nameLocal: "Indonesia",
    flag: "🇮🇩",
    isoCode: "ID",
    capital: "Jakarta",
    legalSystem: "Civil law system based on Roman-Dutch model, with customary law (adat)",
    firmCount: 2,
    keyCities: ["Jakarta", "Surabaya", "Bali"],
    languages: ["Indonesian", "English"],
  },
  {
    slug: "laos",
    name: "Laos",
    nameLocal: "ລາວ",
    flag: "🇱🇦",
    isoCode: "LA",
    capital: "Vientiane",
    legalSystem: "Civil law system, influenced by French law",
    firmCount: 1,
    keyCities: ["Vientiane", "Luang Prabang"],
    languages: ["Lao", "English", "French"],
  },
  {
    slug: "malaysia",
    name: "Malaysia",
    nameLocal: "Malaysia",
    flag: "🇲🇾",
    isoCode: "MY",
    capital: "Kuala Lumpur",
    legalSystem: "Common law system based on English common law, with Islamic law for Muslims",
    firmCount: 2,
    keyCities: ["Kuala Lumpur", "Penang", "Johor Bahru"],
    languages: ["Malay", "English", "Mandarin", "Tamil"],
  },
  {
    slug: "myanmar",
    name: "Myanmar",
    nameLocal: "မြန်မာ",
    flag: "🇲🇲",
    isoCode: "MM",
    capital: "Naypyidaw",
    legalSystem: "Common law system, with customary and religious law",
    firmCount: 1,
    keyCities: ["Yangon", "Mandalay", "Naypyidaw"],
    languages: ["Burmese", "English"],
  },
  {
    slug: "philippines",
    name: "Philippines",
    nameLocal: "Pilipinas",
    flag: "🇵🇭",
    isoCode: "PH",
    capital: "Manila",
    legalSystem: "Mixed legal system of civil, common, and Islamic law",
    firmCount: 2,
    keyCities: ["Manila", "Makati", "Cebu"],
    languages: ["Filipino", "English"],
  },
  {
    slug: "singapore",
    name: "Singapore",
    nameLocal: "新加坡",
    flag: "🇸🇬",
    isoCode: "SG",
    capital: "Singapore",
    legalSystem: "Common law system based on English common law",
    firmCount: 2,
    keyCities: ["Singapore"],
    languages: ["English", "Mandarin", "Malay", "Tamil"],
  },
  {
    slug: "thailand",
    name: "Thailand",
    nameLocal: "ประเทศไทย",
    flag: "🇹🇭",
    isoCode: "TH",
    capital: "Bangkok",
    legalSystem: "Civil law system with common law influences",
    firmCount: 1,
    keyCities: ["Bangkok", "Chiang Mai", "Phuket"],
    languages: ["Thai", "English"],
  },
  {
    slug: "timor-leste",
    name: "Timor-Leste",
    nameLocal: "Timor-Leste",
    flag: "🇹🇱",
    isoCode: "TL",
    capital: "Dili",
    legalSystem: "Civil law system based on Indonesian and Portuguese law",
    firmCount: 1,
    keyCities: ["Dili"],
    languages: ["Tetum", "Portuguese", "English"],
  },
  {
    slug: "vietnam",
    name: "Vietnam",
    nameLocal: "Việt Nam",
    flag: "🇻🇳",
    isoCode: "VN",
    capital: "Hanoi",
    legalSystem: "Civil law system influenced by French and socialist law",
    firmCount: 2,
    keyCities: ["Ho Chi Minh City", "Hanoi", "Da Nang"],
    languages: ["Vietnamese", "English"],
  },
];

export function getCountryBySlug(slug: string): Country | undefined {
  return countries.find((c) => c.slug === slug);
}

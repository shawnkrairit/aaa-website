export interface MemberFirm {
  id: string;
  name: string;
  country: string;
  city: string;
  description: string;
  practiceAreas: string[];
  keyContacts: { name: string; title: string }[];
  phone: string;
  email: string;
  website: string;
  address: string;
  languages: string[];
  founded: number;
}

export const memberFirms: MemberFirm[] = [
  {
    id: "dejudom",
    name: "Dej-Udom & Associates",
    country: "thailand",
    city: "Bangkok",
    description:
      "A leading Thai law firm providing comprehensive legal services in corporate, commercial, intellectual property, immigration, and litigation matters. Founded by Ajarn Dej-Udom Krairit, the firm has established itself as one of Thailand's most respected independent practices.",
    practiceAreas: [
      "Corporate & Commercial",
      "Intellectual Property",
      "Immigration",
      "Litigation & Dispute Resolution",
      "Employment & Labour",
      "Real Estate",
    ],
    keyContacts: [
      { name: "Dej-Udom Krairit", title: "Managing Partner" },
      { name: "Senior Partner", title: "Head of Corporate" },
    ],
    phone: "+66 (0) 2233 0055",
    email: "info@dejudom.com",
    website: "https://dejudom.com",
    address: "Charn Issara Tower 1, 2/Fl, 942/69 Rama IV Road, Bangkok 10500",
    languages: ["Thai", "English", "Japanese", "Chinese"],
    founded: 1993,
  },
  {
    id: "singapore-firm",
    name: "Alliance Law Group (Singapore)",
    country: "singapore",
    city: "Singapore",
    description:
      "A prominent Singapore law firm specialising in cross-border corporate transactions, banking & finance, and dispute resolution throughout the ASEAN region.",
    practiceAreas: [
      "Corporate & Commercial",
      "Banking & Finance",
      "Mergers & Acquisitions",
      "Litigation & Dispute Resolution",
      "Tax",
    ],
    keyContacts: [
      { name: "Managing Partner", title: "Senior Partner" },
    ],
    phone: "+65 6xxx xxxx",
    email: "info@example.sg",
    website: "https://example.sg",
    address: "Singapore CBD",
    languages: ["English", "Mandarin", "Malay"],
    founded: 2001,
  },
  {
    id: "malaysia-firm",
    name: "Alliance Associates (Malaysia)",
    country: "malaysia",
    city: "Kuala Lumpur",
    description:
      "A well-established Malaysian law firm with expertise in corporate law, Islamic finance, intellectual property, and cross-border transactions.",
    practiceAreas: [
      "Corporate & Commercial",
      "Banking & Finance",
      "Intellectual Property",
      "Real Estate",
      "Employment & Labour",
    ],
    keyContacts: [
      { name: "Managing Partner", title: "Senior Partner" },
    ],
    phone: "+60 3-xxxx xxxx",
    email: "info@example.my",
    website: "https://example.my",
    address: "Kuala Lumpur, Malaysia",
    languages: ["Malay", "English", "Mandarin"],
    founded: 1998,
  },
  {
    id: "indonesia-firm",
    name: "Alliance Legal (Indonesia)",
    country: "indonesia",
    city: "Jakarta",
    description:
      "A leading Indonesian law firm providing legal services in corporate, M&A, banking, and regulatory matters in one of ASEAN's largest economies.",
    practiceAreas: [
      "Corporate & Commercial",
      "Banking & Finance",
      "Mergers & Acquisitions",
      "Real Estate",
      "Tax",
    ],
    keyContacts: [
      { name: "Managing Partner", title: "Senior Partner" },
    ],
    phone: "+62 21-xxxx xxxx",
    email: "info@example.id",
    website: "https://example.id",
    address: "Jakarta, Indonesia",
    languages: ["Indonesian", "English"],
    founded: 2005,
  },
  {
    id: "vietnam-firm",
    name: "Alliance Law (Vietnam)",
    country: "vietnam",
    city: "Ho Chi Minh City",
    description:
      "A dynamic Vietnamese law firm serving domestic and international clients in corporate, investment, intellectual property, and labour law matters.",
    practiceAreas: [
      "Corporate & Commercial",
      "Intellectual Property",
      "Employment & Labour",
      "Real Estate",
      "Tax",
    ],
    keyContacts: [
      { name: "Managing Partner", title: "Senior Partner" },
    ],
    phone: "+84 28-xxxx xxxx",
    email: "info@example.vn",
    website: "https://example.vn",
    address: "Ho Chi Minh City, Vietnam",
    languages: ["Vietnamese", "English"],
    founded: 2003,
  },
  {
    id: "philippines-firm",
    name: "Alliance Attorneys (Philippines)",
    country: "philippines",
    city: "Manila",
    description:
      "A distinguished Philippine law firm with deep expertise in corporate, litigation, intellectual property, and regulatory compliance.",
    practiceAreas: [
      "Corporate & Commercial",
      "Litigation & Dispute Resolution",
      "Intellectual Property",
      "Banking & Finance",
      "Employment & Labour",
    ],
    keyContacts: [
      { name: "Managing Partner", title: "Senior Partner" },
    ],
    phone: "+63 2-xxxx xxxx",
    email: "info@example.ph",
    website: "https://example.ph",
    address: "Makati City, Philippines",
    languages: ["Filipino", "English"],
    founded: 2000,
  },
  {
    id: "cambodia-firm",
    name: "Alliance Legal (Cambodia)",
    country: "cambodia",
    city: "Phnom Penh",
    description:
      "A trusted Cambodian law firm providing corporate, real estate, and investment advisory services in one of ASEAN's fastest-growing markets.",
    practiceAreas: [
      "Corporate & Commercial",
      "Real Estate",
      "Banking & Finance",
      "Tax",
    ],
    keyContacts: [
      { name: "Managing Partner", title: "Senior Partner" },
    ],
    phone: "+855 23-xxx xxx",
    email: "info@example.kh",
    website: "https://example.kh",
    address: "Phnom Penh, Cambodia",
    languages: ["Khmer", "English", "French"],
    founded: 2008,
  },
  {
    id: "myanmar-firm",
    name: "Alliance Law (Myanmar)",
    country: "myanmar",
    city: "Yangon",
    description:
      "A Myanmar law firm providing legal services in corporate, investment, and regulatory matters as the country continues its economic development.",
    practiceAreas: [
      "Corporate & Commercial",
      "Real Estate",
      "Employment & Labour",
    ],
    keyContacts: [
      { name: "Managing Partner", title: "Senior Partner" },
    ],
    phone: "+95 1-xxx xxxx",
    email: "info@example.mm",
    website: "https://example.mm",
    address: "Yangon, Myanmar",
    languages: ["Burmese", "English"],
    founded: 2012,
  },
  {
    id: "laos-firm",
    name: "Alliance Advisors (Laos)",
    country: "laos",
    city: "Vientiane",
    description:
      "A Lao law firm specialising in foreign investment advisory, corporate law, and regulatory compliance in the Lao PDR.",
    practiceAreas: [
      "Corporate & Commercial",
      "Real Estate",
      "Tax",
    ],
    keyContacts: [
      { name: "Managing Partner", title: "Senior Partner" },
    ],
    phone: "+856 21-xxx xxx",
    email: "info@example.la",
    website: "https://example.la",
    address: "Vientiane, Laos",
    languages: ["Lao", "English", "French"],
    founded: 2010,
  },
  {
    id: "brunei-firm",
    name: "Alliance Legal (Brunei)",
    country: "brunei",
    city: "Bandar Seri Begawan",
    description:
      "A Bruneian law firm with expertise in Islamic finance, corporate law, and oil & gas regulatory matters.",
    practiceAreas: [
      "Corporate & Commercial",
      "Banking & Finance",
      "Real Estate",
    ],
    keyContacts: [
      { name: "Managing Partner", title: "Senior Partner" },
    ],
    phone: "+673 2-xxx xxx",
    email: "info@example.bn",
    website: "https://example.bn",
    address: "Bandar Seri Begawan, Brunei",
    languages: ["Malay", "English"],
    founded: 2006,
  },
  {
    id: "tl-legal",
    name: "Timor-Leste Legal Partners",
    country: "timor-leste",
    city: "Dili",
    description:
      "A leading legal practice in Timor-Leste providing expert legal services in corporate, commercial, and investment matters. With deep knowledge of both Portuguese and Indonesian legal traditions, the firm advises local and international clients on Timor-Leste's evolving legal framework.",
    practiceAreas: [
      "Corporate & Commercial",
      "Banking & Finance",
      "Real Estate & Construction",
      "Litigation & Dispute Resolution",
    ],
    keyContacts: [
      { name: "Managing Partner", title: "Senior Partner" },
    ],
    phone: "+670 xxx xxxx",
    email: "info@example.tl",
    website: "https://example.tl",
    address: "Dili, Timor-Leste",
    languages: ["Tetum", "Portuguese", "English"],
    founded: 2010,
  },
];

export function getFirmsByCountry(countrySlug: string): MemberFirm[] {
  return memberFirms.filter((f) => f.country === countrySlug);
}

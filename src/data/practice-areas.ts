export interface PracticeArea {
  slug: string;
  title: string;
  description: string;
  icon: string; // Lucide icon name
  details: string[];
}

export const practiceAreas: PracticeArea[] = [
  {
    slug: "corporate-commercial",
    title: "Corporate & Commercial",
    description:
      "Comprehensive corporate advisory services covering company formation, corporate governance, joint ventures, and commercial transactions across ASEAN jurisdictions.",
    icon: "Building2",
    details: [
      "Company incorporation & restructuring",
      "Corporate governance & compliance",
      "Joint ventures & partnerships",
      "Commercial contracts & agreements",
      "Foreign direct investment advisory",
    ],
  },
  {
    slug: "banking-finance",
    title: "Banking & Finance",
    description:
      "Expert guidance on banking regulations, financial markets, project finance, and structured finance across the rapidly evolving ASEAN financial landscape.",
    icon: "Landmark",
    details: [
      "Banking regulatory compliance",
      "Project & structured finance",
      "Capital markets & securities",
      "Fintech & digital banking",
      "Islamic finance",
    ],
  },
  {
    slug: "intellectual-property",
    title: "Intellectual Property",
    description:
      "Protection and enforcement of intellectual property rights including trademarks, patents, copyrights, and trade secrets throughout the ASEAN region.",
    icon: "Shield",
    details: [
      "Trademark registration & enforcement",
      "Patent prosecution & litigation",
      "Copyright protection",
      "Trade secret & confidentiality",
      "IP portfolio management",
    ],
  },
  {
    slug: "litigation-dispute-resolution",
    title: "Litigation & Dispute Resolution",
    description:
      "Strategic dispute resolution through litigation, arbitration, and mediation, with deep understanding of local court systems and international arbitration frameworks.",
    icon: "Scale",
    details: [
      "Commercial litigation",
      "International arbitration",
      "Mediation & ADR",
      "Enforcement of foreign judgments",
      "Cross-border disputes",
    ],
  },
  {
    slug: "mergers-acquisitions",
    title: "Mergers & Acquisitions",
    description:
      "End-to-end M&A advisory from due diligence through closing, with cross-border expertise connecting buyers and sellers across ASEAN markets.",
    icon: "GitMerge",
    details: [
      "Due diligence & valuation",
      "Transaction structuring",
      "Cross-border M&A",
      "Post-merger integration",
      "Regulatory approvals",
    ],
  },
  {
    slug: "employment-labour",
    title: "Employment & Labour",
    description:
      "Navigation of diverse employment laws across ASEAN, from hiring and immigration to termination and workplace compliance.",
    icon: "Users",
    details: [
      "Employment contracts & policies",
      "Work permits & immigration",
      "Labour dispute resolution",
      "Workplace compliance & safety",
      "Executive compensation",
    ],
  },
  {
    slug: "real-estate",
    title: "Real Estate & Construction",
    description:
      "Advisory on property acquisitions, development projects, leasing, and construction contracts across ASEAN's dynamic real estate markets.",
    icon: "Home",
    details: [
      "Property acquisition & disposal",
      "Real estate development",
      "Leasing & tenancy",
      "Construction contracts",
      "Foreign ownership structures",
    ],
  },
  {
    slug: "tax",
    title: "Tax",
    description:
      "Strategic tax planning and compliance advisory, including cross-border tax structuring, transfer pricing, and navigating ASEAN's diverse tax regimes.",
    icon: "Calculator",
    details: [
      "Tax planning & structuring",
      "Transfer pricing",
      "Tax dispute resolution",
      "Customs & trade compliance",
      "Regional tax optimization",
    ],
  },
];

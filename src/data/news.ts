export interface NewsArticle {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  category: "asean-updates" | "legal-updates" | "alliance-news";
  categoryLabel: string;
  country?: string;
  image?: string;
}

export const newsArticles: NewsArticle[] = [
  {
    slug: "asean-economic-outlook-2026",
    title: "ASEAN Economic Outlook: Strong Growth Continues Into 2026",
    excerpt:
      "The ASEAN region continues to demonstrate resilient economic growth, with GDP expansion expected to reach 5.2% across member states.",
    content: `The ASEAN region continues to demonstrate resilient economic growth heading into 2026. According to recent forecasts from the Asian Development Bank and the International Monetary Fund, the combined GDP of ASEAN member states is projected to grow by approximately 5.2% this year.

Key drivers of growth include increased intra-ASEAN trade facilitated by the Regional Comprehensive Economic Partnership (RCEP), rising foreign direct investment in manufacturing and technology sectors, and accelerating digital transformation across the region.

Indonesia, Vietnam, and the Philippines are expected to lead growth, while Singapore continues to strengthen its position as the region's financial hub. The ASEAN Attorneys Alliance remains committed to supporting businesses navigating this dynamic economic landscape through our network of expert legal professionals across all ten member states.`,
    date: "2026-03-01",
    category: "asean-updates",
    categoryLabel: "ASEAN Updates",
  },
  {
    slug: "thailand-new-foreign-business-regulations",
    title: "Thailand Updates Foreign Business Act Regulations",
    excerpt:
      "New amendments to Thailand's Foreign Business Act introduce streamlined procedures for foreign companies seeking to operate in the Kingdom.",
    content: `Thailand's Department of Business Development has announced significant amendments to the Foreign Business Act (FBA) regulations, effective from January 2026. These changes are designed to create a more business-friendly environment while maintaining appropriate oversight of foreign investment.

Key changes include simplified application procedures for Foreign Business Licenses, expanded categories of businesses exempt from FBA restrictions, and new fast-track processing for companies in targeted industries under the Board of Investment promotion schemes.

For businesses looking to establish or expand operations in Thailand, our member firm Dej-Udom & Associates provides comprehensive advisory on navigating these regulatory changes and structuring compliant business operations.`,
    date: "2026-02-15",
    category: "legal-updates",
    categoryLabel: "Legal Updates",
    country: "Thailand",
  },
  {
    slug: "aaa-annual-conference-2025-recap",
    title: "AAA Annual Conference 2025: Strengthening Regional Legal Cooperation",
    excerpt:
      "Member firms from all 11 ASEAN nations gathered in Singapore for the annual alliance conference, focusing on cross-border legal harmonisation.",
    content: `The ASEAN Attorneys Alliance held its annual conference in Singapore, bringing together partners and senior associates from member firms across all eleven ASEAN nations. The two-day event focused on critical themes of cross-border legal harmonisation, digital transformation in legal practice, and strengthening referral networks.

Highlights included panel discussions on the impact of AI on legal services in Southeast Asia, workshop sessions on cross-border M&A best practices, and networking events designed to deepen relationships between member firms.

The conference reinforced the alliance's commitment to providing seamless cross-border legal services through trusted local expertise in every ASEAN jurisdiction.`,
    date: "2026-01-20",
    category: "alliance-news",
    categoryLabel: "Alliance News",
  },
  {
    slug: "vietnam-new-investment-law-amendments",
    title: "Vietnam Amends Investment Law to Attract More Foreign Capital",
    excerpt:
      "Vietnam's latest investment law amendments remove several barriers to foreign investment and introduce new incentive frameworks.",
    content: `Vietnam's National Assembly has passed important amendments to the Law on Investment, creating new pathways for foreign investors to participate in the country's growing economy. The amendments address key concerns raised by the international business community regarding market access and regulatory transparency.

Notable changes include the reduction of restricted business sectors from 267 to 215, new provisions for public-private partnerships, enhanced protection for foreign investor rights, and streamlined procedures for investment registration.

These amendments position Vietnam as one of the most attractive investment destinations in ASEAN, particularly in manufacturing, technology, and renewable energy sectors.`,
    date: "2026-01-10",
    category: "legal-updates",
    categoryLabel: "Legal Updates",
    country: "Vietnam",
  },
  {
    slug: "rcep-impact-on-asean-trade",
    title: "RCEP Drives Significant Increase in Intra-ASEAN Trade",
    excerpt:
      "Three years after full implementation, the RCEP agreement has demonstrably boosted trade between ASEAN member states and partner economies.",
    content: `The Regional Comprehensive Economic Partnership (RCEP) continues to reshape trade patterns across the Asia-Pacific region. Data from the ASEAN Secretariat shows a 23% increase in intra-ASEAN trade volumes since the agreement's full implementation, with particular growth in services trade and digital commerce.

The simplified rules of origin and harmonised customs procedures under RCEP have reduced trade costs for businesses operating across multiple ASEAN jurisdictions. However, companies must ensure compliance with the specific requirements and timelines of the agreement to fully benefit from tariff reductions.

The ASEAN Attorneys Alliance provides comprehensive advisory on RCEP compliance, customs law, and trade structuring through our network of member firms with deep expertise in each jurisdiction's regulatory framework.`,
    date: "2025-12-05",
    category: "asean-updates",
    categoryLabel: "ASEAN Updates",
  },
  {
    slug: "indonesia-omnibus-law-update",
    title: "Indonesia's Omnibus Law: Two Years of Implementation",
    excerpt:
      "An assessment of the Job Creation Law's impact on business formation, labour regulations, and investment climate in Indonesia.",
    content: `Indonesia's Job Creation Law (Omnibus Law) has now been in effect for over two years, and its impact on the business and investment landscape is becoming clearer. The law consolidated amendments to over 70 existing laws, covering business licensing, labour, investment, and environmental regulations.

Key outcomes include the introduction of risk-based business licensing through the Online Single Submission (OSS) system, revisions to labour law provisions including outsourcing and severance pay regulations, and new frameworks for special economic zones.

While the law has generally been welcomed by the business community for reducing bureaucratic complexity, compliance requirements remain detailed and vary by sector. Our Indonesian member firms provide expert guidance on navigating the post-Omnibus Law regulatory environment.`,
    date: "2025-11-18",
    category: "legal-updates",
    categoryLabel: "Legal Updates",
    country: "Indonesia",
  },
];

export function getArticleBySlug(slug: string): NewsArticle | undefined {
  return newsArticles.find((a) => a.slug === slug);
}

export function getArticlesByCategory(category: string): NewsArticle[] {
  if (category === "all") return newsArticles;
  return newsArticles.filter((a) => a.category === category);
}

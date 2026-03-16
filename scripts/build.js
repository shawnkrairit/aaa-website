#!/usr/bin/env node
/**
 * AAA Website — Static Build Script
 * Generates dynamic pages from data + templates:
 *   - 11 member-firms/{country}/index.html
 *   - 6 news/{slug}/index.html
 *   - 11 business-guides/index.html (listing)
 *   - 11 business-guides/{country}/index.html
 *   - 1 member-firms/index.html (listing)
 */

const fs = require("fs");
const path = require("path");

/* ── Optional: remark for markdown → HTML ── */
let remarkFn, remarkHtmlPlugin, matter;
try {
  matter = require("gray-matter");
} catch {
  console.log("⚠ gray-matter not installed — business guides will be skipped.");
}

async function loadRemark() {
  try {
    const remarkMod = await import("remark");
    const htmlMod = await import("remark-html");
    remarkFn = remarkMod.remark;
    remarkHtmlPlugin = htmlMod.default;
    return true;
  } catch (e) {
    console.log("⚠ remark/remark-html not available:", e.message);
    return false;
  }
}

const ROOT = path.resolve(__dirname, "..");
const GUIDES_SRC = path.resolve(
  ROOT,
  "../aaa-website/src/data/business-guides"
);

/* ── Data ── */

const countries = [
  { slug: "brunei", name: "Brunei", nameLocal: "Brunei Darussalam", isoCode: "BN", capital: "Bandar Seri Begawan", legalSystem: "Common law based on English common law, with Islamic (Sharia) law", firmCount: 1, keyCities: ["Bandar Seri Begawan"], languages: ["Malay", "English"] },
  { slug: "cambodia", name: "Cambodia", nameLocal: "កម្ពុជា", isoCode: "KH", capital: "Phnom Penh", legalSystem: "Civil law system based on French civil code", firmCount: 1, keyCities: ["Phnom Penh", "Siem Reap"], languages: ["Khmer", "English", "French"] },
  { slug: "indonesia", name: "Indonesia", nameLocal: "Indonesia", isoCode: "ID", capital: "Jakarta", legalSystem: "Civil law system based on Roman-Dutch model, with customary law (adat)", firmCount: 2, keyCities: ["Jakarta", "Surabaya", "Bali"], languages: ["Indonesian", "English"] },
  { slug: "laos", name: "Laos", nameLocal: "ລາວ", isoCode: "LA", capital: "Vientiane", legalSystem: "Civil law system, influenced by French law", firmCount: 1, keyCities: ["Vientiane", "Luang Prabang"], languages: ["Lao", "English", "French"] },
  { slug: "malaysia", name: "Malaysia", nameLocal: "Malaysia", isoCode: "MY", capital: "Kuala Lumpur", legalSystem: "Common law system based on English common law, with Islamic law for Muslims", firmCount: 2, keyCities: ["Kuala Lumpur", "Penang", "Johor Bahru"], languages: ["Malay", "English", "Mandarin", "Tamil"] },
  { slug: "myanmar", name: "Myanmar", nameLocal: "မြန်မာ", isoCode: "MM", capital: "Naypyidaw", legalSystem: "Common law system, with customary and religious law", firmCount: 1, keyCities: ["Yangon", "Mandalay", "Naypyidaw"], languages: ["Burmese", "English"] },
  { slug: "philippines", name: "Philippines", nameLocal: "Pilipinas", isoCode: "PH", capital: "Manila", legalSystem: "Mixed legal system of civil, common, and Islamic law", firmCount: 2, keyCities: ["Manila", "Makati", "Cebu"], languages: ["Filipino", "English"] },
  { slug: "singapore", name: "Singapore", nameLocal: "新加坡", isoCode: "SG", capital: "Singapore", legalSystem: "Common law system based on English common law", firmCount: 2, keyCities: ["Singapore"], languages: ["English", "Mandarin", "Malay", "Tamil"] },
  { slug: "thailand", name: "Thailand", nameLocal: "ประเทศไทย", isoCode: "TH", capital: "Bangkok", legalSystem: "Civil law system with common law influences", firmCount: 1, keyCities: ["Bangkok", "Chiang Mai", "Phuket"], languages: ["Thai", "English"] },
  { slug: "timor-leste", name: "Timor-Leste", nameLocal: "Timor-Leste", isoCode: "TL", capital: "Dili", legalSystem: "Civil law system based on Indonesian and Portuguese law", firmCount: 1, keyCities: ["Dili"], languages: ["Tetum", "Portuguese", "English"] },
  { slug: "vietnam", name: "Vietnam", nameLocal: "Việt Nam", isoCode: "VN", capital: "Hanoi", legalSystem: "Civil law system influenced by French and socialist law", firmCount: 2, keyCities: ["Ho Chi Minh City", "Hanoi", "Da Nang"], languages: ["Vietnamese", "English"] },
];

const memberFirms = [
  { id: "dejudom", name: "Dej-Udom & Associates", country: "thailand", city: "Bangkok", description: "A leading Thai law firm providing comprehensive legal services in corporate, commercial, intellectual property, immigration, and litigation matters. Founded by Ajarn Dej-Udom Krairit, the firm has established itself as one of Thailand's most respected independent practices.", practiceAreas: ["Corporate & Commercial", "Intellectual Property", "Immigration", "Litigation & Dispute Resolution", "Employment & Labour", "Real Estate"], keyContacts: [{ name: "Dej-Udom Krairit", title: "Managing Partner" }, { name: "Senior Partner", title: "Head of Corporate" }], phone: "+66 (0) 2233 0055", email: "info@dejudom.com", website: "https://dejudom.com", address: "Charn Issara Tower 1, 2/Fl, 942/69 Rama IV Road, Bangkok 10500", languages: ["Thai", "English", "Japanese", "Chinese"], founded: 1993 },
  { id: "singapore-firm", name: "Alliance Law Group (Singapore)", country: "singapore", city: "Singapore", description: "A prominent Singapore law firm specialising in cross-border corporate transactions, banking & finance, and dispute resolution throughout the ASEAN region.", practiceAreas: ["Corporate & Commercial", "Banking & Finance", "Mergers & Acquisitions", "Litigation & Dispute Resolution", "Tax"], keyContacts: [{ name: "Managing Partner", title: "Senior Partner" }], phone: "+65 6xxx xxxx", email: "info@example.sg", website: "https://example.sg", address: "Singapore CBD", languages: ["English", "Mandarin", "Malay"], founded: 2001 },
  { id: "malaysia-firm", name: "Alliance Associates (Malaysia)", country: "malaysia", city: "Kuala Lumpur", description: "A well-established Malaysian law firm with expertise in corporate law, Islamic finance, intellectual property, and cross-border transactions.", practiceAreas: ["Corporate & Commercial", "Banking & Finance", "Intellectual Property", "Real Estate", "Employment & Labour"], keyContacts: [{ name: "Managing Partner", title: "Senior Partner" }], phone: "+60 3-xxxx xxxx", email: "info@example.my", website: "https://example.my", address: "Kuala Lumpur, Malaysia", languages: ["Malay", "English", "Mandarin"], founded: 1998 },
  { id: "indonesia-firm", name: "Alliance Legal (Indonesia)", country: "indonesia", city: "Jakarta", description: "A leading Indonesian law firm providing legal services in corporate, M&A, banking, and regulatory matters in one of ASEAN's largest economies.", practiceAreas: ["Corporate & Commercial", "Banking & Finance", "Mergers & Acquisitions", "Real Estate", "Tax"], keyContacts: [{ name: "Managing Partner", title: "Senior Partner" }], phone: "+62 21-xxxx xxxx", email: "info@example.id", website: "https://example.id", address: "Jakarta, Indonesia", languages: ["Indonesian", "English"], founded: 2005 },
  { id: "vietnam-firm", name: "Alliance Law (Vietnam)", country: "vietnam", city: "Ho Chi Minh City", description: "A dynamic Vietnamese law firm serving domestic and international clients in corporate, investment, intellectual property, and labour law matters.", practiceAreas: ["Corporate & Commercial", "Intellectual Property", "Employment & Labour", "Real Estate", "Tax"], keyContacts: [{ name: "Managing Partner", title: "Senior Partner" }], phone: "+84 28-xxxx xxxx", email: "info@example.vn", website: "https://example.vn", address: "Ho Chi Minh City, Vietnam", languages: ["Vietnamese", "English"], founded: 2003 },
  { id: "philippines-firm", name: "Alliance Attorneys (Philippines)", country: "philippines", city: "Manila", description: "A distinguished Philippine law firm with deep expertise in corporate, litigation, intellectual property, and regulatory compliance.", practiceAreas: ["Corporate & Commercial", "Litigation & Dispute Resolution", "Intellectual Property", "Banking & Finance", "Employment & Labour"], keyContacts: [{ name: "Managing Partner", title: "Senior Partner" }], phone: "+63 2-xxxx xxxx", email: "info@example.ph", website: "https://example.ph", address: "Makati City, Philippines", languages: ["Filipino", "English"], founded: 2000 },
  { id: "cambodia-firm", name: "Alliance Legal (Cambodia)", country: "cambodia", city: "Phnom Penh", description: "A trusted Cambodian law firm providing corporate, real estate, and investment advisory services in one of ASEAN's fastest-growing markets.", practiceAreas: ["Corporate & Commercial", "Real Estate", "Banking & Finance", "Tax"], keyContacts: [{ name: "Managing Partner", title: "Senior Partner" }], phone: "+855 23-xxx xxx", email: "info@example.kh", website: "https://example.kh", address: "Phnom Penh, Cambodia", languages: ["Khmer", "English", "French"], founded: 2008 },
  { id: "myanmar-firm", name: "Alliance Law (Myanmar)", country: "myanmar", city: "Yangon", description: "A Myanmar law firm providing legal services in corporate, investment, and regulatory matters as the country continues its economic development.", practiceAreas: ["Corporate & Commercial", "Real Estate", "Employment & Labour"], keyContacts: [{ name: "Managing Partner", title: "Senior Partner" }], phone: "+95 1-xxx xxxx", email: "info@example.mm", website: "https://example.mm", address: "Yangon, Myanmar", languages: ["Burmese", "English"], founded: 2012 },
  { id: "laos-firm", name: "Alliance Advisors (Laos)", country: "laos", city: "Vientiane", description: "A Lao law firm specialising in foreign investment advisory, corporate law, and regulatory compliance in the Lao PDR.", practiceAreas: ["Corporate & Commercial", "Real Estate", "Tax"], keyContacts: [{ name: "Managing Partner", title: "Senior Partner" }], phone: "+856 21-xxx xxx", email: "info@example.la", website: "https://example.la", address: "Vientiane, Laos", languages: ["Lao", "English", "French"], founded: 2010 },
  { id: "brunei-firm", name: "Alliance Legal (Brunei)", country: "brunei", city: "Bandar Seri Begawan", description: "A Bruneian law firm with expertise in Islamic finance, corporate law, and oil & gas regulatory matters.", practiceAreas: ["Corporate & Commercial", "Banking & Finance", "Real Estate"], keyContacts: [{ name: "Managing Partner", title: "Senior Partner" }], phone: "+673 2-xxx xxx", email: "info@example.bn", website: "https://example.bn", address: "Bandar Seri Begawan, Brunei", languages: ["Malay", "English"], founded: 2006 },
  { id: "tl-legal", name: "Timor-Leste Legal Partners", country: "timor-leste", city: "Dili", description: "A leading legal practice in Timor-Leste providing expert legal services in corporate, commercial, and investment matters. With deep knowledge of both Portuguese and Indonesian legal traditions, the firm advises local and international clients on Timor-Leste's evolving legal framework.", practiceAreas: ["Corporate & Commercial", "Banking & Finance", "Real Estate & Construction", "Litigation & Dispute Resolution"], keyContacts: [{ name: "Managing Partner", title: "Senior Partner" }], phone: "+670 xxx xxxx", email: "info@example.tl", website: "https://example.tl", address: "Dili, Timor-Leste", languages: ["Tetum", "Portuguese", "English"], founded: 2010 },
];

const newsArticles = [
  { slug: "asean-economic-outlook-2026", title: "ASEAN Economic Outlook: Strong Growth Continues Into 2026", excerpt: "The ASEAN region continues to demonstrate resilient economic growth, with GDP expansion expected to reach 5.2% across member states.", content: "The ASEAN region continues to demonstrate resilient economic growth heading into 2026. According to recent forecasts from the Asian Development Bank and the International Monetary Fund, the combined GDP of ASEAN member states is projected to grow by approximately 5.2% this year.\n\nKey drivers of growth include increased intra-ASEAN trade facilitated by the Regional Comprehensive Economic Partnership (RCEP), rising foreign direct investment in manufacturing and technology sectors, and accelerating digital transformation across the region.\n\nIndonesia, Vietnam, and the Philippines are expected to lead growth, while Singapore continues to strengthen its position as the region's financial hub. The ASEAN Attorneys Alliance remains committed to supporting businesses navigating this dynamic economic landscape through our network of expert legal professionals across all ten member states.", date: "2026-03-01", category: "asean-updates", categoryLabel: "ASEAN Updates" },
  { slug: "thailand-new-foreign-business-regulations", title: "Thailand Updates Foreign Business Act Regulations", excerpt: "New amendments to Thailand's Foreign Business Act introduce streamlined procedures for foreign companies seeking to operate in the Kingdom.", content: "Thailand's Department of Business Development has announced significant amendments to the Foreign Business Act (FBA) regulations, effective from January 2026. These changes are designed to create a more business-friendly environment while maintaining appropriate oversight of foreign investment.\n\nKey changes include simplified application procedures for Foreign Business Licenses, expanded categories of businesses exempt from FBA restrictions, and new fast-track processing for companies in targeted industries under the Board of Investment promotion schemes.\n\nFor businesses looking to establish or expand operations in Thailand, our member firm Dej-Udom & Associates provides comprehensive advisory on navigating these regulatory changes and structuring compliant business operations.", date: "2026-02-15", category: "legal-updates", categoryLabel: "Legal Updates", country: "Thailand" },
  { slug: "aaa-annual-conference-2025-recap", title: "AAA Annual Conference 2025: Strengthening Regional Legal Cooperation", excerpt: "Member firms from all 11 ASEAN nations gathered in Singapore for the annual alliance conference, focusing on cross-border legal harmonisation.", content: "The ASEAN Attorneys Alliance held its annual conference in Singapore, bringing together partners and senior associates from member firms across all eleven ASEAN nations. The two-day event focused on critical themes of cross-border legal harmonisation, digital transformation in legal practice, and strengthening referral networks.\n\nHighlights included panel discussions on the impact of AI on legal services in Southeast Asia, workshop sessions on cross-border M&A best practices, and networking events designed to deepen relationships between member firms.\n\nThe conference reinforced the alliance's commitment to providing seamless cross-border legal services through trusted local expertise in every ASEAN jurisdiction.", date: "2026-01-20", category: "alliance-news", categoryLabel: "Alliance News" },
  { slug: "vietnam-new-investment-law-amendments", title: "Vietnam Amends Investment Law to Attract More Foreign Capital", excerpt: "Vietnam's latest investment law amendments remove several barriers to foreign investment and introduce new incentive frameworks.", content: "Vietnam's National Assembly has passed important amendments to the Law on Investment, creating new pathways for foreign investors to participate in the country's growing economy. The amendments address key concerns raised by the international business community regarding market access and regulatory transparency.\n\nNotable changes include the reduction of restricted business sectors from 267 to 215, new provisions for public-private partnerships, enhanced protection for foreign investor rights, and streamlined procedures for investment registration.\n\nThese amendments position Vietnam as one of the most attractive investment destinations in ASEAN, particularly in manufacturing, technology, and renewable energy sectors.", date: "2026-01-10", category: "legal-updates", categoryLabel: "Legal Updates", country: "Vietnam" },
  { slug: "rcep-impact-on-asean-trade", title: "RCEP Drives Significant Increase in Intra-ASEAN Trade", excerpt: "Three years after full implementation, the RCEP agreement has demonstrably boosted trade between ASEAN member states and partner economies.", content: "The Regional Comprehensive Economic Partnership (RCEP) continues to reshape trade patterns across the Asia-Pacific region. Data from the ASEAN Secretariat shows a 23% increase in intra-ASEAN trade volumes since the agreement's full implementation, with particular growth in services trade and digital commerce.\n\nThe simplified rules of origin and harmonised customs procedures under RCEP have reduced trade costs for businesses operating across multiple ASEAN jurisdictions. However, companies must ensure compliance with the specific requirements and timelines of the agreement to fully benefit from tariff reductions.\n\nThe ASEAN Attorneys Alliance provides comprehensive advisory on RCEP compliance, customs law, and trade structuring through our network of member firms with deep expertise in each jurisdiction's regulatory framework.", date: "2025-12-05", category: "asean-updates", categoryLabel: "ASEAN Updates" },
  { slug: "indonesia-omnibus-law-update", title: "Indonesia's Omnibus Law: Two Years of Implementation", excerpt: "An assessment of the Job Creation Law's impact on business formation, labour regulations, and investment climate in Indonesia.", content: "Indonesia's Job Creation Law (Omnibus Law) has now been in effect for over two years, and its impact on the business and investment landscape is becoming clearer. The law consolidated amendments to over 70 existing laws, covering business licensing, labour, investment, and environmental regulations.\n\nKey outcomes include the introduction of risk-based business licensing through the Online Single Submission (OSS) system, revisions to labour law provisions including outsourcing and severance pay regulations, and new frameworks for special economic zones.\n\nWhile the law has generally been welcomed by the business community for reducing bureaucratic complexity, compliance requirements remain detailed and vary by sector. Our Indonesian member firms provide expert guidance on navigating the post-Omnibus Law regulatory environment.", date: "2025-11-18", category: "legal-updates", categoryLabel: "Legal Updates", country: "Indonesia" },
];

/* ── Helpers ── */

function formatDate(dateStr) {
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function htmlHead(title, description, depth) {
  const prefix = depth === 0 ? "" : "../".repeat(depth);
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title} | ASEAN Attorneys Alliance</title>
  <meta name="description" content="${description}">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cormorant:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&family=Montserrat:wght@400;500;600;700&display=swap" rel="stylesheet">
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      theme: {
        extend: {
          colors: {
            navy: '#0A1628',
            gold: '#A17C45',
            'gold-light': '#C4A265',
            border: '#EBEBEB',
            surface: '#FAFAFA',
            'surface-warm': '#FAF8F5',
            text: '#0A1628',
            'text-muted': '#64748B',
            'text-light': '#94A3B8',
            success: '#16A34A',
          },
          fontFamily: {
            heading: ['Cormorant', 'Georgia', 'serif'],
            body: ['Montserrat', 'Helvetica Neue', 'sans-serif'],
          },
        },
      },
      plugins: [
        function({ addBase }) {
          addBase({
            'h1, h2, h3, h4, h5, h6': {
              fontFamily: "'Cormorant', Georgia, serif",
              color: '#0A1628',
              lineHeight: '1.1',
              fontWeight: '600',
            },
            'h1': { fontSize: 'clamp(2.75rem, 5vw, 4.5rem)', letterSpacing: '-0.02em' },
            'h2': { fontSize: 'clamp(2rem, 4vw, 3rem)', letterSpacing: '-0.015em' },
            'h3': { fontSize: '1.5rem' },
            'h4': { fontSize: '1.125rem' },
          });
        }
      ],
    }
  </script>
  <link rel="stylesheet" href="${prefix}css/globals.css">
  <script src="https://unpkg.com/lucide@latest/dist/umd/lucide.min.js"></script>
</head>
<body class="loading">
  <div id="navbar-placeholder"></div>
  <main>`;
}

function htmlFoot(depth) {
  const prefix = depth === 0 ? "" : "../".repeat(depth);
  return `
  </main>
  <div id="footer-placeholder"></div>
  <script src="${prefix}js/main.js"></script>
  <script src="${prefix}js/includes.js"></script>
  <script src="${prefix}js/scroll-animate.js"></script>
</body>
</html>`;
}

/* ──────────────────────────────────────────
   1. MEMBER FIRMS LISTING PAGE
   ────────────────────────────────────────── */

function buildMemberFirmsListing() {
  const cards = countries
    .map((c) => {
      const firms = memberFirms.filter((f) => f.country === c.slug);
      return `
        <a href="${c.slug}/" class="card group cursor-pointer block">
          <div class="flex items-start gap-4">
            <img src="../images/flags/${c.isoCode}.svg" class="flag-lg" alt="${c.name} flag">
            <div class="flex-1">
              <h2 class="text-xl font-heading text-navy font-semibold mb-1 group-hover:text-gold transition-colors">${c.name}</h2>
              <p class="text-text-light text-sm mb-3">${c.nameLocal}</p>
              <div class="space-y-2 text-sm text-text-muted">
                <div class="flex items-center gap-2">
                  <i data-lucide="map-pin" class="w-4 h-4 text-gold shrink-0"></i>
                  <span>${c.keyCities.join(", ")}</span>
                </div>
                <div class="flex items-center gap-2">
                  <i data-lucide="globe" class="w-4 h-4 text-gold shrink-0"></i>
                  <span>${c.languages.join(", ")}</span>
                </div>
                <div class="flex items-center gap-2">
                  <i data-lucide="scale" class="w-4 h-4 text-gold shrink-0"></i>
                  <span>${firms.length} ${firms.length === 1 ? "firm" : "firms"}</span>
                </div>
              </div>
            </div>
          </div>
          <div class="mt-4 pt-4 border-t border-border">
            <span class="text-gold text-xs font-semibold tracking-[0.15em] uppercase group-hover:text-gold-light transition-colors">View Firms &rarr;</span>
          </div>
        </a>`;
    })
    .join("\n");

  const html = `${htmlHead("Member Firms", "Our network of leading independent law firms spans all 11 ASEAN member states.", 1)}

    <!-- Page Header -->
    <section class="bg-navy py-24 lg:py-32">
      <div class="container-narrow text-center" data-animate="fadeUp">
        <div class="gold-accent mx-auto mb-6"></div>
        <h1 class="text-white mb-6">Member Firms</h1>
        <p class="text-text-light max-w-2xl mx-auto text-base lg:text-lg leading-relaxed">
          Our network of leading independent law firms spans all 11 ASEAN member states, providing comprehensive legal coverage across Southeast Asia.
        </p>
      </div>
    </section>

    <!-- Country Grid -->
    <section class="section-padding bg-white">
      <div class="container-narrow">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" data-stagger>
          ${cards}
        </div>
      </div>
    </section>

${htmlFoot(1)}`;

  ensureDir(path.join(ROOT, "member-firms"));
  fs.writeFileSync(path.join(ROOT, "member-firms/index.html"), html);
  console.log("  ✓ member-firms/index.html");
}

/* ──────────────────────────────────────────
   2. MEMBER FIRMS — INDIVIDUAL COUNTRY PAGES
   ────────────────────────────────────────── */

function buildCountryPage(country) {
  const firms = memberFirms.filter((f) => f.country === country.slug);

  const firmCards = firms
    .map(
      (firm) => `
        <div class="card !p-8">
          <div class="flex flex-col lg:flex-row lg:items-start gap-6">
            <div class="w-20 h-20 bg-navy/5 flex items-center justify-center shrink-0">
              <span class="font-heading text-navy text-2xl font-bold">${firm.name.charAt(0)}</span>
            </div>
            <div class="flex-1">
              <h2 class="text-2xl font-heading text-navy font-semibold mb-2">${firm.name}</h2>
              <p class="text-text-muted leading-relaxed mb-4">${firm.description}</p>

              <div class="mb-4">
                <h3 class="label-text mb-2">Practice Areas</h3>
                <div class="flex flex-wrap gap-2">
                  ${firm.practiceAreas.map((a) => `<span class="px-3 py-1 bg-navy/5 text-navy text-xs font-medium">${a}</span>`).join("\n                  ")}
                </div>
              </div>

              <div class="mb-4">
                <h3 class="label-text mb-2">Key Contacts</h3>
                <div class="flex flex-wrap gap-4">
                  ${firm.keyContacts.map((c) => `<div class="text-sm"><span class="font-medium text-text">${c.name}</span><span class="text-text-muted"> — ${c.title}</span></div>`).join("\n                  ")}
                </div>
              </div>

              <div class="flex flex-wrap gap-6 text-sm text-text-muted">
                <a href="tel:${firm.phone.replace(/[\s()-]/g, "")}" class="flex items-center gap-2 hover:text-navy transition-colors">
                  <i data-lucide="phone" class="w-4 h-4"></i>${firm.phone}
                </a>
                <a href="mailto:${firm.email}" class="flex items-center gap-2 hover:text-navy transition-colors">
                  <i data-lucide="mail" class="w-4 h-4"></i>${firm.email}
                </a>
                <a href="${firm.website}" target="_blank" rel="noopener noreferrer" class="flex items-center gap-2 hover:text-navy transition-colors">
                  <i data-lucide="external-link" class="w-4 h-4"></i>Visit Website
                </a>
              </div>
            </div>
          </div>
        </div>`
    )
    .join("\n");

  const html = `${htmlHead(`Member Firms in ${country.name}`, `Find trusted law firms in ${country.name} through the ASEAN Attorneys Alliance.`, 2)}

    <!-- Page Header -->
    <section class="bg-navy py-24 lg:py-32">
      <div class="container-narrow">
        <a href="../" class="inline-flex items-center gap-2 text-white/40 hover:text-white text-xs tracking-wider uppercase mb-8 transition-colors">
          <i data-lucide="arrow-left" class="w-4 h-4"></i>Back to Member Firms
        </a>
        <div class="flex items-center gap-4">
          <img src="../../images/flags/${country.isoCode}.svg" alt="${country.name} flag" class="w-20 h-14 object-cover rounded shadow">
          <div>
            <h1 class="text-4xl sm:text-5xl font-heading text-white mb-2">${country.name}</h1>
            <p class="text-white/30 text-lg">${country.nameLocal}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Country Info -->
    <section class="bg-surface border-b border-border py-6">
      <div class="container-narrow">
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
          <div class="flex items-center gap-2 text-text-muted">
            <i data-lucide="scale" class="w-4 h-4 text-gold"></i>
            <span class="font-medium">Legal System:</span>
            <span>${country.legalSystem}</span>
          </div>
          <div class="flex items-center gap-2 text-text-muted">
            <i data-lucide="map-pin" class="w-4 h-4 text-gold"></i>
            <span class="font-medium">Key Cities:</span>
            <span>${country.keyCities.join(", ")}</span>
          </div>
          <div class="flex items-center gap-2 text-text-muted">
            <i data-lucide="globe" class="w-4 h-4 text-gold"></i>
            <span class="font-medium">Languages:</span>
            <span>${country.languages.join(", ")}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Firms -->
    <section class="section-padding bg-white">
      <div class="container-narrow">
        <div class="space-y-8">
          ${firmCards}
        </div>

        <!-- Cross-link to business guide -->
        <div class="mt-12 p-6 border border-border bg-surface-warm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div class="flex items-center gap-3">
            <i data-lucide="book-open" class="w-5 h-5 text-gold shrink-0"></i>
            <div>
              <p class="font-semibold text-navy text-sm">Doing Business in ${country.name}</p>
              <p class="text-text-muted text-xs">Legal frameworks, taxation, entity formation & more</p>
            </div>
          </div>
          <a href="../../business-guides/${country.slug}/" class="inline-flex items-center gap-2 text-gold font-semibold text-xs tracking-[0.1em] uppercase hover:text-gold-light transition-colors group shrink-0">
            Read Guide
            <i data-lucide="arrow-right" class="w-3.5 h-3.5"></i>
          </a>
        </div>
      </div>
    </section>

${htmlFoot(2)}`;

  const dir = path.join(ROOT, "member-firms", country.slug);
  ensureDir(dir);
  fs.writeFileSync(path.join(dir, "index.html"), html);
  console.log(`  ✓ member-firms/${country.slug}/index.html`);
}

/* ──────────────────────────────────────────
   3. NEWS ARTICLE PAGES
   ────────────────────────────────────────── */

function buildNewsArticle(article) {
  const paragraphs = article.content
    .split("\n\n")
    .map((p) => `<p class="mb-6 text-text-muted leading-relaxed text-lg">${p}</p>`)
    .join("\n            ");

  const countryTag = article.country
    ? `<span class="px-3 py-1 bg-gold/20 text-gold-light text-xs font-semibold tracking-wider uppercase">${article.country}</span>`
    : "";

  const html = `${htmlHead(article.title, article.excerpt, 2)}

    <!-- Header -->
    <section class="bg-navy py-24 lg:py-32">
      <div class="container-narrow">
        <a href="../" class="inline-flex items-center gap-2 text-white/40 hover:text-white text-xs tracking-wider uppercase mb-8 transition-colors">
          <i data-lucide="arrow-left" class="w-4 h-4"></i>Back to News
        </a>

        <div class="flex items-center gap-3 mb-4">
          <span class="label-text flex items-center gap-1">
            <i data-lucide="tag" class="w-3.5 h-3.5"></i>${article.categoryLabel}
          </span>
          ${countryTag}
        </div>

        <h1 class="text-3xl sm:text-4xl lg:text-5xl font-heading text-white mb-4 leading-tight">
          ${article.title}
        </h1>

        <div class="flex items-center gap-2 text-white/30 text-sm">
          <i data-lucide="calendar" class="w-4 h-4"></i>${formatDate(article.date)}
        </div>
      </div>
    </section>

    <!-- Content -->
    <section class="section-padding bg-white">
      <div class="container-narrow">
        <div class="max-w-3xl mx-auto">
          <div class="prose prose-lg max-w-none">
            ${paragraphs}
          </div>

          <div class="mt-12 pt-8 border-t border-border">
            <a href="../" class="inline-flex items-center gap-2 text-gold font-semibold text-xs tracking-[0.15em] uppercase hover:text-gold-light transition-colors">
              <i data-lucide="arrow-left" class="w-4 h-4"></i>Back to All News
            </a>
          </div>
        </div>
      </div>
    </section>

${htmlFoot(2)}`;

  const dir = path.join(ROOT, "news", article.slug);
  ensureDir(dir);
  fs.writeFileSync(path.join(dir, "index.html"), html);
  console.log(`  ✓ news/${article.slug}/index.html`);
}

/* ──────────────────────────────────────────
   4. BUSINESS GUIDES LISTING PAGE
   ────────────────────────────────────────── */

function buildBusinessGuidesListing(guideSummaries) {
  const cards = guideSummaries
    .sort((a, b) => a.jurisdiction.localeCompare(b.jurisdiction))
    .map((g) => {
      const country = countries.find((c) => c.slug === g.slug);
      const iso = country ? country.isoCode : "";
      return `
        <a href="${g.slug}/" class="group card !p-0 overflow-hidden cursor-pointer block">
          <div class="bg-navy p-6 flex items-center gap-4">
            ${iso ? `<img src="../images/flags/${iso}.svg" class="w-14 h-10 object-cover rounded shadow" alt="${g.jurisdiction} flag">` : ""}
            <div>
              <h2 class="text-lg font-heading text-white group-hover:text-gold transition-colors">${g.jurisdiction}</h2>
              <p class="text-white/30 text-xs">Updated ${g.lastUpdated}</p>
            </div>
          </div>
          <div class="p-6">
            <p class="text-text-muted text-sm leading-relaxed mb-4 line-clamp-3">${g.excerpt}</p>
            <span class="inline-flex items-center gap-2 text-gold font-semibold text-xs tracking-[0.1em] uppercase">
              Read Guide <i data-lucide="arrow-right" class="w-3.5 h-3.5"></i>
            </span>
          </div>
        </a>`;
    })
    .join("\n");

  const html = `${htmlHead("Doing Business in ASEAN", "Comprehensive jurisdiction-by-jurisdiction guides covering legal frameworks, business entity formation, taxation, and more.", 1)}

    <!-- Page Header -->
    <section class="bg-navy py-24 lg:py-32">
      <div class="container-narrow text-center" data-animate="fadeUp">
        <div class="gold-accent mx-auto mb-6"></div>
        <h1 class="text-white mb-6">Doing Business in ASEAN</h1>
        <p class="text-text-light max-w-3xl mx-auto text-base lg:text-lg leading-relaxed">
          Comprehensive jurisdiction-by-jurisdiction guides covering legal frameworks, business entity formation, taxation, employment law, and regulatory requirements across all 11 ASEAN member states.
        </p>
      </div>
    </section>

    <!-- Disclaimer -->
    <section class="bg-surface border-b border-border py-4">
      <div class="container-narrow">
        <p class="text-text-muted text-xs leading-relaxed">
          These guides are for informational purposes only and do not constitute legal advice. For specific legal guidance, please contact the AAA member firm in the relevant jurisdiction.
        </p>
      </div>
    </section>

    <!-- Guides Grid -->
    <section class="section-padding bg-white">
      <div class="container-narrow">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" data-stagger>
          ${cards}
        </div>
      </div>
    </section>

${htmlFoot(1)}`;

  ensureDir(path.join(ROOT, "business-guides"));
  fs.writeFileSync(path.join(ROOT, "business-guides/index.html"), html);
  console.log("  ✓ business-guides/index.html");
}

/* ──────────────────────────────────────────
   5. BUSINESS GUIDES — INDIVIDUAL PAGES
   ────────────────────────────────────────── */

async function buildBusinessGuide(slug) {
  if (!remarkFn || !matter) return;

  const filePath = path.join(GUIDES_SRC, `${slug}.md`);
  if (!fs.existsSync(filePath)) {
    console.log(`  ⚠ No markdown for ${slug}, skipping`);
    return;
  }

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  const frontmatter = data;
  const country = countries.find((c) => c.slug === slug);

  // Extract TOC
  const tocItems = [];
  const lines = content.split("\n");
  let currentH2 = null;
  for (const line of lines) {
    const match = line.match(/^(#{2,3})\s+(.+)/);
    if (match) {
      const level = match[1].length;
      const title = match[2].replace(/\*\*/g, "").replace(/\*/g, "").trim();
      const id = title
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .slice(0, 60);
      if (level === 2) {
        currentH2 = { id, title, children: [] };
        tocItems.push(currentH2);
      } else if (level === 3 && currentH2) {
        currentH2.children.push({ id, title });
      }
    }
  }

  // Process markdown: add IDs to headings
  let processed = content.replace(
    /^(#{2,3})\s+(.+)/gm,
    (_, hashes, title) => {
      const clean = title.replace(/\*\*/g, "").replace(/\*/g, "").trim();
      const id = clean
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .slice(0, 60);
      return `${hashes} <a id="${id}"></a>${title}`;
    }
  );

  const result = await remarkFn().use(remarkHtmlPlugin, { sanitize: false }).process(processed);
  const contentHtml = result.toString();

  // Build TOC sidebar HTML
  const tocHtml = tocItems
    .map(
      (item) => `
        <li>
          <a href="#${item.id}" class="toc-link block py-1.5 pl-3 border-l-2 border-transparent text-text-muted text-sm hover:text-navy hover:border-gold transition-colors">${item.title}</a>
          ${
            item.children.length
              ? `<ul class="ml-3">${item.children.map((c) => `<li><a href="#${c.id}" class="toc-link block py-1 pl-3 border-l-2 border-transparent text-text-muted text-xs hover:text-navy hover:border-gold transition-colors">${c.title}</a></li>`).join("")}</ul>`
              : ""
          }
        </li>`
    )
    .join("\n");

  const html = `${htmlHead(frontmatter.title, `Business guide for doing business in ${frontmatter.jurisdiction}.`, 2)}

    <!-- Page Header -->
    <section class="bg-navy py-20 lg:py-28">
      <div class="container-narrow">
        <a href="../" class="inline-flex items-center gap-2 text-white/40 hover:text-white text-xs tracking-wider uppercase mb-8 transition-colors">
          <i data-lucide="arrow-left" class="w-4 h-4"></i>All Business Guides
        </a>
        <div class="flex items-center gap-5">
          ${country ? `<img src="../../images/flags/${country.isoCode}.svg" alt="${country.name} flag" class="w-20 h-14 object-cover rounded shadow">` : ""}
          <div>
            <div class="flex items-center gap-3 mb-2">
              <i data-lucide="book-open" class="w-4 h-4 text-gold"></i>
              <span class="label-text">Business Guides</span>
            </div>
            <h1 class="text-3xl sm:text-4xl lg:text-5xl font-heading text-white">${frontmatter.title}</h1>
          </div>
        </div>
        <div class="flex items-center gap-6 mt-6 text-white/40 text-sm">
          <span class="flex items-center gap-2">
            <i data-lucide="calendar" class="w-4 h-4"></i>Updated ${frontmatter.last_updated}
          </span>
          <span>By ${frontmatter.author}</span>
        </div>
      </div>
    </section>

    <!-- Disclaimer -->
    <section class="bg-surface-warm border-b border-border py-4">
      <div class="container-narrow">
        <div class="flex items-start gap-3">
          <i data-lucide="alert-triangle" class="w-4 h-4 text-gold shrink-0 mt-0.5"></i>
          <p class="text-text-muted text-xs leading-relaxed">${frontmatter.disclaimer}</p>
        </div>
      </div>
    </section>

    <!-- Main content + TOC -->
    <section class="section-padding bg-white">
      <div class="container-narrow">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <!-- Sidebar TOC -->
          <aside class="lg:col-span-3 order-2 lg:order-1">
            <div class="lg:sticky lg:top-28">
              <h4 class="label-text mb-4">Contents</h4>
              <nav>
                <ul class="space-y-1">
                  ${tocHtml}
                </ul>
              </nav>
            </div>
          </aside>

          <!-- Guide Content -->
          <div class="lg:col-span-9 order-1 lg:order-2">
            <div class="guide-prose">
              ${contentHtml}
            </div>

            ${
              country
                ? `
            <!-- CTA -->
            <div class="mt-16 p-8 bg-navy text-center">
              <h3 class="text-2xl font-heading text-white mb-3">Need legal assistance in ${country.name}?</h3>
              <p class="text-white/50 mb-6 max-w-xl mx-auto">Connect with our trusted member firm in this jurisdiction for expert legal guidance tailored to your business needs.</p>
              <a href="../../member-firms/${country.slug}/" class="inline-flex items-center gap-2 px-8 py-4 bg-gold text-white font-semibold text-xs tracking-[0.15em] uppercase hover:bg-gold-light transition-all">
                Find a Firm in ${country.name}
              </a>
            </div>`
                : ""
            }
          </div>
        </div>
      </div>
    </section>

${htmlFoot(2)}`;

  const dir = path.join(ROOT, "business-guides", slug);
  ensureDir(dir);
  fs.writeFileSync(path.join(dir, "index.html"), html);
  console.log(`  ✓ business-guides/${slug}/index.html`);
}

/* ── Also create 404.html ── */
function build404() {
  const html = `${htmlHead("Page Not Found", "The page you are looking for could not be found.", 0)}

    <section class="bg-navy min-h-[60vh] flex items-center justify-center">
      <div class="text-center">
        <h1 class="text-8xl font-heading text-gold mb-4">404</h1>
        <p class="text-white/50 text-lg mb-8">The page you are looking for could not be found.</p>
        <a href="/" class="btn-primary">Return Home</a>
      </div>
    </section>

${htmlFoot(0)}`;

  fs.writeFileSync(path.join(ROOT, "404.html"), html);
  console.log("  ✓ 404.html");
}

/* ──────────────────────────────────────────
   MAIN
   ────────────────────────────────────────── */

async function main() {
  console.log("\n🔨 AAA Website — Building dynamic pages...\n");

  // Member Firms
  console.log("📁 Member Firms:");
  buildMemberFirmsListing();
  countries.forEach(buildCountryPage);

  // News Articles
  console.log("\n📰 News Articles:");
  newsArticles.forEach(buildNewsArticle);

  // Business Guides
  const hasRemark = await loadRemark();
  if (hasRemark && matter) {
    console.log("\n📚 Business Guides:");

    // Gather summaries for listing page
    const guideSummaries = [];
    const guideFiles = fs
      .readdirSync(GUIDES_SRC)
      .filter((f) => f.endsWith(".md"));

    for (const file of guideFiles) {
      const slug = file.replace(/\.md$/, "");
      const raw = fs.readFileSync(path.join(GUIDES_SRC, file), "utf-8");
      const { data, content } = matter(raw);

      // Extract first paragraph as excerpt
      let excerpt = "";
      for (const line of content.split("\n")) {
        const trimmed = line.trim();
        if (trimmed && !trimmed.startsWith("#") && !trimmed.startsWith("---") && trimmed.length > 50) {
          excerpt = trimmed.slice(0, 200);
          if (trimmed.length > 200) excerpt += "...";
          break;
        }
      }

      guideSummaries.push({
        slug,
        jurisdiction: data.jurisdiction,
        lastUpdated: data.last_updated,
        excerpt,
      });
    }

    buildBusinessGuidesListing(guideSummaries);

    for (const file of guideFiles) {
      const slug = file.replace(/\.md$/, "");
      await buildBusinessGuide(slug);
    }
  } else {
    console.log("\n⚠ Skipping business guides (missing remark/gray-matter/remark-html)");
  }

  // 404
  console.log("\n🔧 Utilities:");
  build404();

  console.log("\n✅ Build complete!\n");
}

main().catch(console.error);

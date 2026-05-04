import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { getAllGuideSummaries } from "@/lib/guides";
import { getCountryBySlug } from "@/data/countries";
import { ArrowRight, BookOpen } from "lucide-react";
import CountryFlag from "@/components/ui/CountryFlag";

export default async function BusinessGuidesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("businessGuides");
  const guides = getAllGuideSummaries();

  // Sort alphabetically by jurisdiction name
  guides.sort((a, b) =>
    a.frontmatter.jurisdiction.localeCompare(b.frontmatter.jurisdiction)
  );

  return (
    <>
      {/* Page Header */}
      <section className="bg-navy py-24 lg:py-32">
        <div className="container-narrow">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-6">
              <BookOpen className="w-5 h-5 text-gold" />
              <span className="label-text">{t("label")}</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading text-white mb-6">
              {t("pageTitle")}
            </h1>
            <p className="text-white/50 text-lg leading-relaxed">
              {t("pageSubtitle")}
            </p>
          </div>
        </div>
      </section>

      {/* Disclaimer bar */}
      <section className="bg-surface border-b border-border py-4">
        <div className="container-narrow">
          <p className="text-text-muted text-xs leading-relaxed">
            {t("disclaimer")}
          </p>
        </div>
      </section>

      {/* Guides Grid */}
      <section className="section-padding bg-white">
        <div className="container-narrow">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {guides.map((guide) => {
              const country = getCountryBySlug(guide.slug);
              return (
                <Link
                  key={guide.slug}
                  href={`/business-guides/${guide.slug}`}
                  className="group card !p-0 overflow-hidden cursor-pointer"
                >
                  {/* Card header — navy with flag */}
                  <div className="bg-navy p-6 flex items-center gap-4">
                    {country && (
                      <CountryFlag
                        countryCode={country.isoCode}
                        size="lg"
                        className="!w-14 !h-10"
                      />
                    )}
                    <div>
                      <h2 className="text-lg font-heading text-white group-hover:text-gold transition-colors">
                        {guide.frontmatter.jurisdiction}
                      </h2>
                      <p className="text-white/30 text-xs">
                        Updated {guide.frontmatter.last_updated}
                      </p>
                    </div>
                  </div>

                  {/* Card body */}
                  <div className="p-6">
                    <p className="text-text-muted text-sm leading-relaxed mb-4 line-clamp-3">
                      {guide.excerpt}
                    </p>
                    <span className="inline-flex items-center gap-2 text-gold font-semibold text-xs tracking-[0.1em] uppercase group-hover:gap-3 transition-all">
                      {t("readGuide")}
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}

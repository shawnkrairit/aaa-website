import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { notFound } from "next/navigation";
import { getGuide, getAllGuideSlugs } from "@/lib/guides";
import { getCountryBySlug } from "@/data/countries";
import { ArrowLeft, BookOpen, Calendar, AlertTriangle } from "lucide-react";
import CountryFlag from "@/components/ui/CountryFlag";
import GuideToc from "@/components/guides/GuideToc";
import GuideContent from "@/components/guides/GuideContent";

export function generateStaticParams() {
  return getAllGuideSlugs().map((slug) => ({ country: slug }));
}

export default async function BusinessGuidePage({
  params,
}: {
  params: Promise<{ country: string }>;
}) {
  const { country: slug } = await params;
  const guide = await getGuide(slug);
  const t = await getTranslations("businessGuides");

  if (!guide) {
    notFound();
  }

  const country = getCountryBySlug(slug);

  return (
    <>
      {/* Page Header */}
      <section className="bg-navy py-20 lg:py-28">
        <div className="container-narrow">
          <Link
            href="/business-guides"
            className="inline-flex items-center gap-2 text-white/40 hover:text-white text-xs tracking-wider uppercase mb-8 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            {t("backToGuides")}
          </Link>

          <div className="flex items-center gap-5">
            {country && (
              <CountryFlag
                countryCode={country.isoCode}
                size="lg"
                className="!w-20 !h-14"
              />
            )}
            <div>
              <div className="flex items-center gap-3 mb-2">
                <BookOpen className="w-4 h-4 text-gold" />
                <span className="label-text">{t("label")}</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading text-white">
                {guide.frontmatter.title}
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-6 mt-6 text-white/40 text-sm">
            <span className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Updated {guide.frontmatter.last_updated}
            </span>
            <span>By {guide.frontmatter.author}</span>
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="bg-surface-warm border-b border-border py-4">
        <div className="container-narrow">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-4 h-4 text-gold shrink-0 mt-0.5" />
            <p className="text-text-muted text-xs leading-relaxed">
              {guide.frontmatter.disclaimer}
            </p>
          </div>
        </div>
      </section>

      {/* Main content + sidebar TOC */}
      <section className="section-padding bg-white">
        <div className="container-narrow">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Sidebar TOC — sticky on desktop */}
            <aside className="lg:col-span-3 order-2 lg:order-1">
              <GuideToc toc={guide.toc} />
            </aside>

            {/* Guide Content */}
            <div className="lg:col-span-9 order-1 lg:order-2">
              <GuideContent html={guide.contentHtml} />

              {/* CTA to contact the local firm */}
              {country && (
                <div className="mt-16 p-8 bg-navy text-center">
                  <h3 className="text-2xl font-heading text-white mb-3">
                    {t("ctaTitle")} {country.name}?
                  </h3>
                  <p className="text-white/50 mb-6 max-w-xl mx-auto">
                    {t("ctaText")}
                  </p>
                  <Link
                    href={`/member-firms/${country.slug}`}
                    className="inline-flex items-center gap-2 px-8 py-4 bg-gold text-white font-semibold text-xs tracking-[0.15em] uppercase hover:bg-gold-light transition-all cursor-pointer"
                  >
                    {t("ctaButton")} {country.name}
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

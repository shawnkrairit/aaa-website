import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { countries } from "@/data/countries";
import { memberFirms } from "@/data/firms";
import { MapPin, Globe, Scale } from "lucide-react";
import CountryFlag from "@/components/ui/CountryFlag";

export default async function MemberFirmsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <MemberFirmsContent />;
}

function MemberFirmsContent() {
  const t = useTranslations("memberFirms");

  return (
    <>
      {/* Page Header */}
      <section className="bg-navy py-24 lg:py-32">
        <div className="container-narrow text-center">
          <div className="gold-accent mx-auto mb-8" />
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading text-white mb-6">
            {t("pageTitle")}
          </h1>
          <p className="text-white/40 text-lg max-w-2xl mx-auto leading-relaxed">
            {t("pageSubtitle")}
          </p>
        </div>
      </section>

      {/* Country Grid */}
      <section className="section-padding bg-white">
        <div className="container-narrow">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {countries.map((country) => {
              const countryFirms = memberFirms.filter(
                (f) => f.country === country.slug
              );
              return (
                <Link
                  key={country.slug}
                  href={`/member-firms/${country.slug}`}
                  className="card group cursor-pointer"
                >
                  <div className="flex items-start gap-4">
                    <CountryFlag countryCode={country.isoCode} size="lg" />
                    <div className="flex-1">
                      <h2 className="text-xl font-heading text-navy font-semibold mb-1 group-hover:text-gold transition-colors">
                        {country.name}
                      </h2>
                      <p className="text-text-light text-sm mb-3">{country.nameLocal}</p>

                      <div className="space-y-2 text-sm text-text-muted">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-gold shrink-0" />
                          <span>{country.keyCities.join(", ")}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Globe className="w-4 h-4 text-gold shrink-0" />
                          <span>{country.languages.join(", ")}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Scale className="w-4 h-4 text-gold shrink-0" />
                          <span>
                            {countryFirms.length}{" "}
                            {countryFirms.length === 1 ? t("firm") : t("firms")}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-border">
                    <span className="text-gold text-xs font-semibold tracking-[0.15em] uppercase group-hover:text-gold-light transition-colors">
                      {t("viewFirms")} &rarr;
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

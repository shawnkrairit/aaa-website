import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { notFound } from "next/navigation";
import { countries, getCountryBySlug } from "@/data/countries";
import { getFirmsByCountry } from "@/data/firms";
import {
  ArrowLeft,
  ArrowRight,
  MapPin,
  Phone,
  Mail,
  Globe,
  ExternalLink,
  Scale,
  BookOpen,
} from "lucide-react";
import CountryFlag from "@/components/ui/CountryFlag";

export function generateStaticParams() {
  return countries.map((c) => ({ country: c.slug }));
}

export default async function CountryPage({
  params,
}: {
  params: Promise<{ locale: string; country: string }>;
}) {
  const { locale, country: countrySlug } = await params;
  setRequestLocale(locale);
  const country = getCountryBySlug(countrySlug);
  const t = await getTranslations("memberFirms");

  if (!country) {
    notFound();
  }

  const firms = getFirmsByCountry(country.slug);

  return (
    <>
      {/* Page Header */}
      <section className="bg-navy py-24 lg:py-32">
        <div className="container-narrow">
          <Link
            href="/member-firms"
            className="inline-flex items-center gap-2 text-white/40 hover:text-white text-xs tracking-wider uppercase mb-8 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            {t("backToDirectory")}
          </Link>
          <div className="flex items-center gap-4">
            <CountryFlag countryCode={country.isoCode} size="lg" className="!w-20 !h-14" />
            <div>
              <h1 className="text-4xl sm:text-5xl font-heading text-white mb-2">
                {country.name}
              </h1>
              <p className="text-white/30 text-lg">{country.nameLocal}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Country Info */}
      <section className="bg-surface border-b border-border py-6">
        <div className="container-narrow">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
            <div className="flex items-center gap-2 text-text-muted">
              <Scale className="w-4 h-4 text-gold" />
              <span className="font-medium">{t("legalSystem")}:</span>
              <span>{country.legalSystem}</span>
            </div>
            <div className="flex items-center gap-2 text-text-muted">
              <MapPin className="w-4 h-4 text-gold" />
              <span className="font-medium">{t("keyCities")}:</span>
              <span>{country.keyCities.join(", ")}</span>
            </div>
            <div className="flex items-center gap-2 text-text-muted">
              <Globe className="w-4 h-4 text-gold" />
              <span className="font-medium">{t("languages")}:</span>
              <span>{country.languages.join(", ")}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Firms */}
      <section className="section-padding bg-white">
        <div className="container-narrow">
          <div className="space-y-8">
            {firms.map((firm) => (
              <div key={firm.id} className="card !p-8">
                <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                  {/* Firm logo placeholder */}
                  <div className="w-20 h-20 bg-navy/5 flex items-center justify-center shrink-0">
                    <span className="font-heading text-navy text-2xl font-bold">
                      {firm.name.charAt(0)}
                    </span>
                  </div>

                  <div className="flex-1">
                    <h2 className="text-2xl font-heading text-navy font-semibold mb-2">
                      {firm.name}
                    </h2>
                    <p className="text-text-muted leading-relaxed mb-4">
                      {firm.description}
                    </p>

                    {/* Practice Areas */}
                    <div className="mb-4">
                      <h3 className="label-text mb-2">
                        {t("practiceAreas")}
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {firm.practiceAreas.map((area) => (
                          <span
                            key={area}
                            className="px-3 py-1 bg-navy/5 text-navy text-xs font-medium"
                          >
                            {area}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Key Contacts */}
                    <div className="mb-4">
                      <h3 className="label-text mb-2">
                        {t("keyContacts")}
                      </h3>
                      <div className="flex flex-wrap gap-4">
                        {firm.keyContacts.map((contact, i) => (
                          <div key={i} className="text-sm">
                            <span className="font-medium text-text">
                              {contact.name}
                            </span>
                            <span className="text-text-muted"> — {contact.title}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Contact Info */}
                    <div className="flex flex-wrap gap-6 text-sm text-text-muted">
                      <a
                        href={`tel:${firm.phone}`}
                        className="flex items-center gap-2 hover:text-navy transition-colors cursor-pointer"
                      >
                        <Phone className="w-4 h-4" />
                        {firm.phone}
                      </a>
                      <a
                        href={`mailto:${firm.email}`}
                        className="flex items-center gap-2 hover:text-navy transition-colors cursor-pointer"
                      >
                        <Mail className="w-4 h-4" />
                        {firm.email}
                      </a>
                      <a
                        href={firm.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 hover:text-navy transition-colors cursor-pointer"
                      >
                        <ExternalLink className="w-4 h-4" />
                        {t("visitWebsite")}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Cross-link to business guide */}
          <div className="mt-12 p-6 border border-border bg-surface-warm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <BookOpen className="w-5 h-5 text-gold shrink-0" />
              <div>
                <p className="font-semibold text-navy text-sm">
                  Doing Business in {country.name}
                </p>
                <p className="text-text-muted text-xs">
                  Legal frameworks, taxation, entity formation & more
                </p>
              </div>
            </div>
            <Link
              href={`/business-guides/${country.slug}`}
              className="inline-flex items-center gap-2 text-gold font-semibold text-xs tracking-[0.1em] uppercase hover:text-gold-light transition-colors cursor-pointer group shrink-0"
            >
              Read Guide
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

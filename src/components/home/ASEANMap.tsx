"use client";

import { Link } from "@/i18n/routing";
import { countries } from "@/data/countries";
import { MapPin, ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import CountryFlag from "@/components/ui/CountryFlag";
import AnimateInView from "@/components/ui/AnimateInView";
import { StaggerContainer, StaggerItem } from "@/components/ui/StaggerGrid";
import ASEANMapBg from "@/components/ui/ASEANMapBg";

export default function ASEANMap() {
  const t = useTranslations("memberFirms");

  return (
    <section className="relative section-padding bg-white overflow-hidden">
      {/* ASEAN map in background — centered, visible */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <ASEANMapBg className="w-[80%] h-auto text-navy opacity-[0.18]" />
      </div>

      {/* Gold corner traces */}
      <div className="absolute top-0 left-0 w-28 h-28 pointer-events-none opacity-[0.07]">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-gold to-transparent" />
        <div className="absolute top-0 left-0 w-px h-full bg-gradient-to-b from-gold to-transparent" />
      </div>
      <div className="absolute bottom-0 right-0 w-28 h-28 pointer-events-none opacity-[0.07]">
        <div className="absolute bottom-0 right-0 w-full h-px bg-gradient-to-l from-gold to-transparent" />
        <div className="absolute bottom-0 right-0 w-px h-full bg-gradient-to-t from-gold to-transparent" />
      </div>

      <div className="container-narrow relative z-10">
        {/* Left-aligned header for visual variety */}
        <AnimateInView className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-16 gap-6">
          <div>
            <div className="gold-accent mb-8" />
            <h2 className="text-3xl sm:text-4xl font-heading text-navy mb-4">
              {t("pageTitle")}
            </h2>
            <p className="text-text-muted text-lg max-w-2xl">
              {t("pageSubtitle")}
            </p>
          </div>
          <Link
            href="/member-firms"
            className="inline-flex items-center gap-2 text-gold font-semibold text-xs tracking-[0.15em] uppercase hover:text-gold-light transition-colors cursor-pointer group shrink-0"
          >
            View All Jurisdictions
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </AnimateInView>

        <StaggerContainer className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {countries.map((country) => (
            <StaggerItem key={country.slug}>
              <Link
                href={`/member-firms/${country.slug}`}
                className="card text-center group cursor-pointer !p-6"
              >
                <div className="mb-3 flex justify-center">
                  <CountryFlag countryCode={country.isoCode} size="lg" />
                </div>
                <h3 className="text-sm font-heading text-navy font-semibold mb-1">
                  {country.name}
                </h3>
                <div className="flex items-center justify-center gap-1 text-text-light text-xs">
                  <MapPin className="w-3 h-3" />
                  <span>
                    {country.firmCount} {country.firmCount === 1 ? t("firm") : t("firms")}
                  </span>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}

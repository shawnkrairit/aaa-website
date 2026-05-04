"use client";

import { Link } from "@/i18n/routing";
import { countries } from "@/data/countries";
import { countryPins } from "@/data/country-coords";
import { useTranslations } from "next-intl";
import AnimateInView from "@/components/ui/AnimateInView";
import { StaggerContainer, StaggerItem } from "@/components/ui/StaggerGrid";
import ASEANMapBg from "@/components/ui/ASEANMapBg";
import SectionMark from "@/components/ui/SectionMark";
import { useState } from "react";

export default function ASEANMap() {
  const t = useTranslations("memberFirms");
  const [hovered, setHovered] = useState<string | null>(null);
  const sortedCountries = [...countries].sort((a, b) => a.name.localeCompare(b.name));

  return (
    <section className="relative bg-bone overflow-hidden">
      <span className="grain-light" />

      {/* Top index strip */}
      <div className="border-y border-bone-deep">
        <div className="container-wide flex items-center justify-between py-3 font-mono text-[0.62rem] tracking-[0.22em] uppercase text-text-muted">
          <span>§03 — REGIONAL CONSPECTUS</span>
          <span className="hidden md:inline">11 NATIONS · 16 FIRMS · ALL JURISDICTIONS</span>
        </div>
      </div>

      <div className="container-wide section-padding">
        <AnimateInView className="grid grid-cols-1 lg:grid-cols-12 gap-x-10 gap-y-10 mb-12 lg:mb-16">
          <div className="lg:col-span-7">
            <SectionMark index="03" label="MEMBER NETWORK" />
            <h2 className="mt-6">
              {t("pageTitle")}
              <span className="display-italic text-vermillion">.</span>
            </h2>
          </div>
          <div className="lg:col-span-5 lg:pt-3">
            <p className="text-text-muted text-base leading-relaxed">
              {t("pageSubtitle")}
            </p>
            <Link
              href="/member-firms"
              className="mt-6 inline-flex items-center gap-3 font-mono text-[0.6875rem] tracking-[0.22em] uppercase text-ink hover:text-vermillion transition-colors group"
            >
              <span aria-hidden className="h-px w-8 bg-ink group-hover:w-12 group-hover:bg-vermillion transition-all" />
              View All Jurisdictions
            </Link>
          </div>
        </AnimateInView>

        {/* Atlas plate: large map with grid + corner ticks */}
        <div className="relative bg-paper border border-ink/15 p-6 lg:p-10 mb-14">
          <CornerTicks />

          <div className="flex items-baseline justify-between font-mono text-[0.62rem] tracking-[0.22em] uppercase text-text-muted mb-5 pb-3 border-b border-bone-deep">
            <span>PLATE 03 · ASEAN MEMBER STATES</span>
            <span className="hidden sm:inline">PROJECTION · MERCATOR-LIKE · NOT TO SCALE</span>
            <span>FIG. 2026</span>
          </div>

          <div className="relative aspect-[5/4] w-full">
            <ASEANMapBg className="map-tinted absolute inset-0 w-full h-full text-ink/40" />

            <svg
              viewBox="0 0 1000 800"
              preserveAspectRatio="xMidYMid meet"
              className="absolute inset-0 w-full h-full"
              aria-hidden
            >
              {/* Grid */}
              {[100, 200, 300, 400, 500, 600, 700].map((y) => (
                <line
                  key={`h${y}`}
                  x1="0"
                  y1={y}
                  x2="1000"
                  y2={y}
                  stroke="rgba(14,21,24,0.05)"
                  strokeWidth="1"
                  strokeDasharray="2 8"
                />
              ))}
              {[125, 250, 375, 500, 625, 750, 875].map((x) => (
                <line
                  key={`v${x}`}
                  x1={x}
                  y1="0"
                  x2={x}
                  y2="800"
                  stroke="rgba(14,21,24,0.05)"
                  strokeWidth="1"
                  strokeDasharray="2 8"
                />
              ))}

              {/* Pins with labels */}
              {countryPins.map((p) => {
                const country = countries.find((c) => c.slug === p.slug);
                if (!country) return null;
                const isHover = hovered === p.slug;
                const isTiny = p.slug === "singapore" || p.slug === "timor-leste";
                const dotR = (isHover ? 11 : 9) + (isTiny ? 2 : 0);
                return (
                  <g key={p.slug}>
                    {/* Outer halo */}
                    <circle
                      cx={p.x}
                      cy={p.y}
                      r={isHover ? 28 : 20}
                      fill="rgba(10,22,40,0.10)"
                      style={{ transition: "r 240ms ease" }}
                    />
                    {/* Center dot — navy with gold ring */}
                    <circle
                      cx={p.x}
                      cy={p.y}
                      r={dotR}
                      fill="#0A1628"
                      stroke="#B89464"
                      strokeWidth="2.5"
                      style={{ transition: "r 200ms ease" }}
                    />
                    <circle
                      cx={p.x}
                      cy={p.y}
                      r={dotR - 4}
                      fill="#B89464"
                      style={{ transition: "r 200ms ease" }}
                    />
                    {/* Label */}
                    <text
                      x={p.x + dotR + 6}
                      y={p.y + 4}
                      fontSize="14"
                      fontFamily="var(--font-jetbrains-mono), monospace"
                      fontWeight="600"
                      fill={isHover ? "#B89464" : "#0A1628"}
                      stroke="#FFFFFF"
                      strokeWidth="3"
                      paintOrder="stroke"
                      style={{
                        letterSpacing: "0.18em",
                        opacity: isHover ? 1 : 0.95,
                        transition: "fill 240ms",
                      }}
                    >
                      {country.name.toUpperCase()}
                    </text>
                    <text
                      x={p.x + dotR + 6}
                      y={p.y + 22}
                      fontSize="11"
                      fontFamily="var(--font-jetbrains-mono), monospace"
                      fill="#5A6670"
                      stroke="#FFFFFF"
                      strokeWidth="2.5"
                      paintOrder="stroke"
                      style={{
                        letterSpacing: "0.14em",
                        opacity: isHover ? 0.95 : 0.7,
                      }}
                    >
                      {p.iso} · {p.capital.toUpperCase()}
                    </text>

                    {/* Hit target */}
                    <circle
                      cx={p.x}
                      cy={p.y}
                      r="32"
                      fill="transparent"
                      style={{ cursor: "pointer" }}
                      onMouseEnter={() => setHovered(p.slug)}
                      onMouseLeave={() => setHovered(null)}
                    />
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Legend strip below plate */}
          <div className="mt-5 pt-3 border-t border-bone-deep grid grid-cols-2 sm:grid-cols-4 gap-4 font-mono text-[0.62rem] tracking-[0.22em] uppercase text-text-muted">
            <span className="flex items-center gap-2">
              <span className="inline-block w-3 h-3 bg-vermillion rounded-full" />
              MEMBER FIRM
            </span>
            <span className="flex items-center gap-2">
              <span className="inline-block w-4 h-px bg-ink/40" />
              GRID · 5° APPROX
            </span>
            <span>11 SOVEREIGN STATES</span>
            <span className="text-right sm:text-left">600M+ POPULATION</span>
          </div>
        </div>

        {/* Country cards — editorial directory */}
        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-px bg-bone-deep border border-bone-deep">
          {sortedCountries.map((country) => {
            const pin = countryPins.find((p) => p.slug === country.slug);
            return (
              <StaggerItem key={country.slug} className="bg-paper">
                <Link
                  href={`/member-firms/${country.slug}`}
                  className="block p-6 group h-full hover:bg-bone transition-colors duration-300"
                >
                  <div className="flex items-start justify-between mb-6">
                    <span className="font-mono text-[0.6875rem] tracking-[0.22em] uppercase text-vermillion">
                      {pin?.iso ?? country.isoCode}
                    </span>
                    <span className="font-mono text-[0.6rem] tracking-[0.22em] uppercase text-text-light">
                      {country.firmCount} {country.firmCount === 1 ? t("firm") : t("firms")}
                    </span>
                  </div>

                  <div className="font-display text-2xl lg:text-[1.6rem] text-ink leading-tight group-hover:text-vermillion transition-colors">
                    {country.name}
                  </div>
                  <div className="mt-1 display-italic text-lg text-text-muted">
                    {country.nameLocal}
                  </div>

                  <div className="mt-6 pt-4 border-t border-bone-deep">
                    <div className="font-mono text-[0.6rem] tracking-[0.22em] uppercase text-text-light mb-1">
                      Capital
                    </div>
                    <div className="text-sm text-ink/80">{country.capital}</div>
                  </div>
                </Link>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}

function CornerTicks() {
  const ticks = [
    "top-3 left-3 border-t border-l",
    "top-3 right-3 border-t border-r",
    "bottom-3 left-3 border-b border-l",
    "bottom-3 right-3 border-b border-r",
  ];
  return (
    <>
      {ticks.map((cls) => (
        <span
          key={cls}
          aria-hidden
          className={`absolute w-3 h-3 border-ink ${cls}`}
        />
      ))}
    </>
  );
}

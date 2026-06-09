"use client";

import { useTranslations } from "next-intl";
import AnimateInView from "@/components/ui/AnimateInView";
import { StaggerContainer, StaggerItem } from "@/components/ui/StaggerGrid";
import SectionMark from "@/components/ui/SectionMark";

const doctrines = [
  { key: "coverage",  num: "I",   theme: "Reach" },
  { key: "expertise", num: "II",  theme: "Locality" },
  { key: "fees",      num: "III", theme: "Economy" },
  { key: "quality",   num: "IV",  theme: "Standard" },
] as const;

export default function WhyAAA() {
  const t = useTranslations("whyAAA");

  return (
    <section className="relative bg-ink text-bone overflow-hidden">
      {/* Top register */}
      <div className="border-b border-bone/15">
        <div className="container-wide flex items-center justify-between py-3 font-mono text-[0.62rem] tracking-[0.22em] uppercase text-bone/65">
          <span>§02 — DOCTRINES OF THE ALLIANCE</span>
          <span className="hidden md:inline">FOUR PRINCIPLES · TENETS</span>
        </div>
      </div>

      {/* Subtle horizon glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_-10%,_rgba(201,71,42,0.10)_0%,_transparent_55%)] pointer-events-none" />

      <div className="container-wide relative z-10 section-padding">
        <AnimateInView className="max-w-3xl mb-16 lg:mb-20">
          <SectionMark index="02" label="WHY THE ALLIANCE" tone="bone" />
          <h2 className="text-bone mt-6 mb-6">
            {t("sectionTitle")}
            <span className="display-italic text-vermillion">.</span>
          </h2>
          <p className="text-bone/75 text-lg leading-relaxed max-w-2xl">
            {t("sectionSubtitle")}
          </p>
        </AnimateInView>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-bone/10">
          {doctrines.map((d) => (
            <StaggerItem key={d.key} className="bg-ink p-8 lg:p-10 group">
              <div className="flex items-start justify-between mb-8">
                <span className="font-mono text-[0.65rem] tracking-[0.22em] uppercase text-vermillion">
                  Article {d.num}
                </span>
                <span className="font-mono text-[0.65rem] tracking-[0.22em] uppercase text-bone/60">
                  {d.theme}
                </span>
              </div>

              <div
                className="font-display text-7xl lg:text-8xl leading-none text-bone/85 group-hover:text-vermillion transition-colors duration-500 mb-8"
                style={{ fontVariationSettings: '"opsz" 144, "SOFT" 80' }}
              >
                {d.num}
              </div>

              <h3 className="font-display text-bone text-2xl mb-3">
                {t(d.key)}
              </h3>
              <p className="text-bone/75 leading-relaxed text-sm">
                {t(`${d.key}Text`)}
              </p>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}

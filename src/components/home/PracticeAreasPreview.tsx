"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { practiceAreas } from "@/data/practice-areas";
import {
  Building2,
  Landmark,
  Shield,
  Scale,
  GitMerge,
  Users,
  Home,
  Calculator,
  ArrowUpRight,
} from "lucide-react";
import AnimateInView from "@/components/ui/AnimateInView";
import { StaggerContainer, StaggerItem } from "@/components/ui/StaggerGrid";
import SectionMark from "@/components/ui/SectionMark";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Building2,
  Landmark,
  Shield,
  Scale,
  GitMerge,
  Users,
  Home,
  Calculator,
};

export default function PracticeAreasPreview() {
  const t = useTranslations("practiceAreas");

  return (
    <section className="bg-paper section-padding">
      <span className="grain-light absolute inset-0 pointer-events-none" />

      <div className="container-wide relative">
        <AnimateInView className="grid grid-cols-1 lg:grid-cols-12 gap-x-10 gap-y-8 mb-12 lg:mb-16">
          <div className="lg:col-span-7">
            <SectionMark index="04" label="PRACTICE AREAS" />
            <h2 className="mt-6">
              {t("sectionTitle")}
              <span className="display-italic text-vermillion">.</span>
            </h2>
          </div>
          <div className="lg:col-span-5 lg:pt-3">
            <p className="text-text-muted leading-relaxed">
              {t("sectionSubtitle")}
            </p>
          </div>
        </AnimateInView>

        {/* Editorial table — list, not grid */}
        <StaggerContainer className="border-t border-ink/15">
          {practiceAreas.map((area, idx) => {
            const Icon = iconMap[area.icon] || Building2;
            const num = String(idx + 1).padStart(2, "0");
            return (
              <StaggerItem
                key={area.slug}
                className="border-b border-ink/15 group"
              >
                <Link
                  href="/practice-areas"
                  className="flex items-start lg:items-center gap-5 lg:gap-8 py-7 lg:py-8 group-hover:bg-bone transition-colors duration-300 px-2 lg:px-4 -mx-2 lg:-mx-4"
                >
                  <span className="font-mono text-[0.7rem] tracking-[0.22em] uppercase text-text-muted w-8 shrink-0 pt-2">
                    №{num}
                  </span>

                  <span className="w-12 h-12 lg:w-14 lg:h-14 shrink-0 border border-ink/20 flex items-center justify-center group-hover:border-vermillion group-hover:bg-vermillion transition-colors duration-300">
                    <Icon className="w-5 h-5 text-ink group-hover:text-bone transition-colors" />
                  </span>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline gap-3 flex-wrap">
                      <h3 className="font-display text-2xl lg:text-3xl text-ink leading-tight group-hover:text-vermillion transition-colors">
                        {area.title}
                      </h3>
                    </div>
                    <p className="mt-2 text-text-muted text-sm lg:text-base leading-relaxed max-w-2xl line-clamp-2">
                      {area.description}
                    </p>
                  </div>

                  <span className="hidden lg:flex items-center gap-2 font-mono text-[0.65rem] tracking-[0.22em] uppercase text-text-muted group-hover:text-vermillion transition-colors shrink-0">
                    Read brief
                    <ArrowUpRight className="w-3.5 h-3.5 group-hover:rotate-12 transition-transform" />
                  </span>
                </Link>
              </StaggerItem>
            );
          })}
        </StaggerContainer>

        <AnimateInView className="mt-12 flex justify-end">
          <Link
            href="/practice-areas"
            className="btn-secondary"
          >
            View All Practice Areas
            <span aria-hidden>→</span>
          </Link>
        </AnimateInView>
      </div>
    </section>
  );
}

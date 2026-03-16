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
  ArrowRight,
} from "lucide-react";
import AnimateInView from "@/components/ui/AnimateInView";
import { StaggerContainer, StaggerItem } from "@/components/ui/StaggerGrid";

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
    <section className="section-padding bg-surface">
      <div className="container-narrow">
        <AnimateInView className="text-center mb-16">
          <div className="gold-accent mx-auto mb-8" />
          <h2 className="text-3xl sm:text-4xl font-heading text-navy mb-4">
            {t("sectionTitle")}
          </h2>
          <p className="text-text-muted text-lg max-w-2xl mx-auto">
            {t("sectionSubtitle")}
          </p>
        </AnimateInView>

        <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {practiceAreas.map((area) => {
            const Icon = iconMap[area.icon] || Building2;
            return (
              <StaggerItem key={area.slug}>
                <div className="card text-center group !p-0 cursor-pointer overflow-hidden">
                  <div className="h-0 group-hover:h-0.5 bg-gold transition-all duration-300" />
                  <div className="p-6">
                    <div className="w-12 h-12 mx-auto mb-4 border border-border flex items-center justify-center group-hover:border-navy group-hover:bg-navy transition-all duration-300">
                      <Icon className="w-5 h-5 text-navy group-hover:text-gold transition-colors duration-300" />
                    </div>
                    <h3 className="text-sm font-heading text-navy font-semibold leading-snug">
                      {area.title}
                    </h3>
                  </div>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>

        <AnimateInView className="text-center mt-10">
          <Link
            href="/practice-areas"
            className="inline-flex items-center gap-2 text-gold font-semibold text-xs tracking-[0.15em] uppercase hover:text-gold-light transition-colors cursor-pointer group"
          >
            View All Practice Areas
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </AnimateInView>
      </div>
    </section>
  );
}

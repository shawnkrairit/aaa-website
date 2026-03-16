"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { ArrowRight } from "lucide-react";
import AnimateInView from "@/components/ui/AnimateInView";

export default function AboutPreview() {
  const t = useTranslations("about");

  return (
    <section className="relative section-padding bg-white overflow-hidden">
      {/* Subtle gold corner traces */}
      <div className="absolute top-0 right-0 w-32 h-32 pointer-events-none opacity-[0.08]">
        <div className="absolute top-0 right-0 w-full h-px bg-gradient-to-l from-gold to-transparent" />
        <div className="absolute top-0 right-0 w-px h-full bg-gradient-to-b from-gold to-transparent" />
      </div>
      <div className="absolute bottom-0 left-0 w-32 h-32 pointer-events-none opacity-[0.08]">
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-gold to-transparent" />
        <div className="absolute bottom-0 left-0 w-px h-full bg-gradient-to-t from-gold to-transparent" />
      </div>

      <div className="container-narrow">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-5">
            <AnimateInView variant="fadeLeft">
              <div className="gold-accent mb-8" />
              <h2 className="text-3xl sm:text-4xl font-heading text-navy mb-6">
                {t("sectionTitle")}
              </h2>
              <p className="text-text-muted text-lg leading-relaxed mb-8">
                {t("mission")}
              </p>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-gold font-semibold text-xs tracking-[0.15em] uppercase hover:text-gold-light transition-colors cursor-pointer group"
              >
                {t("learnMore")}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </AnimateInView>
          </div>
          <div className="lg:col-span-7">
            <AnimateInView variant="fadeRight" delay={0.15}>
              <div className="border-l-2 border-gold pl-8 py-8 bg-surface-warm">
                <p className="text-2xl font-heading text-navy italic leading-relaxed mb-4">
                  &ldquo;A network built on trust, delivering excellence across borders.&rdquo;
                </p>
                <span className="label-text">Founding Principle</span>
              </div>
            </AnimateInView>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { ArrowRight } from "lucide-react";
import AnimateInView from "@/components/ui/AnimateInView";
import ASEANMapBg from "@/components/ui/ASEANMapBg";

export default function CTASection() {
  const t = useTranslations("cta");

  return (
    <section className="relative overflow-hidden bg-navy py-24 lg:py-32">
      {/* ASEAN map background — left-aligned, large */}
      <div className="absolute inset-0 flex items-center justify-start pointer-events-none">
        <ASEANMapBg className="w-[55%] h-auto text-white opacity-[0.12] -translate-x-[15%]" />
      </div>

      {/* Radial gold glows */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_50%,_rgba(161,124,69,0.08)_0%,_transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_30%,_rgba(161,124,69,0.05)_0%,_transparent_40%)]" />

      {/* Gold decorative traces */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Corner accents */}
        <div className="absolute top-8 left-8 w-16 h-16 opacity-[0.15]">
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-gold to-transparent" />
          <div className="absolute top-0 left-0 w-px h-full bg-gradient-to-b from-gold to-transparent" />
        </div>
        <div className="absolute bottom-8 right-8 w-16 h-16 opacity-[0.15]">
          <div className="absolute bottom-0 right-0 w-full h-px bg-gradient-to-l from-gold to-transparent" />
          <div className="absolute bottom-0 right-0 w-px h-full bg-gradient-to-t from-gold to-transparent" />
        </div>
        {/* Horizontal gold whiskers */}
        <div className="absolute top-1/2 left-0 w-[15%] h-px bg-gradient-to-r from-transparent via-gold/12 to-transparent -translate-y-1/2" />
        <div className="absolute top-1/2 right-0 w-[15%] h-px bg-gradient-to-l from-transparent via-gold/12 to-transparent -translate-y-1/2" />
      </div>

      {/* Subtle white grid lines */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute top-0 left-[20%] w-px h-full bg-white" />
        <div className="absolute top-0 left-[80%] w-px h-full bg-white" />
      </div>

      <div className="container-narrow relative z-10 text-center">
        <AnimateInView>
          <div className="gold-accent mx-auto mb-8" />
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading text-white mb-6">
            {t("title")}
          </h2>
          <p className="text-white/40 text-lg max-w-2xl mx-auto mb-12 leading-relaxed">
            {t("subtitle")}
          </p>
          <Link
            href="/join"
            className="inline-flex items-center gap-3 px-10 py-4 bg-gold text-white font-semibold text-xs tracking-[0.15em] uppercase hover:bg-gold-light transition-all duration-300 cursor-pointer shadow-[0_4px_20px_rgba(161,124,69,0.35)] hover:shadow-[0_6px_28px_rgba(161,124,69,0.45)] hover:scale-[1.02]"
          >
            {t("button")}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </AnimateInView>
      </div>
    </section>
  );
}

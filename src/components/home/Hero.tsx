"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { motion } from "framer-motion";
import { ArrowRight, Search } from "lucide-react";
import ASEANMapBg from "@/components/ui/ASEANMapBg";

const stats = [
  { value: "11", label: "Countries" },
  { value: "15+", label: "Member Firms" },
  { value: "500+", label: "Attorneys" },
  { value: "8", label: "Practice Areas" },
];

export default function Hero() {
  const t = useTranslations("hero");

  return (
    <section className="relative overflow-hidden bg-navy min-h-[90vh] flex items-center">
      {/* Top gold line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold to-transparent" />

      {/* ASEAN map background at ~15% opacity */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <ASEANMapBg className="w-[75%] h-auto text-white opacity-[0.14]" />
      </div>

      {/* Radial gold glow overlays */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_30%,_rgba(161,124,69,0.10)_0%,_transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_80%,_rgba(161,124,69,0.06)_0%,_transparent_40%)]" />

      {/* Gold decorative traces */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Top-right corner accent */}
        <div className="absolute top-12 right-12 w-24 h-24 opacity-[0.12]">
          <div className="absolute top-0 right-0 w-full h-px bg-gradient-to-l from-gold to-transparent" />
          <div className="absolute top-0 right-0 w-px h-full bg-gradient-to-b from-gold to-transparent" />
        </div>
        {/* Bottom-left corner accent */}
        <div className="absolute bottom-12 left-12 w-24 h-24 opacity-[0.12]">
          <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-gold to-transparent" />
          <div className="absolute bottom-0 left-0 w-px h-full bg-gradient-to-t from-gold to-transparent" />
        </div>
        {/* Diagonal gold trace — top-left to mid */}
        <div
          className="absolute top-0 left-[15%] w-px h-[45%] origin-top bg-gradient-to-b from-gold/20 via-gold/8 to-transparent"
          style={{ transform: "rotate(15deg)" }}
        />
        {/* Diagonal gold trace — right side */}
        <div
          className="absolute top-[20%] right-[25%] w-px h-[35%] origin-top bg-gradient-to-b from-transparent via-gold/10 to-transparent"
          style={{ transform: "rotate(-12deg)" }}
        />
        {/* Horizontal gold whisker — left */}
        <div className="absolute top-[38%] left-0 w-[12%] h-px bg-gradient-to-r from-transparent via-gold/15 to-transparent" />
        {/* Horizontal gold whisker — right */}
        <div className="absolute top-[62%] right-0 w-[8%] h-px bg-gradient-to-l from-transparent via-gold/12 to-transparent" />
      </div>

      {/* Subtle grid lines */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute top-0 w-px h-full bg-white" style={{ left: "25%" }} />
        <div className="absolute top-0 w-px h-full bg-white" style={{ left: "50%" }} />
        <div className="absolute top-0 w-px h-full bg-white" style={{ left: "75%" }} />
        <div className="absolute left-0 w-full h-px bg-white" style={{ top: "33%" }} />
        <div className="absolute left-0 w-full h-px bg-white" style={{ top: "66%" }} />
      </div>

      <div className="container-narrow relative z-10 py-24 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <p className="label-text mb-8">A Unity of Proficiency</p>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-heading text-white leading-[1.05] mb-8"
            >
              {t("title")}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="text-lg text-white/50 leading-relaxed mb-12 max-w-xl"
            >
              {t("subtitle")}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link
                href="/member-firms"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-gold text-white font-semibold text-xs tracking-[0.15em] uppercase hover:bg-gold-light transition-all duration-300 cursor-pointer shadow-[0_4px_16px_rgba(161,124,69,0.3)] hover:shadow-[0_6px_24px_rgba(161,124,69,0.4)] hover:scale-[1.02]"
              >
                <Search className="w-4 h-4" />
                Find a Member Firm
              </Link>
              <Link
                href="/join"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 border border-white/20 text-white font-semibold text-xs tracking-[0.15em] uppercase hover:border-gold hover:text-gold transition-all duration-300 cursor-pointer"
              >
                {t("ctaSecondary")}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </div>

          {/* Stats panel - vertical stack with glass border */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="lg:col-span-5"
          >
            <div className="border border-white/10 bg-white/[0.02] backdrop-blur-sm">
              {stats.map((stat, i) => (
                <div
                  key={stat.label}
                  className={`p-8 text-center group hover:bg-white/[0.03] transition-colors ${
                    i < stats.length - 1 ? "border-b border-white/10" : ""
                  }`}
                >
                  <div className="text-4xl lg:text-5xl font-heading text-gold mb-2 transition-transform duration-300 group-hover:scale-105">
                    {stat.value}
                  </div>
                  <div className="text-xs font-semibold tracking-[0.2em] uppercase text-white/50">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

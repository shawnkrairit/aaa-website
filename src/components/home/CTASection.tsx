"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { motion } from "framer-motion";
import AnimateInView from "@/components/ui/AnimateInView";
import SectionMark from "@/components/ui/SectionMark";

/**
 * CTA — "official stamp" composition.
 * Vermillion seal (rotated SVG mark) acts as imagery in lieu of stock photography.
 */
export default function CTASection() {
  const t = useTranslations("cta");

  return (
    <section className="relative bg-ink text-bone overflow-hidden">
      <div className="border-y border-bone/15">
        <div className="container-wide flex items-center justify-between py-3 font-mono text-[0.62rem] tracking-[0.22em] uppercase text-bone/70">
          <span>§06 — INVITATION TO MEMBERSHIP</span>
          <span className="hidden md:inline">CHARN ISSARA TOWER · BANGKOK</span>
        </div>
      </div>

      {/* Subtle vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_50%,_rgba(201,71,42,0.08)_0%,_transparent_55%)] pointer-events-none" />

      <div className="container-wide relative z-10 section-padding">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-10 gap-y-12 items-center">
          <div className="lg:col-span-7">
            <AnimateInView>
              <SectionMark index="06" label="JOIN THE ALLIANCE" tone="bone" />
              <h2 className="text-bone mt-6 mb-6">
                {t("title")}
                <span className="display-italic text-vermillion">.</span>
              </h2>
              <p className="text-bone/75 text-lg leading-relaxed max-w-2xl mb-10">
                {t("subtitle")}
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link href="/join" className="btn-stamp">
                  {t("button")}
                  <span aria-hidden>→</span>
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 px-7 py-4 border border-bone/25 text-bone font-mono text-[0.6875rem] tracking-[0.22em] uppercase hover:border-bone hover:bg-bone/5 transition-colors cursor-pointer"
                >
                  Make an Enquiry
                </Link>
              </div>

              <div className="mt-12 pt-6 border-t border-bone/15 flex flex-wrap gap-x-10 gap-y-3 font-mono text-[0.6rem] tracking-[0.22em] uppercase text-bone/65">
                <span>NON-EXCLUSIVE NETWORK</span>
                <span>VETTED BY DUE DILIGENCE</span>
                <span>ANNUAL CONFERENCE</span>
              </div>
            </AnimateInView>
          </div>

          {/* Right: official seal mark */}
          <div className="lg:col-span-5 flex items-center justify-center lg:justify-end">
            <Seal />
          </div>
        </div>
      </div>
    </section>
  );
}

function Seal() {
  return (
    <motion.div
      initial={{ opacity: 0, rotate: -12, scale: 0.85 }}
      whileInView={{ opacity: 1, rotate: -7, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      className="relative w-[280px] h-[280px] lg:w-[360px] lg:h-[360px]"
    >
      <svg
        viewBox="0 0 360 360"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full text-vermillion"
        aria-hidden
      >
        {/* Outer ring */}
        <circle cx="180" cy="180" r="170" stroke="currentColor" strokeWidth="2" />
        {/* Inner ring */}
        <circle cx="180" cy="180" r="150" stroke="currentColor" strokeWidth="1" />
        {/* Innermost ring */}
        <circle cx="180" cy="180" r="92" stroke="currentColor" strokeWidth="1" />

        {/* Tick marks around outer ring */}
        {Array.from({ length: 60 }).map((_, i) => {
          const angle = (i * 6 * Math.PI) / 180;
          const r1 = 162;
          const r2 = 168;
          const x1 = 180 + r1 * Math.cos(angle);
          const y1 = 180 + r1 * Math.sin(angle);
          const x2 = 180 + r2 * Math.cos(angle);
          const y2 = 180 + r2 * Math.sin(angle);
          return (
            <line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="currentColor"
              strokeWidth={i % 5 === 0 ? 1.5 : 0.5}
              opacity={i % 5 === 0 ? 0.9 : 0.4}
            />
          );
        })}

        {/* Curved text along the ring (top) */}
        <defs>
          <path
            id="seal-top"
            d="M 60 180 a 120 120 0 0 1 240 0"
            fill="none"
          />
          <path
            id="seal-bot"
            d="M 60 180 a 120 120 0 0 0 240 0"
            fill="none"
          />
        </defs>
        <text
          fontFamily="var(--font-jetbrains-mono), monospace"
          fontSize="13"
          fill="currentColor"
          letterSpacing="6"
        >
          <textPath href="#seal-top" startOffset="50%" textAnchor="middle">
            ASEAN ATTORNEYS ALLIANCE
          </textPath>
        </text>
        <text
          fontFamily="var(--font-jetbrains-mono), monospace"
          fontSize="11"
          fill="currentColor"
          letterSpacing="6"
          opacity="0.7"
        >
          <textPath href="#seal-bot" startOffset="50%" textAnchor="middle">
            · EST · MMXVI · BANGKOK ·
          </textPath>
        </text>

        {/* Center mark */}
        <text
          x="180"
          y="172"
          textAnchor="middle"
          fontFamily="var(--font-fraunces), serif"
          fontSize="60"
          fontWeight="500"
          fill="currentColor"
          style={{ letterSpacing: "0.05em" }}
        >
          AAA
        </text>
        <text
          x="180"
          y="200"
          textAnchor="middle"
          fontFamily="var(--font-jetbrains-mono), monospace"
          fontSize="10"
          fill="currentColor"
          opacity="0.7"
          letterSpacing="3"
        >
          UNITY OF
        </text>
        <text
          x="180"
          y="216"
          textAnchor="middle"
          fontFamily="var(--font-jetbrains-mono), monospace"
          fontSize="10"
          fill="currentColor"
          opacity="0.7"
          letterSpacing="3"
        >
          PROFICIENCY
        </text>

        {/* Stars */}
        {[0, 72, 144, 216, 288].map((deg) => {
          const r = 130;
          const a = ((deg - 90) * Math.PI) / 180;
          const x = 180 + r * Math.cos(a);
          const y = 180 + r * Math.sin(a);
          return (
            <text
              key={deg}
              x={x}
              y={y + 4}
              textAnchor="middle"
              fontSize="14"
              fill="currentColor"
            >
              ✦
            </text>
          );
        })}
      </svg>
    </motion.div>
  );
}

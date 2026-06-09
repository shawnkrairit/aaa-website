"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { motion } from "framer-motion";
import { useState } from "react";
import { countries } from "@/data/countries";
import { countryPins } from "@/data/country-coords";
import ASEANMapBg from "@/components/ui/ASEANMapBg";

const ledger = [
  { num: "11", label: "Jurisdictions" },
  { num: "16", label: "Member Firms" },
  { num: "500+", label: "Attorneys" },
  { num: "08", label: "Practice Areas" },
];

export default function Hero() {
  const t = useTranslations("hero");
  const [hovered, setHovered] = useState<string | null>(null);
  const [pinned, setPinned] = useState<string | null>(null);

  // Pinned (tapped) takes precedence over hovered (transient mouseover)
  const active = pinned ?? hovered;
  const activeCountry =
    active ? countries.find((c) => c.slug === active) : null;
  const activePin =
    active ? countryPins.find((p) => p.slug === active) : null;

  return (
    <section className="relative bg-ink text-white overflow-hidden">
      {/* ASEAN map watermark — subtle, fills the hero */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <ASEANMapBg className="w-[80%] h-auto text-white opacity-[0.08]" />
      </div>

      {/* Soft gold radial */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_30%,_rgba(184,148,100,0.10)_0%,_transparent_55%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_15%_85%,_rgba(184,148,100,0.05)_0%,_transparent_45%)] pointer-events-none" />

      {/* Top register: filing strip */}
      <div className="border-b border-white/10 relative z-10">
        <div className="container-wide flex items-center justify-between gap-6 py-2.5 font-mono text-[0.65rem] tracking-[0.22em] uppercase text-white/75">
          <span className="hidden sm:inline">FILE №&nbsp;AAA/2016 · ASEAN/SECRETARIAT</span>
          <span className="hidden md:inline">Charn Issara Tower · Bangkok 10500</span>
          <span className="text-gold">EST. MMXVI</span>
        </div>
      </div>

      <div className="container-wide relative z-10 pt-14 lg:pt-20 pb-16 lg:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-10 gap-y-14">
          {/* ── Left: editorial typography on navy ── */}
          <div className="lg:col-span-7 relative">
            {/* Volume / issue marker */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-baseline gap-4 mb-10 font-mono text-[0.6875rem] tracking-[0.22em] uppercase"
            >
              <span className="text-gold">VOL. IX</span>
              <span className="h-px w-6 bg-white/30" aria-hidden />
              <span className="text-white/75">A UNITY OF PROFICIENCY</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-white mb-2 hyphens-none"
              style={{ fontVariationSettings: '"opsz" 144, "SOFT" 60' }}
            >
              <span className="block">{t("title")}</span>
            </motion.h1>

            {/* Italic kicker — gold */}
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="display-italic text-gold text-2xl sm:text-3xl mb-10 -mt-1"
            >
              — eleven nations, one alliance.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="grid grid-cols-12 gap-x-6 max-w-2xl"
            >
              <div className="col-span-1 hidden sm:flex flex-col items-center pt-2">
                <span className="block w-px flex-1 bg-white/15" />
              </div>
              <p className="col-span-12 sm:col-span-11 text-base lg:text-lg leading-relaxed text-white/75 mb-10 dropcap-light">
                {t("subtitle")}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.45 }}
              className="flex flex-col sm:flex-row gap-3 mb-12"
            >
              <Link
                href="/member-firms"
                className="inline-flex items-center justify-center gap-2.5 px-7 py-4 bg-gold text-white font-mono text-[0.6875rem] tracking-[0.2em] uppercase hover:bg-gold-light transition-colors duration-300 cursor-pointer"
              >
                {t("ctaPrimary")}
                <span aria-hidden>→</span>
              </Link>
              <Link
                href="/join"
                className="inline-flex items-center justify-center gap-2.5 px-7 py-4 border border-white/30 text-white font-mono text-[0.6875rem] tracking-[0.2em] uppercase hover:border-gold hover:text-gold transition-colors duration-300 cursor-pointer"
              >
                {t("ctaSecondary")}
              </Link>
            </motion.div>

            {/* Ledger row — 4 stats inline, lower bar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.6 }}
              className="grid grid-cols-2 sm:grid-cols-4 border-t border-b border-white/15 divide-x divide-y sm:divide-y-0 divide-white/15"
            >
              {ledger.map((s) => (
                <div
                  key={s.label}
                  className="px-5 lg:px-6 py-6 text-center flex flex-col items-center"
                >
                  <div className="font-display text-3xl lg:text-4xl text-gold leading-none num-mono">
                    {s.num}
                  </div>
                  <div className="mt-3 font-mono text-[0.65rem] tracking-[0.22em] uppercase text-white/50">
                    {s.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* ── Right: map plate on dark — translucent border ── */}
          <div className="lg:col-span-5 relative">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="relative aspect-[4/5] lg:aspect-auto lg:h-[640px] bg-white/[0.03] border border-white/15 backdrop-blur-sm p-5 lg:p-7"
            >
              <CornerTicks tone="bone" />

              <div className="flex items-baseline justify-between font-mono text-[0.6rem] tracking-[0.22em] uppercase text-white/60 mb-3 border-b border-white/10 pb-3">
                <span>SOUTHEAST ASIA</span>
                <span>SCALE 1 : ∞</span>
              </div>

              <div className="relative w-full h-[calc(100%-110px)]">
                <ASEANMapBg className="map-tinted absolute inset-0 w-full h-full text-white/60" />

                <svg
                  viewBox="0 0 1000 800"
                  preserveAspectRatio="xMidYMid meet"
                  className="absolute inset-0 w-full h-full"
                  aria-hidden
                >
                  {[200, 400, 600].map((y) => (
                    <line
                      key={y}
                      x1="0"
                      y1={y}
                      x2="1000"
                      y2={y}
                      stroke="rgba(255,255,255,0.06)"
                      strokeWidth="1"
                      strokeDasharray="2 6"
                    />
                  ))}
                  {[250, 500, 750].map((x) => (
                    <line
                      key={x}
                      x1={x}
                      y1="0"
                      x2={x}
                      y2="800"
                      stroke="rgba(255,255,255,0.06)"
                      strokeWidth="1"
                      strokeDasharray="2 6"
                    />
                  ))}

                  {countryPins.map((p, i) => {
                    // Singapore + Timor-Leste are tiny — give them an extra prominence ring
                    const isTiny = p.slug === "singapore" || p.slug === "timor-leste";
                    return (
                      <g key={p.slug}>
                        <motion.circle
                          cx={p.x}
                          cy={p.y}
                          r={isTiny ? 22 : 18}
                          fill="rgba(14,21,24,0.6)"
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ delay: 0.4 + i * 0.05, duration: 0.6 }}
                          style={{ transformOrigin: `${p.x}px ${p.y}px` }}
                        />
                        <motion.circle
                          cx={p.x}
                          cy={p.y}
                          r={isTiny ? 16 : 13}
                          fill="rgba(201,164,107,0.22)"
                          initial={{ scale: 0 }}
                          animate={{ scale: [0, 1.4, 1] }}
                          transition={{ delay: 0.45 + i * 0.05, duration: 0.9 }}
                          style={{ transformOrigin: `${p.x}px ${p.y}px` }}
                        />
                        <motion.circle
                          cx={p.x}
                          cy={p.y}
                          r={isTiny ? 10 : 8}
                          fill="#F0CD7A"
                          stroke="#0A1628"
                          strokeWidth="2"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.5 + i * 0.05, duration: 0.4 }}
                          style={{
                            transformOrigin: `${p.x}px ${p.y}px`,
                            cursor: "pointer",
                            filter:
                              active === p.slug
                                ? "drop-shadow(0 0 8px rgba(240,205,122,0.95))"
                                : undefined,
                          }}
                        />
                        <circle
                          cx={p.x}
                          cy={p.y}
                          r="26"
                          fill="transparent"
                          onMouseEnter={() => setHovered(p.slug)}
                          onMouseLeave={() => setHovered(null)}
                          onClick={() =>
                            setPinned((cur) => (cur === p.slug ? null : p.slug))
                          }
                          tabIndex={0}
                          role="button"
                          aria-label={`${p.iso} — view firms in ${p.capital}`}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") {
                              e.preventDefault();
                              setPinned((cur) => (cur === p.slug ? null : p.slug));
                            }
                          }}
                          style={{ cursor: "pointer", outline: "none" }}
                        />
                        <text
                          x={p.x}
                          y={p.y - (isTiny ? 18 : 16)}
                          fontSize="14"
                          fontFamily="var(--font-jetbrains-mono), monospace"
                          fontWeight="600"
                          textAnchor="middle"
                          fill="#FFFFFF"
                          stroke="#0A1628"
                          strokeWidth="3"
                          paintOrder="stroke"
                          style={{
                            letterSpacing: "0.18em",
                            opacity: active === p.slug ? 1 : 0.92,
                            transition: "opacity 240ms",
                          }}
                        >
                          {p.iso}
                        </text>
                      </g>
                    );
                  })}
                </svg>
              </div>

              {/* Bottom register: country detail */}
              <div className="absolute left-5 right-5 lg:left-7 lg:right-7 bottom-5 lg:bottom-7 border-t border-white/10 pt-3 min-h-[64px]">
                {activeCountry && activePin ? (
                  <div className="flex items-start justify-between gap-3">
                    <Link
                      href={`/member-firms/${activeCountry.slug}`}
                      className="block group flex-1"
                    >
                      <div className="flex items-baseline justify-between gap-3 font-mono text-[0.6rem] tracking-[0.22em] uppercase text-gold">
                        <span>{activePin.iso} · {activeCountry.name}</span>
                        <span className="text-white/75">
                          {activeCountry.firmCount} firm{activeCountry.firmCount === 1 ? "" : "s"}
                        </span>
                      </div>
                      <div className="mt-1.5 flex items-baseline justify-between gap-3">
                        <span className="font-display italic text-xl text-white group-hover:text-gold transition-colors">
                          {activeCountry.nameLocal}
                        </span>
                        <span className="font-mono text-[0.65rem] text-white/60">
                          {activePin.coord}
                        </span>
                      </div>
                    </Link>
                    {pinned && (
                      <button
                        type="button"
                        onClick={() => setPinned(null)}
                        aria-label="Clear selection"
                        className="shrink-0 ml-2 -mt-1 w-6 h-6 inline-flex items-center justify-center text-white/60 hover:text-gold transition-colors cursor-pointer"
                      >
                        <span aria-hidden className="text-base leading-none">×</span>
                      </button>
                    )}
                  </div>
                ) : (
                  <div>
                    <div className="font-mono text-[0.6rem] tracking-[0.22em] uppercase text-white/75">
                      Tap or hover any pin to inspect
                    </div>
                    <div className="mt-1.5 font-display italic text-xl text-white/75">
                      Eleven jurisdictions, one alliance.
                    </div>
                  </div>
                )}
              </div>
            </motion.div>

            <div className="mt-3 flex items-center justify-between font-mono text-[0.6rem] tracking-[0.22em] uppercase text-white/60">
              <span>FIG. 01 — REGIONAL CONSPECTUS</span>
              <span>{countryPins.length} POINTS PLOTTED</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CornerTicks({ tone = "ink" }: { tone?: "ink" | "bone" }) {
  const c = tone === "bone" ? "border-white/40" : "border-ink";
  const ticks = [
    `top-2 left-2 border-t border-l ${c}`,
    `top-2 right-2 border-t border-r ${c}`,
    `bottom-2 left-2 border-b border-l ${c}`,
    `bottom-2 right-2 border-b border-r ${c}`,
  ];
  return (
    <>
      {ticks.map((cls) => (
        <span
          key={cls}
          aria-hidden
          className={`absolute w-3 h-3 ${cls}`}
        />
      ))}
    </>
  );
}

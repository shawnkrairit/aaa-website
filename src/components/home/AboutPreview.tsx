"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import AnimateInView from "@/components/ui/AnimateInView";
import SectionMark from "@/components/ui/SectionMark";

export default function AboutPreview() {
  const t = useTranslations("about");

  return (
    <section className="relative bg-paper section-padding">
      <span className="grain-light" />

      <div className="container-wide relative z-10">
        {/* Section header — index style */}
        <div className="border-t border-ink/15 pt-6 mb-12 lg:mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <SectionMark index="01" label="ABOUT THE ALLIANCE" />
          <span className="font-mono text-[0.65rem] tracking-[0.22em] uppercase text-text-muted">
            ¶ Founding · Mission · Network
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-10 gap-y-14 items-start">
          {/* Left: column of mission text — editorial drop cap */}
          <div className="lg:col-span-7">
            <AnimateInView>
              <h2 className="text-ink mb-8" style={{ fontSize: "clamp(2.5rem, 5vw, 4.25rem)" }}>
                {t("sectionTitle")}
                <span className="display-italic text-vermillion ml-2">/network</span>
              </h2>
              <p className="dropcap text-lg leading-relaxed text-ink/80 mb-8 max-w-2xl">
                {t("mission")}
              </p>
              <Link
                href="/about"
                className="inline-flex items-center gap-3 font-mono text-[0.6875rem] tracking-[0.22em] uppercase text-ink hover:text-vermillion transition-colors group"
              >
                <span aria-hidden className="h-px w-8 bg-ink group-hover:w-12 group-hover:bg-vermillion transition-all" />
                {t("learnMore")}
              </Link>
            </AnimateInView>
          </div>

          {/* Right: extracted quote in monsoon-teal pull-quote panel */}
          <div className="lg:col-span-5">
            <AnimateInView variant="fadeRight" delay={0.15}>
              <figure className="relative bg-monsoon text-bone p-8 lg:p-10">
                <span className="grain" />
                {/* Decorative quotation mark */}
                <span
                  aria-hidden
                  className="display-italic absolute -top-4 left-6 text-7xl leading-none text-bone/30 select-none"
                  style={{ fontFamily: "var(--font-instrument-serif), serif" }}
                >
                  &ldquo;
                </span>

                <blockquote className="relative">
                  <p className="display-italic text-2xl lg:text-[1.65rem] leading-snug text-bone mb-6">
                    A network built on trust, delivering excellence across borders.
                  </p>
                  <figcaption className="flex items-center gap-3 font-mono text-[0.65rem] tracking-[0.22em] uppercase text-bone/65">
                    <span className="inline-block w-6 h-px bg-vermillion" aria-hidden />
                    Founding Principle, AAA Charter
                  </figcaption>
                </blockquote>

                {/* Index strip */}
                <div className="mt-10 pt-5 border-t border-bone/20 grid grid-cols-2 gap-6">
                  <div>
                    <div className="font-display text-3xl text-bone">2016</div>
                    <div className="mt-1 font-mono text-[0.62rem] tracking-[0.22em] uppercase text-bone/55">
                      Founded
                    </div>
                  </div>
                  <div>
                    <div className="font-display text-3xl text-bone">11</div>
                    <div className="mt-1 font-mono text-[0.62rem] tracking-[0.22em] uppercase text-bone/55">
                      ASEAN Nations
                    </div>
                  </div>
                </div>
              </figure>
            </AnimateInView>
          </div>
        </div>
      </div>
    </section>
  );
}

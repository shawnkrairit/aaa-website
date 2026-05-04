"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { newsArticles } from "@/data/news";
import { ArrowUpRight } from "lucide-react";
import AnimateInView from "@/components/ui/AnimateInView";
import SectionMark from "@/components/ui/SectionMark";

function formatDate(d: string) {
  return new Date(d).toLocaleDateString("en-GB", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  }).toUpperCase();
}

export default function LatestNews() {
  const t = useTranslations("latestNews");
  const [feature, ...rest] = newsArticles.slice(0, 4);
  const sidebar = rest.slice(0, 3);

  return (
    <section className="bg-bone section-padding relative overflow-hidden">
      <span className="grain-light" />

      <div className="container-wide relative z-10">
        <AnimateInView className="grid grid-cols-1 lg:grid-cols-12 gap-x-10 gap-y-8 mb-12 lg:mb-14">
          <div className="lg:col-span-7">
            <SectionMark index="05" label="GAZETTE — DISPATCHES" />
            <h2 className="mt-6">
              {t("sectionTitle")}
              <span className="display-italic text-vermillion">.</span>
            </h2>
          </div>
          <div className="lg:col-span-5 lg:pt-3 flex flex-col">
            <p className="text-text-muted leading-relaxed">
              {t("sectionSubtitle")}
            </p>
            <Link
              href="/news"
              className="mt-6 inline-flex items-center gap-3 font-mono text-[0.6875rem] tracking-[0.22em] uppercase text-ink hover:text-vermillion transition-colors group self-start"
            >
              <span aria-hidden className="h-px w-8 bg-ink group-hover:w-12 group-hover:bg-vermillion transition-all" />
              {t("viewAll")}
            </Link>
          </div>
        </AnimateInView>

        {/* Newspaper-style spread */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-10 gap-y-10 border-t border-ink/15 pt-10">
          {/* Featured (large) */}
          {feature && (
            <Link
              href={`/news/${feature.slug}`}
              className="lg:col-span-7 group block"
            >
              <div className="flex items-baseline justify-between font-mono text-[0.65rem] tracking-[0.22em] uppercase text-vermillion mb-4">
                <span>FEATURED · {feature.categoryLabel.toUpperCase()}</span>
                <span className="text-text-muted">{formatDate(feature.date)}</span>
              </div>

              <h3 className="font-display text-3xl lg:text-5xl leading-[1.04] text-ink group-hover:text-vermillion transition-colors mb-5">
                {feature.title}
              </h3>

              <p className="text-text-muted text-base leading-relaxed mb-6 max-w-2xl">
                {feature.excerpt}
              </p>

              <span className="inline-flex items-center gap-2 font-mono text-[0.65rem] tracking-[0.22em] uppercase text-ink group-hover:text-vermillion transition-colors">
                Read full dispatch
                <ArrowUpRight className="w-3.5 h-3.5 group-hover:rotate-12 transition-transform" />
              </span>

              {/* Decorative artwork — typographic mark */}
              <div className="hidden lg:block mt-10 pt-8 border-t border-ink/15">
                <div
                  className="font-display text-[8rem] xl:text-[11rem] leading-none text-ink/[0.06] select-none -tracking-[0.05em]"
                  aria-hidden
                  style={{ fontVariationSettings: '"opsz" 144, "SOFT" 80' }}
                >
                  №01
                </div>
              </div>
            </Link>
          )}

          {/* Sidebar list */}
          <div className="lg:col-span-5 lg:border-l lg:border-ink/15 lg:pl-10">
            <div className="font-mono text-[0.65rem] tracking-[0.22em] uppercase text-text-muted mb-6">
              ALSO IN THIS ISSUE
            </div>
            <ul className="space-y-7">
              {sidebar.map((article, i) => (
                <li key={article.slug} className="group">
                  <Link href={`/news/${article.slug}`} className="block">
                    <div className="flex items-baseline justify-between font-mono text-[0.62rem] tracking-[0.22em] uppercase text-vermillion mb-2">
                      <span>{article.categoryLabel.toUpperCase()}</span>
                      <span className="text-text-light">{formatDate(article.date)}</span>
                    </div>
                    <h4 className="font-display text-xl lg:text-[1.4rem] leading-snug text-ink group-hover:text-vermillion transition-colors">
                      {article.title}
                    </h4>
                    <p className="mt-2 text-sm text-text-muted line-clamp-2 leading-relaxed">
                      {article.excerpt}
                    </p>
                    {i < sidebar.length - 1 && (
                      <span className="block h-px w-full bg-ink/10 mt-7" aria-hidden />
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

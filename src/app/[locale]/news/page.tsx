"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { newsArticles } from "@/data/news";
import { useState } from "react";
import { Calendar, Tag, ArrowRight } from "lucide-react";

const categories = [
  { key: "all", label: "filterAll" },
  { key: "asean-updates", label: "filterASEAN" },
  { key: "legal-updates", label: "filterLegal" },
  { key: "alliance-news", label: "filterAlliance" },
] as const;

export default function NewsPage() {
  const t = useTranslations("latestNews");
  const [activeCategory, setActiveCategory] = useState("all");

  const filtered =
    activeCategory === "all"
      ? newsArticles
      : newsArticles.filter((a) => a.category === activeCategory);

  return (
    <>
      {/* Page Header */}
      <section className="bg-navy py-24 lg:py-32">
        <div className="container-narrow text-center">
          <div className="gold-accent mx-auto mb-8" />
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading text-white mb-6">
            {t("pageTitle")}
          </h1>
          <p className="text-white/40 text-lg max-w-2xl mx-auto leading-relaxed">
            {t("pageSubtitle")}
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="bg-white border-b border-border py-4">
        <div className="container-narrow">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className={`px-5 py-2 text-xs font-semibold tracking-widest uppercase transition-colors cursor-pointer ${
                  activeCategory === cat.key
                    ? "bg-navy text-white"
                    : "bg-surface text-text-muted hover:bg-navy/5 hover:text-navy"
                }`}
              >
                {t(cat.label)}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="section-padding bg-surface">
        <div className="container-narrow">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((article) => (
              <Link
                key={article.slug}
                href={`/news/${article.slug}`}
                className="card group cursor-pointer !p-0 overflow-hidden bg-white"
              >
                <div className="h-px bg-gold" />
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="label-text flex items-center gap-1">
                      <Tag className="w-3 h-3" />
                      {article.categoryLabel}
                    </span>
                    {article.country && (
                      <span className="px-2.5 py-1 bg-gold/10 text-gold text-xs font-semibold tracking-wider uppercase">
                        {article.country}
                      </span>
                    )}
                  </div>
                  <h2 className="text-lg font-heading text-navy font-semibold mb-3 leading-snug group-hover:text-gold transition-colors line-clamp-2">
                    {article.title}
                  </h2>
                  <p className="text-text-muted text-sm leading-relaxed mb-4 line-clamp-3">
                    {article.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5 text-text-light text-xs">
                      <Calendar className="w-3 h-3" />
                      {new Date(article.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                    <span className="text-gold text-xs font-semibold tracking-wider uppercase group-hover:text-gold-light transition-colors flex items-center gap-1">
                      {t("readMore")}
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

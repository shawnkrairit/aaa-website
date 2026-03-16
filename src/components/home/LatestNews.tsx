"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { newsArticles } from "@/data/news";
import { ArrowRight, Calendar, Tag } from "lucide-react";
import AnimateInView from "@/components/ui/AnimateInView";
import { StaggerContainer, StaggerItem } from "@/components/ui/StaggerGrid";

export default function LatestNews() {
  const t = useTranslations("latestNews");
  const latest = newsArticles.slice(0, 3);

  return (
    <section className="section-padding bg-white">
      <div className="container-narrow">
        {/* Left-aligned header for variety */}
        <AnimateInView className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-16 gap-6">
          <div>
            <div className="gold-accent mb-8" />
            <h2 className="text-3xl sm:text-4xl font-heading text-navy mb-4">
              {t("sectionTitle")}
            </h2>
            <p className="text-text-muted text-lg max-w-2xl">
              {t("sectionSubtitle")}
            </p>
          </div>
          <Link
            href="/news"
            className="btn-secondary shrink-0"
          >
            {t("viewAll")}
          </Link>
        </AnimateInView>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {latest.map((article) => (
            <StaggerItem key={article.slug}>
              <Link
                href={`/news/${article.slug}`}
                className="card group cursor-pointer !p-0 overflow-hidden block"
              >
                <div className="h-0.5 bg-gold" />
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="label-text flex items-center gap-1">
                      <Tag className="w-3 h-3" />
                      {article.categoryLabel}
                    </span>
                  </div>
                  <h3 className="text-lg font-heading text-navy font-semibold mb-3 leading-snug group-hover:text-gold transition-colors line-clamp-2">
                    {article.title}
                  </h3>
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
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}

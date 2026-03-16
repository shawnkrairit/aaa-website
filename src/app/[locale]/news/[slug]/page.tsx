import { notFound } from "next/navigation";
import { newsArticles, getArticleBySlug } from "@/data/news";
import { Link } from "@/i18n/routing";
import { ArrowLeft, Calendar, Tag } from "lucide-react";

export function generateStaticParams() {
  return newsArticles.map((a) => ({ slug: a.slug }));
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  return (
    <>
      {/* Header */}
      <section className="bg-navy py-24 lg:py-32">
        <div className="container-narrow">
          <Link
            href="/news"
            className="inline-flex items-center gap-2 text-white/40 hover:text-white text-xs tracking-wider uppercase mb-8 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to News
          </Link>

          <div className="flex items-center gap-3 mb-4">
            <span className="label-text flex items-center gap-1">
              <Tag className="w-3.5 h-3.5" />
              {article.categoryLabel}
            </span>
            {article.country && (
              <span className="px-3 py-1 bg-gold/20 text-gold-light text-xs font-semibold tracking-wider uppercase">
                {article.country}
              </span>
            )}
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading text-white mb-4 leading-tight">
            {article.title}
          </h1>

          <div className="flex items-center gap-2 text-white/30 text-sm">
            <Calendar className="w-4 h-4" />
            {new Date(article.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding bg-white">
        <div className="container-narrow">
          <div className="max-w-3xl mx-auto">
            <div className="prose prose-lg max-w-none text-text-muted leading-relaxed">
              {article.content.split("\n\n").map((paragraph, i) => (
                <p key={i} className="mb-6">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Back link */}
            <div className="mt-12 pt-8 border-t border-border">
              <Link
                href="/news"
                className="inline-flex items-center gap-2 text-gold font-semibold text-xs tracking-[0.15em] uppercase hover:text-gold-light transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to All News
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

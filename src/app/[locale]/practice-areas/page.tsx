import { useTranslations } from "next-intl";
import { practiceAreas } from "@/data/practice-areas";
import {
  Building2,
  Landmark,
  Shield,
  Scale,
  GitMerge,
  Users,
  Home,
  Calculator,
  CheckCircle,
} from "lucide-react";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Building2,
  Landmark,
  Shield,
  Scale,
  GitMerge,
  Users,
  Home,
  Calculator,
};

export default function PracticeAreasPage() {
  const t = useTranslations("practiceAreas");

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

      {/* Practice Areas Grid */}
      <section className="section-padding bg-white">
        <div className="container-narrow">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {practiceAreas.map((area) => {
              const Icon = iconMap[area.icon] || Building2;
              return (
                <div key={area.slug} className="card group !p-8">
                  <div className="flex items-start gap-5">
                    <div className="w-14 h-14 border border-border flex items-center justify-center shrink-0 group-hover:border-gold transition-colors">
                      <Icon className="w-6 h-6 text-navy" />
                    </div>
                    <div>
                      <h2 className="text-xl font-heading text-navy font-semibold mb-3">
                        {area.title}
                      </h2>
                      <p className="text-text-muted leading-relaxed mb-4">
                        {area.description}
                      </p>
                      <ul className="space-y-2">
                        {area.details.map((detail) => (
                          <li
                            key={detail}
                            className="flex items-center gap-2 text-sm text-text-muted"
                          >
                            <CheckCircle className="w-4 h-4 text-success shrink-0" />
                            {detail}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}

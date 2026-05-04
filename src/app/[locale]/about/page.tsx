import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import {
  Heart,
  Award,
  Shield,
  Handshake,
  MessageSquare,
  Search,
  UserCheck,
  CheckCircle,
} from "lucide-react";

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <AboutContent />;
}

function AboutContent() {
  const t = useTranslations("about");

  const values = [
    { key: "Independence", icon: Shield, tKey: "valueIndependence" },
    { key: "Excellence", icon: Award, tKey: "valueExcellence" },
    { key: "Integrity", icon: Heart, tKey: "valueIntegrity" },
    { key: "Collaboration", icon: Handshake, tKey: "valueCollaboration" },
  ];

  const steps = [
    { icon: MessageSquare, tKey: "step1" },
    { icon: Search, tKey: "step2" },
    { icon: UserCheck, tKey: "step3" },
    { icon: CheckCircle, tKey: "step4" },
  ];

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

      {/* Mission & Vision */}
      <section className="section-padding bg-white">
        <div className="container-narrow">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div>
              <div className="gold-accent mb-6" />
              <h2 className="text-2xl sm:text-3xl font-heading text-navy mb-4">
                {t("missionTitle")}
              </h2>
              <p className="text-text-muted leading-relaxed text-lg">
                {t("missionText")}
              </p>
            </div>
            <div>
              <div className="gold-accent mb-6" />
              <h2 className="text-2xl sm:text-3xl font-heading text-navy mb-4">
                {t("visionTitle")}
              </h2>
              <p className="text-text-muted leading-relaxed text-lg">
                {t("visionText")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* History */}
      <section className="section-padding bg-surface-warm">
        <div className="container-narrow">
          <div className="max-w-3xl mx-auto text-center">
            <div className="gold-accent mx-auto mb-8" />
            <h2 className="text-2xl sm:text-3xl font-heading text-navy mb-6">
              {t("historyTitle")}
            </h2>
            <p className="text-text-muted leading-relaxed text-lg">
              {t("historyText")}
            </p>

            {/* Timeline */}
            <div className="mt-16 flex flex-col sm:flex-row justify-center gap-12">
              {[
                { year: "2015", event: "ASEAN Economic Community launched" },
                { year: "2016", event: "ASEAN Attorneys Alliance founded" },
                { year: "2017", event: "First member firms onboarded across ASEAN" },
                { year: "2025", event: "Timor-Leste becomes 11th ASEAN member" },
                { year: "2026", event: "Network spans all 11 ASEAN nations" },
              ].map((item) => (
                <div key={item.year} className="text-center">
                  <div className="w-16 h-16 mx-auto bg-navy flex items-center justify-center mb-4">
                    <span className="text-white font-heading text-lg font-bold">
                      {item.year}
                    </span>
                  </div>
                  <p className="text-text-muted text-sm max-w-32">{item.event}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="section-padding bg-white">
        <div className="container-narrow">
          <div className="text-center mb-16">
            <div className="gold-accent mx-auto mb-8" />
            <h2 className="text-2xl sm:text-3xl font-heading text-navy mb-4">
              {t("howItWorksTitle")}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map(({ icon: Icon, tKey }, i) => (
              <div key={tKey} className="relative text-center">
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-7 left-[60%] w-[80%] h-px bg-border" />
                )}
                <div className="w-14 h-14 mx-auto mb-4 border border-border flex items-center justify-center relative z-10 bg-white">
                  <Icon className="w-6 h-6 text-navy" />
                </div>
                <div className="label-text mb-2">
                  Step {i + 1}
                </div>
                <h3 className="text-lg font-heading text-navy font-semibold mb-2">
                  {t(`${tKey}Title`)}
                </h3>
                <p className="text-text-muted text-sm leading-relaxed">
                  {t(`${tKey}Text`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-surface">
        <div className="container-narrow">
          <div className="text-center mb-16">
            <div className="gold-accent mx-auto mb-8" />
            <h2 className="text-2xl sm:text-3xl font-heading text-navy mb-4">
              {t("valuesTitle")}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map(({ icon: Icon, tKey }) => (
              <div key={tKey} className="card text-center group">
                <div className="w-14 h-14 mx-auto mb-4 border border-border flex items-center justify-center group-hover:border-gold transition-colors">
                  <Icon className="w-6 h-6 text-gold" />
                </div>
                <h3 className="text-lg font-heading text-navy font-semibold mb-2">
                  {t(tKey)}
                </h3>
                <p className="text-text-muted text-sm leading-relaxed">
                  {t(`${tKey}Text`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

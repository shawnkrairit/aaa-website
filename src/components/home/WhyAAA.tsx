"use client";

import { useTranslations } from "next-intl";
import { Globe, BookOpen, DollarSign, ShieldCheck } from "lucide-react";
import AnimateInView from "@/components/ui/AnimateInView";
import { StaggerContainer, StaggerItem } from "@/components/ui/StaggerGrid";

const features = [
  { key: "coverage", icon: Globe },
  { key: "expertise", icon: BookOpen },
  { key: "fees", icon: DollarSign },
  { key: "quality", icon: ShieldCheck },
] as const;

export default function WhyAAA() {
  const t = useTranslations("whyAAA");

  return (
    <section className="relative section-padding bg-navy overflow-hidden">
      {/* Subtle gold radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,_rgba(161,124,69,0.08)_0%,_transparent_60%)]" />

      {/* Gold diagonal traces */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-0 right-[10%] w-px h-[60%] origin-top bg-gradient-to-b from-gold/15 via-gold/5 to-transparent"
          style={{ transform: "rotate(-8deg)" }}
        />
        <div
          className="absolute bottom-0 left-[8%] w-px h-[40%] origin-bottom bg-gradient-to-t from-gold/10 via-gold/4 to-transparent"
          style={{ transform: "rotate(10deg)" }}
        />
      </div>

      <div className="container-narrow relative z-10">
        <AnimateInView className="text-center mb-16">
          <div className="gold-accent mx-auto mb-8" />
          <h2 className="text-3xl sm:text-4xl font-heading text-white mb-4">
            {t("sectionTitle")}
          </h2>
          <p className="text-white/50 text-lg max-w-2xl mx-auto">
            {t("sectionSubtitle")}
          </p>
        </AnimateInView>

        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map(({ key, icon: Icon }) => (
            <StaggerItem key={key}>
              {/* Flip card wrapper — fixed height so all cards match */}
              <div className="group h-72 [perspective:1000px] cursor-pointer">
                <div className="relative w-full h-full transition-transform duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                  {/* ── Front ── */}
                  <div className="absolute inset-0 [backface-visibility:hidden] bg-white/[0.05] border border-white/10 backdrop-blur-sm flex flex-col items-center justify-center p-8 text-center">
                    <div className="w-14 h-14 mb-6 border border-gold/30 flex items-center justify-center">
                      <Icon className="w-6 h-6 text-gold" />
                    </div>
                    <h3 className="text-lg font-heading text-white">
                      {t(key)}
                    </h3>
                  </div>

                  {/* ── Back ── */}
                  <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] bg-gold border border-gold flex flex-col items-center justify-center p-8 text-center">
                    <Icon className="w-5 h-5 text-white mb-4" />
                    <h3 className="text-base font-heading text-white mb-3">
                      {t(key)}
                    </h3>
                    <p className="text-white/80 text-sm leading-relaxed">
                      {t(`${key}Text`)}
                    </p>
                  </div>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}

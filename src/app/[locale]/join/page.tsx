"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Globe,
  Users,
  BookOpen,
  Calendar,
  Megaphone,
  TrendingUp,
  CheckCircle,
  ChevronDown,
  Send,
} from "lucide-react";
import { countries } from "@/data/countries";

const benefits = [
  { key: "benefit1", icon: Globe },
  { key: "benefit2", icon: Users },
  { key: "benefit3", icon: BookOpen },
  { key: "benefit4", icon: Calendar },
  { key: "benefit5", icon: Megaphone },
  { key: "benefit6", icon: TrendingUp },
] as const;

export default function JoinPage() {
  const t = useTranslations("join");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    { q: t("faq1Q"), a: t("faq1A") },
    { q: t("faq2Q"), a: t("faq2A") },
    { q: t("faq3Q"), a: t("faq3A") },
    { q: t("faq4Q"), a: t("faq4A") },
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

      {/* Benefits */}
      <section className="section-padding bg-white">
        <div className="container-narrow">
          <div className="text-center mb-16">
            <div className="gold-accent mx-auto mb-8" />
            <h2 className="text-2xl sm:text-3xl font-heading text-navy mb-4">
              {t("benefitsTitle")}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map(({ key, icon: Icon }) => (
              <div key={key} className="card group">
                <div className="w-12 h-12 border border-border flex items-center justify-center mb-4 group-hover:border-gold transition-colors">
                  <Icon className="w-5 h-5 text-navy" />
                </div>
                <h3 className="text-lg font-heading text-navy font-semibold mb-2">
                  {t(key)}
                </h3>
                <p className="text-text-muted text-sm leading-relaxed">
                  {t(`${key}Text`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Membership Criteria */}
      <section className="section-padding bg-surface-warm">
        <div className="container-narrow">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <div className="gold-accent mx-auto mb-8" />
              <h2 className="text-2xl sm:text-3xl font-heading text-navy mb-4">
                {t("criteriaTitle")}
              </h2>
            </div>

            <div className="space-y-3">
              {[1, 2, 3, 4, 5, 6, 7].map((i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 bg-white p-4 border border-border"
                >
                  <CheckCircle className="w-5 h-5 text-success mt-0.5 shrink-0" />
                  <span className="text-text-muted">{t(`criteria${i}`)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Application Process */}
      <section className="section-padding bg-white">
        <div className="container-narrow">
          <div className="text-center mb-16">
            <div className="gold-accent mx-auto mb-8" />
            <h2 className="text-2xl sm:text-3xl font-heading text-navy mb-4">
              {t("processTitle")}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((step) => (
              <div key={step} className="text-center">
                <div className="w-12 h-12 mx-auto bg-navy text-white flex items-center justify-center font-bold text-lg mb-4 ring-2 ring-gold/20 ring-offset-2 ring-offset-white">
                  {step}
                </div>
                <h3 className="text-lg font-heading text-navy font-semibold mb-2">
                  {t(`processStep${step}`)}
                </h3>
                <p className="text-text-muted text-sm leading-relaxed">
                  {t(`processStep${step}Text`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section className="section-padding bg-surface">
        <div className="container-narrow">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-10">
              <div className="gold-accent mx-auto mb-8" />
              <h2 className="text-2xl sm:text-3xl font-heading text-navy mb-4">
                {t("formTitle")}
              </h2>
            </div>

            <form className="card !p-8 space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-semibold tracking-wider uppercase text-text mb-2">
                    {t("formName")}
                  </label>
                  <input
                    type="text"
                    className="input-field"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold tracking-wider uppercase text-text mb-2">
                    {t("formContact")}
                  </label>
                  <input
                    type="text"
                    className="input-field"
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-semibold tracking-wider uppercase text-text mb-2">
                    {t("formEmail")}
                  </label>
                  <input
                    type="email"
                    className="input-field"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold tracking-wider uppercase text-text mb-2">
                    {t("formPhone")}
                  </label>
                  <input
                    type="tel"
                    className="input-field"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold tracking-wider uppercase text-text mb-2">
                  {t("formCountry")}
                </label>
                <select className="input-field cursor-pointer">
                  <option value="">Select country</option>
                  {countries.map((c) => (
                    <option key={c.slug} value={c.slug}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold tracking-wider uppercase text-text mb-2">
                  {t("formMessage")}
                </label>
                <textarea
                  rows={5}
                  className="input-field resize-none"
                />
              </div>
              <button
                type="submit"
                className="btn-primary w-full flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                {t("formSubmit")}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding bg-white">
        <div className="container-narrow">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <div className="gold-accent mx-auto mb-8" />
              <h2 className="text-2xl sm:text-3xl font-heading text-navy mb-4">
                {t("faqTitle")}
              </h2>
            </div>

            <div className="space-y-3">
              {faqs.map((faq, i) => (
                <div
                  key={i}
                  className="border border-border overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between p-5 text-left cursor-pointer hover:bg-surface transition-colors"
                  >
                    <span className="font-medium text-text pr-4">{faq.q}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-text-muted shrink-0 transition-transform ${
                        openFaq === i ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  <AnimatePresence>
                    {openFaq === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 pb-5 text-text-muted leading-relaxed">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

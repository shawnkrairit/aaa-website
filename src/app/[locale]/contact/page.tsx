"use client";

import { useTranslations } from "next-intl";
import { MapPin, Phone, Mail, Send } from "lucide-react";
import { countries } from "@/data/countries";

export default function ContactPage() {
  const t = useTranslations("contact");

  const subjects = [
    { value: "general", label: t("subjectGeneral") },
    { value: "membership", label: t("subjectMembership") },
    { value: "referral", label: t("subjectReferral") },
    { value: "media", label: t("subjectMedia") },
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

      {/* Contact Section */}
      <section className="section-padding bg-white">
        <div className="container-narrow">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Form */}
            <div className="lg:col-span-3">
              <h2 className="text-2xl font-heading text-navy font-semibold mb-6">
                {t("formTitle")}
              </h2>

              <form className="space-y-5">
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
                      {t("formEmail")}
                    </label>
                    <input
                      type="email"
                      className="input-field"
                      required
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-semibold tracking-wider uppercase text-text mb-2">
                      {t("formCompany")}
                    </label>
                    <input
                      type="text"
                      className="input-field"
                    />
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
                </div>
                <div>
                  <label className="block text-xs font-semibold tracking-wider uppercase text-text mb-2">
                    {t("formSubject")}
                  </label>
                  <select className="input-field cursor-pointer">
                    {subjects.map((s) => (
                      <option key={s.value} value={s.value}>
                        {s.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold tracking-wider uppercase text-text mb-2">
                    {t("formMessage")}
                  </label>
                  <textarea
                    rows={6}
                    className="input-field resize-none"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="btn-primary flex items-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  {t("formSubmit")}
                </button>
              </form>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-2">
              <div className="card !p-8 sticky top-28 border-t-2 border-t-gold">
                <h3 className="text-xl font-heading text-navy font-semibold mb-6">
                  {t("officeTitle")}
                </h3>

                <div className="space-y-5">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 border border-border flex items-center justify-center shrink-0">
                      <MapPin className="w-5 h-5 text-gold" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold tracking-wider uppercase text-text mb-1">Address</p>
                      <p className="text-sm text-text-muted leading-relaxed">
                        {t("address")}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 border border-border flex items-center justify-center shrink-0">
                      <Phone className="w-5 h-5 text-gold" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold tracking-wider uppercase text-text mb-1">Phone</p>
                      <a
                        href="tel:+6622330055"
                        className="text-sm text-text-muted hover:text-navy transition-colors cursor-pointer"
                      >
                        {t("phone")}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 border border-border flex items-center justify-center shrink-0">
                      <Mail className="w-5 h-5 text-gold" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold tracking-wider uppercase text-text mb-1">Email</p>
                      <a
                        href="mailto:info@aseanattorneysalliance.com"
                        className="text-sm text-text-muted hover:text-navy transition-colors cursor-pointer"
                      >
                        {t("email")}
                      </a>
                    </div>
                  </div>
                </div>

                {/* Map embed */}
                <div className="mt-6 overflow-hidden border border-border">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3876.0!2d100.535!3d13.727!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTPCsDQzJzM3LjIiTiAxMDDCsDMyJzA2LjAiRQ!5e0!3m2!1sen!2sth!4v1"
                    width="100%"
                    height="200"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Office location"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

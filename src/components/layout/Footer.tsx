"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { Mail, Phone, MapPin } from "lucide-react";
import LanguageSwitcher from "./LanguageSwitcher";
import Logo from "./Logo";

export default function Footer() {
  const t = useTranslations("footer");
  const nav = useTranslations("nav");

  return (
    <footer className="bg-navy text-white">
      {/* Gradient gold line divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-gold to-transparent" />

      <div className="container-narrow section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Logo variant="light" className="h-9 w-auto mb-5" />
            <p className="text-white/50 text-sm leading-relaxed">
              {t("description")}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="label-text mb-6">
              {t("quickLinks")}
            </h4>
            <ul className="space-y-3">
              {["about", "memberFirms", "practiceAreas", "news", "join"].map((key) => (
                <li key={key}>
                  <Link
                    href={`/${key === "memberFirms" ? "member-firms" : key === "practiceAreas" ? "practice-areas" : key}`}
                    className="text-white/50 hover:text-gold text-sm transition-colors cursor-pointer link-underline"
                  >
                    {nav(key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="label-text mb-6">
              {t("contactUs")}
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 mt-0.5 text-gold shrink-0" />
                <span className="text-white/50 text-sm">{t("address")}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-gold shrink-0" />
                <a href="tel:+6622330055" className="text-white/50 hover:text-white text-sm transition-colors cursor-pointer">
                  {t("phone")}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-gold shrink-0" />
                <a href="mailto:info@aseanattorneysalliance.com" className="text-white/50 hover:text-white text-sm transition-colors cursor-pointer">
                  {t("email")}
                </a>
              </li>
            </ul>
          </div>

          {/* Language */}
          <div>
            <h4 className="label-text mb-6">
              {t("language")}
            </h4>
            <LanguageSwitcher />
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-16 pt-8 border-t border-white/10 text-center">
          <p className="text-white/30 text-xs tracking-wider uppercase">
            &copy; {new Date().getFullYear()} {t("copyright")}
          </p>
        </div>
      </div>
    </footer>
  );
}

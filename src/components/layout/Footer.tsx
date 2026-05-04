"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { Mail, Phone, MapPin } from "lucide-react";
import LanguageSwitcher from "./LanguageSwitcher";
import Logo from "./Logo";
import { countries } from "@/data/countries";
import { countryPins } from "@/data/country-coords";

export default function Footer() {
  const t = useTranslations("footer");
  const nav = useTranslations("nav");

  return (
    <footer className="bg-ink text-bone">
      {/* Top double rule */}
      <div className="h-[5px] border-t border-b border-bone/15" aria-hidden />

      {/* Colophon block */}
      <div className="container-wide pt-14 lg:pt-16 pb-10">
        <div className="grid grid-cols-12 gap-x-10 gap-y-12">
          {/* Brand block */}
          <div className="col-span-12 lg:col-span-4">
            <Logo variant="light" className="h-10 w-auto mb-6" />
            <p className="text-bone/65 text-sm leading-relaxed mb-8 max-w-md">
              {t("description")}
            </p>

            <div className="grid grid-cols-2 gap-4 max-w-sm pt-6 border-t border-bone/15">
              <div>
                <div className="font-display text-3xl text-bone num-mono">11</div>
                <div className="mt-1 font-mono text-[0.6rem] tracking-[0.22em] uppercase text-bone/40">
                  Jurisdictions
                </div>
              </div>
              <div>
                <div className="font-display text-3xl text-bone num-mono">16</div>
                <div className="mt-1 font-mono text-[0.6rem] tracking-[0.22em] uppercase text-bone/40">
                  Member Firms
                </div>
              </div>
            </div>
          </div>

          {/* Navigate */}
          <div className="col-span-6 lg:col-span-2">
            <h4 className="font-mono text-[0.6rem] tracking-[0.22em] uppercase text-vermillion mb-5">
              ¶ Navigate
            </h4>
            <ul className="space-y-3.5">
              {[
                { href: "/about", key: "about" },
                { href: "/member-firms", key: "memberFirms" },
                { href: "/practice-areas", key: "practiceAreas" },
                { href: "/business-guides", key: "businessGuides" },
                { href: "/news", key: "news" },
                { href: "/join", key: "join" },
                { href: "/contact", key: "contact" },
              ].map(({ href, key }) => (
                <li key={key}>
                  <Link
                    href={href}
                    className="text-bone/60 hover:text-bone text-sm transition-colors cursor-pointer link-underline"
                  >
                    {nav(key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Member-firm directory snippet */}
          <div className="col-span-6 lg:col-span-3">
            <h4 className="font-mono text-[0.6rem] tracking-[0.22em] uppercase text-vermillion mb-5">
              ¶ Jurisdictions
            </h4>
            <ul className="space-y-2.5">
              {countries.map((c) => {
                const pin = countryPins.find((p) => p.slug === c.slug);
                return (
                  <li key={c.slug}>
                    <Link
                      href={`/member-firms/${c.slug}`}
                      className="group flex items-baseline justify-between gap-3 text-sm"
                    >
                      <span className="flex items-baseline gap-2.5 text-bone/60 group-hover:text-bone transition-colors">
                        <span className="font-mono text-[0.6rem] tracking-[0.22em] uppercase text-bone/35 w-6">
                          {pin?.iso ?? c.isoCode}
                        </span>
                        {c.name}
                      </span>
                      <span className="font-mono text-[0.62rem] tracking-[0.22em] uppercase text-bone/35">
                        {c.firmCount}
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Secretariat & language */}
          <div className="col-span-12 lg:col-span-3">
            <h4 className="font-mono text-[0.6rem] tracking-[0.22em] uppercase text-vermillion mb-5">
              ¶ Secretariat
            </h4>
            <ul className="space-y-3.5 text-sm mb-8">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 mt-0.5 text-vermillion shrink-0" />
                <span className="text-bone/65 leading-relaxed">{t("address")}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-vermillion shrink-0" />
                <a
                  href="tel:+6622330055"
                  className="text-bone/65 hover:text-bone transition-colors cursor-pointer font-mono text-[0.8rem]"
                >
                  {t("phone")}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-vermillion shrink-0" />
                <a
                  href="mailto:info@aseanattorneysalliance.com"
                  className="text-bone/65 hover:text-bone transition-colors cursor-pointer text-sm break-all"
                >
                  {t("email")}
                </a>
              </li>
            </ul>

            <h4 className="font-mono text-[0.6rem] tracking-[0.22em] uppercase text-vermillion mb-3">
              ¶ Language
            </h4>
            <LanguageSwitcher />
          </div>
        </div>
      </div>

      {/* Colophon footer */}
      <div className="border-t border-bone/15">
        <div className="container-wide py-5 flex flex-col md:flex-row items-center justify-between gap-3 font-mono text-[0.62rem] tracking-[0.22em] uppercase text-bone/40">
          <span>© {new Date().getFullYear()} {t("copyright").toUpperCase()}</span>
          <span>VOL. IX · ISSUE 2026 · SET IN FRAUNCES &amp; INTER TIGHT</span>
          <span className="text-vermillion">A UNITY OF PROFICIENCY</span>
        </div>
      </div>
    </footer>
  );
}

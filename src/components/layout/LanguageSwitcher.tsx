"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/routing";
import { routing, localeNames } from "@/i18n/routing";
import { useState, useRef, useEffect } from "react";
import { ChevronDown, Globe } from "lucide-react";

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function switchLocale(newLocale: string) {
    router.replace(pathname, { locale: newLocale });
    setOpen(false);
  }

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 px-3 py-2 font-mono text-[0.6875rem] tracking-[0.18em] uppercase text-text-muted hover:text-ink transition-colors cursor-pointer"
        aria-label="Switch language"
      >
        <Globe className="w-3.5 h-3.5" />
        <span>{locale.toUpperCase()}</span>
        <span className="hidden sm:inline ml-0.5 text-text-light">— {localeNames[locale]}</span>
        <ChevronDown className={`w-3 h-3 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-48 bg-white border border-border shadow-lg py-1 z-50">
          {routing.locales.map((loc) => (
            <button
              key={loc}
              onClick={() => switchLocale(loc)}
              className={`w-full text-left px-4 py-2.5 text-sm cursor-pointer transition-colors ${
                loc === locale
                  ? "bg-surface text-navy font-semibold"
                  : "text-text-muted hover:bg-surface hover:text-navy"
              }`}
            >
              {localeNames[loc]}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

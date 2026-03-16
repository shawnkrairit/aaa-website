"use client";

import { Link } from "@/i18n/routing";
import { countries } from "@/data/countries";
import CountryFlag from "@/components/ui/CountryFlag";

export default function TrustBar() {
  // Duplicate the list so the marquee loops seamlessly
  const items = [...countries, ...countries];

  return (
    <section className="bg-surface-warm border-b border-border py-5 overflow-hidden">
      {/* Fade masks on left and right edges */}
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 z-10 bg-gradient-to-r from-surface-warm to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 z-10 bg-gradient-to-l from-surface-warm to-transparent" />

        {/* Scrolling track */}
        <div className="flex w-max animate-marquee">
          {items.map((country, i) => (
            <Link
              key={`${country.slug}-${i}`}
              href={`/member-firms/${country.slug}`}
              className="flex items-center gap-2.5 px-6 text-text-muted hover:text-navy transition-all duration-300 cursor-pointer group shrink-0"
            >
              <CountryFlag countryCode={country.isoCode} size="sm" />
              <span className="text-xs font-semibold tracking-wide whitespace-nowrap group-hover:text-navy transition-colors">
                {country.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

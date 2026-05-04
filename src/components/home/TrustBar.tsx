"use client";

import { Link } from "@/i18n/routing";
import { countries } from "@/data/countries";
import { countryPins } from "@/data/country-coords";

/**
 * "Capitals wire" — editorial ticker bar styled as a regional newswire,
 * mono caps with vertical hairline separators and a live pulse on the
 * leading item. Replaces the old flag marquee.
 */
export default function TrustBar() {
  const wire = countries.map((c) => {
    const pin = countryPins.find((p) => p.slug === c.slug);
    return {
      slug: c.slug,
      iso: pin?.iso ?? c.isoCode,
      capital: pin?.capital ?? c.capital,
      country: c.name,
      firmCount: c.firmCount,
    };
  });

  // Loop twice for seamless marquee
  const items = [...wire, ...wire];

  return (
    <section className="bg-ink text-bone border-y border-ink-line/40 overflow-hidden">
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 w-32 z-10 bg-gradient-to-r from-ink to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-32 z-10 bg-gradient-to-l from-ink to-transparent" />

        {/* Leading "live" badge */}
        <div className="pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 z-20 hidden md:flex items-center gap-2 pl-5 pr-4 bg-vermillion text-bone font-mono text-[0.65rem] tracking-[0.24em] uppercase">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-bone animate-pulse" />
          ALLIANCE WIRE
        </div>

        <div className="flex w-max animate-marquee py-4 md:pl-44">
          {items.map((c, i) => (
            <Link
              key={`${c.slug}-${i}`}
              href={`/member-firms/${c.slug}`}
              className="group flex items-baseline gap-4 px-7 shrink-0 border-r border-bone/15 last:border-r-0"
            >
              <span className="font-mono text-[0.65rem] tracking-[0.24em] uppercase text-bone/40 group-hover:text-vermillion transition-colors">
                {c.iso}
              </span>
              <span className="font-display text-base lg:text-lg text-bone group-hover:text-vermillion transition-colors whitespace-nowrap">
                {c.capital}
              </span>
              <span className="font-mono text-[0.65rem] tracking-[0.22em] uppercase text-bone/40 whitespace-nowrap">
                · {c.firmCount} {c.firmCount === 1 ? "firm" : "firms"}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

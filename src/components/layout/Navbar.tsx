"use client";

import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/routing";
import { useState, useEffect, useRef } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import LanguageSwitcher from "./LanguageSwitcher";
import Logo from "./Logo";

type NavItem =
  | { type: "link"; href: string; key: string }
  | {
      type: "dropdown";
      key: string;
      children: { href: string; key: string; desc: string }[];
    };

const navItems: NavItem[] = [
  { type: "link", href: "/about", key: "about" },
  {
    type: "dropdown",
    key: "ourNetwork",
    children: [
      { href: "/member-firms", key: "memberFirms", desc: "memberFirmsDesc" },
      { href: "/business-guides", key: "businessGuides", desc: "businessGuidesDesc" },
    ],
  },
  { type: "link", href: "/practice-areas", key: "practiceAreas" },
  { type: "link", href: "/news", key: "news" },
  { type: "link", href: "/join", key: "join" },
  { type: "link", href: "/contact", key: "contact" },
];

const linkCls = (active: boolean) =>
  `relative px-3.5 py-2 font-mono text-[0.6875rem] tracking-[0.18em] uppercase transition-colors cursor-pointer whitespace-nowrap ${
    active
      ? "text-ink after:absolute after:bottom-1 after:left-3.5 after:right-3.5 after:h-px after:bg-vermillion"
      : "text-text-muted hover:text-ink"
  }`;

/** Live "Bangkok mean time" — Alliance secretariat is in Bangkok */
function BangkokClock() {
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    const formatter = new Intl.DateTimeFormat("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      timeZone: "Asia/Bangkok",
    });
    const tick = () => setTime(formatter.format(new Date()));
    tick();
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, []);

  if (!time) return null;
  return (
    <span className="hidden xl:inline-flex items-center gap-2 font-mono text-[0.6875rem] tracking-[0.18em] uppercase text-text-light">
      <span className="inline-block w-1.5 h-1.5 rounded-full bg-vermillion animate-pulse" />
      BKK {time}
    </span>
  );
}

export default function Navbar() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-paper/95 backdrop-blur-md border-b border-bone-deep"
          : "bg-paper border-b border-bone-deep/60"
      }`}
    >
      {/* Thin double-rule above nav — looks like a printed masthead */}
      <div className="h-[5px] border-t border-b border-ink/15" aria-hidden />

      <nav className="container-wide flex items-center h-16 lg:h-[4.75rem] gap-4">
        <Link href="/" className="cursor-pointer shrink-0">
          <Logo variant="dark" className="h-9 lg:h-10 w-auto" />
        </Link>

        <div className="hidden lg:flex items-center justify-end flex-1 gap-0">
          {navItems.map((item) =>
            item.type === "link" ? (
              <Link
                key={item.key}
                href={item.href}
                className={linkCls(pathname.startsWith(item.href))}
              >
                {t(item.key)}
              </Link>
            ) : (
              <DesktopDropdown
                key={item.key}
                label={t(item.key)}
                active={item.children.some((c) => pathname.startsWith(c.href))}
                items={item.children.map((c) => ({
                  href: c.href,
                  label: t(c.key),
                  desc: t(c.desc),
                  active: pathname.startsWith(c.href),
                }))}
              />
            )
          )}
        </div>

        <div className="flex items-center shrink-0 ml-auto lg:ml-4 gap-3">
          <BangkokClock />
          <span className="hidden lg:block w-px h-5 bg-bone-deep" />
          <LanguageSwitcher />
          <Link
            href="/member-firms"
            className="hidden lg:inline-flex items-center gap-2 px-4 py-2 bg-ink text-bone font-mono text-[0.65rem] tracking-[0.2em] uppercase hover:bg-vermillion transition-colors duration-300 cursor-pointer relative"
          >
            <span>Find a Firm</span>
            <span aria-hidden>→</span>
          </Link>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 text-ink cursor-pointer"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="lg:hidden overflow-hidden border-t border-bone-deep bg-paper"
          >
            <div className="container-narrow py-4 space-y-1">
              {navItems.map((item) => {
                if (item.type === "link") {
                  const isActive = pathname.startsWith(item.href);
                  return (
                    <Link
                      key={item.key}
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className={`block px-4 py-3 font-mono text-xs tracking-[0.18em] uppercase transition-colors cursor-pointer ${
                        isActive
                          ? "text-ink bg-bone border-l-2 border-vermillion"
                          : "text-text-muted hover:text-ink hover:bg-bone"
                      }`}
                    >
                      {t(item.key)}
                    </Link>
                  );
                }
                return (
                  <MobileDropdown
                    key={item.key}
                    label={t(item.key)}
                    onNavigate={() => setMobileOpen(false)}
                  >
                    {item.children.map((c) => {
                      const isActive = pathname.startsWith(c.href);
                      return (
                        <Link
                          key={c.key}
                          href={c.href}
                          onClick={() => setMobileOpen(false)}
                          className={`block pl-8 pr-4 py-3 font-mono text-xs tracking-[0.18em] uppercase transition-colors cursor-pointer ${
                            isActive
                              ? "text-ink bg-bone border-l-2 border-vermillion"
                              : "text-text-muted hover:text-ink hover:bg-bone"
                          }`}
                        >
                          {t(c.key)}
                        </Link>
                      );
                    })}
                  </MobileDropdown>
                );
              })}

              <div className="pt-3 px-4">
                <Link
                  href="/member-firms"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-center gap-2 w-full py-3 bg-ink text-bone font-mono text-xs tracking-[0.2em] uppercase cursor-pointer"
                >
                  Find a Firm <span aria-hidden>→</span>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function DesktopDropdown({
  label,
  active,
  items,
}: {
  label: string;
  active: boolean;
  items: { href: string; label: string; desc: string; active: boolean }[];
}) {
  const [open, setOpen] = useState(false);
  const timeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const enter = () => {
    if (timeout.current) clearTimeout(timeout.current);
    setOpen(true);
  };
  const leave = () => {
    timeout.current = setTimeout(() => setOpen(false), 150);
  };

  return (
    <div className="relative" onMouseEnter={enter} onMouseLeave={leave}>
      <button
        className={`${linkCls(active)} inline-flex items-center gap-1`}
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        {label}
        <ChevronDown
          className={`w-3 h-3 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="absolute top-full left-1/2 -translate-x-1/2 pt-2 z-50"
          >
            <div className="bg-paper border border-ink/20 shadow-[0_18px_40px_rgba(14,21,24,0.12)] min-w-[280px]">
              {items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`block px-5 py-4 transition-colors cursor-pointer group border-b border-bone-deep last:border-0 ${
                    item.active
                      ? "bg-bone border-l-2 !border-l-vermillion"
                      : "hover:bg-bone border-l-2 border-l-transparent"
                  }`}
                >
                  <span
                    className={`block font-mono text-[0.7rem] tracking-[0.18em] uppercase ${
                      item.active ? "text-ink" : "text-text-muted group-hover:text-ink"
                    }`}
                  >
                    {item.label}
                  </span>
                  <span className="block text-[0.78rem] text-text-light mt-1 normal-case tracking-normal font-normal leading-snug">
                    {item.desc}
                  </span>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function MobileDropdown({
  label,
  children,
}: {
  label: string;
  onNavigate: () => void;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center justify-between w-full px-4 py-3 font-mono text-xs tracking-[0.18em] uppercase text-text-muted hover:text-ink hover:bg-bone transition-colors cursor-pointer"
      >
        {label}
        <ChevronDown
          className={`w-3.5 h-3.5 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="overflow-hidden"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

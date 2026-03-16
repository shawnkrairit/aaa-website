"use client";

import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/routing";
import { useState, useEffect, useRef } from "react";
import { Menu, X, Search, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import LanguageSwitcher from "./LanguageSwitcher";
import Logo from "./Logo";

/* ── Navigation structure ── */
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
      {
        href: "/business-guides",
        key: "businessGuides",
        desc: "businessGuidesDesc",
      },
    ],
  },
  { type: "link", href: "/practice-areas", key: "practiceAreas" },
  { type: "link", href: "/news", key: "news" },
  { type: "link", href: "/join", key: "join" },
  { type: "link", href: "/contact", key: "contact" },
];

/* ── Shared link style helper ── */
const linkCls = (active: boolean) =>
  `relative px-4 py-2 text-[0.6875rem] font-semibold tracking-[0.12em] uppercase transition-colors cursor-pointer whitespace-nowrap ${
    active
      ? "text-navy after:absolute after:bottom-0 after:left-4 after:right-4 after:h-[2px] after:bg-gold"
      : "text-text-muted hover:text-navy"
  }`;

export default function Navbar() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/98 backdrop-blur-md shadow-[0_1px_8px_rgba(10,22,40,0.06)] border-b border-transparent"
          : "bg-white backdrop-blur-sm border-b border-border"
      }`}
    >
      <nav className="max-w-[82rem] mx-auto px-6 flex items-center h-16 lg:h-[4.5rem]">
        {/* Logo */}
        <Link href="/" className="cursor-pointer shrink-0">
          <Logo variant="dark" className="h-8 lg:h-9 w-auto" />
        </Link>

        {/* Desktop Nav — centered in remaining space */}
        <div className="hidden lg:flex items-center justify-center flex-1">
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
                active={item.children.some((c) =>
                  pathname.startsWith(c.href)
                )}
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

        {/* Right side — divider + language + CTA */}
        <div className="flex items-center shrink-0 ml-auto lg:ml-0">
          <div className="hidden lg:block w-px h-6 bg-border mx-3" />
          <LanguageSwitcher />
          <Link
            href="/member-firms"
            className="hidden lg:inline-flex items-center gap-1.5 ml-3 px-5 py-2 bg-navy text-white font-semibold text-[0.65rem] tracking-[0.12em] uppercase hover:bg-gold transition-all duration-300 cursor-pointer"
          >
            <Search className="w-3.5 h-3.5" />
            Find a Firm
          </Link>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 ml-1 text-text-muted hover:text-navy cursor-pointer"
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="lg:hidden overflow-hidden border-t border-border bg-white"
          >
            <div className="container-narrow py-3 space-y-0.5">
              {navItems.map((item) => {
                if (item.type === "link") {
                  const isActive = pathname.startsWith(item.href);
                  return (
                    <Link
                      key={item.key}
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className={`block px-4 py-2.5 text-xs font-semibold tracking-[0.14em] uppercase transition-colors cursor-pointer ${
                        isActive
                          ? "text-navy bg-surface border-l-2 border-gold"
                          : "text-text-muted hover:text-navy hover:bg-surface"
                      }`}
                    >
                      {t(item.key)}
                    </Link>
                  );
                }

                /* Mobile dropdown — just show children inline with indent */
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
                          className={`block pl-8 pr-4 py-2.5 text-xs font-semibold tracking-[0.14em] uppercase transition-colors cursor-pointer ${
                            isActive
                              ? "text-navy bg-surface border-l-2 border-gold"
                              : "text-text-muted hover:text-navy hover:bg-surface"
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
                  className="flex items-center justify-center gap-2 w-full py-2.5 bg-navy text-white font-semibold text-xs tracking-[0.12em] uppercase cursor-pointer"
                >
                  <Search className="w-3.5 h-3.5" />
                  Find a Firm
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

/* ═══════════════════════════════════════════
   Desktop Dropdown
   ═══════════════════════════════════════════ */
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
    <div
      className="relative"
      onMouseEnter={enter}
      onMouseLeave={leave}
    >
      {/* Trigger */}
      <button
        className={`${linkCls(active)} inline-flex items-center gap-1`}
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        {label}
        <ChevronDown
          className={`w-3 h-3 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute top-full left-1/2 -translate-x-1/2 pt-2 z-50"
          >
            <div className="bg-white border border-border shadow-[0_12px_40px_rgba(10,22,40,0.1)] min-w-[260px]">
              {items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`block px-5 py-3.5 transition-colors cursor-pointer group ${
                    item.active
                      ? "bg-surface border-l-2 border-gold"
                      : "hover:bg-surface border-l-2 border-transparent hover:border-gold/50"
                  }`}
                >
                  <span
                    className={`block text-[0.7rem] font-semibold tracking-[0.1em] uppercase ${
                      item.active
                        ? "text-navy"
                        : "text-text-muted group-hover:text-navy"
                    }`}
                  >
                    {item.label}
                  </span>
                  <span className="block text-[0.7rem] text-text-light mt-0.5 normal-case tracking-normal font-normal">
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

/* ═══════════════════════════════════════════
   Mobile Dropdown (expand/collapse)
   ═══════════════════════════════════════════ */
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
        className="flex items-center justify-between w-full px-4 py-2.5 text-xs font-semibold tracking-[0.14em] uppercase text-text-muted hover:text-navy hover:bg-surface transition-colors cursor-pointer"
      >
        {label}
        <ChevronDown
          className={`w-3.5 h-3.5 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="overflow-hidden"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

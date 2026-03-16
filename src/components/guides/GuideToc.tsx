"use client";

import { useState, useEffect } from "react";
import { List } from "lucide-react";
import type { GuideSection } from "@/lib/guides";

interface GuideTocProps {
  toc: GuideSection[];
}

export default function GuideToc({ toc }: GuideTocProps) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: "-80px 0px -70% 0px", threshold: 0 }
    );

    // Observe all heading anchors
    const anchors = document.querySelectorAll("a[id]");
    anchors.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <nav className="lg:sticky lg:top-24 lg:max-h-[calc(100vh-8rem)] lg:overflow-y-auto">
      <div className="flex items-center gap-2 mb-4">
        <List className="w-4 h-4 text-gold" />
        <h3 className="text-xs font-semibold tracking-[0.15em] uppercase text-navy">
          Table of Contents
        </h3>
      </div>
      <ul className="space-y-0.5 border-l border-border">
        {toc.map((section) => (
          <li key={section.id}>
            <button
              onClick={() => scrollTo(section.id)}
              className={`block w-full text-left pl-4 pr-2 py-1.5 text-sm transition-colors cursor-pointer border-l-2 -ml-px ${
                activeId === section.id
                  ? "text-navy font-semibold border-gold"
                  : "text-text-muted hover:text-navy border-transparent"
              }`}
            >
              {section.title}
            </button>
            {section.children.length > 0 && (
              <ul className="ml-4">
                {section.children.map((child) => (
                  <li key={child.id}>
                    <button
                      onClick={() => scrollTo(child.id)}
                      className={`block w-full text-left pl-4 pr-2 py-1 text-xs transition-colors cursor-pointer border-l -ml-px ${
                        activeId === child.id
                          ? "text-navy font-medium border-gold"
                          : "text-text-light hover:text-text-muted border-transparent"
                      }`}
                    >
                      {child.title}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}

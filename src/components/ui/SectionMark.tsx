import type { ReactNode } from "react";

/**
 * Editorial chapter mark: §02 ── PRACTICE AREAS
 * Used at the top of every home section as a wayfinding device.
 */
export default function SectionMark({
  index,
  label,
  tone = "vermillion",
  className = "",
}: {
  index: string;
  label: string;
  tone?: "vermillion" | "bone";
  className?: string;
}) {
  const accentColor = tone === "bone" ? "rgba(244,239,230,0.6)" : "var(--color-vermillion)";
  const numColor = tone === "bone" ? "rgba(244,239,230,0.4)" : "var(--color-text-muted)";
  const labelColor = tone === "bone" ? "rgba(244,239,230,0.85)" : "var(--color-vermillion)";

  return (
    <div
      className={`inline-flex items-center gap-3 font-mono text-[0.6875rem] uppercase tracking-[0.22em] ${className}`}
    >
      <span style={{ color: numColor }}>§{index}</span>
      <span
        aria-hidden
        className="inline-block h-px w-6"
        style={{ background: accentColor }}
      />
      <span style={{ color: labelColor }}>{label}</span>
    </div>
  );
}

/** A pair of stacked rules (= sign / double underline) used as section dividers. */
export function DoubleRule({
  tone = "ink",
  className = "",
  children,
}: {
  tone?: "ink" | "bone";
  className?: string;
  children?: ReactNode;
}) {
  const c = tone === "bone" ? "rgba(244,239,230,0.35)" : "var(--color-ink-line)";
  return (
    <div
      className={`flex items-center gap-4 ${className}`}
      style={{ color: tone === "bone" ? "rgba(244,239,230,0.6)" : "var(--color-text-muted)" }}
    >
      <div className="flex-1 flex flex-col gap-1">
        <span className="block h-px" style={{ background: c }} />
        <span className="block h-px" style={{ background: c }} />
      </div>
      {children && (
        <span className="font-mono text-[0.6875rem] uppercase tracking-[0.22em]">
          {children}
        </span>
      )}
      <div className="flex-1 flex flex-col gap-1">
        <span className="block h-px" style={{ background: c }} />
        <span className="block h-px" style={{ background: c }} />
      </div>
    </div>
  );
}

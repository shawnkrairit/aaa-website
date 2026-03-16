"use client";

interface GuideContentProps {
  html: string;
}

/**
 * Renders pre-processed guide HTML content.
 * The HTML is generated at build time from trusted markdown files
 * stored in the project's data directory (not user-submitted content),
 * so it is safe to render directly.
 */
export default function GuideContent({ html }: GuideContentProps) {
  return (
    <article
      className="guide-prose"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

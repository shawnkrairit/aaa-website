import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const guidesDir = path.join(process.cwd(), "src/data/business-guides");

export interface GuideFrontmatter {
  title: string;
  jurisdiction: string;
  last_updated: string;
  author: string;
  disclaimer: string;
}

export interface GuideSection {
  id: string;
  title: string;
  level: number;
  children: GuideSection[];
}

export interface GuideData {
  slug: string;
  frontmatter: GuideFrontmatter;
  contentHtml: string;
  toc: GuideSection[];
}

export interface GuideSummary {
  slug: string;
  frontmatter: GuideFrontmatter;
  excerpt: string;
}

/** Extract a table-of-contents tree from the raw markdown */
function extractToc(markdown: string): GuideSection[] {
  const lines = markdown.split("\n");
  const headings: { level: number; title: string; id: string }[] = [];

  for (const line of lines) {
    const match = line.match(/^(#{1,3})\s+(.+)/);
    if (match) {
      const level = match[1].length;
      const title = match[2]
        .replace(/\*\*/g, "")
        .replace(/\*/g, "")
        .trim();
      // Only include h2 and h3 — skip h1 (page title)
      if (level >= 2) {
        const id = title
          .toLowerCase()
          .replace(/[^a-z0-9\s-]/g, "")
          .replace(/\s+/g, "-")
          .replace(/-+/g, "-")
          .slice(0, 60);
        headings.push({ level, title, id });
      }
    }
  }

  // Build a nested tree from flat headings
  const root: GuideSection[] = [];
  let currentH2: GuideSection | null = null;

  for (const h of headings) {
    if (h.level === 2) {
      currentH2 = { id: h.id, title: h.title, level: h.level, children: [] };
      root.push(currentH2);
    } else if (h.level === 3 && currentH2) {
      currentH2.children.push({
        id: h.id,
        title: h.title,
        level: h.level,
        children: [],
      });
    }
  }

  return root;
}

/** Get full guide data for a single country */
export async function getGuide(slug: string): Promise<GuideData | null> {
  const filePath = path.join(guidesDir, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  const frontmatter = data as GuideFrontmatter;

  // Add IDs to headings in the markdown before converting to HTML
  let processedContent = content;
  processedContent = processedContent.replace(
    /^(#{2,3})\s+(.+)/gm,
    (_match, hashes: string, title: string) => {
      const cleanTitle = title.replace(/\*\*/g, "").replace(/\*/g, "").trim();
      const id = cleanTitle
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .slice(0, 60);
      return `${hashes} <a id="${id}"></a>${title}`;
    }
  );

  const result = await remark()
    .use(html, { sanitize: false })
    .process(processedContent);

  const toc = extractToc(content);

  return {
    slug,
    frontmatter,
    contentHtml: result.toString(),
    toc,
  };
}

/** Get all guide summaries (for the landing page) */
export function getAllGuideSummaries(): GuideSummary[] {
  const files = fs.readdirSync(guidesDir).filter((f) => f.endsWith(".md"));

  return files.map((filename) => {
    const slug = filename.replace(/\.md$/, "");
    const raw = fs.readFileSync(path.join(guidesDir, filename), "utf-8");
    const { data, content } = matter(raw);
    const frontmatter = data as GuideFrontmatter;

    // Extract first meaningful paragraph as excerpt
    const lines = content.split("\n");
    let excerpt = "";
    for (const line of lines) {
      const trimmed = line.trim();
      if (
        trimmed &&
        !trimmed.startsWith("#") &&
        !trimmed.startsWith("---") &&
        trimmed.length > 50
      ) {
        excerpt = trimmed.slice(0, 200);
        if (trimmed.length > 200) excerpt += "...";
        break;
      }
    }

    return { slug, frontmatter, excerpt };
  });
}

/** Get all guide slugs (for static generation) */
export function getAllGuideSlugs(): string[] {
  return fs
    .readdirSync(guidesDir)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""));
}

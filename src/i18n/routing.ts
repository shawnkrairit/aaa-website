import { defineRouting } from "next-intl/routing";
import { createNavigation } from "next-intl/navigation";

export const routing = defineRouting({
  locales: ["en", "th", "ms", "id", "vi", "km", "lo", "my", "tl", "zh"],
  defaultLocale: "en",
  // Static export (GitHub Pages) cannot run middleware, so every URL must
  // include its locale prefix. The root /index.html redirects to /en/.
  localePrefix: "always",
});

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);

export const localeNames: Record<string, string> = {
  en: "English",
  th: "ไทย",
  ms: "Bahasa Melayu",
  id: "Bahasa Indonesia",
  vi: "Tiếng Việt",
  km: "ភាសាខ្មែរ",
  lo: "ພາສາລາວ",
  my: "မြန်မာ",
  tl: "Filipino",
  zh: "中文",
};

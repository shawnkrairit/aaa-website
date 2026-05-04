import { setRequestLocale } from "next-intl/server";
import Hero from "@/components/home/Hero";
import TrustBar from "@/components/home/TrustBar";
import AboutPreview from "@/components/home/AboutPreview";
import WhyAAA from "@/components/home/WhyAAA";
import ASEANMap from "@/components/home/ASEANMap";
import PracticeAreasPreview from "@/components/home/PracticeAreasPreview";
import LatestNews from "@/components/home/LatestNews";
import CTASection from "@/components/home/CTASection";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <>
      <Hero />
      <TrustBar />
      <AboutPreview />
      <WhyAAA />
      <ASEANMap />
      <PracticeAreasPreview />
      <LatestNews />
      <CTASection />
    </>
  );
}

import type { Metadata } from "next";
import { Lato } from "next/font/google";
import "./globals.css";

const lato = Lato({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  variable: "--font-lato",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "ASEAN Attorneys Alliance | Trusted Legal Network Across Southeast Asia",
    template: "%s | ASEAN Attorneys Alliance",
  },
  description:
    "The ASEAN Attorneys Alliance is a premier network of leading independent law firms across all 11 ASEAN member states, providing trusted cross-border legal services throughout Southeast Asia.",
  keywords: [
    "ASEAN law firms",
    "Southeast Asia legal network",
    "cross-border legal services",
    "ASEAN attorneys",
    "international law network",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

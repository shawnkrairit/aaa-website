"use client";

import { BN, KH, ID, LA, MY, MM, PH, SG, TH, TL, VN } from "country-flag-icons/react/3x2";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const flagComponents: Record<string, React.ComponentType<any>> = {
  BN, KH, ID, LA, MY, MM, PH, SG, TH, TL, VN,
};

const sizeMap = {
  sm: "w-6 h-4",
  md: "w-10 h-7",
  lg: "w-16 h-11",
} as const;

export default function CountryFlag({
  countryCode,
  size = "md",
  className = "",
}: {
  countryCode: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const Flag = flagComponents[countryCode];
  if (!Flag) return null;

  return (
    <span
      className={`inline-block overflow-hidden rounded-sm shadow-sm ${sizeMap[size]} ${className}`}
    >
      <Flag className="w-full h-full" title={countryCode} />
    </span>
  );
}

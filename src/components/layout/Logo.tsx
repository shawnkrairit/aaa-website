export default function Logo({
  variant = "dark",
  className = "",
}: {
  variant?: "dark" | "light";
  className?: string;
}) {
  const textColor = variant === "dark" ? "#0A1628" : "#FFFFFF";
  const taglineColor = variant === "dark" ? "#64748B" : "rgba(255,255,255,0.5)";

  return (
    <svg
      viewBox="0 0 280 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="ASEAN Attorneys Alliance"
    >
      {/* Stylized A mark */}
      <path
        d="M2 36L18 4L34 36H28L18 12L8 36H2Z"
        fill={textColor}
      />
      <line x1="8" y1="26" x2="28" y2="26" stroke={textColor} strokeWidth="2.5" />

      {/* SEAN ATTORNEYS ALLIANCE */}
      <text
        x="42"
        y="18"
        fontFamily="'Montserrat', 'Helvetica Neue', sans-serif"
        fontSize="13"
        fontWeight="700"
        letterSpacing="0.15em"
        fill={textColor}
      >
        SEAN ATTORNEYS ALLIANCE
      </text>

      {/* Tagline */}
      <text
        x="42"
        y="33"
        fontFamily="'Montserrat', 'Helvetica Neue', sans-serif"
        fontSize="8"
        fontWeight="500"
        letterSpacing="0.2em"
        fill={taglineColor}
      >
        A UNITY OF PROFICIENCY
      </text>
    </svg>
  );
}

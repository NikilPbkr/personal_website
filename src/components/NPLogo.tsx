/**
 * Combined N+P logo: P attaches to the right stem of the N.
 * Minimal, single-weight, geometric.
 */
interface NPLogoProps {
  className?: string;
  size?: number;
}

const NPLogo = ({ className = "", size = 32 }: NPLogoProps) => {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="square"
      strokeLinejoin="miter"
    >
      {/* N: left vertical */}
      <line x1={4} y1={4} x2={4} y2={20} />
      {/* N: diagonal */}
      <line x1={4} y1={4} x2={13} y2={20} />
      {/* Shared stem + P bowl (single path for cleaner join) */}
      <path d="M 13 4 L 13 20 M 13 4 C 18 4 20 8 20 12 C 20 15 18 16 13 16" />
    </svg>
  );
};

export default NPLogo;

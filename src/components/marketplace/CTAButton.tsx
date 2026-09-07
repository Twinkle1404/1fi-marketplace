interface CTAButtonProps {
  label: string;
  onClick: () => void;
  disabled?: boolean;
}

export default function CTAButton({ label, onClick, disabled = false }: CTAButtonProps) {
  // Strip any trailing arrow text from label since we render the SVG arrow
  const displayLabel = label.replace(/\s*→\s*$/, '');

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className="proceed-btn"
      style={disabled ? { opacity: 0.6, cursor: 'not-allowed', background: '#9CA3AF' } : undefined}
    >
      <span>{displayLabel}</span>
      {!disabled && (
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      )}
    </button>
  );
}

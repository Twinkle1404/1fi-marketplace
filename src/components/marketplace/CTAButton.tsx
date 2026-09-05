interface CTAButtonProps {
  label: string;
  onClick: () => void;
  disabled?: boolean;
}

export default function CTAButton({ label, onClick, disabled = false }: CTAButtonProps) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className="w-full rounded-[var(--radius-pill)] py-3.5 px-6 text-[15px] font-semibold text-white shadow-md transition-all duration-200 active:scale-[0.99] disabled:cursor-not-allowed disabled:shadow-none disabled:active:scale-100"
      style={{
        backgroundColor: disabled ? 'var(--color-primary-disabled)' : 'var(--color-primary)',
      }}
    >
      {label}
    </button>
  );
}

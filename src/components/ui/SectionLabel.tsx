interface SectionLabelProps {
  /** Optional element ID for aria-labelledby associations */
  id?: string;
  /** Primary label / title of the section */
  title: string;
  /** Optional active/selected value displayed on the right */
  activeValue?: string | null;
  /** Semantic HTML tag to render for the title (defaults to h2) */
  as?: 'h2' | 'h3' | 'span' | 'p';
  /** Additional container classes */
  className?: string;
}

export default function SectionLabel({
  id,
  title,
  activeValue,
  as: Component = 'h2',
  className = '',
}: SectionLabelProps) {
  return (
    <div className={`flex items-center justify-between gap-2 ${className}`}>
      <Component
        id={id}
        className="text-[11px] font-semibold uppercase tracking-[0.08em]"
        style={{ color: 'var(--color-text-secondary)' }}
      >
        {title}
      </Component>

      {activeValue && (
        <span
          className="text-[11px] font-medium"
          style={{ color: 'var(--color-primary)' }}
        >
          {activeValue}
        </span>
      )}
    </div>
  );
}

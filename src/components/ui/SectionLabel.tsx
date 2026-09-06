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
      <div className="flex items-center gap-2">
        <span
          className="h-3.5 w-1 rounded-full shrink-0"
          style={{ backgroundColor: 'var(--color-primary)' }}
          aria-hidden="true"
        />
        <Component
          id={id}
          className="text-[12px] sm:text-[13px] font-bold uppercase tracking-[0.05em]"
          style={{ color: 'var(--color-text-secondary)' }}
        >
          {title}
        </Component>
      </div>

      {activeValue && (
        <span
          className="text-[12px] sm:text-[13px] font-bold shrink-0"
          style={{ color: 'var(--color-primary)' }}
        >
          {activeValue}
        </span>
      )}
    </div>
  );
}

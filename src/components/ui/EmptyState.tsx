import type { ReactNode } from 'react';

interface EmptyStateProps {
  title: string;
  description: string;
  icon?: ReactNode;
  action?: ReactNode;
}

export default function EmptyState({ title, description, icon, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center py-12 text-center">
      {icon && (
        <div
          className="mb-5 flex h-16 w-16 items-center justify-center rounded-[var(--radius-md)]"
          style={{ backgroundColor: 'var(--color-primary-light)' }}
        >
          {icon}
        </div>
      )}

      <h3
        className="text-[18px] font-semibold"
        style={{ color: 'var(--color-text-primary)' }}
      >
        {title}
      </h3>

      <p
        className="mt-2 max-w-[260px] text-[14px] leading-relaxed"
        style={{ color: 'var(--color-text-secondary)' }}
      >
        {description}
      </p>

      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}

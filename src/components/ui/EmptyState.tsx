import type { ReactNode } from 'react';

interface EmptyStateProps {
  title: string;
  description: string;
  icon?: ReactNode;
  action?: ReactNode;
}

export default function EmptyState({ title, description, icon, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center py-14 text-center">
      {icon && (
        <div
          className="mb-5 flex h-16 w-16 items-center justify-center rounded-full"
          style={{ backgroundColor: 'var(--color-primary-light)' }}
        >
          {icon}
        </div>
      )}

      <h3
        className="text-[18px] font-bold"
        style={{ color: 'var(--color-text-primary)' }}
      >
        {title}
      </h3>

      <p
        className="mt-1.5 max-w-sm text-[14px] leading-relaxed"
        style={{ color: 'var(--color-text-secondary)' }}
      >
        {description}
      </p>

      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}

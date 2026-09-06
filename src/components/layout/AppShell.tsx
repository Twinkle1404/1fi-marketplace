import type { ReactNode } from 'react';

interface AppShellProps {
  children: ReactNode;
}

export default function AppShell({ children }: AppShellProps) {
  return (
    <div
      className="flex min-h-dvh flex-col"
      style={{ backgroundColor: 'var(--color-bg-subtle)' }}
    >
      <main className="flex-1 w-full pb-28 md:pb-16">
        {children}
      </main>
    </div>
  );
}

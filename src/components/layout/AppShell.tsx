import type { ReactNode } from 'react';

interface AppShellProps {
  children: ReactNode;
}

export default function AppShell({ children }: AppShellProps) {
  return (
    <div
      className="flex min-h-dvh flex-col items-center justify-start w-full"
      style={{ backgroundColor: 'var(--color-bg-subtle)' }}
    >
      <div className="w-full max-w-[440px] min-h-dvh flex flex-col bg-[var(--color-bg-subtle)] shadow-[0_0_50px_rgba(0,0,0,0.03)] sm:border-x sm:border-gray-200/60">
        <main className="flex-1 w-full pb-24">
          {children}
        </main>
      </div>
    </div>
  );
}

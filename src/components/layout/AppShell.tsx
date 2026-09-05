import type { ReactNode } from 'react';

interface AppShellProps {
  children: ReactNode;
}

export default function AppShell({ children }: AppShellProps) {
  return (
    <div className="flex min-h-dvh flex-col items-center bg-[var(--color-bg)]">
      <div className="flex w-full max-w-[430px] flex-1 flex-col">
        <main className="flex-1 pb-24">
          {children}
        </main>
      </div>
    </div>
  );
}

import type { ReactNode } from 'react';

interface AppShellProps {
  children: ReactNode;
}

export default function AppShell({ children }: AppShellProps) {
  return (
    <div className="phone">
      <main className="w-full">
        {children}
      </main>
    </div>
  );
}

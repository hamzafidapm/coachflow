'use client';

import { useState } from 'react';
import { Sidebar } from '@/components/sidebar';
import { Topbar } from '@/components/topbar';

export function AppShell({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex min-h-screen">
      <Sidebar collapsed={collapsed} onToggle={() => setCollapsed((v) => !v)} />
      <main className="flex-1 min-w-0 flex flex-col">
        <Topbar onToggleSidebar={() => setCollapsed((v) => !v)} />
        <div className="flex-1 p-7">
          <div className="max-w-[1280px] mx-auto">{children}</div>
        </div>
      </main>
    </div>
  );
}

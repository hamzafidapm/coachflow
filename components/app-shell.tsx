'use client';

import { useState } from 'react';
import { Sidebar } from '@/components/sidebar';
import { Topbar } from '@/components/topbar';

export function AppShell({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  function toggleSidebar() {
    setCollapsed((v) => !v);
    setMobileOpen((v) => !v);
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar
        collapsed={collapsed}
        mobileOpen={mobileOpen}
        onToggle={toggleSidebar}
        onCloseMobile={() => setMobileOpen(false)}
      />
      <main className="flex-1 min-w-0 flex flex-col">
        <Topbar onToggleSidebar={toggleSidebar} />
        <div className="flex-1 p-4 sm:p-7">
          <div className="max-w-[1280px] mx-auto">{children}</div>
        </div>
      </main>
    </div>
  );
}

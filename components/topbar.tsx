'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { Icon } from '@/components/icon';
import { GlobalSearch } from '@/components/global-search';
import { NotificationsBell } from '@/components/notifications-bell';

const titles: Record<string, [string, string]> = {
  '/dashboard': ['Dashboard', "Tuesday, 11 August · here's where the business stands"],
  '/clients': ['Clients', '248 people across 4 programs'],
  '/courses': ['Courses', '6 IT programs · 2,600 enrollments'],
  '/calendar': ['Calendar', '12 sessions booked this week'],
  '/payments': ['Payments', 'Stripe connected · payouts every Friday'],
  '/settings': ['Settings', 'Workspace, branding and integrations'],
};

function screenTitleFor(pathname: string): [string, string] {
  if (pathname.startsWith('/courses/')) return ['Lesson player', 'Streaming inside CoachFlow'];
  const key = Object.keys(titles).find((k) => pathname.startsWith(k));
  return key ? titles[key] : titles['/dashboard'];
}

const profileMenu = [
  { icon: 'person', label: 'Your profile' },
  { icon: 'tune', label: 'Workspace settings' },
  { icon: 'logout', label: 'Sign out' },
];

export function Topbar({ onToggleSidebar }: { onToggleSidebar: () => void }) {
  const pathname = usePathname();
  const [profileOpen, setProfileOpen] = useState(false);
  const [title, sub] = screenTitleFor(pathname ?? '/dashboard');

  return (
    <header className="sticky top-0 z-30 flex items-center gap-2.5 sm:gap-[18px] h-[66px] px-3 sm:px-7 bg-bg/80 backdrop-blur-md border-b border-border-hair">
      <button
        type="button"
        onClick={onToggleSidebar}
        className="w-11 h-11 flex-none flex items-center justify-center border border-border-strong rounded-[10px] bg-surface text-text-muted transition-colors hover:bg-[#191C20] hover:text-text"
      >
        <Icon name="menu" className="text-xl" />
      </button>

      <div className="min-w-0 hidden sm:block">
        <div className="text-[15px] font-bold whitespace-nowrap overflow-hidden text-ellipsis">{title}</div>
        <div className="text-xs text-text-faint whitespace-nowrap overflow-hidden text-ellipsis">{sub}</div>
      </div>

      <GlobalSearch />

      <NotificationsBell />

      <div className="relative">
        <button
          type="button"
          onClick={() => setProfileOpen((v) => !v)}
          className="flex items-center gap-2 h-11 pl-1 pr-2 border border-border-strong rounded-[11px] bg-surface text-text transition-colors hover:bg-[#191C20]"
        >
          <span className="w-7 h-7 rounded-lg bg-accent/[.16] text-accent flex items-center justify-center text-xs font-bold">
            MC
          </span>
          <Icon name="expand_more" className="text-lg text-text-faint" />
        </button>
        <AnimatePresence>
          {profileOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: -4 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: -4 }}
              transition={{ duration: 0.16, ease: [0.4, 0, 0.2, 1] }}
              className="absolute right-0 top-[52px] w-[212px] p-1.5 bg-surface-panel border border-border-strong rounded-2xl shadow-[0_24px_60px_rgba(0,0,0,.55)]"
            >
              <div className="px-2.5 pt-2 pb-3 border-b border-border-hair">
                <div className="text-[13px] font-bold">Maya Chen</div>
                <div className="text-xs text-text-faint">maya@studio.co</div>
              </div>
              {profileMenu.map((m) => (
                <button
                  key={m.label}
                  type="button"
                  onClick={() => setProfileOpen(false)}
                  className="flex items-center gap-2.5 w-full h-9 px-2.5 mt-0.5 rounded-[9px] bg-transparent text-[#C6CBD2] text-[13px] text-left transition-colors hover:bg-[#1B1E22] hover:text-text"
                >
                  <Icon name={m.icon} className="text-lg" />
                  {m.label}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}

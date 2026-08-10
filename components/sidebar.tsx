'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { Icon } from '@/components/icon';

const navDefs = [
  { href: '/dashboard', label: 'Dashboard', icon: 'space_dashboard' },
  { href: '/clients', label: 'Clients', icon: 'group' },
  { href: '/courses', label: 'Courses', icon: 'school' },
  { href: '/calendar', label: 'Calendar', icon: 'calendar_month' },
  { href: '/payments', label: 'Payments', icon: 'payments' },
  { href: '/settings', label: 'Settings', icon: 'settings' },
];

export function Sidebar({ collapsed, onToggle }: { collapsed: boolean; onToggle: () => void }) {
  const pathname = usePathname();

  return (
    <motion.aside
      animate={{ width: collapsed ? 78 : 244 }}
      transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
      className="flex-none bg-surface-raised border-r border-border-hair flex flex-col p-3.5 gap-6 sticky top-0 h-screen overflow-hidden"
    >
      <div className="flex items-center gap-2.5 px-1.5 h-8">
        <div className="w-[30px] h-[30px] flex-none rounded-[9px] bg-accent flex items-center justify-center text-accent-ink font-extrabold text-[15px]">
          C
        </div>
        {!collapsed && <div className="font-bold text-base tracking-tight whitespace-nowrap">CoachFlow</div>}
      </div>

      <nav className="flex flex-col gap-1">
        {navDefs.map((item) => {
          const active = pathname?.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              title={item.label}
              className="group flex items-center gap-3 h-[42px] px-3 rounded-[11px] text-sm whitespace-nowrap overflow-hidden transition-colors duration-200"
              style={{
                background: active ? 'rgba(47,216,166,.12)' : 'transparent',
                color: active ? '#2FD8A6' : '#8A9099',
                fontWeight: active ? 700 : 500,
              }}
            >
              <Icon
                name={item.icon}
                className="text-[21px] flex-none transition-transform duration-200 group-hover:scale-[1.12]"
              />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto flex flex-col gap-2.5">
        {!collapsed && (
          <div
            className="p-3.5 rounded-2xl border"
            style={{
              background: 'linear-gradient(160deg,rgba(47,216,166,.14),rgba(47,216,166,.03))',
              borderColor: 'rgba(47,216,166,.22)',
            }}
          >
            <div className="text-[13px] font-bold">Pro trial · 6 days left</div>
            <div className="mt-1 text-xs leading-relaxed text-text-muted">
              Unlock unlimited cohorts and custom branding.
            </div>
            <button
              type="button"
              className="mt-3 w-full h-[34px] rounded-[9px] bg-accent text-accent-ink text-[12.5px] font-bold transition-colors hover:bg-accent-hover"
            >
              Upgrade
            </button>
          </div>
        )}
        <button
          type="button"
          onClick={onToggle}
          className="flex items-center gap-3 h-10 px-3 rounded-[11px] bg-transparent text-text-faint text-[13px] transition-colors hover:bg-[#16191D] hover:text-text"
        >
          <Icon name={collapsed ? 'chevron_right' : 'chevron_left'} className="text-xl" />
          {!collapsed && <span className="whitespace-nowrap">Collapse</span>}
        </button>
      </div>
    </motion.aside>
  );
}

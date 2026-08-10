'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { Icon } from '@/components/icon';

const navDefs = [
  { href: '/dashboard', label: 'Dashboard', icon: 'space_dashboard' },
  { href: '/clients', label: 'Clients', icon: 'group' },
  { href: '/courses', label: 'Courses', icon: 'school' },
  { href: '/calendar', label: 'Calendar', icon: 'calendar_month' },
  { href: '/payments', label: 'Payments', icon: 'payments' },
  { href: '/settings', label: 'Settings', icon: 'settings' },
];

function NavList({ collapsed, onNavigate }: { collapsed: boolean; onNavigate?: () => void }) {
  const pathname = usePathname();
  return (
    <nav className="flex flex-col gap-1">
      {navDefs.map((item) => {
        const active = pathname?.startsWith(item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            title={item.label}
            onClick={onNavigate}
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
  );
}

function UpgradeCard() {
  return (
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
  );
}

function Brand({ collapsed }: { collapsed: boolean }) {
  return (
    <div className="flex items-center gap-2.5 px-1.5 h-8">
      <div className="w-[30px] h-[30px] flex-none rounded-[9px] bg-accent flex items-center justify-center text-accent-ink font-extrabold text-[15px]">
        C
      </div>
      {!collapsed && <div className="font-bold text-base tracking-tight whitespace-nowrap">CoachFlow</div>}
    </div>
  );
}

export function Sidebar({
  collapsed,
  mobileOpen,
  onToggle,
  onCloseMobile,
}: {
  collapsed: boolean;
  mobileOpen: boolean;
  onToggle: () => void;
  onCloseMobile: () => void;
}) {
  return (
    <>
      {/* Desktop: in-flow, collapsible icon rail */}
      <motion.aside
        animate={{ width: collapsed ? 78 : 244 }}
        transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
        className="hidden lg:flex flex-none bg-surface-raised border-r border-border-hair flex-col p-3.5 gap-6 sticky top-0 h-screen overflow-hidden"
      >
        <Brand collapsed={collapsed} />
        <NavList collapsed={collapsed} />
        <div className="mt-auto flex flex-col gap-2.5">
          {!collapsed && <UpgradeCard />}
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

      {/* Mobile: off-canvas drawer, always full width when open */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
              onClick={onCloseMobile}
              className="lg:hidden fixed inset-0 z-40 bg-black/60"
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
              className="lg:hidden fixed inset-y-0 left-0 z-50 w-[248px] bg-surface-raised border-r border-border-hair flex flex-col p-3.5 gap-6"
            >
              <div className="flex items-center justify-between">
                <Brand collapsed={false} />
                <button
                  type="button"
                  onClick={onCloseMobile}
                  className="w-11 h-11 flex-none flex items-center justify-center rounded-lg bg-[#191C20] text-[#8A9099]"
                >
                  <Icon name="close" className="text-lg" />
                </button>
              </div>
              <NavList collapsed={false} onNavigate={onCloseMobile} />
              <div className="mt-auto">
                <UpgradeCard />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Icon } from '@/components/icon';
import { getRecentNotifications, type NotificationItem } from '@/lib/actions/notifications';

export function NotificationsBell() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState<NotificationItem[] | null>(null);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, []);

  async function toggle() {
    const next = !open;
    setOpen(next);
    if (next && items === null) {
      setLoading(true);
      try {
        setItems(await getRecentNotifications());
      } catch {
        setItems([]);
      } finally {
        setLoading(false);
      }
    }
  }

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={toggle}
        className="relative w-11 h-11 flex-none flex items-center justify-center border border-border-strong rounded-[11px] bg-surface text-text-muted transition-colors hover:bg-[#191C20] hover:text-text"
      >
        <Icon name="notifications" className="text-xl" />
        {items === null || items.length > 0 ? (
          <span className="absolute top-2 right-[9px] w-[7px] h-[7px] rounded-full bg-accent ring-2 ring-surface" />
        ) : null}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -4 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -4 }}
            transition={{ duration: 0.16, ease: [0.4, 0, 0.2, 1] }}
            className="absolute right-0 top-[52px] w-[300px] p-1.5 bg-surface-panel border border-border-strong rounded-2xl shadow-[0_24px_60px_rgba(0,0,0,.55)] z-40"
          >
            <div className="px-2.5 pt-2 pb-2.5 border-b border-border-hair text-[13px] font-bold">
              Notifications
            </div>
            <div className="max-h-[360px] overflow-auto py-1">
              {loading && <div className="py-6 text-center text-[13px] text-text-faint">Loading…</div>}
              {!loading && items?.length === 0 && (
                <div className="py-6 text-center text-[13px] text-text-faint">You're all caught up.</div>
              )}
              {!loading &&
                items?.map((n, i) => (
                  <div key={i} className="flex gap-3 px-2.5 py-2.5 rounded-[10px] transition-colors hover:bg-[#1B1E22]">
                    <span
                      className="w-8 h-8 flex-none rounded-[9px] flex items-center justify-center"
                      style={{ background: n.tint, color: n.color }}
                    >
                      <Icon name={n.icon} className="text-base" />
                    </span>
                    <div className="min-w-0">
                      <div className="text-[13px] leading-snug text-[#DDE1E6]">{n.title}</div>
                      <div className="mt-0.5 text-[11.5px] text-text-dim">{n.time}</div>
                    </div>
                  </div>
                ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

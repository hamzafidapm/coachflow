'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Icon } from '@/components/icon';
import { tint, initials, type ClientView } from '@/lib/data/clients';

const tabs = ['Notes', 'Payments', 'Sessions'] as const;
type Tab = (typeof tabs)[number];

export function ClientDetailPanel({
  client,
  onClose,
  onBookSession,
}: {
  client: ClientView;
  onClose: () => void;
  onBookSession: () => void;
}) {
  const [tab, setTab] = useState<Tab>('Notes');
  const t = tint(client.name);
  const rows = client.detail[tab];

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
      className="bg-surface border border-border rounded-card overflow-hidden lg:sticky lg:top-[94px]"
    >
      <div className="p-5 border-b border-border-hair">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <span
              className="w-11 h-11 rounded-[13px] flex items-center justify-center text-[15px] font-bold"
              style={{ background: t.bg, color: t.ink }}
            >
              {initials(client.name)}
            </span>
            <div>
              <div className="text-[15px] font-bold">{client.name}</div>
              <div className="text-xs text-text-faint">{client.email}</div>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-[30px] h-[30px] flex items-center justify-center rounded-[9px] bg-[#191C20] text-[#8A9099] transition-colors hover:bg-[#22262B]"
          >
            <Icon name="close" className="text-lg" />
          </button>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-2.5">
          <div className="p-3 rounded-xl bg-[#0F1114] border border-border-hair">
            <div className="text-[11.5px] text-text-faint">Program progress</div>
            <div className="mt-1.5 text-[19px] font-bold">{client.progress}%</div>
          </div>
          <div className="p-3 rounded-xl bg-[#0F1114] border border-border-hair">
            <div className="text-[11.5px] text-text-faint">Lifetime value</div>
            <div className="mt-1.5 text-[19px] font-bold">{client.ltv}</div>
          </div>
        </div>
      </div>

      <div className="flex gap-0.5 p-2 px-3 border-b border-border-hair">
        {tabs.map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTab(t)}
            className="h-[30px] px-3 rounded-lg text-[12.5px] font-semibold transition-colors"
            style={{ background: tab === t ? '#1B1E22' : 'transparent', color: tab === t ? '#F2F4F7' : '#79808A' }}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="p-4 pb-5 flex flex-col gap-3 max-h-[420px] overflow-auto">
        {rows.length === 0 && (
          <div className="py-6 text-center text-[12.5px] text-text-faint">Nothing here yet.</div>
        )}
        {rows.map((r, i) => (
          <div key={i} className="flex gap-3 items-start p-3 rounded-xl bg-[#0F1114] border border-border-hair">
            <span className="w-7 h-7 flex-none rounded-[9px] bg-accent/[.12] text-accent flex items-center justify-center">
              <Icon name={r.icon} className="text-base" />
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex justify-between gap-2.5">
                <div className="text-[13px] font-semibold">{r.title}</div>
                <div className="text-[11.5px] text-text-dim whitespace-nowrap">{r.meta}</div>
              </div>
              <div className="mt-1 text-[12.5px] leading-relaxed text-text-muted">{r.body}</div>
            </div>
          </div>
        ))}
        <button
          type="button"
          onClick={onBookSession}
          className="h-10 rounded-control bg-accent text-accent-ink text-[13px] font-bold transition-colors hover:bg-accent-hover"
        >
          Book a session
        </button>
      </div>
    </motion.div>
  );
}

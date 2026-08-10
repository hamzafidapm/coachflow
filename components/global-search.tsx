'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { Icon } from '@/components/icon';
import { tint, initials } from '@/lib/avatar';
import { globalSearch, type SearchResults } from '@/lib/actions/search';

const statusStyle: Record<string, [string, string]> = {
  ACTIVE: ['rgba(47,216,166,.13)', '#2FD8A6'],
  TRIAL: ['rgba(84,150,255,.14)', '#7CB0FF'],
  PAUSED: ['rgba(240,180,60,.13)', '#E9B84C'],
  CHURNED: ['rgba(150,158,168,.12)', '#98A0AA'],
  SUCCEEDED: ['rgba(47,216,166,.13)', '#2FD8A6'],
  PENDING: ['rgba(240,180,60,.13)', '#E9B84C'],
  FAILED: ['rgba(255,110,110,.13)', '#FF8E8E'],
  REFUNDED: ['rgba(150,158,168,.12)', '#98A0AA'],
};

export function GlobalSearch() {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const requestId = useRef(0);

  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<SearchResults | null>(null);

  useEffect(() => {
    if (query.trim().length < 2) {
      setResults(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    const id = ++requestId.current;
    const t = setTimeout(async () => {
      const r = await globalSearch(query);
      if (id === requestId.current) {
        setResults(r);
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(t);
  }, [query]);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, []);

  function close() {
    setOpen(false);
    setQuery('');
    setResults(null);
  }

  function goToClient(id: string) {
    router.push(`/clients?client=${id}`);
    close();
  }

  function goToCourse(slug: string) {
    router.push(`/courses/${slug}`);
    close();
  }

  function goToPayments() {
    router.push('/payments');
    close();
  }

  const hasQuery = query.trim().length >= 2;
  const hasResults = !!results && (results.clients.length > 0 || results.courses.length > 0 || results.payments.length > 0);
  const showDropdown = open && hasQuery;

  return (
    <div ref={containerRef} className="relative flex-1 max-w-md ml-auto">
      <Icon
        name="search"
        className="absolute left-3 top-1/2 -translate-y-1/2 text-lg text-text-dim pointer-events-none"
      />
      <input
        type="text"
        placeholder="Search clients, courses, invoices…"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        onKeyDown={(e) => {
          if (e.key === 'Escape') close();
        }}
        className="w-full h-[38px] pl-[38px] pr-3 bg-surface border border-border-strong rounded-[11px] text-[13px] outline-none transition-shadow focus:border-accent focus:shadow-[0_0_0_3px_rgba(47,216,166,.12)]"
      />

      <AnimatePresence>
        {showDropdown && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98, y: -4 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: -4 }}
            transition={{ duration: 0.16, ease: [0.4, 0, 0.2, 1] }}
            className="absolute left-0 right-0 top-[46px] max-h-[420px] overflow-auto p-1.5 bg-surface-panel border border-border-strong rounded-2xl shadow-[0_24px_60px_rgba(0,0,0,.55)] z-40"
          >
            {loading && <div className="py-6 text-center text-[13px] text-text-faint">Searching…</div>}

            {!loading && !hasResults && (
              <div className="py-6 text-center text-[13px] text-text-faint">
                No results found for &ldquo;{query}&rdquo;
              </div>
            )}

            {!loading && results && results.clients.length > 0 && (
              <div className="mb-1">
                <div className="px-2.5 pt-2 pb-1 text-[11px] font-bold tracking-[.06em] uppercase text-text-dim">
                  Clients
                </div>
                {results.clients.map((c) => {
                  const t = tint(c.name);
                  const [statusBg, statusColor] = statusStyle[c.status] ?? statusStyle.TRIAL;
                  return (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => goToClient(c.id)}
                      className="flex items-center gap-2.5 w-full px-2.5 py-2 rounded-[10px] text-left transition-colors hover:bg-[#1B1E22]"
                    >
                      <span
                        className="w-8 h-8 flex-none rounded-[9px] flex items-center justify-center text-[11.5px] font-bold"
                        style={{ background: t.bg, color: t.ink }}
                      >
                        {initials(c.name)}
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="text-[13px] font-semibold text-text whitespace-nowrap overflow-hidden text-ellipsis">
                          {c.name}
                        </div>
                        <div className="text-[11.5px] text-text-dim whitespace-nowrap overflow-hidden text-ellipsis">
                          {c.email}
                        </div>
                      </div>
                      <span
                        className="flex-none inline-flex items-center h-[22px] px-2 rounded-md text-[10.5px] font-bold"
                        style={{ background: statusBg, color: statusColor }}
                      >
                        {c.status.charAt(0) + c.status.slice(1).toLowerCase()}
                      </span>
                    </button>
                  );
                })}
              </div>
            )}

            {!loading && results && results.courses.length > 0 && (
              <div className="mb-1">
                <div className="px-2.5 pt-2 pb-1 text-[11px] font-bold tracking-[.06em] uppercase text-text-dim">
                  Courses
                </div>
                {results.courses.map((c) => (
                  <button
                    key={c.slug}
                    type="button"
                    onClick={() => goToCourse(c.slug)}
                    className="flex items-center gap-2.5 w-full px-2.5 py-2 rounded-[10px] text-left transition-colors hover:bg-[#1B1E22]"
                  >
                    <span className="w-8 h-8 flex-none rounded-[9px] bg-accent/[.12] text-accent flex items-center justify-center">
                      <Icon name="school" className="text-base" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="text-[13px] font-semibold text-text whitespace-nowrap overflow-hidden text-ellipsis">
                        {c.title}
                      </div>
                      <div className="text-[11.5px] text-text-dim whitespace-nowrap overflow-hidden text-ellipsis">
                        {c.category}
                      </div>
                    </div>
                    <Icon name="chevron_right" className="flex-none text-lg text-[#5E656E]" />
                  </button>
                ))}
              </div>
            )}

            {!loading && results && results.payments.length > 0 && (
              <div>
                <div className="px-2.5 pt-2 pb-1 text-[11px] font-bold tracking-[.06em] uppercase text-text-dim">
                  Invoices
                </div>
                {results.payments.map((p) => {
                  const [statusBg, statusColor] = statusStyle[p.status] ?? statusStyle.PENDING;
                  return (
                    <button
                      key={p.id}
                      type="button"
                      onClick={goToPayments}
                      className="flex items-center gap-2.5 w-full px-2.5 py-2 rounded-[10px] text-left transition-colors hover:bg-[#1B1E22]"
                    >
                      <span className="w-8 h-8 flex-none rounded-[9px] bg-accent/[.12] text-accent flex items-center justify-center">
                        <Icon name="receipt_long" className="text-base" />
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="text-[13px] font-semibold text-text whitespace-nowrap overflow-hidden text-ellipsis">
                          {p.name}
                        </div>
                        <div className="text-[11.5px] text-text-dim">
                          {p.amount} · {p.date}
                        </div>
                      </div>
                      <span
                        className="flex-none inline-flex items-center h-[22px] px-2 rounded-md text-[10.5px] font-bold"
                        style={{ background: statusBg, color: statusColor }}
                      >
                        {p.status.charAt(0) + p.status.slice(1).toLowerCase()}
                      </span>
                    </button>
                  );
                })}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

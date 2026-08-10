'use client';

import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Icon } from '@/components/icon';
import { ClientTable } from '@/components/client-table';
import { ClientDetailPanel } from '@/components/client-detail-panel';
import { Modal } from '@/components/modal';
import { useToast } from '@/components/toast';
import { type ClientStatus, type ClientView } from '@/lib/data/clients';
import { clientModalSpec, bookingModalSpec } from '@/lib/modal-specs';

const filterOptions: (ClientStatus | 'All')[] = ['All', 'Active', 'Trial', 'Paused', 'Churned'];
const PER_PAGE = 8;

export function ClientsView({ clients: allClients }: { clients: ClientView[] }) {
  const toast = useToast();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<(typeof filterOptions)[number]>('All');
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<string | null>(null);
  const [modal, setModal] = useState<'client' | 'booking' | null>(null);

  // Arriving from global search (?client=<id>) opens that client's detail panel directly.
  useEffect(() => {
    const clientId = searchParams.get('client');
    if (clientId) setSelected(clientId);
  }, [searchParams]);

  const filtered = useMemo(() => {
    return allClients
      .filter((c) => filter === 'All' || c.status === filter)
      .filter((c) => !query || (c.name + c.email).toLowerCase().includes(query.toLowerCase()));
  }, [allClients, filter, query]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const currentPage = Math.min(page, pageCount);
  const pageSlice = filtered.slice((currentPage - 1) * PER_PAGE, currentPage * PER_PAGE);
  const pageLabel = `${filtered.length ? (currentPage - 1) * PER_PAGE + 1 : 0}–${Math.min(
    currentPage * PER_PAGE,
    filtered.length,
  )} of ${filtered.length} clients`;

  const selectedClient = allClients.find((c) => c.id === selected) ?? null;

  const spec = modal === 'booking' ? bookingModalSpec : clientModalSpec;

  function submitModal() {
    const m = modal;
    setModal(null);
    if (m === 'client') toast('Invite sent', "They'll get portal access in a moment.");
    else if (m === 'booking') toast('Booking created', 'Calendar hold added and client notified.');
  }

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2.5">
        <div className="relative flex items-center flex-1 min-w-[220px] max-w-[340px]">
          <Icon name="search" className="absolute left-3 text-lg text-text-dim pointer-events-none" />
          <input
            type="text"
            placeholder="Search clients"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setPage(1);
            }}
            className="w-full h-10 pl-[38px] pr-3 bg-surface border border-border-strong rounded-control text-[13px] outline-none transition-shadow focus:border-accent focus:shadow-[0_0_0_3px_rgba(47,216,166,.12)]"
          />
        </div>
        <div className="flex gap-1 p-1 bg-surface-raised border border-border rounded-[11px]">
          {filterOptions.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => {
                setFilter(f);
                setPage(1);
                setSelected(null);
              }}
              className="h-[30px] px-3.5 rounded-lg text-[12.5px] font-semibold transition-colors"
              style={{ background: filter === f ? '#1B1E22' : 'transparent', color: filter === f ? '#F2F4F7' : '#79808A' }}
            >
              {f}
            </button>
          ))}
        </div>
        <div className="flex-1" />
        <button
          type="button"
          onClick={() => setModal('client')}
          className="flex items-center gap-2 h-10 px-4 rounded-control bg-accent text-accent-ink text-[13.5px] font-bold transition-all hover:bg-accent-hover hover:-translate-y-px"
        >
          <Icon name="add" className="text-[19px]" />
          Add client
        </button>
      </div>

      <div
        className="mt-4 grid gap-4 items-start"
        style={{ gridTemplateColumns: selectedClient ? '1fr' : 'minmax(0,1fr)' }}
      >
        <div className={selectedClient ? 'grid gap-4 items-start lg:grid-cols-[minmax(0,1.6fr)_380px]' : ''}>
          <ClientTable
            loading={false}
            clients={pageSlice}
            selected={selected}
            onSelect={(id) => setSelected(id)}
            pageLabel={pageLabel}
            onPrev={() => setPage((p) => Math.max(1, p - 1))}
            onNext={() => setPage((p) => Math.min(pageCount, p + 1))}
            onAddClient={() => setModal('client')}
            hasFilter={filter !== 'All' || query !== ''}
          />
          {selectedClient && (
            <ClientDetailPanel
              client={selectedClient}
              onClose={() => setSelected(null)}
              onBookSession={() => setModal('booking')}
            />
          )}
        </div>
      </div>

      <Modal
        open={modal !== null}
        title={spec.title}
        sub={spec.sub}
        cta={spec.cta}
        fields={spec.fields}
        onClose={() => setModal(null)}
        onSubmit={submitModal}
      />
    </div>
  );
}

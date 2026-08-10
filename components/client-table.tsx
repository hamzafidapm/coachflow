'use client';

import { Icon } from '@/components/icon';
import { useToast } from '@/components/toast';
import { tint, initials, statusStyle, type ClientView } from '@/lib/data/clients';

const ROW_COLUMNS = '2.1fr 1fr 1.1fr 1fr 40px';
const columns = [
  { label: 'Client', align: 'justify-start' },
  { label: 'Status', align: 'justify-start' },
  { label: 'Progress', align: 'justify-start' },
  { label: 'Last active', align: 'justify-start' },
  { label: '', align: 'justify-end' },
];

const skeletonWidths = ['160px', '120px', '190px', '140px', '170px', '130px'];

function Shimmer({ width, height = 11 }: { width: string; height?: number }) {
  return (
    <div
      className="rounded-md bg-[linear-gradient(90deg,#171A1E_25%,#20242A_50%,#171A1E_75%)] bg-[length:420px_100%] animate-cfShimmer"
      style={{ width, height }}
    />
  );
}

export function ClientTable({
  loading,
  clients,
  selected,
  onSelect,
  pageLabel,
  onPrev,
  onNext,
  onAddClient,
  hasFilter,
}: {
  loading: boolean;
  clients: ClientView[];
  selected: string | null;
  onSelect: (id: string) => void;
  pageLabel: string;
  onPrev: () => void;
  onNext: () => void;
  onAddClient: () => void;
  hasFilter: boolean;
}) {
  const toast = useToast();
  const empty = !loading && clients.length === 0;

  return (
    <div className="bg-surface border border-border rounded-card overflow-hidden">
      <div
        className="grid gap-3 px-[18px] h-[46px] items-center border-b border-border-hair bg-[#0F1114]"
        style={{ gridTemplateColumns: ROW_COLUMNS }}
      >
        {columns.map((c) => (
          <button
            key={c.label || 'actions'}
            type="button"
            onClick={() => c.label && toast('Sorted', `Table sorted by ${c.label}.`)}
            className={`flex items-center gap-1.5 text-[11.5px] font-bold tracking-[.06em] uppercase text-text-faint transition-colors hover:text-text ${c.align}`}
          >
            {c.label}
            {c.label === 'Client' && <Icon name="arrow_downward" className="text-sm" />}
          </button>
        ))}
      </div>

      {loading && (
        <div className="py-1.5">
          {skeletonWidths.map((w, i) => (
            <div
              key={i}
              className="grid gap-3 items-center px-[18px] h-[60px]"
              style={{ gridTemplateColumns: ROW_COLUMNS }}
            >
              <div className="flex items-center gap-3">
                <Shimmer width="34px" height={34} />
                <Shimmer width={w} />
              </div>
              <Shimmer width="64px" />
              <Shimmer width="88px" />
              <Shimmer width="70px" />
              <div />
            </div>
          ))}
        </div>
      )}

      {!loading && clients.length > 0 && (
        <div>
          {clients.map((c) => {
            const t = tint(c.name);
            const [statusBg, statusColor] = statusStyle(c.status);
            const active = selected === c.id;
            return (
              <div
                key={c.id}
                onClick={() => onSelect(c.id)}
                className="grid gap-3 items-center px-[18px] h-[62px] border-b border-[#191C20] cursor-pointer transition-colors hover:bg-[#16191D]"
                style={{ gridTemplateColumns: ROW_COLUMNS, background: active ? '#16191D' : 'transparent' }}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span
                    className="w-[34px] h-[34px] flex-none rounded-[10px] flex items-center justify-center text-[12.5px] font-bold"
                    style={{ background: t.bg, color: t.ink }}
                  >
                    {initials(c.name)}
                  </span>
                  <div className="min-w-0">
                    <div className="text-[13.5px] font-semibold whitespace-nowrap overflow-hidden text-ellipsis">
                      {c.name}
                    </div>
                    <div className="text-[11.5px] text-text-dim whitespace-nowrap overflow-hidden text-ellipsis">
                      {c.email}
                    </div>
                  </div>
                </div>
                <div>
                  <span
                    className="inline-flex items-center h-6 px-2.5 rounded-[7px] text-[11.5px] font-bold"
                    style={{ background: statusBg, color: statusColor }}
                  >
                    {c.status}
                  </span>
                </div>
                <div className="flex items-center gap-2.5">
                  <div className="flex-1 max-w-[88px] h-[5px] rounded bg-[#1E2126] overflow-hidden">
                    <div className="h-full rounded bg-accent" style={{ width: `${c.progress}%` }} />
                  </div>
                  <span className="font-mono text-[11.5px] text-text-muted">{c.progress}%</span>
                </div>
                <div className="text-[12.5px] text-text-muted">{c.lastActive}</div>
                <div className="flex justify-end text-[#5E656E]">
                  <Icon name="chevron_right" className="text-[19px]" />
                </div>
              </div>
            );
          })}
          <div className="flex items-center justify-between px-[18px] py-3.5">
            <div className="text-[12.5px] text-text-faint">{pageLabel}</div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={onPrev}
                className="h-8 px-3 border border-border-strong rounded-[9px] bg-[#15171A] text-[#C6CBD2] text-[12.5px] font-semibold transition-colors hover:bg-[#1B1E22]"
              >
                Previous
              </button>
              <button
                type="button"
                onClick={onNext}
                className="h-8 px-3 border border-border-strong rounded-[9px] bg-[#15171A] text-[#C6CBD2] text-[12.5px] font-semibold transition-colors hover:bg-[#1B1E22]"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}

      {empty && (
        <div className="flex flex-col items-center justify-center gap-3.5 py-[72px] px-6 text-center">
          <div className="w-14 h-14 rounded-2xl bg-[#15181C] border border-border-strong flex items-center justify-center text-[#5E656E]">
            <Icon name="group_off" className="text-[26px]" />
          </div>
          <div>
            <div className="text-[15px] font-bold">No clients here yet</div>
            <div className="mt-1.5 text-[13px] text-text-faint max-w-[320px] leading-relaxed">
              {hasFilter
                ? 'Nobody matches this filter. Invite your first client and their progress will show up here.'
                : 'Invite your first client and their progress will show up here.'}
            </div>
          </div>
          <button
            type="button"
            onClick={onAddClient}
            className="h-[38px] px-4 rounded-control bg-accent text-accent-ink text-[13px] font-bold transition-colors hover:bg-accent-hover"
          >
            Invite a client
          </button>
        </div>
      )}
    </div>
  );
}

'use client';

import { hours, dowLabels, fmtTime, type CalEvent } from '@/lib/data/calendar';

const ROW_HEIGHT = 56;
const START_HOUR = 8;

export function CalendarWeekView({
  events,
  onSelectEvent,
  todayIndex = 2,
  weekStartDate = 9,
}: {
  events: CalEvent[];
  onSelectEvent: (e: CalEvent) => void;
  todayIndex?: number;
  weekStartDate?: number;
}) {
  const columns = Array.from({ length: 7 }, (_, d) => events.filter((e) => e.day === d));

  return (
    <div className="min-w-[720px]">
      <div
        className="grid gap-1.5 pb-2.5 border-b border-border-hair"
        style={{ gridTemplateColumns: '52px repeat(7, 1fr)' }}
      >
        <div />
        {dowLabels.map((d, i) => (
          <div key={d} className="text-center">
            <div className="text-[11px] tracking-[.08em] text-text-dim">{d}</div>
            <div
              className="mt-1 text-[15px] font-bold"
              style={{ color: i === todayIndex ? '#2FD8A6' : '#E6E9ED' }}
            >
              {weekStartDate + i}
            </div>
          </div>
        ))}
      </div>

      <div className="relative grid gap-1.5 mt-2.5" style={{ gridTemplateColumns: '52px repeat(7, 1fr)' }}>
        <div className="flex flex-col">
          {hours.map((h) => (
            <div key={h} className="font-mono text-[10.5px] text-[#5E656E]" style={{ height: ROW_HEIGHT }}>
              {h}
            </div>
          ))}
        </div>
        {columns.map((col, d) => (
          <div key={d} className="relative border-l border-[#191C20]">
            {hours.map((h) => (
              <div key={h} className="border-b border-[#17191D]" style={{ height: ROW_HEIGHT }} />
            ))}
            {col.map((e, i) => (
              <button
                key={i}
                type="button"
                onClick={() => onSelectEvent(e)}
                className="absolute left-[3px] right-[3px] rounded-[10px] overflow-hidden text-left px-2.5 py-2 transition-transform hover:scale-[1.02] hover:brightness-[1.15]"
                style={{
                  top: (e.start - START_HOUR) * ROW_HEIGHT,
                  height: e.dur * ROW_HEIGHT - 6,
                  borderLeft: '3px solid #2FD8A6',
                  background: 'rgba(47,216,166,.10)',
                }}
              >
                <div className="text-[11.5px] font-bold text-text whitespace-nowrap overflow-hidden text-ellipsis">
                  {e.title}
                </div>
                <div className="mt-0.5 font-mono text-[10px] text-text-muted">
                  {fmtTime(e.start)} – {fmtTime(e.start + e.dur)}
                </div>
              </button>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

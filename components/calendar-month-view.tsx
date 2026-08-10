'use client';

import { dowLabels, type CalEvent } from '@/lib/data/calendar';

export function CalendarMonthView({
  events,
  onSelectEvent,
  todayNum = 11,
}: {
  events: CalEvent[];
  onSelectEvent: (e: CalEvent) => void;
  todayNum?: number;
}) {
  const cells = Array.from({ length: 35 }, (_, i) => {
    const num = i - 4;
    const inMonth = num >= 1 && num <= 31;
    const cellEvents = inMonth ? events.filter((_, k) => (num + k) % 9 === 0).slice(0, 2) : [];
    return { num: inMonth ? num : null, events: cellEvents };
  });

  return (
    <div>
      <div className="grid gap-1.5 pb-2.5" style={{ gridTemplateColumns: 'repeat(7, 1fr)' }}>
        {dowLabels.map((d) => (
          <div key={d} className="text-center text-[11px] tracking-[.08em] text-text-dim">
            {d}
          </div>
        ))}
      </div>
      <div className="grid gap-1.5" style={{ gridTemplateColumns: 'repeat(7, 1fr)' }}>
        {cells.map((cell, i) => (
          <div
            key={i}
            className="min-h-[92px] p-2 rounded-[10px] border border-[#191C20]"
            style={{ background: cell.num ? '#0F1114' : 'transparent' }}
          >
            <div
              className="text-xs font-semibold"
              style={{ color: cell.num === todayNum ? '#2FD8A6' : '#9AA1AB' }}
            >
              {cell.num ?? ''}
            </div>
            <div className="mt-1.5 flex flex-col gap-1">
              {cell.events.map((e, j) => (
                <button
                  key={j}
                  type="button"
                  onClick={() => onSelectEvent(e)}
                  className="px-1.5 py-1 rounded-md text-left text-[10.5px] font-semibold text-[#DDE1E6] whitespace-nowrap overflow-hidden text-ellipsis transition-[filter] hover:brightness-[1.2]"
                  style={{ background: 'rgba(47,216,166,.13)' }}
                >
                  {e.title}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

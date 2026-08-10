'use client';

import { Icon } from '@/components/icon';
import { useToast } from '@/components/toast';
import { limits } from '@/lib/data/calendar';

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];

export function AvailabilityPanel({
  avail,
  onToggle,
}: {
  avail: boolean[];
  onToggle: (index: number) => void;
}) {
  const toast = useToast();

  return (
    <div className="flex flex-col gap-4">
      <div className="p-5 bg-surface border border-border rounded-card">
        <div className="text-sm font-bold">Availability</div>
        <div className="mt-1 text-[12.5px] text-text-faint">Open slots clients can book.</div>
        <div className="mt-3.5 flex flex-col gap-2">
          {days.map((day, i) => {
            const isOn = avail[i];
            return (
              <div
                key={day}
                className="flex items-center justify-between gap-2.5 py-2.5 px-3 rounded-[11px] bg-[#0F1114] border border-border-hair"
              >
                <div className="text-[13px] font-semibold w-11">{day}</div>
                <div className="font-mono text-[11.5px]" style={{ color: isOn ? '#9AA1AB' : '#5E656E' }}>
                  {isOn ? '09:00 – 17:00' : 'Unavailable'}
                </div>
                <button
                  type="button"
                  onClick={() => onToggle(i)}
                  className="w-[38px] h-[22px] flex-none rounded-full relative transition-colors duration-200"
                  style={{ background: isOn ? '#2FD8A6' : '#26292F' }}
                >
                  <span
                    className="absolute top-[3px] w-4 h-4 rounded-full transition-[left] duration-200"
                    style={{ left: isOn ? '19px' : '3px', background: isOn ? '#06251C' : '#8A9099' }}
                  />
                </button>
              </div>
            );
          })}
        </div>
        <button
          type="button"
          onClick={() => toast('Booking link copied', 'coachflow.co/maya')}
          className="mt-3.5 w-full h-[38px] flex items-center justify-center gap-2 border border-border-strong rounded-control bg-[#15171A] text-[#C6CBD2] text-[12.5px] font-semibold transition-colors hover:bg-[#1B1E22]"
        >
          <Icon name="link" className="text-base" />
          Copy booking link
        </button>
      </div>

      <div className="p-5 bg-surface border border-border rounded-card">
        <div className="text-sm font-bold">Buffer &amp; limits</div>
        <div className="mt-3.5 flex flex-col gap-3">
          {limits.map((l) => (
            <div key={l.label} className="flex items-center justify-between">
              <div className="text-[12.5px] text-text-muted">{l.label}</div>
              <div className="font-mono text-xs">{l.value}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

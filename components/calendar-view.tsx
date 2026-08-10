'use client';

import { useState } from 'react';
import { Icon } from '@/components/icon';
import { CalendarWeekView } from '@/components/calendar-week-view';
import { CalendarMonthView } from '@/components/calendar-month-view';
import { AvailabilityPanel } from '@/components/availability-panel';
import { EventDetailModal } from '@/components/event-detail-modal';
import { Modal } from '@/components/modal';
import { useToast } from '@/components/toast';
import { type CalEvent } from '@/lib/data/calendar';
import { bookingModalSpec } from '@/lib/modal-specs';

const views = ['Week', 'Month'] as const;
type View = (typeof views)[number];

export function CalendarView({ events }: { events: CalEvent[] }) {
  const toast = useToast();
  const [view, setView] = useState<View>('Week');
  const [avail, setAvail] = useState([true, true, true, false, true]);
  const [activeEvent, setActiveEvent] = useState<CalEvent | null>(null);
  const [bookingOpen, setBookingOpen] = useState(false);

  const calRange = view === 'Week' ? 'Aug 9 – Aug 15, 2026' : 'August 2026';

  function toggleAvail(i: number) {
    setAvail((a) => a.map((v, idx) => (idx === i ? !v : v)));
  }

  function submitBooking() {
    setBookingOpen(false);
    toast('Booking created', 'Calendar hold added and client notified.');
  }

  return (
    <div>
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex gap-1 p-1 bg-surface-raised border border-border rounded-[11px]">
          {views.map((v) => (
            <button
              key={v}
              type="button"
              onClick={() => setView(v)}
              className="h-[30px] px-3.5 rounded-lg text-[12.5px] font-semibold transition-colors"
              style={{ background: view === v ? '#1B1E22' : 'transparent', color: view === v ? '#F2F4F7' : '#79808A' }}
            >
              {v}
            </button>
          ))}
        </div>
        <div className="text-[13.5px] font-semibold text-[#C6CBD2]">{calRange}</div>
        <div className="flex-1" />
        <button
          type="button"
          onClick={() => setBookingOpen(true)}
          className="flex items-center gap-2 h-10 px-4 rounded-control bg-accent text-accent-ink text-[13.5px] font-bold transition-all hover:bg-accent-hover hover:-translate-y-px"
        >
          <Icon name="add" className="text-[19px]" />
          New booking
        </button>
      </div>

      <div className="mt-4 grid gap-4 items-start lg:grid-cols-[1fr_300px]">
        <div className="p-[18px] bg-surface border border-border rounded-card overflow-x-auto">
          {view === 'Week' ? (
            <CalendarWeekView events={events} onSelectEvent={setActiveEvent} />
          ) : (
            <CalendarMonthView events={events} onSelectEvent={setActiveEvent} />
          )}
        </div>

        <AvailabilityPanel avail={avail} onToggle={toggleAvail} />
      </div>

      <EventDetailModal
        event={activeEvent}
        onClose={() => setActiveEvent(null)}
        onJoinCall={() => {
          setActiveEvent(null);
          toast('Joining call', 'Opening the session room…');
        }}
        onReschedule={() => {
          setActiveEvent(null);
          toast('Reschedule sent', 'Client received three new time options.');
        }}
      />

      <Modal
        open={bookingOpen}
        title={bookingModalSpec.title}
        sub={bookingModalSpec.sub}
        cta={bookingModalSpec.cta}
        fields={bookingModalSpec.fields}
        onClose={() => setBookingOpen(false)}
        onSubmit={submitBooking}
      />
    </div>
  );
}

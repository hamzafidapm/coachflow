export type CalEvent = {
  day: number; // 0 = Sun … 6 = Sat
  start: number; // decimal hour, e.g. 9.5 = 9:30 AM
  dur: number; // decimal hours
  title: string;
  notes: string;
};

// Seed data mirroring the Prisma `Booking` model (coachId/clientId/scheduledAt/
// duration/notes). Swap for `prisma.booking.findMany({ where: { coachId } })`
// once DATABASE_URL points at a real Neon database.
export const events: CalEvent[] = [
  { day: 1, start: 9.5, dur: 1, title: 'Maya Okonjo', notes: 'Q3 goal reset. Bring the revised offer ladder and last month’s pipeline numbers.' },
  { day: 1, start: 14, dur: 1.5, title: 'Cohort office hours', notes: 'Open room for the Momentum cohort. 14 registered, expect ~9.' },
  { day: 2, start: 11, dur: 1, title: 'Kofi Mensah', notes: 'Mid-program check-in. He flagged burnout risk in week 4 — revisit workload.' },
  { day: 3, start: 10, dur: 1, title: 'Priya Nair', notes: 'Final session of the 12-week arc. Prep the graduation summary + testimonial ask.' },
  { day: 3, start: 15.5, dur: 1, title: 'Discovery — J. Berg', notes: 'Trial user, came from the newsletter. Qualify for the Momentum tier.' },
  { day: 4, start: 9, dur: 1.5, title: 'Erin Walsh', notes: 'Positioning workshop. She wants to niche into fractional CMO work.' },
  { day: 5, start: 13, dur: 1, title: 'Amara Diallo', notes: 'Renewal conversation. Annual upgrade likely — have pricing ready.' },
];

export const hours = ['8 AM', '9 AM', '10 AM', '11 AM', '12 PM', '1 PM', '2 PM', '3 PM', '4 PM'];
export const dowLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export function fmtTime(v: number) {
  const h = Math.floor(v);
  const m = Math.round((v - h) * 60);
  const ampm = h >= 12 ? 'PM' : 'AM';
  const hh = h > 12 ? h - 12 : h;
  return `${hh}:${String(m).padStart(2, '0')} ${ampm}`;
}

export const limits = [
  { label: 'Buffer between sessions', value: '15 min' },
  { label: 'Max bookings per day', value: '4' },
  { label: 'Minimum notice', value: '12 h' },
];

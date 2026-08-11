import { prisma } from '@/lib/prisma';
import { getDemoCoach } from '@/lib/demo-coach';
import { timedFetch } from '@/lib/timing';
import { type CalEvent } from '@/lib/data/calendar';
import { CalendarView } from '@/components/calendar-view';

export const dynamic = 'force-dynamic';

export default async function CalendarPage() {
  const bookings = await timedFetch('calendar: coach + bookings', async () => {
    const coach = await getDemoCoach();
    return prisma.booking.findMany({
      where: { coachId: coach.id },
      orderBy: { scheduledAt: 'asc' },
      select: {
        scheduledAt: true,
        duration: true,
        notes: true,
        client: { select: { name: true } },
      },
    });
  });

  // Bookings were seeded with UTC-constructed timestamps (see prisma/seed.ts),
  // so read them back in UTC too rather than the server's local timezone.
  const events: CalEvent[] = bookings.map((b) => ({
    day: b.scheduledAt.getUTCDay(),
    start: b.scheduledAt.getUTCHours() + b.scheduledAt.getUTCMinutes() / 60,
    dur: b.duration / 60,
    title: b.client.name,
    notes: b.notes ?? '',
  }));

  return <CalendarView events={events} />;
}

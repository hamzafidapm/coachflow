import { Suspense } from 'react';
import { prisma } from '@/lib/prisma';
import { getDemoCoach } from '@/lib/demo-coach';
import { timedFetch } from '@/lib/timing';
import { formatRelativeTime, formatCentsAsDollars, formatShortDate } from '@/lib/format';
import { type ClientStatus, type ClientView } from '@/lib/data/clients';
import { ClientsView } from '@/components/clients-view';

export const dynamic = 'force-dynamic';

function titleCase(status: string): ClientStatus {
  return (status.charAt(0) + status.slice(1).toLowerCase()) as ClientStatus;
}

export default async function ClientsPage() {
  const { dbClients, payers, bookings } = await timedFetch('clients: coach + clients + payers/bookings', async () => {
    const coach = await getDemoCoach();
    const dbClients = await prisma.client.findMany({
      where: { coachId: coach.id },
      orderBy: { name: 'asc' },
      select: { id: true, name: true, email: true, status: true, notes: true, lastActivityAt: true },
    });

    // Client (CRM contact) and User (platform login) are separate models in this
    // schema — payments/enrollments/notes live on User. Bridge them by email,
    // the same way prisma/seed.ts links a payer account to its client record.
    // Neither query below depends on the other, so run them in parallel instead
    // of a sequential waterfall.
    const emails = dbClients.map((c) => c.email);
    const clientIds = dbClients.map((c) => c.id);
    const [payers, bookings] = await Promise.all([
      prisma.user.findMany({
        where: { email: { in: emails } },
        select: {
          email: true,
          payments: { select: { amount: true, currency: true, status: true, createdAt: true } },
          enrollments: { select: { progressPercent: true } },
        },
      }),
      prisma.booking.findMany({
        where: { coachId: coach.id, clientId: { in: clientIds } },
        orderBy: { scheduledAt: 'desc' },
        select: { clientId: true, scheduledAt: true, duration: true, status: true, notes: true },
      }),
    ]);

    return { dbClients, payers, bookings };
  });

  const payerByEmail = new Map(payers.map((p) => [p.email, p]));

  const bookingsByClientId = new Map<string, typeof bookings>();
  for (const b of bookings) {
    bookingsByClientId.set(b.clientId, [...(bookingsByClientId.get(b.clientId) ?? []), b]);
  }

  const clients: ClientView[] = dbClients.map((c) => {
    const payer = payerByEmail.get(c.email);
    const succeededPayments = payer?.payments.filter((p) => p.status === 'SUCCEEDED') ?? [];
    const ltvCents = succeededPayments.reduce((sum, p) => sum + p.amount, 0);
    const progress = payer?.enrollments.length
      ? Math.round(payer.enrollments.reduce((sum, e) => sum + e.progressPercent, 0) / payer.enrollments.length)
      : 0;
    const clientBookings = bookingsByClientId.get(c.id) ?? [];

    return {
      id: c.id,
      name: c.name,
      email: c.email,
      status: titleCase(c.status),
      lastActive: formatRelativeTime(c.lastActivityAt),
      progress,
      ltv: formatCentsAsDollars(ltvCents),
      detail: {
        Notes: c.notes ? [{ icon: 'sticky_note_2', title: 'Note', meta: '', body: c.notes }] : [],
        Payments: (payer?.payments ?? []).map((p) => ({
          icon: 'payments',
          title: `${p.currency.toUpperCase()} payment`,
          meta: formatShortDate(p.createdAt),
          body: `${formatCentsAsDollars(p.amount)} · ${p.status.toLowerCase()}`,
        })),
        Sessions: clientBookings.map((b) => ({
          icon: 'videocam',
          title: `Session · ${b.status.toLowerCase()}`,
          meta: formatShortDate(b.scheduledAt),
          body: `${b.duration} min${b.notes ? ` · ${b.notes}` : ''}`,
        })),
      },
    };
  });

  return (
    <Suspense>
      <ClientsView clients={clients} />
    </Suspense>
  );
}

import { Suspense } from 'react';
import { prisma } from '@/lib/prisma';
import { getDemoCoach } from '@/lib/demo-coach';
import { formatRelativeTime, formatCentsAsDollars, formatShortDate } from '@/lib/format';
import { type ClientStatus, type ClientView } from '@/lib/data/clients';
import { ClientsView } from '@/components/clients-view';

export const dynamic = 'force-dynamic';

function titleCase(status: string): ClientStatus {
  return (status.charAt(0) + status.slice(1).toLowerCase()) as ClientStatus;
}

export default async function ClientsPage() {
  const coach = await getDemoCoach();
  const dbClients = await prisma.client.findMany({
    where: { coachId: coach.id },
    orderBy: { name: 'asc' },
  });

  // Client (CRM contact) and User (platform login) are separate models in this
  // schema — payments/enrollments/notes live on User. Bridge them by email,
  // the same way prisma/seed.ts links a payer account to its client record.
  const emails = dbClients.map((c) => c.email);
  const payers = await prisma.user.findMany({
    where: { email: { in: emails } },
    include: { payments: true, enrollments: true },
  });
  const payerByEmail = new Map(payers.map((p) => [p.email, p]));

  const bookings = await prisma.booking.findMany({
    where: { coachId: coach.id, clientId: { in: dbClients.map((c) => c.id) } },
    orderBy: { scheduledAt: 'desc' },
  });
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

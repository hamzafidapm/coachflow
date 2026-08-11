'use server';

import { prisma } from '@/lib/prisma';
import { getDemoCoach } from '@/lib/demo-coach';
import { formatRelativeTime } from '@/lib/format';

export type NotificationItem = { icon: string; title: string; time: string; tint: string; color: string };

export async function getRecentNotifications(): Promise<NotificationItem[]> {
  const coach = await getDemoCoach();

  const [recentBookings, recentPayments] = await Promise.all([
    prisma.booking.findMany({
      where: { coachId: coach.id },
      orderBy: { scheduledAt: 'desc' },
      take: 3,
      select: { scheduledAt: true, status: true, client: { select: { name: true } } },
    }),
    prisma.payment.findMany({
      orderBy: { createdAt: 'desc' },
      take: 3,
      select: { status: true, createdAt: true, user: { select: { name: true, email: true } } },
    }),
  ]);

  const merged = [
    ...recentBookings.map((b) => ({
      at: b.scheduledAt,
      icon: 'event_available',
      title: `Session with ${b.client.name} · ${b.status.toLowerCase()}`,
      tint: 'rgba(240,180,60,.13)',
      color: '#E9B84C',
    })),
    ...recentPayments.map((p) => ({
      at: p.createdAt,
      icon: p.status === 'FAILED' ? 'error' : 'payments',
      title:
        p.status === 'FAILED'
          ? `Failed payment from ${p.user.name ?? p.user.email}`
          : `Payment from ${p.user.name ?? p.user.email}`,
      tint: p.status === 'FAILED' ? 'rgba(255,110,110,.13)' : 'rgba(47,216,166,.12)',
      color: p.status === 'FAILED' ? '#FF8E8E' : '#2FD8A6',
    })),
  ];

  return merged
    .sort((a, b) => b.at.getTime() - a.at.getTime())
    .slice(0, 5)
    .map(({ at, ...rest }) => ({ ...rest, time: formatRelativeTime(at) }));
}

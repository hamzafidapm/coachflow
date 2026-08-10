'use server';

import { prisma } from '@/lib/prisma';
import { getDemoCoach } from '@/lib/demo-coach';
import { slugify } from '@/lib/slug';
import { formatCentsAsDollars, formatShortDate } from '@/lib/format';

export type ClientResult = { id: string; name: string; email: string; status: string };
export type CourseResult = { slug: string; title: string; category: string };
export type PaymentResult = { id: string; name: string; amount: string; status: string; date: string };

export type SearchResults = {
  clients: ClientResult[];
  courses: CourseResult[];
  payments: PaymentResult[];
};

const EMPTY: SearchResults = { clients: [], courses: [], payments: [] };
const LIMIT = 5;

export async function globalSearch(rawQuery: string): Promise<SearchResults> {
  const q = rawQuery.trim();
  if (q.length < 2) return EMPTY;

  const coach = await getDemoCoach();

  const [clients, courses, payments] = await Promise.all([
    prisma.client.findMany({
      where: {
        coachId: coach.id,
        OR: [{ name: { contains: q, mode: 'insensitive' } }, { email: { contains: q, mode: 'insensitive' } }],
      },
      orderBy: { name: 'asc' },
      take: LIMIT,
      select: { id: true, name: true, email: true, status: true },
    }),
    prisma.course.findMany({
      where: { coachId: coach.id, title: { contains: q, mode: 'insensitive' } },
      orderBy: { title: 'asc' },
      take: LIMIT,
      select: { title: true, category: true },
    }),
    prisma.payment.findMany({
      where: {
        user: {
          OR: [{ name: { contains: q, mode: 'insensitive' } }, { email: { contains: q, mode: 'insensitive' } }],
        },
      },
      orderBy: { createdAt: 'desc' },
      take: LIMIT,
      select: {
        id: true,
        amount: true,
        status: true,
        createdAt: true,
        user: { select: { name: true, email: true } },
      },
    }),
  ]);

  return {
    clients: clients.map((c) => ({ id: c.id, name: c.name, email: c.email, status: c.status })),
    courses: courses.map((c) => ({ slug: slugify(c.title), title: c.title, category: c.category })),
    payments: payments.map((p) => ({
      id: p.id,
      name: p.user.name ?? p.user.email,
      amount: formatCentsAsDollars(p.amount),
      status: p.status,
      date: formatShortDate(p.createdAt),
    })),
  };
}

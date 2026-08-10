import { tint, initials } from '@/lib/avatar';

export type TxStatus = 'Paid' | 'Pending' | 'Failed' | 'Refunded';

export type Transaction = {
  name: string;
  plan: string;
  amount: string;
  date: string;
  status: TxStatus;
};

// Seed data mirroring the Prisma `Payment` model (userId/amount/currency/status/
// createdAt). Swap for `prisma.payment.findMany({ where: { user: { coachedCourses... } } })`
// (or a coach-scoped payments view) once DATABASE_URL points at a real Neon database.
const rawTransactions: [string, string, string, string, TxStatus][] = [
  ['Priya Nair', 'Momentum · Annual', '$4,320', 'Aug 6, 2026', 'Paid'],
  ['Kofi Mensah', 'Momentum · Monthly', '$450', 'Aug 5, 2026', 'Paid'],
  ['Amara Diallo', 'Intensive add-on', '$1,200', 'Aug 4, 2026', 'Paid'],
  ['Erin Walsh', 'Offer Lab · Monthly', '$220', 'Aug 3, 2026', 'Paid'],
  ['Jonas Berg', 'Momentum · Monthly', '$450', 'Aug 3, 2026', 'Pending'],
  ['Wren Halloway', 'Offer Lab · Monthly', '$220', 'Aug 1, 2026', 'Failed'],
  ['Maya Okonjo', 'Momentum · Monthly', '$450', 'Aug 1, 2026', 'Paid'],
  ['Nikhil Rao', 'Client Engine · Annual', '$2,160', 'Jul 30, 2026', 'Paid'],
  ['Clara Bennett', 'Momentum · Monthly', '$450', 'Jul 29, 2026', 'Refunded'],
];

export const transactions: Transaction[] = rawTransactions.map(([name, plan, amount, date, status]) => ({
  name,
  plan,
  amount,
  date,
  status,
}));

export function txStatusStyle(status: TxStatus): [string, string] {
  const map: Record<TxStatus, [string, string]> = {
    Paid: ['rgba(47,216,166,.13)', '#2FD8A6'],
    Pending: ['rgba(240,180,60,.13)', '#E9B84C'],
    Failed: ['rgba(255,110,110,.13)', '#FF8E8E'],
    Refunded: ['rgba(150,158,168,.12)', '#98A0AA'],
  };
  return map[status];
}

// Maps the Prisma `PaymentStatus` enum to this UI's display labels.
export function paymentStatusToTx(status: 'SUCCEEDED' | 'PENDING' | 'FAILED' | 'REFUNDED'): TxStatus {
  const map = { SUCCEEDED: 'Paid', PENDING: 'Pending', FAILED: 'Failed', REFUNDED: 'Refunded' } as const;
  return map[status];
}

export { tint, initials };

export const plans = [
  { name: 'Starter', price: '$220/mo', detail: '46 subscribers · group access', share: '28%', border: '#1E2126' },
  { name: 'Momentum', price: '$450/mo', detail: '112 subscribers · 1-on-1 included', share: '61%', border: 'rgba(47,216,166,.3)' },
  { name: 'Intensive', price: '$1,200', detail: '9 active · one-time engagement', share: '11%', border: '#1E2126' },
];

const monthlyRevenue = [8.2, 9.1, 8.6, 11.4, 12.9, 12.1, 14.8, 15.6, 14.2, 16.9, 17.4, 18.4];
const monthLabels = ['Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'];
const yearlyRevenue = [96, 112, 141, 158, 174, 190, 168, 205, 221, 214, 236, 248];

export function barsFor(billing: 'Monthly' | 'Yearly') {
  const vals = billing === 'Monthly' ? monthlyRevenue : yearlyRevenue;
  const max = Math.max(...vals);
  return vals.map((v, i) => ({
    heightPct: Math.round((v / max) * 100),
    delayMs: i * 45,
    label: billing === 'Monthly' ? monthLabels[i] : String(2015 + i).slice(2),
    isLast: i === vals.length - 1,
  }));
}

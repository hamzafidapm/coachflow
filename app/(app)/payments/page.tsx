import { prisma } from '@/lib/prisma';
import { formatCentsAsDollars, formatDateWithYear } from '@/lib/format';
import { paymentStatusToTx } from '@/lib/data/payments';
import { PaymentsView } from '@/components/payments-view';
import { type TransactionRow } from '@/components/transactions-table';

export const dynamic = 'force-dynamic';

export default async function PaymentsPage() {
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const startOfNextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);
  const startOfYear = new Date(now.getFullYear(), 0, 1);

  const [monthlyAgg, yearlyAgg, payments] = await Promise.all([
    prisma.payment.aggregate({
      _sum: { amount: true },
      where: { status: 'SUCCEEDED', createdAt: { gte: startOfMonth, lt: startOfNextMonth } },
    }),
    prisma.payment.aggregate({
      _sum: { amount: true },
      where: { status: 'SUCCEEDED', createdAt: { gte: startOfYear } },
    }),
    prisma.payment.findMany({
      include: { user: true },
      orderBy: { createdAt: 'desc' },
    }),
  ]);

  const transactions: TransactionRow[] = payments.map((p) => ({
    name: p.user.name ?? p.user.email,
    amount: formatCentsAsDollars(p.amount),
    date: formatDateWithYear(p.createdAt),
    status: paymentStatusToTx(p.status),
  }));

  return (
    <PaymentsView
      grossVolumeMonthly={formatCentsAsDollars(monthlyAgg._sum.amount ?? 0)}
      grossVolumeYearly={formatCentsAsDollars(yearlyAgg._sum.amount ?? 0)}
      transactions={transactions}
    />
  );
}

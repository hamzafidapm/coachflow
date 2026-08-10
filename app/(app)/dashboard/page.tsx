import { prisma } from '@/lib/prisma';
import { getDemoCoach } from '@/lib/demo-coach';
import { StatCard, type Stat } from '@/components/stat-card';
import { RevenueChart } from '@/components/revenue-chart';
import { QuickActions } from '@/components/quick-actions';
import { ActivityFeed } from '@/components/activity-feed';

export const dynamic = 'force-dynamic';

export default async function DashboardPage() {
  const coach = await getDemoCoach();

  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const startOfNextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);

  const [activeClients, revenueThisMonth, completion, upcomingSessions] = await Promise.all([
    prisma.client.count({ where: { coachId: coach.id, status: 'ACTIVE' } }),
    prisma.payment.aggregate({
      _sum: { amount: true },
      where: { status: 'SUCCEEDED', createdAt: { gte: startOfMonth, lt: startOfNextMonth } },
    }),
    prisma.enrollment.aggregate({ _avg: { progressPercent: true } }),
    prisma.booking.count({
      where: { coachId: coach.id, status: 'SCHEDULED', scheduledAt: { gte: now } },
    }),
  ]);

  // Trend deltas ("+12.4% vs last month") aren't derivable without a longer
  // history of seed data, so they stay illustrative — same as in the original
  // design prototype, where they were static too. The headline numbers above
  // are real.
  const stats: Stat[] = [
    { label: 'Active students', icon: 'group', value: activeClients, delta: '+12.4%', trendUp: true },
    {
      label: 'Monthly revenue',
      icon: 'payments',
      value: Math.round((revenueThisMonth._sum.amount ?? 0) / 100),
      prefix: '$',
      delta: '+8.1%',
      trendUp: true,
    },
    {
      label: 'Completion rate',
      icon: 'task_alt',
      value: Math.round(completion._avg.progressPercent ?? 0),
      suffix: '%',
      delta: '−2.3%',
      trendUp: false,
    },
    { label: 'Upcoming sessions', icon: 'event', value: upcomingSessions, delta: '+4', trendUp: true },
  ];

  return (
    <div>
      <div className="grid gap-4" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))' }}>
        {stats.map((s) => (
          <StatCard key={s.label} stat={s} />
        ))}
      </div>

      <div className="mt-4 grid gap-4 items-start lg:grid-cols-[1.6fr_1fr]">
        <RevenueChart />
        <div className="flex flex-col gap-4">
          <QuickActions />
          <ActivityFeed />
        </div>
      </div>
    </div>
  );
}

import { StatCard, type Stat } from '@/components/stat-card';
import { RevenueChart } from '@/components/revenue-chart';
import { QuickActions } from '@/components/quick-actions';
import { ActivityFeed } from '@/components/activity-feed';

const stats: Stat[] = [
  { label: 'Active students', icon: 'group', value: 248, delta: '+12.4%', trendUp: true },
  { label: 'Monthly revenue', icon: 'payments', value: 18420, prefix: '$', delta: '+8.1%', trendUp: true },
  { label: 'Completion rate', icon: 'task_alt', value: 87, suffix: '%', delta: '−2.3%', trendUp: false },
  { label: 'Upcoming sessions', icon: 'event', value: 12, delta: '+4', trendUp: true },
];

export default function DashboardPage() {
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

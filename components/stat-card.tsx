import { Icon } from '@/components/icon';
import { CountUp } from '@/components/count-up';

export type Stat = {
  label: string;
  icon: string;
  value: number;
  prefix?: string;
  suffix?: string;
  delta: string;
  trendUp: boolean;
};

export function StatCard({ stat }: { stat: Stat }) {
  return (
    <div className="p-5 bg-surface border border-border rounded-card transition-all duration-[220ms] hover:border-[#2E3239] hover:-translate-y-0.5">
      <div className="flex items-center justify-between">
        <div className="text-[12.5px] text-[#8A9099] font-semibold">{stat.label}</div>
        <Icon name={stat.icon} className="text-[19px] text-[#5E656E]" />
      </div>
      <div className="mt-3.5 text-[30px] font-bold tracking-tight">
        <CountUp value={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
      </div>
      <div
        className="mt-2.5 flex items-center gap-1.5 text-xs"
        style={{ color: stat.trendUp ? '#2FD8A6' : '#FF8E8E' }}
      >
        <Icon name={stat.trendUp ? 'arrow_upward' : 'arrow_downward'} className="text-[15px]" />
        <span className="font-bold">{stat.delta}</span>
        <span className="text-text-dim">vs last month</span>
      </div>
    </div>
  );
}

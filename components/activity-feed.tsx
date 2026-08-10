import { Icon } from '@/components/icon';

const activity = [
  { icon: 'person_add', text: 'Clara Bennett joined Momentum OS', time: '12 minutes ago', tint: 'rgba(47,216,166,.12)', color: '#2FD8A6' },
  { icon: 'payments', text: 'Payment of $450 from Priya Nair', time: '1 hour ago', tint: 'rgba(84,150,255,.14)', color: '#7CB0FF' },
  { icon: 'task_alt', text: 'Kofi Mensah completed "Energy blocks"', time: '3 hours ago', tint: 'rgba(47,216,166,.12)', color: '#2FD8A6' },
  { icon: 'event_available', text: 'Erin Walsh booked Thursday 9:00', time: '5 hours ago', tint: 'rgba(240,180,60,.13)', color: '#E9B84C' },
  { icon: 'reply', text: 'Devon Ruiz replied in the cohort thread', time: 'Yesterday', tint: 'rgba(150,158,168,.12)', color: '#98A0AA' },
];

export function ActivityFeed() {
  return (
    <div className="p-5 bg-surface border border-border rounded-card">
      <div className="flex items-center justify-between">
        <div className="text-sm font-bold">Recent activity</div>
        <a href="#" className="text-sm">
          View all
        </a>
      </div>
      <div className="mt-3.5 flex flex-col gap-0.5">
        {activity.map((a, i) => (
          <div key={i} className="flex gap-3 py-2.5 px-2 rounded-[10px] transition-colors hover:bg-[#15181B]">
            <span
              className="w-[30px] h-[30px] flex-none rounded-[9px] flex items-center justify-center"
              style={{ background: a.tint, color: a.color }}
            >
              <Icon name={a.icon} className="text-[17px]" />
            </span>
            <div className="min-w-0">
              <div className="text-[13px] leading-snug text-[#DDE1E6]">{a.text}</div>
              <div className="mt-0.5 text-[11.5px] text-text-dim">{a.time}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

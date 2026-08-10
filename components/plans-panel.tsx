import { plans } from '@/lib/data/payments';

export function PlansPanel({ onEditPlans }: { onEditPlans: () => void }) {
  return (
    <div className="p-5 bg-surface border border-border rounded-card">
      <div className="flex items-center justify-between">
        <div className="text-sm font-bold">Plans</div>
        <button
          type="button"
          onClick={onEditPlans}
          className="h-[30px] px-[11px] border border-border-strong rounded-[9px] bg-[#15171A] text-[#C6CBD2] text-xs font-semibold transition-colors hover:bg-[#1B1E22]"
        >
          Edit tiers
        </button>
      </div>
      <div className="mt-3.5 flex flex-col gap-2.5">
        {plans.map((p) => (
          <div
            key={p.name}
            className="p-3.5 rounded-xl bg-[#0F1114] border transition-colors hover:border-[#33373E]"
            style={{ borderColor: p.border }}
          >
            <div className="flex items-center justify-between">
              <div className="text-[13.5px] font-bold">{p.name}</div>
              <div className="font-mono text-[13px] text-accent">{p.price}</div>
            </div>
            <div className="mt-1.5 text-xs text-text-faint">{p.detail}</div>
            <div className="mt-2.5 h-[5px] rounded bg-[#1E2126] overflow-hidden">
              <div className="h-full bg-accent" style={{ width: p.share }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

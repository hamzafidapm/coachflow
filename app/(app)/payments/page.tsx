'use client';

import { useMemo, useState } from 'react';
import { Icon } from '@/components/icon';
import { RevenueBars } from '@/components/revenue-bars';
import { PlansPanel } from '@/components/plans-panel';
import { TransactionsTable } from '@/components/transactions-table';
import { Modal } from '@/components/modal';
import { useToast } from '@/components/toast';
import { grossVolume, barsFor } from '@/lib/data/payments';
import { plansModalSpec } from '@/lib/modal-specs';

const billingOptions = ['Monthly', 'Yearly'] as const;
type Billing = (typeof billingOptions)[number];

export default function PaymentsPage() {
  const toast = useToast();
  const [billing, setBilling] = useState<Billing>('Monthly');
  const [plansOpen, setPlansOpen] = useState(false);

  const bars = useMemo(() => barsFor(billing), [billing]);

  return (
    <div>
      <div className="grid gap-4 items-start lg:grid-cols-[1.5fr_1fr]">
        <div className="p-[22px] bg-surface border border-border rounded-card">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="text-[12.5px] text-[#8A9099] font-semibold">Gross volume</div>
              <div className="mt-2 text-[32px] font-bold tracking-tight">{grossVolume(billing)}</div>
              <div className="mt-2 flex items-center gap-1.5 text-[12.5px] text-accent">
                <Icon name="arrow_upward" className="text-[15px]" />
                <span className="font-bold">+14.2%</span>
                <span className="text-text-dim">vs prior period</span>
              </div>
            </div>
            <div className="flex gap-1 p-1 bg-surface-raised border border-border rounded-[10px]">
              {billingOptions.map((b) => (
                <button
                  key={b}
                  type="button"
                  onClick={() => setBilling(b)}
                  className="h-7 px-3 rounded-[7px] text-xs font-semibold transition-colors"
                  style={{ background: billing === b ? '#1B1E22' : 'transparent', color: billing === b ? '#F2F4F7' : '#79808A' }}
                >
                  {b}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-[22px]">
            <RevenueBars bars={bars} />
          </div>
        </div>

        <PlansPanel onEditPlans={() => setPlansOpen(true)} />
      </div>

      <TransactionsTable />

      <Modal
        open={plansOpen}
        title={plansModalSpec.title}
        sub={plansModalSpec.sub}
        cta={plansModalSpec.cta}
        fields={plansModalSpec.fields}
        onClose={() => setPlansOpen(false)}
        onSubmit={() => {
          setPlansOpen(false);
          toast('Tiers saved', 'New pricing applies to future subscribers.');
        }}
      />
    </div>
  );
}

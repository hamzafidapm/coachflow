'use client';

import { Icon } from '@/components/icon';
import { useToast } from '@/components/toast';
import { txStatusStyle, tint, initials, type TxStatus } from '@/lib/data/payments';

const COLUMNS = '1.8fr 1fr 1fr .9fr';

export type TransactionRow = {
  name: string;
  amount: string;
  date: string;
  status: TxStatus;
};

export function TransactionsTable({ transactions }: { transactions: TransactionRow[] }) {
  const toast = useToast();

  return (
    <div className="mt-4 bg-surface border border-border rounded-card overflow-hidden">
      <div className="flex items-center justify-between px-5 py-[18px] border-b border-border-hair">
        <div className="text-sm font-bold">Transactions</div>
        <button
          type="button"
          onClick={() => toast('Export queued', 'CSV will land in your inbox shortly.')}
          className="flex items-center gap-1.5 h-8 px-3 border border-border-strong rounded-[9px] bg-[#15171A] text-[#C6CBD2] text-[12.5px] font-semibold transition-colors hover:bg-[#1B1E22]"
        >
          <Icon name="download" className="text-base" />
          Export CSV
        </button>
      </div>

      <div className="overflow-x-auto">
        <div className="min-w-[560px]">
          <div
            className="grid gap-3 px-5 h-[42px] items-center bg-[#0F1114] border-b border-border-hair text-[11.5px] font-bold tracking-[.06em] uppercase text-text-faint"
            style={{ gridTemplateColumns: COLUMNS }}
          >
            <div>Client</div>
            <div>Amount</div>
            <div>Date</div>
            <div>Status</div>
          </div>

          {transactions.length === 0 && (
            <div className="py-10 text-center text-[13px] text-text-faint">No payments yet.</div>
          )}

          {transactions.map((t, i) => {
            const avatar = tint(t.name);
            const [statusBg, statusColor] = txStatusStyle(t.status);
            return (
              <div
                key={i}
                className="grid gap-3 px-5 h-14 items-center border-b border-[#191C20] transition-colors hover:bg-[#16191D]"
                style={{ gridTemplateColumns: COLUMNS }}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <span
                    className="w-[30px] h-[30px] flex-none rounded-[9px] flex items-center justify-center text-[11.5px] font-bold"
                    style={{ background: avatar.bg, color: avatar.ink }}
                  >
                    {initials(t.name)}
                  </span>
                  <span className="text-[13.5px] font-semibold whitespace-nowrap overflow-hidden text-ellipsis">
                    {t.name}
                  </span>
                </div>
                <div className="font-mono text-[13px]">{t.amount}</div>
                <div className="text-[12.5px] text-text-muted">{t.date}</div>
                <div>
                  <span
                    className="inline-flex h-6 items-center px-2.5 rounded-[7px] text-[11.5px] font-bold"
                    style={{ background: statusBg, color: statusColor }}
                  >
                    {t.status}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

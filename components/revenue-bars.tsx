'use client';

import { motion } from 'framer-motion';
import { type barsFor } from '@/lib/data/payments';

export function RevenueBars({ bars }: { bars: ReturnType<typeof barsFor> }) {
  return (
    <div className="flex items-end gap-2.5 h-[170px]">
      {bars.map((b, i) => (
        <div key={i} className="flex-1 flex flex-col items-center gap-2">
          <div className="w-full flex items-end" style={{ height: 150 }}>
            <motion.div
              className="w-full rounded-t-[6px] rounded-b-[3px] transition-colors hover:!bg-accent"
              style={{ background: b.isLast ? '#2FD8A6' : '#22333A', transformOrigin: 'bottom' }}
              initial={{ height: 0 }}
              animate={{ height: `${b.heightPct}%` }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: b.delayMs / 1000 }}
            />
          </div>
          <div className="font-mono text-[10px] text-text-dim">{b.label}</div>
        </div>
      ))}
    </div>
  );
}

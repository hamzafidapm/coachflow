'use client';

import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';

const months = ['Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'];
const revenue = [8.2, 9.1, 8.6, 11.4, 12.9, 12.1, 14.8, 15.6, 14.2, 16.9, 17.4, 18.4];

const ranges = ['3M', '6M', '12M'] as const;
type Range = (typeof ranges)[number];

const W = 720;
const H = 210;
const MAX = 20;

export function RevenueChart() {
  const [range, setRange] = useState<Range>('12M');

  const { series, labels } = useMemo(() => {
    const count = range === '3M' ? 3 : range === '6M' ? 6 : 12;
    return { series: revenue.slice(-count), labels: months.slice(-count) };
  }, [range]);

  const { linePath, areaPath, dots, gridLines } = useMemo(() => {
    const step = series.length > 1 ? W / (series.length - 1) : W;
    const pts = series.map((v, i) => [i * step, H - (v / MAX) * H + 14]);
    const linePath = pts.map((p, i) => `${i ? 'L' : 'M'}${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join(' ');
    const areaPath = `${linePath} L${W} 240 L0 240 Z`;
    const gridLines = [0, 1, 2, 3].map((i) => ({ y: 20 + i * 60 }));
    return { linePath, areaPath, dots: pts, gridLines };
  }, [series]);

  return (
    <div className="p-[22px] bg-surface border border-border rounded-card">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-[15px] font-bold">Revenue trend</div>
          <div className="mt-1 text-[12.5px] text-text-faint">Placeholder data · net of refunds</div>
        </div>
        <div className="flex gap-1 p-1 bg-surface-raised border border-border rounded-[10px]">
          {ranges.map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => setRange(r)}
              className="h-7 px-3 rounded-[7px] text-xs font-semibold transition-colors"
              style={{
                background: range === r ? '#1B1E22' : 'transparent',
                color: range === r ? '#F2F4F7' : '#79808A',
              }}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-[18px] relative">
        <svg viewBox="0 0 720 240" preserveAspectRatio="none" className="w-full h-[240px] block">
          <defs>
            <linearGradient id="cfArea" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#2FD8A6" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#2FD8A6" stopOpacity="0" />
            </linearGradient>
          </defs>
          {gridLines.map((g, i) => (
            <line key={i} x1="0" y1={g.y} x2="720" y2={g.y} stroke="#1C1F24" strokeWidth={1} />
          ))}
          <motion.path
            key={`area-${range}`}
            d={areaPath}
            fill="url(#cfArea)"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          />
          <motion.path
            key={`line-${range}`}
            d={linePath}
            fill="none"
            stroke="#2FD8A6"
            strokeWidth={2.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.3, ease: [0.4, 0, 0.2, 1] }}
          />
          {dots.map((d, i) => (
            <circle key={i} cx={d[0]} cy={d[1]} r={3} fill="#0A0B0D" stroke="#2FD8A6" strokeWidth={2.5} />
          ))}
        </svg>
        <div className="flex justify-between mt-2.5 font-mono text-[11px] text-text-dim">
          {labels.map((m) => (
            <span key={m}>{m}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

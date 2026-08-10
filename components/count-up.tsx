'use client';

import { useEffect, useRef } from 'react';
import { animate } from 'framer-motion';

export function CountUp({
  value,
  prefix = '',
  suffix = '',
  duration = 1.1,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const controls = animate(0, value, {
      duration,
      ease: [0.4, 0, 0.2, 1],
      onUpdate(latest) {
        if (ref.current) ref.current.textContent = `${prefix}${Math.round(latest).toLocaleString()}${suffix}`;
      },
    });
    return () => controls.stop();
  }, [value, prefix, suffix, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}0{suffix}
    </span>
  );
}

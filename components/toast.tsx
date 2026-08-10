'use client';

import { createContext, useCallback, useContext, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Icon } from '@/components/icon';

type ToastState = { title: string; body: string; kind: 'success' | 'error' } | null;

const ToastContext = createContext<{
  toast: (title: string, body: string, kind?: 'success' | 'error') => void;
} | null>(null);

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within a ToastProvider');
  return ctx.toast;
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [current, setCurrent] = useState<ToastState>(null);
  const timer = useRef<ReturnType<typeof setTimeout>>();

  const toast = useCallback((title: string, body: string, kind: 'success' | 'error' = 'success') => {
    clearTimeout(timer.current);
    setCurrent({ title, body, kind });
    timer.current = setTimeout(() => setCurrent(null), 3600);
  }, []);

  const isError = current?.kind === 'error';

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <AnimatePresence>
        {current && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
            className="fixed right-6 bottom-6 z-[90] flex items-center gap-3 py-3.5 px-4 min-w-[280px] bg-[#15181C] border rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,.5)]"
            style={{ borderColor: isError ? 'rgba(255,110,110,.3)' : 'rgba(47,216,166,.28)' }}
          >
            <span
              className="w-[30px] h-[30px] flex-none rounded-[9px] flex items-center justify-center"
              style={{
                background: isError ? 'rgba(255,110,110,.13)' : 'rgba(47,216,166,.13)',
                color: isError ? '#FF8E8E' : '#2FD8A6',
              }}
            >
              <Icon name={isError ? 'error' : 'check_circle'} className="text-lg" />
            </span>
            <div className="flex-1 min-w-0">
              <div className="text-[13px] font-bold">{current.title}</div>
              <div className="mt-0.5 text-xs text-text-faint">{current.body}</div>
            </div>
            <button
              type="button"
              onClick={() => setCurrent(null)}
              className="w-[26px] h-[26px] flex items-center justify-center rounded-lg bg-transparent text-text-dim transition-colors hover:text-text"
            >
              <Icon name="close" className="text-base" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </ToastContext.Provider>
  );
}

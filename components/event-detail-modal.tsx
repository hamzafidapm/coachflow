'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { Icon } from '@/components/icon';
import { fmtTime, type CalEvent } from '@/lib/data/calendar';

export function EventDetailModal({
  event,
  onClose,
  onJoinCall,
  onReschedule,
}: {
  event: CalEvent | null;
  onClose: () => void;
  onJoinCall: () => void;
  onReschedule: () => void;
}) {
  return (
    <AnimatePresence>
      {event && (
        <motion.div
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          className="fixed inset-0 z-[80] flex items-center justify-center p-6 bg-[rgba(6,7,9,.72)] backdrop-blur-[6px]"
        >
          <motion.div
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, scale: 0.96, y: 6 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 6 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="w-full max-w-[400px] bg-surface-panel border border-border-strong rounded-[18px] shadow-[0_30px_90px_rgba(0,0,0,.6)] p-[22px]"
          >
            <div className="flex items-center justify-between">
              <span className="inline-flex h-6 items-center px-2.5 rounded-[7px] bg-accent/[.14] text-accent text-[11.5px] font-bold">
                1-on-1 session
              </span>
              <button
                type="button"
                onClick={onClose}
                className="w-[30px] h-[30px] flex items-center justify-center rounded-[9px] bg-[#191C20] text-[#8A9099] transition-colors hover:bg-[#22262B]"
              >
                <Icon name="close" className="text-lg" />
              </button>
            </div>
            <div className="mt-4 text-lg font-bold tracking-tight">{event.title}</div>
            <div className="mt-1.5 font-mono text-[12.5px] text-text-muted">
              Tue 11 Aug · {fmtTime(event.start)} – {fmtTime(event.start + event.dur)}
            </div>
            <div className="mt-4 p-3.5 rounded-xl bg-[#0F1114] border border-border-hair text-[13px] leading-relaxed text-text-muted">
              {event.notes}
            </div>
            <div className="mt-[18px] flex gap-2.5">
              <button
                type="button"
                onClick={onJoinCall}
                className="flex-1 h-[42px] flex items-center justify-center gap-2 rounded-control bg-accent text-accent-ink text-[13px] font-bold transition-colors hover:bg-accent-hover"
              >
                <Icon name="videocam" className="text-lg" />
                Join call
              </button>
              <button
                type="button"
                onClick={onReschedule}
                className="h-[42px] px-4 border border-border-strong rounded-control bg-[#15171A] text-[#C6CBD2] text-[13px] font-semibold transition-colors hover:bg-[#1B1E22]"
              >
                Reschedule
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

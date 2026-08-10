'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { Icon } from '@/components/icon';

export type ModalField = { label: string; placeholder: string };

export function Modal({
  open,
  title,
  sub,
  cta,
  fields,
  onClose,
  onSubmit,
}: {
  open: boolean;
  title: string;
  sub: string;
  cta: string;
  fields: ModalField[];
  onClose: () => void;
  onSubmit: () => void;
}) {
  return (
    <AnimatePresence>
      {open && (
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
            className="w-full max-w-[440px] bg-surface-panel border border-border-strong rounded-[18px] shadow-[0_30px_90px_rgba(0,0,0,.6)]"
          >
            <div className="flex items-start justify-between px-[22px] pt-[22px]">
              <div>
                <div className="text-base font-bold tracking-tight">{title}</div>
                <div className="mt-1.5 text-[12.5px] text-text-faint">{sub}</div>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="w-[30px] h-[30px] flex items-center justify-center rounded-[9px] bg-[#191C20] text-[#8A9099] transition-colors hover:bg-[#22262B]"
              >
                <Icon name="close" className="text-lg" />
              </button>
            </div>
            <div className="px-[22px] py-5 flex flex-col gap-3.5">
              {fields.map((f) => (
                <div key={f.label} className="flex flex-col gap-[7px]">
                  <label className="text-xs font-semibold text-text-muted">{f.label}</label>
                  <input
                    type="text"
                    placeholder={f.placeholder}
                    className="h-11 px-[13px] bg-[#0F1114] border border-border-strong rounded-control text-[13.5px] outline-none transition-shadow focus:border-accent focus:shadow-[0_0_0_3px_rgba(47,216,166,.12)]"
                  />
                </div>
              ))}
            </div>
            <div className="flex justify-end gap-2.5 px-[22px] pb-[22px]">
              <button
                type="button"
                onClick={onClose}
                className="h-10 px-4 border border-border-strong rounded-control bg-[#15171A] text-[#C6CBD2] text-[13px] font-semibold transition-colors hover:bg-[#1B1E22]"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={onSubmit}
                className="h-10 px-[18px] rounded-control bg-accent text-accent-ink text-[13px] font-bold transition-colors hover:bg-accent-hover"
              >
                {cta}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

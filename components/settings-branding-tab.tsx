'use client';

import { useState, useTransition } from 'react';
import { Icon } from '@/components/icon';
import { useToast } from '@/components/toast';
import { accentSwatches, themeOptions } from '@/lib/data/settings';
import { updateAccentColor, updatePortalTheme } from '@/lib/actions/settings';

export function SettingsBrandingTab({
  accentColor,
  portalTheme,
}: {
  accentColor: string;
  portalTheme: 'DARK' | 'LIGHT';
}) {
  const toast = useToast();
  const [, startTransition] = useTransition();
  const [accent, setAccent] = useState(accentColor);
  const [theme, setTheme] = useState(portalTheme);

  return (
    <div>
      <div className="text-[15px] font-bold">Branding</div>
      <div className="mt-1.5 text-[12.5px] text-text-faint">
        Applied to your public booking page and course portal.
      </div>

      <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="h-[150px] rounded-2xl border border-dashed border-[#2C3037] bg-[repeating-linear-gradient(135deg,#0F1114_0_10px,#121417_10px_20px)] flex flex-col items-center justify-center gap-2">
          <Icon name="image" className="text-2xl text-accent" />
          <div className="font-mono text-[11px] text-text-dim">logo · svg or png</div>
        </div>

        <div className="p-4 rounded-2xl bg-[#0F1114] border border-border-hair">
          <div className="text-[12.5px] font-semibold text-text-muted">Accent color</div>
          <div className="mt-3 flex gap-2.5">
            {accentSwatches.map((c) => (
              <button
                key={c}
                type="button"
                title={c}
                onClick={() => {
                  setAccent(c);
                  startTransition(() => updateAccentColor(c));
                  toast('Accent updated', `Your public page now uses ${c}.`);
                }}
                className="w-[34px] h-[34px] rounded-[10px] transition-transform hover:scale-[1.08]"
                style={{ background: c, border: `2px solid ${accent === c ? '#F2F4F7' : 'transparent'}` }}
              />
            ))}
          </div>

          <div className="mt-[18px] text-[12.5px] font-semibold text-text-muted">Portal theme</div>
          <div className="mt-2.5 flex gap-2">
            {themeOptions.map((opt) => {
              const isActive = theme === opt.value;
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => {
                    setTheme(opt.value);
                    startTransition(() => updatePortalTheme(opt.value));
                    toast('Theme set', `${opt.label} portal theme applied.`);
                  }}
                  className="h-8 px-3.5 rounded-[9px] text-[12.5px] font-semibold transition-colors"
                  style={{
                    background: isActive ? '#1B1E22' : 'transparent',
                    color: isActive ? '#F2F4F7' : '#79808A',
                    border: `1px solid ${isActive ? '#33373E' : '#24272C'}`,
                  }}
                >
                  {opt.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

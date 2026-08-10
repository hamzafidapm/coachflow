'use client';

import { Icon } from '@/components/icon';
import { settingsTabDefs, type SettingsTab } from '@/lib/data/settings';

export function SettingsTabs({ active, onChange }: { active: SettingsTab; onChange: (tab: SettingsTab) => void }) {
  return (
    <div className="p-2 bg-surface border border-border rounded-card flex flex-row lg:flex-col gap-0.5 overflow-x-auto">
      {settingsTabDefs.map((t) => {
        const isActive = active === t.label;
        return (
          <button
            key={t.label}
            type="button"
            onClick={() => onChange(t.label)}
            className="flex items-center gap-2.5 h-11 px-3 rounded-[10px] text-[13px] font-semibold text-left whitespace-nowrap transition-colors hover:bg-[#16191D] hover:text-text"
            style={{ background: isActive ? 'rgba(47,216,166,.12)' : 'transparent', color: isActive ? '#2FD8A6' : '#8A9099' }}
          >
            <Icon name={t.icon} className="text-lg" />
            {t.label}
          </button>
        );
      })}
    </div>
  );
}

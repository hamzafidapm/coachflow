'use client';

import { Icon } from '@/components/icon';
import { useToast } from '@/components/toast';
import { integrations } from '@/lib/data/settings';

export function SettingsIntegrationsTab() {
  const toast = useToast();

  return (
    <div>
      <div className="text-[15px] font-bold">Integrations</div>
      <div className="mt-1.5 text-[12.5px] text-text-faint">Connect payments, calendars and email.</div>

      <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
        {integrations.map((i) => (
          <div
            key={i.name}
            className="flex items-center gap-3.5 p-4 rounded-[13px] bg-[#0F1114] border border-border-hair transition-colors hover:border-[#33373E]"
          >
            <span
              className="w-[38px] h-[38px] flex-none rounded-[11px] flex items-center justify-center"
              style={{ background: i.connected ? 'rgba(47,216,166,.12)' : '#191C20', color: i.connected ? '#2FD8A6' : '#8A9099' }}
            >
              <Icon name={i.icon} className="text-xl" />
            </span>
            <div className="flex-1 min-w-0">
              <div className="text-[13.5px] font-bold">{i.name}</div>
              <div className="mt-0.5 text-[11.5px] text-text-faint">{i.state}</div>
            </div>
            <button
              type="button"
              onClick={() =>
                toast(
                  i.connected ? `${i.name} settings` : `${i.name} connected`,
                  i.connected ? 'Opening connection details.' : 'Authorization complete.',
                )
              }
              className="h-[31px] px-3 rounded-[9px] text-xs font-bold transition-colors"
              style={{
                background: i.connected ? '#15171A' : '#2FD8A6',
                color: i.connected ? '#C6CBD2' : '#06251C',
                border: `1px solid ${i.connected ? '#24272C' : '#2FD8A6'}`,
              }}
            >
              {i.connected ? 'Manage' : 'Connect'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

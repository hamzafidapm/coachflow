'use client';

import { useState, useTransition } from 'react';
import { Icon } from '@/components/icon';
import { useToast } from '@/components/toast';
import { integrationDefs } from '@/lib/data/settings';
import { toggleIntegration, type IntegrationField } from '@/lib/actions/settings';

export function SettingsIntegrationsTab({
  values,
}: {
  values: Record<IntegrationField, boolean>;
}) {
  const toast = useToast();
  const [, startTransition] = useTransition();
  const [state, setState] = useState(values);

  return (
    <div>
      <div className="text-[15px] font-bold">Integrations</div>
      <div className="mt-1.5 text-[12.5px] text-text-faint">Connect payments, calendars and email.</div>

      <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
        {integrationDefs.map((i) => {
          const connected = state[i.field];
          return (
            <div
              key={i.field}
              className="flex items-center gap-3.5 p-4 rounded-[13px] bg-[#0F1114] border border-border-hair transition-colors hover:border-[#33373E]"
            >
              <span
                className="w-[38px] h-[38px] flex-none rounded-[11px] flex items-center justify-center"
                style={{ background: connected ? 'rgba(47,216,166,.12)' : '#191C20', color: connected ? '#2FD8A6' : '#8A9099' }}
              >
                <Icon name={i.icon} className="text-xl" />
              </span>
              <div className="flex-1 min-w-0">
                <div className="text-[13.5px] font-bold">{i.name}</div>
                <div className="mt-0.5 text-[11.5px] text-text-faint">
                  {connected ? i.connectedLabel : 'Not connected'}
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  const next = !connected;
                  setState((s) => ({ ...s, [i.field]: next }));
                  startTransition(() => toggleIntegration(i.field, next));
                  toast(
                    next ? `${i.name} connected` : `${i.name} disconnected`,
                    next ? 'Authorization complete.' : 'You can reconnect any time.',
                  );
                }}
                className="h-[31px] px-3 rounded-[9px] text-xs font-bold transition-colors"
                style={{
                  background: connected ? '#15171A' : '#2FD8A6',
                  color: connected ? '#C6CBD2' : '#06251C',
                  border: `1px solid ${connected ? '#24272C' : '#2FD8A6'}`,
                }}
              >
                {connected ? 'Manage' : 'Connect'}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

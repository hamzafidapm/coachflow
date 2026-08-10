'use client';

import { useState, useTransition } from 'react';
import { useToast } from '@/components/toast';
import { notificationDefs } from '@/lib/data/settings';
import { toggleNotification, type NotificationField } from '@/lib/actions/settings';

export function SettingsNotificationsTab({
  values,
}: {
  values: Record<NotificationField, boolean>;
}) {
  const toast = useToast();
  const [, startTransition] = useTransition();
  const [state, setState] = useState(values);

  function toggle(field: NotificationField) {
    const next = !state[field];
    setState((s) => ({ ...s, [field]: next }));
    startTransition(() => toggleNotification(field, next));
    toast('Preferences saved', next ? 'You’ll get this notification.' : 'This notification is now muted.');
  }

  return (
    <div>
      <div className="text-[15px] font-bold">Notifications</div>
      <div className="mt-1.5 text-[12.5px] text-text-faint">
        Choose what reaches your inbox and what stays in-app.
      </div>

      <div className="mt-5 flex flex-col gap-2.5">
        {notificationDefs.map((n) => {
          const isOn = state[n.field];
          return (
            <div
              key={n.field}
              className="flex items-center justify-between gap-4 py-3.5 px-4 rounded-xl bg-[#0F1114] border border-border-hair"
            >
              <div>
                <div className="text-[13.5px] font-semibold">{n.label}</div>
                <div className="mt-0.5 text-xs text-text-faint">{n.desc}</div>
              </div>
              <button
                type="button"
                onClick={() => toggle(n.field)}
                className="w-10 h-[23px] flex-none rounded-full relative transition-colors duration-200"
                style={{ background: isOn ? '#2FD8A6' : '#26292F' }}
              >
                <span
                  className="absolute top-[3px] w-[17px] h-[17px] rounded-full transition-[left] duration-200"
                  style={{ left: isOn ? '20px' : '3px', background: isOn ? '#06251C' : '#8A9099' }}
                />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

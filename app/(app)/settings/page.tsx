'use client';

import { useState } from 'react';
import { SettingsTabs } from '@/components/settings-tabs';
import { SettingsProfileTab } from '@/components/settings-profile-tab';
import { SettingsBrandingTab } from '@/components/settings-branding-tab';
import { SettingsNotificationsTab } from '@/components/settings-notifications-tab';
import { SettingsIntegrationsTab } from '@/components/settings-integrations-tab';
import { defaultNotifs, type SettingsTab } from '@/lib/data/settings';

export default function SettingsPage() {
  const [tab, setTab] = useState<SettingsTab>('Profile');
  const [notifs, setNotifs] = useState(defaultNotifs);

  function toggleNotif(i: number) {
    setNotifs((n) => n.map((v, idx) => (idx === i ? !v : v)));
  }

  return (
    <div className="grid gap-4 items-start lg:grid-cols-[212px_1fr]">
      <SettingsTabs active={tab} onChange={setTab} />

      <div className="p-6 bg-surface border border-border rounded-card">
        {tab === 'Profile' && <SettingsProfileTab />}
        {tab === 'Branding' && <SettingsBrandingTab />}
        {tab === 'Notifications' && <SettingsNotificationsTab notifs={notifs} onToggle={toggleNotif} />}
        {tab === 'Integrations' && <SettingsIntegrationsTab />}
      </div>
    </div>
  );
}

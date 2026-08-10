'use client';

import { useState } from 'react';
import { SettingsTabs } from '@/components/settings-tabs';
import { SettingsProfileTab } from '@/components/settings-profile-tab';
import { SettingsBrandingTab } from '@/components/settings-branding-tab';
import { SettingsNotificationsTab } from '@/components/settings-notifications-tab';
import { SettingsIntegrationsTab } from '@/components/settings-integrations-tab';
import { type SettingsTab } from '@/lib/data/settings';
import { type NotificationField, type IntegrationField } from '@/lib/actions/settings';

export function SettingsView({
  name,
  email,
  headline,
  bookingHandle,
  accentColor,
  portalTheme,
  notifications,
  integrations,
}: {
  name: string;
  email: string;
  headline: string;
  bookingHandle: string;
  accentColor: string;
  portalTheme: 'DARK' | 'LIGHT';
  notifications: Record<NotificationField, boolean>;
  integrations: Record<IntegrationField, boolean>;
}) {
  const [tab, setTab] = useState<SettingsTab>('Profile');

  return (
    <div className="grid gap-4 items-start lg:grid-cols-[212px_1fr]">
      <SettingsTabs active={tab} onChange={setTab} />

      <div className="p-6 bg-surface border border-border rounded-card">
        {tab === 'Profile' && (
          <SettingsProfileTab name={name} email={email} headline={headline} bookingHandle={bookingHandle} />
        )}
        {tab === 'Branding' && <SettingsBrandingTab accentColor={accentColor} portalTheme={portalTheme} />}
        {tab === 'Notifications' && <SettingsNotificationsTab values={notifications} />}
        {tab === 'Integrations' && <SettingsIntegrationsTab values={integrations} />}
      </div>
    </div>
  );
}

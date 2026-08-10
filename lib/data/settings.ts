export const settingsTabDefs = [
  { label: 'Profile', icon: 'person' },
  { label: 'Branding', icon: 'palette' },
  { label: 'Notifications', icon: 'notifications' },
  { label: 'Integrations', icon: 'extension' },
] as const;

export type SettingsTab = (typeof settingsTabDefs)[number]['label'];

export const profileFields = [
  { label: 'Display name', value: 'Maya Chen' },
  { label: 'Headline', value: 'Business coach for solo consultants' },
  { label: 'Email', value: 'maya@studio.co' },
  { label: 'Booking handle', value: 'coachflow.co/maya' },
];

export const accentSwatches = ['#2FD8A6', '#5B9CFF', '#E9B84C', '#C77DFF', '#FF8E8E'];

export const themeOptions = ['Dark', 'Light'] as const;

export const notificationDefs = [
  { label: 'New booking', desc: 'Email me whenever a client books a slot' },
  { label: 'Payment received', desc: 'Receipts and payout summaries' },
  { label: 'Lesson completed', desc: 'Digest when a student finishes a module' },
  { label: 'Failed payment', desc: 'Immediate alert with retry link' },
  { label: 'Weekly summary', desc: 'Monday morning business recap' },
];

export const defaultNotifs = [true, true, false, true, false];

export const integrations = [
  { name: 'Stripe', state: 'Connected · payouts Fridays', icon: 'payments', connected: true },
  { name: 'Google Calendar', state: 'Connected · 2-way sync', icon: 'calendar_month', connected: true },
  { name: 'Zoom', state: 'Not connected', icon: 'videocam', connected: false },
  { name: 'Mailchimp', state: 'Not connected', icon: 'mail', connected: false },
];

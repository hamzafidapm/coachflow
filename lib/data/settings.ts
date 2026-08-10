export const settingsTabDefs = [
  { label: 'Profile', icon: 'person' },
  { label: 'Branding', icon: 'palette' },
  { label: 'Notifications', icon: 'notifications' },
  { label: 'Integrations', icon: 'extension' },
] as const;

export type SettingsTab = (typeof settingsTabDefs)[number]['label'];

// Static UI-only options — actual selected values live on CoachSettings.
export const accentSwatches = ['#2FD8A6', '#5B9CFF', '#E9B84C', '#C77DFF', '#FF8E8E'];

export const themeOptions = [
  { value: 'DARK', label: 'Dark' },
  { value: 'LIGHT', label: 'Light' },
] as const;

// Label/description metadata for each toggle — the actual booleans come from
// CoachSettings, keyed by `field`.
export const notificationDefs = [
  { field: 'notifyNewBooking', label: 'New booking', desc: 'Email me whenever a client books a slot' },
  { field: 'notifyPaymentReceived', label: 'Payment received', desc: 'Receipts and payout summaries' },
  { field: 'notifyLessonCompleted', label: 'Lesson completed', desc: 'Digest when a student finishes a module' },
  { field: 'notifyFailedPayment', label: 'Failed payment', desc: 'Immediate alert with retry link' },
  { field: 'notifyWeeklySummary', label: 'Weekly summary', desc: 'Monday morning business recap' },
] as const;

// Same idea for integration cards — `connected` comes from CoachSettings.
export const integrationDefs = [
  { field: 'stripeConnected', name: 'Stripe', icon: 'payments', connectedLabel: 'Connected · payouts Fridays' },
  { field: 'googleCalendarConnected', name: 'Google Calendar', icon: 'calendar_month', connectedLabel: 'Connected · 2-way sync' },
  { field: 'zoomConnected', name: 'Zoom', icon: 'videocam', connectedLabel: 'Connected' },
  { field: 'mailchimpConnected', name: 'Mailchimp', icon: 'mail', connectedLabel: 'Connected' },
] as const;

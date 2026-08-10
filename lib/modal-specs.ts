export type ModalSpec = {
  title: string;
  sub: string;
  cta: string;
  fields: { label: string; placeholder: string }[];
};

export const clientModalSpec: ModalSpec = {
  title: 'Add client',
  sub: "They'll get an invite email with portal access.",
  cta: 'Send invite',
  fields: [
    { label: 'Full name', placeholder: 'Alex Moreau' },
    { label: 'Email', placeholder: 'alex@company.com' },
    { label: 'Program', placeholder: 'Momentum OS' },
  ],
};

export const bookingModalSpec: ModalSpec = {
  title: 'New booking',
  sub: 'Creates a calendar hold and emails the client.',
  cta: 'Create booking',
  fields: [
    { label: 'Client', placeholder: 'Search clients…' },
    { label: 'Date & time', placeholder: 'Thu 13 Aug · 10:00' },
    { label: 'Agenda', placeholder: 'What are we covering?' },
  ],
};

export const plansModalSpec: ModalSpec = {
  title: 'Edit pricing tiers',
  sub: 'Changes apply to new subscribers only.',
  cta: 'Save tiers',
  fields: [
    { label: 'Starter', placeholder: '$220 / month' },
    { label: 'Momentum', placeholder: '$450 / month' },
    { label: 'Intensive', placeholder: '$1,200 one-time' },
  ],
};

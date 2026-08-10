export type ClientStatus = 'Active' | 'Trial' | 'Paused' | 'Churned';

export type ClientSeed = {
  name: string;
  email: string;
  status: ClientStatus;
  progress: number;
  lastActive: string;
  ltv: string;
};

// Seed data mirroring the Prisma `Client` model shape (coachId/notes/lastActivityAt
// map to this UI's coachId-scoped list, free-text notes, and lastActive label).
// Swap for `prisma.client.findMany({ where: { coachId } })` once DATABASE_URL points
// at a real Neon database.
export const clients: ClientSeed[] = [
  { name: 'Maya Okonjo', email: 'maya.o@northline.co', status: 'Active', progress: 82, lastActive: '2h ago', ltv: '$4,200' },
  { name: 'Devon Ruiz', email: 'devon@ruizfit.com', status: 'Trial', progress: 24, lastActive: 'Yesterday', ltv: '$0' },
  { name: 'Priya Nair', email: 'priya.nair@mail.com', status: 'Active', progress: 96, lastActive: '4h ago', ltv: '$7,800' },
  { name: 'Tomás Silva', email: 'tomas@silva.studio', status: 'Paused', progress: 61, lastActive: '9 days ago', ltv: '$2,150' },
  { name: 'Erin Walsh', email: 'erin.walsh@hey.com', status: 'Active', progress: 45, lastActive: 'Today', ltv: '$3,400' },
  { name: 'Kofi Mensah', email: 'kofi@brightpath.io', status: 'Active', progress: 73, lastActive: '1h ago', ltv: '$5,600' },
  { name: 'Sofia Rossi', email: 'sofia.rossi@mail.it', status: 'Churned', progress: 38, lastActive: '2 months ago', ltv: '$980' },
  { name: 'Jonas Berg', email: 'jonas@bergco.se', status: 'Trial', progress: 12, lastActive: '3 days ago', ltv: '$0' },
  { name: 'Amara Diallo', email: 'amara@diallo.co', status: 'Active', progress: 88, lastActive: 'Today', ltv: '$6,100' },
  { name: 'Wren Halloway', email: 'wren@halloway.design', status: 'Paused', progress: 52, lastActive: '3 weeks ago', ltv: '$1,750' },
  { name: 'Nikhil Rao', email: 'nikhil@raoventures.com', status: 'Active', progress: 67, lastActive: '6h ago', ltv: '$4,950' },
  { name: 'Clara Bennett', email: 'clara.b@studio9.co', status: 'Active', progress: 34, lastActive: 'Yesterday', ltv: '$2,300' },
];

export { tint, initials } from '@/lib/avatar';

export function statusStyle(status: ClientStatus) {
  const map: Record<ClientStatus, [string, string]> = {
    Active: ['rgba(47,216,166,.13)', '#2FD8A6'],
    Trial: ['rgba(84,150,255,.14)', '#7CB0FF'],
    Paused: ['rgba(240,180,60,.13)', '#E9B84C'],
    Churned: ['rgba(150,158,168,.12)', '#98A0AA'],
  };
  return map[status];
}

export type DetailRow = { icon: string; title: string; meta: string; body: string };

export const clientDetailData: Record<string, Record<'Notes' | 'Payments' | 'Sessions', DetailRow[]>> = {
  default: {
    Notes: [
      { icon: 'sticky_note_2', title: 'Positioning is the bottleneck', meta: 'Aug 4', body: 'Keeps rewriting the offer instead of shipping it. Assigned the 48-hour launch constraint.' },
      { icon: 'sticky_note_2', title: 'Wants async between sessions', meta: 'Jul 22', body: 'Prefers Loom updates over live calls in week 3–4. Trialing a hybrid cadence.' },
    ],
    Payments: [
      { icon: 'payments', title: 'Momentum · Monthly', meta: 'Aug 1', body: '$450 · Visa ending 4218 · succeeded' },
      { icon: 'payments', title: 'Momentum · Monthly', meta: 'Jul 1', body: '$450 · Visa ending 4218 · succeeded' },
      { icon: 'payments', title: 'Intensive add-on', meta: 'Jun 14', body: '$1,200 · one-time · succeeded' },
    ],
    Sessions: [
      { icon: 'videocam', title: 'Strategy call #9', meta: 'Aug 6', body: '50 min · recording + transcript attached' },
      { icon: 'videocam', title: 'Strategy call #8', meta: 'Jul 30', body: '50 min · homework: draft two offer variants' },
    ],
  },
};

export function detailDataFor(_name: string) {
  return clientDetailData.default;
}

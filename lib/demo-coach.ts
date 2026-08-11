import { unstable_cache } from 'next/cache';
import { prisma } from '@/lib/prisma';

// This is a single-coach demo (no multi-tenant auth gate wired up yet), so
// every server-rendered page scopes its queries to whichever User has role
// COACH. That means EVERY page load was doing two sequential round trips —
// this lookup, then the page's own query — for a record that essentially
// never changes. unstable_cache persists the result across requests (not
// just within one render, unlike React's cache()), so it's a real query
// eliminated on every page load after the first, not just a dedupe.
export const getDemoCoach = unstable_cache(
  async () => prisma.user.findFirstOrThrow({ where: { role: 'COACH' } }),
  ['demo-coach'],
  { revalidate: 300, tags: ['demo-coach'] },
);

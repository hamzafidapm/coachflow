import { cache } from 'react';
import { prisma } from '@/lib/prisma';

// This is a single-coach demo (no multi-tenant auth gate wired up yet), so
// every server-rendered page scopes its queries to whichever User has role
// COACH. `cache()` dedupes this lookup within a single request.
export const getDemoCoach = cache(async () => {
  return prisma.user.findFirstOrThrow({ where: { role: 'COACH' } });
});

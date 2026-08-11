import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

function createPrismaClient() {
  const client = new PrismaClient({
    log: [
      { level: 'query', emit: 'event' },
      { level: 'error', emit: 'stdout' },
      { level: 'warn', emit: 'stdout' },
    ],
  });

  // Per-query timing, emitted for every request (dev and prod) — this is the
  // "database query time" half of the performance audit. Each line is one
  // round trip to Postgres; a page that logs N of these took roughly the sum
  // of their durations in DB time alone, separate from render/hydration time.
  // Safe to remove or gate behind an env var once you've captured the
  // numbers you need from a real (non-network-restricted) environment.
  client.$on('query' as never, (e: { query: string; duration: number }) => {
    console.log(`[prisma] ${e.duration}ms  ${e.query.slice(0, 140)}`);
  });

  return client;
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

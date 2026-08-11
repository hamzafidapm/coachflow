// Aggregate server-side timing for a page's data-fetching phase — the
// complement to the per-query Prisma logs (lib/prisma.ts): this shows total
// time spent fetching before render starts, including the getDemoCoach()
// round trip, so it's directly comparable to Next's own
// `GET /route 200 in Xms` dev log line (the gap between the two is render +
// serialization time).
export async function timedFetch<T>(label: string, fn: () => Promise<T>): Promise<T> {
  const start = performance.now();
  try {
    return await fn();
  } finally {
    console.log(`[timing] ${label}: ${(performance.now() - start).toFixed(1)}ms`);
  }
}

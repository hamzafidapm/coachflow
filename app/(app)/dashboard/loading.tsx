import { StatCardsSkeleton, BlockSkeleton } from '@/components/skeleton';

export default function Loading() {
  return (
    <div>
      <StatCardsSkeleton />
      <div className="mt-4 grid gap-4 items-start lg:grid-cols-[1.6fr_1fr]">
        <BlockSkeleton className="h-[358px]" />
        <div className="flex flex-col gap-4">
          <BlockSkeleton className="h-[200px]" />
          <BlockSkeleton className="h-[280px]" />
        </div>
      </div>
    </div>
  );
}

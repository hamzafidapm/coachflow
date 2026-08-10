import { BlockSkeleton, TableSkeleton } from '@/components/skeleton';

export default function Loading() {
  return (
    <div>
      <div className="flex flex-wrap items-center gap-2.5">
        <BlockSkeleton className="h-10 flex-1 min-w-[220px] max-w-[340px]" />
        <BlockSkeleton className="h-10 w-[280px]" />
        <div className="flex-1" />
        <BlockSkeleton className="h-10 w-[130px]" />
      </div>
      <div className="mt-4">
        <TableSkeleton rows={8} />
      </div>
    </div>
  );
}

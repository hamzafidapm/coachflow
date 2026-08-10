import { BlockSkeleton } from '@/components/skeleton';

export default function Loading() {
  return (
    <div>
      <div className="grid gap-4 items-start lg:grid-cols-[1.5fr_1fr]">
        <BlockSkeleton className="h-[280px]" />
        <BlockSkeleton className="h-[280px]" />
      </div>
      <BlockSkeleton className="mt-4 h-[400px]" />
    </div>
  );
}

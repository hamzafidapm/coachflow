import { BlockSkeleton } from '@/components/skeleton';

export default function Loading() {
  return (
    <div className="grid gap-4 items-start lg:grid-cols-[212px_1fr]">
      <BlockSkeleton className="h-[220px]" />
      <BlockSkeleton className="h-[420px]" />
    </div>
  );
}

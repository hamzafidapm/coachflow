import { BlockSkeleton } from '@/components/skeleton';

export default function Loading() {
  return (
    <div>
      <BlockSkeleton className="h-[34px] w-[130px]" />
      <div className="mt-[18px] grid gap-4 items-start lg:grid-cols-[minmax(0,1fr)_340px]">
        <div>
          <BlockSkeleton className="aspect-video w-full" />
          <BlockSkeleton className="mt-[18px] h-[140px]" />
        </div>
        <BlockSkeleton className="h-[420px]" />
      </div>
    </div>
  );
}

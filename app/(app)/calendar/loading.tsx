import { BlockSkeleton } from '@/components/skeleton';

export default function Loading() {
  return (
    <div>
      <div className="flex items-center gap-3">
        <BlockSkeleton className="h-[38px] w-[140px]" />
        <BlockSkeleton className="h-[38px] w-[160px]" />
        <div className="flex-1" />
        <BlockSkeleton className="h-10 w-[140px]" />
      </div>
      <div className="mt-4 grid gap-4 items-start lg:grid-cols-[1fr_300px]">
        <BlockSkeleton className="h-[620px]" />
        <div className="flex flex-col gap-4">
          <BlockSkeleton className="h-[320px]" />
          <BlockSkeleton className="h-[140px]" />
        </div>
      </div>
    </div>
  );
}

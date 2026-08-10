export function Shimmer({ className = '', width, height = 11 }: { className?: string; width?: string; height?: number }) {
  return (
    <div
      className={`rounded-md bg-[linear-gradient(90deg,#171A1E_25%,#20242A_50%,#171A1E_75%)] bg-[length:420px_100%] animate-cfShimmer ${className}`}
      style={{ width, height }}
    />
  );
}

export function StatCardsSkeleton() {
  return (
    <div className="grid gap-4" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))' }}>
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="p-5 bg-surface border border-border rounded-card">
          <div className="flex items-center justify-between">
            <Shimmer width="90px" />
            <Shimmer width="19px" height={19} />
          </div>
          <Shimmer className="mt-3.5" width="70px" height={26} />
          <Shimmer className="mt-3" width="110px" height={11} />
        </div>
      ))}
    </div>
  );
}

export function CardGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="mt-[18px] grid gap-4" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))' }}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="bg-surface border border-border rounded-card overflow-hidden">
          <Shimmer className="h-[132px] rounded-none" width="100%" height={132} />
          <div className="p-4">
            <Shimmer width="70px" height={20} />
            <Shimmer className="mt-3" width="80%" height={15} />
            <Shimmer className="mt-2" width="60%" height={12} />
          </div>
        </div>
      ))}
    </div>
  );
}

export function TableSkeleton({ rows = 6 }: { rows?: number }) {
  return (
    <div className="bg-surface border border-border rounded-card overflow-hidden">
      <div className="h-[46px] bg-[#0F1114] border-b border-border-hair" />
      <div className="py-1.5">
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className="flex items-center gap-3 px-[18px] h-[60px]">
            <Shimmer width="34px" height={34} />
            <Shimmer width={`${140 + (i % 3) * 30}px`} />
          </div>
        ))}
      </div>
    </div>
  );
}

export function BlockSkeleton({ className = '' }: { className?: string }) {
  return <div className={`bg-surface border border-border rounded-card animate-pulse ${className}`} />;
}

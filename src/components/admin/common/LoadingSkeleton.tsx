interface LoadingSkeletonProps {
  type?: "card" | "table" | "stats" | "list";
  count?: number;
}

export default function LoadingSkeleton({
  type = "card",
  count = 1,
}: LoadingSkeletonProps) {
  if (type === "stats") {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="glass-card rounded-2xl p-6">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="h-4 bg-gray-200 rounded w-24 skeleton" />
                <div className="h-10 bg-gray-200 rounded w-32 mt-3 skeleton" />
                <div className="h-3 bg-gray-200 rounded w-20 mt-3 skeleton" />
              </div>
              <div className="w-16 h-16 bg-gray-200 rounded-full skeleton" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (type === "table") {
    return (
      <div className="glass-card rounded-2xl overflow-hidden">
        <div className="p-6 border-b border-white/30">
          <div className="h-6 bg-gray-200 rounded w-48 skeleton" />
        </div>
        <div className="p-6 space-y-4">
          {Array.from({ length: count }).map((_, i) => (
            <div key={i} className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gray-200 rounded-full skeleton" />
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-200 rounded w-3/4 skeleton" />
                <div className="h-3 bg-gray-200 rounded w-1/2 skeleton" />
              </div>
              <div className="w-20 h-8 bg-gray-200 rounded skeleton" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (type === "list") {
    return (
      <div className="space-y-4">
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className="glass-card rounded-xl p-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gray-200 rounded skeleton" />
              <div className="flex-1 space-y-2">
                <div className="h-5 bg-gray-200 rounded w-3/4 skeleton" />
                <div className="h-4 bg-gray-200 rounded w-1/2 skeleton" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Default: card skeleton
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="glass-card rounded-xl overflow-hidden">
          <div className="w-full h-48 bg-gray-200 skeleton" />
          <div className="p-4 space-y-3">
            <div className="h-5 bg-gray-200 rounded w-3/4 skeleton" />
            <div className="h-4 bg-gray-200 rounded w-full skeleton" />
            <div className="h-4 bg-gray-200 rounded w-2/3 skeleton" />
            <div className="flex gap-2 mt-4">
              <div className="h-10 bg-gray-200 rounded flex-1 skeleton" />
              <div className="h-10 bg-gray-200 rounded flex-1 skeleton" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

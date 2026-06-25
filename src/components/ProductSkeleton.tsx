export default function ProductSkeleton() {
  return (
    <div className="bg-white rounded-xl border border-gray-100 overflow-hidden animate-pulse">
      <div className="aspect-[4/5] bg-gray-200" />
      <div className="p-4 space-y-3">
        <div className="h-3 bg-gray-200 rounded w-1/3" />
        <div className="h-4 bg-gray-200 rounded w-3/4" />
        <div className="h-5 bg-gray-200 rounded w-1/2" />
        <div className="flex gap-1">
          <div className="h-6 w-8 bg-gray-200 rounded" />
          <div className="h-6 w-8 bg-gray-200 rounded" />
          <div className="h-6 w-8 bg-gray-200 rounded" />
        </div>
      </div>
    </div>
  );
}

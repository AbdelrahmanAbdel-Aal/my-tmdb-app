export default function MovieDetailsSkeleton() {
  return (
    <div className="p-6 animate-pulse">
      <div className="h-6 w-24 bg-gray-700 mb-6 rounded" />

      <div className="flex gap-6">
        <div className="w-64 h-96 bg-gray-700 rounded" />

        <div className="flex-1 space-y-4">
          <div className="h-8 w-1/2 bg-gray-700 rounded" />
          <div className="h-4 w-full bg-gray-700 rounded" />
          <div className="h-4 w-3/4 bg-gray-700 rounded" />
          <div className="h-4 w-32 bg-gray-700 rounded" />
        </div>
      </div>
    </div>
  );
}

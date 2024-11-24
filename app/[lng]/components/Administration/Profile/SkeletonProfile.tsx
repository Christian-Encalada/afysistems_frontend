export default function SkeletonProfile() {
  return (
    <div className="animate-pulse">
      {/* Skeleton para el Header */}
      <div className="mb-6">
        <div className="h-10 w-1/2 bg-gray-200 rounded-md dark:bg-gray-700"></div>
        <div className="h-6 w-1/3 mt-2 bg-gray-200 rounded-md dark:bg-gray-700"></div>
      </div>

      {/* Skeleton para el Formulario */}
      <div className="grid grid-cols-2 gap-x-6 gap-y-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={index} className="relative mb-2 grid gap-2">
            <div className="h-6 bg-gray-200 rounded-md dark:bg-gray-700"></div>
            <div className="h-10 bg-gray-200 rounded-md dark:bg-gray-700"></div>
          </div>
        ))}
      </div>
    </div>
  );
}

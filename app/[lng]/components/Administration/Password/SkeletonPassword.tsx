export default function SkeletonPasswordForm() {
  return (
    <div className="animate-pulse max-w-md p-6 bg-white dark:bg-dark-secondary shadow-md rounded-lg ml-0">
      <div className="h-6 bg-gray-200 rounded-md dark:bg-gray-700 mb-4"></div>
      <div className="space-y-4">
        <div className="h-10 bg-gray-200 rounded-md dark:bg-gray-700"></div>
        <div className="h-10 bg-gray-200 rounded-md dark:bg-gray-700"></div>
        <div className="h-10 bg-gray-200 rounded-md dark:bg-gray-700"></div>
      </div>
    </div>
  );
}

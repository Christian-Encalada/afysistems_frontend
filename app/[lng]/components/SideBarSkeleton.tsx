export default function SideBarSkeleton() {
  return (
    <div className='flex h-full'>
      <div className='flex animate-pulse flex-col items-center gap-1 border-r border-text-primary border-opacity-15 bg-white px-3 py-6 dark:border-r-2 dark:border-dark-text-secondary dark:border-opacity-40 dark:bg-dark-primary'>
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className='mb-4 h-10 w-12 rounded bg-gray-300 dark:bg-gray-600'
          />
        ))}
      </div>
      <div className='w-60 animate-pulse bg-white py-8 pl-8 pr-6 shadow-md dark:bg-dark-primary'>
        <div className='mb-6 h-8 w-3/4 rounded bg-gray-300 dark:bg-gray-600' />
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className='mb-4 h-8 w-full rounded bg-gray-300 dark:bg-gray-600'
          />
        ))}
      </div>
    </div>
  );
}

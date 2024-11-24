import React from 'react';

export default function SkeletonForm({ rows = 10 }) {
  return (
    <div className='grid grid-cols-2 gap-x-6 gap-y-4 py-4'>
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div key={rowIndex} className='relative mb-2 grid gap-2'>
          <div className='h-6 animate-pulse rounded bg-gray-200 dark:bg-gray-700'></div>
          <div className='h-10 animate-pulse rounded bg-gray-200 dark:bg-gray-700'></div>
        </div>
      ))}
    </div>
  );
}

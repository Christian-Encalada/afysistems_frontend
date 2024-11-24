"use client"

export const FormSkeleton: React.FC = () => {
  return (
    <div className="p-4">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="p-4 mb-4 bg-gray-300 animate-pulse rounded">
          <div className="h-4 w-1/3 bg-gray-400 mb-2"></div>
          <div className="h-8 w-full bg-gray-400"></div>
        </div>
      ))}
    </div>
  );
};

import { cn } from '@/utils/utils';

import { DataTableColorHeaderProps } from '@/types/table';

export default function DataTableColorHeader<TData, TValue>({
  color,
  className,
}: DataTableColorHeaderProps) {
  function handleColorChange(color: string | undefined) {
    if (color === '') {
      return 'transparent';
    }
    return color;
  }

  return (
    <>
      {color ? (
        <div
          style={{ backgroundColor: handleColorChange(color) }}
          className={`${cn(className)} h-7 w-20 rounded-md border border-black dark:border-slate-900`}
        ></div>
      ) : (
        <></>
      )}
    </>
  );
}

import { DataTableLogoHeaderProps } from '@/types/table';
import { LuImage } from 'react-icons/lu';

export default function DataTableLogoHeader<TData, TValue>({
  logoName = null,
}: DataTableLogoHeaderProps) {
  return (
    <>
      {logoName ? (
        <div className='flex flex-col items-center gap-3'>
          <LuImage size={25} />
        </div>
      ) : (
        <></>
      )}
    </>
  );
}

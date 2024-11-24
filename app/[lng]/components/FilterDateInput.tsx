import { FilterDateInputProps } from '@/types/table';

export default function FilterDateInput({
  id,
  label,
  value,
  onChange,
}: FilterDateInputProps) {
  return (
    <div className='flex flex-col gap-2'>
      <label
        htmlFor={id}
        className='text-sm text-text-primary dark:text-dark-text-primary'
      >
        {label}
      </label>
      <input
        type='date'
        id={id}
        value={value}
        onChange={onChange}
        className='max-w-sm rounded border-0 bg-bg-primary-opacity p-2 text-sm text-text-primary placeholder:text-text-primary dark:bg-dark-primary dark:text-dark-text-primary dark:placeholder-dark-text-secondary'
      />
    </div>
  );
}

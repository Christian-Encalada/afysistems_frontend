import { FilterInputProps } from '@/types/table';

export default function FilterInput({
  id,
  placeholder,
  value,
  type,
  onChange,
}: FilterInputProps) {
  return (
    <input
      type="text"
      id={id}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="bg-white text-text-primary border border-slate-400 dark:border-slate-400 dark:bg-dark-text-secondary dark:text-dark-text-primary font-normal rounded px-4 py-2 text-sm"
    />
  );
}

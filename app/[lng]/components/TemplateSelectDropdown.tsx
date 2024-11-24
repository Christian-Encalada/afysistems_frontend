import { useTranslation } from '@/i18n/client';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/selectClient';
import { useEffect, useState } from 'react';

export default function SelectDropdown({
  items,
  fieldName,
  register,
  lng,
  placeholder,
  selectedValue,
  onValueChange,
}: {
  items: any[];
  fieldName: string;
  register: any;
  lng: string;
  placeholder: string;
  selectedValue?: string | number | boolean | null;
  onValueChange?: (val: string | number) => void;
}) {
  const { t } = useTranslation(lng, 'clients');
  const [value, setValue] = useState(selectedValue?.toString() || '');

  useEffect(() => {
    setValue(selectedValue?.toString() || '');
  }, [selectedValue]);

  return (
    <div className="h-full">
      <Select
        value={value}
        onValueChange={(val: string) => {
          const parsedValue = val === 'true' ? true : val === 'false' ? false : val;
          setValue(parsedValue.toString());

          if (onValueChange) {
            onValueChange(Number(parsedValue));
          }

          register(fieldName).onChange({
            target: { value: parsedValue, name: fieldName },
          });
        }}
      >
        <SelectTrigger className="w-full rounded-md bg-white border border-slate-300 px-3 py-3 text-black text-sm dark:bg-dark-secondary dark:text-dark-text-primary dark:border-slate-700">
          <SelectValue placeholder={t(placeholder as any)} />
        </SelectTrigger>
        <SelectContent>
          {items.map((item) => (
            <SelectItem key={item.id.toString()} value={item.id.toString()}>
              {item.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

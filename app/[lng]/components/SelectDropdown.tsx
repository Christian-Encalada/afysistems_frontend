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
}: {
  items: any[];
  fieldName: string;
  register: any;
  lng: string;
  placeholder: string;
  selectedValue?: number | boolean | string;
}) {
  const { t } = useTranslation(lng, 'clients');
  const [value, setValue] = useState(selectedValue?.toString() || '');

  useEffect(() => {
    setValue(selectedValue?.toString() || '');
  }, [selectedValue]);

  return (
    <div className='h-full'>
      <Select
        value={value}
        onValueChange={(val: string) => {
          setValue(val);
          const parsedValue =
            val === 'true' ? true : val === 'false' ? false : val;
          register(fieldName).onChange({
            target: { value: parsedValue, name: fieldName },
          });
        }}
      >
        <SelectTrigger className='m-0 h-full border border-slate-400 bg-white px-3 py-3 text-text-primary dark:bg-dark-secondary dark:text-dark-text-primary'>
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

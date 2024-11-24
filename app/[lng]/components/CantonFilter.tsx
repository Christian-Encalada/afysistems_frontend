import { useState, useEffect } from 'react';
import { Combobox } from './Combobox';
import { getAllCantons } from '../services/cantonService';
import { XCircleIcon } from 'lucide-react';

export default function CantonFilter({
  onSelect,
  lng,
}: {
  onSelect: (cantonName: string) => void;
  lng: string;
}) {
  const [cantons, setCantons] = useState<{ value: string; label: string }[]>(
    []
  );
  const [selectedCanton, setSelectedCanton] = useState<string>('');

  useEffect(() => {
    const fetchCantons = async () => {
      try {
        const response = await getAllCantons();
        setCantons(
          response.map((canton: any) => ({
            value: canton.name.toString(),
            label: canton.name.toString(),
          }))
        );
      } catch (error) {
        console.error('Error fetching cantons:', error);
      }
    };

    fetchCantons();
  }, []);

  const handleSelect = (cantonName: string) => {
    setSelectedCanton(cantonName);
    onSelect(cantonName);
  };

  const clearSelection = () => {
    setSelectedCanton('');
    onSelect('');
  };

  return (
    <div className='flex items-center'>
      <Combobox
        items={cantons}
        value={selectedCanton}
        onChange={handleSelect}
        type='clients'
        lng={lng}
      />
      {selectedCanton && (
        <button
          onClick={clearSelection}
          className='ml-2 text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-600'
          aria-label='Clear selection'
        >
          <XCircleIcon className='h-4 w-4' />
        </button>
      )}
    </div>
  );
}

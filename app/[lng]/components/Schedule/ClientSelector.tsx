import { Popover, PopoverContent, PopoverTrigger } from '../ui/popoverClient';
import { Search } from 'lucide-react';
import { Input } from '../ui/input';

export default function ClientSelector({
  clientSearch,
  setClientSearch,
  isSearching,
  filteredClients,
  selectedClient,
  setSelectedClient,
  searchError,
}: {
  clientSearch: string;
  setClientSearch: (value: string) => void;
  isSearching: boolean;
  filteredClients: { id: string; name: string; document: string }[];
  selectedClient: { id: string; name: string } | null;
  setSelectedClient: (value: { id: string; name: string } | null) => void;
  searchError: string | null;
}) {
  return (
    <div className='space-y-2'>
      <label
        htmlFor='client'
        className='font-medium text-text-primary dark:text-text-secondary'
      >
        Cliente
      </label>
      <Popover>
        <PopoverTrigger asChild>
          <div className='relative'>
            <Input
              type='number'
              id='client'
              placeholder='Buscar por cédula...'
              value={clientSearch}
              onChange={(e) => setClientSearch(e.target.value)}
              className='pl-10 dark:bg-dark-secondary'
            />
            <Search className='text-muted-foreground absolute left-3 top-3 h-4 w-4' />
          </div>
        </PopoverTrigger>
        <PopoverContent className='w-[400px] p-0' align='start'>
          {isSearching ? (
            <p className='p-2 text-center text-sm'>Buscando clientes...</p>
          ) : filteredClients.length === 0 && clientSearch ? (
            <p className='p-2 text-center text-sm'>
              No se encontraron clientes
            </p>
          ) : (
            <ul className='max-h-[200px] overflow-auto'>
              {filteredClients.map((client) => (
                <li
                  key={client.id}
                  className='hover dark:hover cursor-pointer p-2 text-sm'
                  onClick={() => {
                    setSelectedClient({ id: client.id, name: client.name });
                    setClientSearch(client.document || '');
                  }}
                >
                  {client.name} - {client.document}
                </li>
              ))}
            </ul>
          )}
        </PopoverContent>
      </Popover>
      {selectedClient && (
        <p className='text-sm text-text-primary dark:text-text-secondary'>
          Cliente seleccionado:{' '}
          <span className='font-medium'>{selectedClient.name}</span>
        </p>
      )}
      {searchError && (
        <p className='rounded bg-red-50 p-2 text-sm text-red-500 dark:bg-red-900/10'>
          {searchError}
        </p>
      )}
    </div>
  );
}

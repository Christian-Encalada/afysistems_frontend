export default function DescriptionInput({
  description,
  setDescription,
}: {
  description: string;
  setDescription: (value: string) => void;
}) {
  return (
    <div className='space-y-2'>
      <label
        htmlFor='description'
        className='font-normal text-text-primary dark:font-light dark:text-text-secondary'
      >
        Descripción de la Cita
      </label>
      <textarea
        id='description'
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className='w-full rounded border border-slate-400 bg-white px-3 py-2 text-sm text-text-primary placeholder:font-normal placeholder:text-slate-400 dark:bg-dark-secondary dark:text-dark-text-primary'
        placeholder='Escriba la descripción de la cita'
      />
    </div>
  );
}

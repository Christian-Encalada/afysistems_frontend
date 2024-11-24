export default function TitleInput({
  title,
  setTitle,
}: {
  title: string;
  setTitle: (value: string) => void;
}) {
  return (
    <div className='space-y-2'>
      <label
        htmlFor='title'
        className='font-normal text-text-primary dark:font-light dark:text-text-secondary'
      >
        Título de la Cita
      </label>
      <input
        id='title'
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className='w-full rounded border border-slate-400 bg-white px-3 py-2 text-sm text-text-primary placeholder:font-normal placeholder:text-slate-400 dark:bg-dark-secondary dark:text-dark-text-primary'
        placeholder='Escriba el título de la cita'
      />
    </div>
  );
}

import { TFunction } from 'i18next';

interface FormHeaderProps {
  formTitle: string;
  formDescription: string;
  onTitleChange: (title: string) => void;
  onDescriptionChange: (description: string) => void;
  t: TFunction<'files'>;
}

export const FormHeader: React.FC<FormHeaderProps> = ({
  formTitle,
  formDescription,
  onTitleChange,
  onDescriptionChange,
  t,
}) => (
  <div className="bg-white dark:bg-dark-primary border border-slate-400 dark:border-slate-800 rounded-lg p-6 shadow-md mb-8">
    <input
      type="text"
      className="w-full text-3xl font-bold mb-2 border-none focus:outline-none focus:ring-0 text-gray-900 bg-transparent dark:text-gray-100"
      data-testid="form-title-input"
      placeholder={t('form_title_placeholder')}
      value={formTitle}
      onChange={(e) => onTitleChange(e.target.value)}
    />
    <input
      type="text"
      className="w-full text-lg mb-6 border-none focus:outline-none focus:ring-0 bg-transparent text-gray-900 dark:text-gray-100"
      placeholder={t('form_description_placeholder')}
      value={formDescription}
      onChange={(e) => onDescriptionChange(e.target.value)}
      data-testid="form-description-input"
    />
  </div>
);

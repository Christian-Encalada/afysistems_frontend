import React from 'react';
import DatePicker from '../DatePicker';
import { XCircle, PlusIcon } from 'lucide-react';
import { QuestionInputProps } from '@/types/filesTypes';
import { useTranslation } from 'react-i18next';

const QuestionInput: React.FC<QuestionInputProps> = ({
  question,
  onContentChange,
  onFileChange,
  handleOptionChange,
  addOption,
  removeOption,
}) => {
  const { t } = useTranslation('files');

  const renderInputField = () => {
    switch (question.type) {
      case 'text':
        return (
          <input
            type="text"
            placeholder={t('placeholder.short_answer')}
            className="w-full p-3 mb-2 text-sm sm:text-base rounded-lg border border-slate-400 bg-white text-text-primary dark:bg-dark-secondary dark:text-dark-text-primary dark:border-slate-800"
            value={question.content}
            maxLength={question.maxLength || 200}
            onChange={(e) => onContentChange(e.target.value)}
            data-testid="question-text-input"
          />
        );
      case 'number':
        return (
          <input
            type="number"
            placeholder={t('placeholder.number')}
            className="w-full p-3 mb-2 text-sm sm:text-base rounded-lg border border-slate-400 bg-white text-text-primary dark:bg-dark-secondary dark:text-dark-text-primary dark:border-slate-800"
            value={question.content}
            onChange={(e) => onContentChange(e.target.value)}
            data-testid="question-number-input"
          />
        );
      case 'email':
        return (
          <input
            type="email"
            placeholder={t('placeholder.email')}
            className="w-full p-3 mb-2 text-sm sm:text-base rounded-lg border border-slate-400 bg-white text-text-primary dark:bg-dark-secondary dark:text-dark-text-primary dark:border-slate-800"
            value={question.content}
            onChange={(e) => onContentChange(e.target.value)}
            data-testid="question-email-input"
          />
        );
      case 'select':
      case 'multiselect':
        return (
          <div className="space-y-2" data-testid={`question-${question.type}-input`}>
            {question.options?.map((option, idx) => (
              <div key={idx} className="flex items-center space-x-2">
                {question.type === 'multiselect' && (
                  <input
                    type="checkbox"
                    className="form-checkbox text-blue-600"
                  />
                )}
                <input
                  type="text"
                  placeholder={t('placeholder.option', { number: idx + 1 })}
                  className="w-full p-3 mb-2 text-sm sm:text-base rounded-lg border border-slate-400 bg-white text-text-primary dark:bg-dark-secondary dark:text-dark-text-primary dark:border-slate-800"
                  value={option}
                  onChange={(e) => handleOptionChange(idx, e.target.value)}
                  data-testid={`question-option-${idx}-input`}
                />
                <button onClick={() => removeOption(idx)} className="text-red-500 hover:text-red-700">
                  <XCircle className="h-5 w-5" />
                </button>
              </div>
            ))}
            <button
              onClick={addOption}
              className="dark:text-dark-text-white flex items-center justify-center gap-3 rounded-lg bg-bg-primary px-4 py-2 sm:py-3 text-sm sm:text-base text-text-secondary dark:bg-dark-primary hover:bg-opacity-90"
            >
              <PlusIcon className="h-5 w-5 mr-1" />
              {t('button.add_option')}
            </button>
          </div>
        );
      case 'file':
        return (
          <input
            type="file"
            className="w-full p-3 mb-2 rounded-lg border border-slate-400 bg-white text-text-primary dark:bg-dark-secondary dark:text-dark-text-primary dark:border-slate-800"
            onChange={(e) => onFileChange?.(e.target.files ? e.target.files[0] : null)}
            data-testid="question-file-input"
          />
        );
      case 'date':
        return (
          <DatePicker
            onChange={(date) => onContentChange(date ? date.toISOString() : '')}
            lng={question.lng || 'default-lng'}
            type="files"
            className="flex w-full p-3 mb-2 text-sm sm:text-base rounded-lg border border-slate-400 bg-white text-text-primary dark:bg-dark-secondary dark:text-dark-text-primary dark:border-slate-800"
            data-testid="question-date-input"
          />
        );
      case 'section':
        return (
          <div className="my-4 border-b border-slate-300 dark:border-slate-700" data-testid="question-section-divider">
            <p className="text-sm sm:text-lg font-semibold text-gray-700 dark:text-gray-300">
              {t('section_title')}
            </p>
          </div>
        );
      default:
        return null;
    }
  };

  return <>{renderInputField()}</>;
};

export default QuestionInput;

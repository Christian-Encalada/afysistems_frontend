import React, { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { motion, useDragControls } from 'framer-motion';
import { TrashIcon, Copy } from 'lucide-react';
import { QuestionSectionProps } from '@/types/filesTypes';
import { useTranslation } from 'react-i18next';
import QuestionInput from './QuestionInput';
import { ITEM_TYPE } from '@/types/useQuestionTypes';

export const QuestionSection: React.FC<QuestionSectionProps> = ({
  question,
  index,
  lng,
  isActive,
  onQuestionClick,
  onRemove,
  onDuplicate,
  onContentChange,
  onLabelChange,
  onRequiredChange,
  onOptionsChange,
  onFileChange,
}) => {
  const { t } = useTranslation('files');
  const dragControls = useDragControls();
  const ref = useRef<HTMLDivElement>(null);

  const [{ isDragging }, drag] = useDrag({
    type: ITEM_TYPE,
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: ITEM_TYPE,
    hover: (draggedItem: { index: number }) => {
      // Lógica de arrastre
    },
  });

  drag(drop(ref));

  const handleOptionChange = (optionIndex: number, value: string) => {
    if (question.options) {
      const newOptions = [...question.options];
      newOptions[optionIndex] = value;
      onOptionsChange?.(newOptions);
    }
  };

  const addOption = () => {
    onOptionsChange?.([...(question.options || []), '']);
  };

  const removeOption = (optionIndex: number) => {
    if (question.options) {
      const newOptions = question.options.filter((_, idx) => idx !== optionIndex);
      onOptionsChange?.(newOptions);
    }
  };

  return (
    <motion.div
      ref={ref}
      layout
      onClick={() => onQuestionClick(question.id)}
      initial={{ opacity: 0.8, scale: 0.95 }}
      animate={{ opacity: isDragging ? 0.5 : 1, scale: isDragging ? 1.05 : 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ type: "spring", damping: 15, stiffness: 300 }}
      className={`
        mt-4 bg-white dark:bg-dark-primary border 
        ${isActive ? 'border-blue-500 ring-2 ring-blue-200' : 'border-slate-400 dark:border-slate-800'} 
        rounded-lg p-4 sm:p-6 shadow-md cursor-pointer transition-all duration-200
      `}
    >
      <input
        type="text"
        className="block mb-2 text-sm sm:text-base font-bold text-text-primary dark:text-dark-text-primary w-full p-2 border rounded-lg bg-gray-200 dark:bg-gray-700"
        placeholder={t('placeholder.question', { number: index + 1 })}
        value={question.label}
        onChange={(e) => onLabelChange(e.target.value)}
        data-testid="question-label-input"
      />
      <QuestionInput
        lng={lng}
        question={question}
        onContentChange={onContentChange}
        onOptionsChange={onOptionsChange}
        onFileChange={onFileChange}
        handleOptionChange={handleOptionChange}
        addOption={addOption}
        removeOption={removeOption}
      />
      <div className="flex flex-col sm:flex-row sm:space-x-2 space-y-2 sm:space-y-0 mt-4">
        <button
          className="w-full sm:w-auto dark:text-dark-text-white flex items-center justify-center gap-3 rounded-lg bg-bg-primary px-4 py-3 text-sm text-text-secondary dark:bg-dark-primary hover:bg-opacity-90"
          onClick={onRemove}
          data-testid={`remove-question-button-${index}`}
        >
          <TrashIcon className="h-5 w-5 mr-1" />
          {t('button.remove')}
        </button>
        <button
          className="w-full sm:w-auto dark:text-dark-text-white flex items-center justify-center gap-3 rounded-lg bg-bg-primary px-4 py-3 text-sm text-text-secondary dark:bg-dark-primary hover:bg-opacity-90"
          onClick={onDuplicate}
          data-testid={`duplicate-question-button-${index}`}
        >
          <Copy className="h-5 w-5 mr-1" />
          {t('button.duplicate')}
        </button>
        <div className="flex items-center space-x-2 sm:ml-auto">
          <label className="text-sm font-medium text-text-primary dark:text-dark-text-primary">
            {t('label.required')}
          </label>
          <div
            onClick={() => onRequiredChange(!question.required)}
            className={`relative w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition-all duration-300 ${
              question.required ? 'bg-blue-500' : 'bg-gray-300 dark:bg-dark-secondary'
            }`}
            data-testid={`question-required-toggle-${index}`}
          >
            <div
              className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${question.required ? 'translate-x-6' : ''}`}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

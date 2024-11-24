import React, { useEffect, useRef, useState } from 'react';
import { useQuestionTypes } from '@/types/useQuestionTypes';
import { QuestionType } from '@/types/useQuestionTypes';

interface AddButtonProps {
  onAction: (type: QuestionType) => void;
  activeQuestionIndex?: number | null; // Sincronizar con la pregunta activa
}

export const AddButton: React.FC<AddButtonProps> = ({ onAction, activeQuestionIndex }) => {
  const questionTypes = useQuestionTypes();
  const [position, setPosition] = useState<number>(0);
  const toolbarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (activeQuestionIndex !== null && toolbarRef.current) {
      const activeElement = document.querySelector(`[data-question-index="${activeQuestionIndex}"]`);
      if (activeElement) {
        const rect = activeElement.getBoundingClientRect();
        setPosition(window.scrollY + rect.top);
      }
    }
  }, [activeQuestionIndex]);

  return (
    <div
      ref={toolbarRef}
      style={{ top: `${position}px` }}
      className="fixed right-4 bg-white dark:bg-dark-primary border border-gray-400 dark:border-slate-700 rounded-lg shadow-lg p-2 flex flex-col gap-2 transition-transform duration-300"
    >
      {questionTypes.map((questionType) => (
        <button
          key={questionType.type}
          onClick={() => onAction(questionType.type as QuestionType)}
          className="flex items-center justify-center p-2 hover:bg-blue-200 dark:hover:bg-slate-700 rounded transition-all duration-200"
        >
          {React.cloneElement(questionType.icon, { className: 'w-5 h-5 text-gray-500 dark:text-gray-300' })}
        </button>
      ))}
    </div>
  );
};

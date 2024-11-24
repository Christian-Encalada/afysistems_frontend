import { useState } from 'react';
import { Section, FormData } from '@/types/filesTypes';
import { Question } from '@/types/filesTypes';
import { TFunction } from 'i18next';
import { QuestionType } from '@/types/useQuestionTypes';

export const useFormData = (initialFormId?: number) => {
  const [formTitle, setFormTitle] = useState('');
  const [formDescription, setFormDescription] = useState('');
  const [sections, setSections] = useState<Section[]>([]);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(false);

  const addSection = (t: TFunction<'files'>) => {
    const newSection: Section = {
      id: `section-${Date.now()}`,
      title: `${t('section_title')} ${sections.length + 1}`,
      questions: [],
      isExpanded: true,
      order: sections.length, // Asigna un orden basado en el índice
    };
    setSections([...sections, newSection]);
    return sections.length;
  };
  

  const toggleSection = (sectionIndex: number) => {
    const updatedSections = [...sections];
    updatedSections[sectionIndex].isExpanded = !updatedSections[sectionIndex].isExpanded;
    setSections(updatedSections);
  };

  const addQuestion = (
    type: QuestionType,
    t: TFunction<'files'>,
    sectionIndex?: number, // Índice de la sección activa
    activeQuestionId?: string | null
  ): string => {
    const newQuestion: Question = {
      id: `question-${Date.now()}`,
      type: type,
      label: `${t('question')} ${
        sectionIndex !== undefined
          ? sections[sectionIndex].questions.length + 1
          : questions.length + 1
      }`,
      content: '',
      options: type === 'select' || type === 'multiselect' ? [t('option_1'), t('option_2')] : [],
      maxLength: type === 'text' ? 200 : undefined,
      file: null,
      required: false,
    };
  
    if (sectionIndex !== undefined) {
      // Si la sección está activa, agregar dentro de ella
      const updatedSections = [...sections];
      const activeQuestionIndex = updatedSections[sectionIndex].questions.findIndex(
        (q) => q.id === activeQuestionId
      );
  
      if (activeQuestionIndex !== -1) {
        // Insertar debajo de la pregunta activa dentro de la sección
        updatedSections[sectionIndex].questions.splice(activeQuestionIndex + 1, 0, newQuestion);
      } else {
        // Agregar al final de la sección si no hay pregunta activa
        updatedSections[sectionIndex].questions.push(newQuestion);
      }
  
      setSections(updatedSections);
    } else {
      // Si no hay sección activa, agregar a la lista global de preguntas
      const activeQuestionIndex = questions.findIndex((q) => q.id === activeQuestionId);
  
      if (activeQuestionIndex !== -1) {
        const updatedQuestions = [...questions];
        updatedQuestions.splice(activeQuestionIndex + 1, 0, newQuestion);
        setQuestions(updatedQuestions);
      } else {
        setQuestions([...questions, newQuestion]);
      }
    }
  
    return newQuestion.id;
  };
  
  
  
  const updateSectionTitle = (sectionIndex: number, newTitle: string) => {
    const updatedSections = [...sections];
    updatedSections[sectionIndex].title = newTitle;
    setSections(updatedSections);
  };

  const getFormData = (): FormData => ({
    title: formTitle,
    description: formDescription,
    sections,
    questions,
  });

  return {
    formTitle,
    setFormTitle,
    formDescription,
    setFormDescription,
    sections,
    setSections,
    questions,
    setQuestions,
    loading,
    setLoading,
    addSection,
    toggleSection,
    addQuestion,
    updateSectionTitle,
    getFormData,
  };
};
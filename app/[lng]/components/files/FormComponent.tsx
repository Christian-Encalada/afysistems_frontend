import React, { useState, useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useFormData } from '@/[lng]/hooks/useFormData';
import { FormHeader } from './FormHeader';
import { SectionHeader } from './SectionHeader';
import { QuestionSection } from './QuestionSection';
import { getFormById, createForm, updateForm, generateFormPreview } from '@/[lng]/services/formsService';
import { toast } from 'react-toastify';
import SmallLoader from '../../components/SmallLoader';
import { FloatingToolbar } from './FloatingToolbar';

interface FormComponentProps {
  lng: string;
  onBack: () => void;
  formId?: number;
  onPreviewUpdate?: (previewUrl: string | null) => void;
}

export const FormComponent: React.FC<FormComponentProps> = ({
  lng,
  onBack,
  formId,
  onPreviewUpdate,
}) => {
  const { t } = useTranslation('files');
  const [activeSectionId, setActiveSectionId] = useState<string | null>(null);
  const [activeQuestionId, setActiveQuestionId] = useState<string | null>(null);

  const {
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
  } = useFormData();

  useEffect(() => {
    if (formId) {
      loadForm(formId);
    }
  }, [formId]);

  const loadForm = async (id: number) => {
    setLoading(true);
    try {
      const form = await getFormById(id);
      setFormTitle(form.title);
      setFormDescription(form.description);
      setSections(form.sections || []);
      setQuestions(form.questions || []);
    } catch (error: any) {
      toast.error(
        t('error_loading_form', {
          error: error.response?.data?.message || error.message,
        })
      );
    } finally {
      setLoading(false);
    }
  };

  const formatFormData = () => {
    return {
      title: formTitle,
      description: formDescription,
      questions: questions.map((question) => ({
        label: question.label,
        content: question.content || '',
        type: question.type,
        options: question.options || [],
        required: question.required || false,
      })),
      sections: sections.map((section) => ({
        title: section.title,
        order: section.order || 0,
        questions: section.questions.map((question) => ({
          label: question.label,
          content: question.content || '',
          type: question.type,
          options: question.options || [],
          required: question.required || false,
        })),
      })),
    };
  };

  const onSubmit = async () => {
    setLoading(true);
    try {
      const formData = formatFormData();
      let formResponse;

      if (formId) {
        formResponse = await updateForm(formId, formData);
        toast.success(t('form_updated'), { autoClose: 2000 });
      } else {
        formResponse = await createForm(formData);
        toast.success(t('form_created'), { autoClose: 2000 });
      }

      const previewUrl = await generateFormPreview({
        formId: formResponse.id,
        ...formData,
      });

      if (onPreviewUpdate) {
        onPreviewUpdate(previewUrl);
      }

      onBack();
    } catch (error: any) {
      toast.error(`Error: ${error.response?.data?.message || error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleSectionClick = (sectionId: string) => {
    setActiveSectionId(sectionId);
    setActiveQuestionId(null);
  };

  const handleQuestionClick = (questionId: string) => {
    setActiveQuestionId(questionId);
    setActiveSectionId(null);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="form-component relative space-y-4 w-full mx-auto min-h-screen sm:p-6 md:p-8 dark:bg-dark-secondary" data-testid="form-component">
        <button
          onClick={onBack}
          className="mb-4 flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100 transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
          <span className="text-sm sm:text-base">{t('back_to_list')}</span>
        </button>

        <div className="form-header">
          <FormHeader
            formTitle={formTitle}
            formDescription={formDescription}
            onTitleChange={setFormTitle}
            onDescriptionChange={setFormDescription}
            t={t}
          />
        </div>

        <FloatingToolbar
          onAction={(type) => {
            if (type === 'section') {
              const newSectionId = addSection(t);
              handleSectionClick(newSectionId.toString());
            } else {
              const activeSectionIndex = activeSectionId
                ? sections.findIndex((section) => section.id === activeSectionId)
                : undefined;

              const newQuestionId = addQuestion(
                type,
                t,
                activeSectionIndex,
                activeQuestionId || undefined
              );
              handleQuestionClick(newQuestionId);
            }
          }}
          activeQuestionId={activeQuestionId}
          activeSectionId={activeSectionId}
        />

        <AnimatePresence initial={false}>
          {questions.map((question, questionIndex) => (
            <motion.div
              key={`question-${question.id}`}
              data-question-id={question.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <QuestionSection
                question={question}
                index={questionIndex}
                isActive={activeQuestionId === question.id}
                onQuestionClick={() => handleQuestionClick(question.id)}
                lng={lng}
                onRemove={() => setQuestions(questions.filter((q) => q.id !== question.id))}
                onDuplicate={() => setQuestions([
                  ...questions,
                  { ...question, id: `question-${Date.now()}` },
                ])}
                onContentChange={(content) => {
                  const updatedQuestions = [...questions];
                  updatedQuestions[questionIndex].content = content;
                  setQuestions(updatedQuestions);
                } }
                onLabelChange={(label) => {
                  const updatedQuestions = [...questions];
                  updatedQuestions[questionIndex].label = label;
                  setQuestions(updatedQuestions);
                } }
                onRequiredChange={(required) => {
                  const updatedQuestions = [...questions];
                  updatedQuestions[questionIndex].required = required;
                  setQuestions(updatedQuestions);
                } }
                onOptionsChange={(options) => {
                  const updatedQuestions = [...questions];
                  updatedQuestions[questionIndex].options = options;
                  setQuestions(updatedQuestions);
                } } onFileChange={function (file: File | null): void {
                  throw new Error('Function not implemented.');
                } }              />
            </motion.div>
          ))}
        </AnimatePresence>

        <AnimatePresence initial={false}>
          {sections.map((section, sectionIndex) => (
            <motion.div
              key={`section-${section.id}`}
              data-section-id={section.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mb-6"
            >
              <div
                className={`bg-white dark:bg-dark-primary border ${
                  activeSectionId === section.id
                    ? 'border-blue-500 ring-2 ring-blue-200'
                    : 'border-slate-400 dark:border-slate-800'
                } rounded-lg shadow-md p-4 sm:p-6`}
              >
                <SectionHeader
                  title={section.title}
                  isExpanded={section.isExpanded || false}
                  onTitleChange={(title) =>
                    updateSectionTitle(sectionIndex, title)
                  }
                  onToggle={() => toggleSection(sectionIndex)}
                  onSectionClick={() => handleSectionClick(section.id)}
                  isActive={activeSectionId === section.id}
                  t={t}
                />
                <AnimatePresence>
                  {section.isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="p-4 sm:p-6 space-y-4">
                        {section.questions.map((question, questionIndex) => (
                          <div
                            key={`section-${section.id}-question-${question.id}`}
                            data-question-id={`section-${section.id}-question-${question.id}`}
                            className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4"
                          >
                            <QuestionSection
                              question={question}
                              index={questionIndex}
                              lng={lng}
                              isActive={activeQuestionId === question.id}
                              onQuestionClick={() => handleQuestionClick(question.id)}
                              onRemove={() => {
                                const updatedSections = [...sections];
                                updatedSections[sectionIndex].questions =
                                  updatedSections[sectionIndex].questions.filter(
                                    (q) => q.id !== question.id
                                  );
                                setSections(updatedSections);
                              } }
                              onDuplicate={() => addQuestion(question.type, t, sectionIndex)}
                              onContentChange={(content) => {
                                const updatedSections = [...sections];
                                updatedSections[sectionIndex].questions[questionIndex].content = content;
                                setSections(updatedSections);
                              } }
                              onLabelChange={(label) => {
                                const updatedSections = [...sections];
                                updatedSections[sectionIndex].questions[questionIndex].label = label;
                                setSections(updatedSections);
                              } }
                              onRequiredChange={(required) => {
                                const updatedSections = [...sections];
                                updatedSections[sectionIndex].questions[questionIndex].required = required;
                                setSections(updatedSections);
                              } }
                              onOptionsChange={(options) => {
                                const updatedSections = [...sections];
                                updatedSections[sectionIndex].questions[questionIndex].options = options;
                                setSections(updatedSections);
                              } } onFileChange={function (file: File | null): void {
                                throw new Error('Function not implemented.');
                              } }                            />
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Contenedor del botón alineado a la derecha */}
        <div className="flex justify-end mt-8">
          <button
            className="dark:text-dark-text-white flex items-center justify-center gap-3 rounded-lg bg-bg-primary px-10 py-4 text-lg text-text-secondary dark:bg-dark-primary hover:bg-opacity-90"
            onClick={onSubmit}
            disabled={loading}
          >
            {loading ? <SmallLoader /> : formId ? t('update') : t('create')}
          </button>
        </div>
      </div>
    </DndProvider>
  );
};

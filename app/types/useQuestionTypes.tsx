import { useTranslation } from 'react-i18next';
import { TextIcon, Hash, Mail, ChevronDown, CheckSquare, Upload, Calendar, Layout } from 'lucide-react';

export const ITEM_TYPE = 'QUESTION';

export type QuestionType = 'text' | 'number' | 'email' | 'select' | 'multiselect' | 'file' | 'date' | 'section';

export const useQuestionTypes = () => {
  const { t } = useTranslation('files');
  
  return [
    { type: 'text', label: t('question_type.short_answer'), icon: <TextIcon className="w-5 h-5" /> },
    { type: 'number', label: t('question_type.number'), icon: <Hash className="w-5 h-5" /> },
    { type: 'email', label: t('question_type.email'), icon: <Mail className="w-5 h-5" /> },
    { type: 'select', label: t('question_type.dropdown'), icon: <ChevronDown className="w-5 h-5" /> },
    { type: 'multiselect', label: t('question_type.checkboxes'), icon: <CheckSquare className="w-5 h-5" /> },
    { type: 'file', label: t('question_type.file_upload'), icon: <Upload className="w-5 h-5" /> },
    { type: 'date', label: t('question_type.date'), icon: <Calendar className="w-5 h-5" /> },
    { type: 'section', label: t('question_type.section'), icon: <Layout className="w-5 h-5" /> },
  ] as const;
};
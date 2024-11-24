import { QuestionType } from "./useQuestionTypes";

export interface Question {
    id: string;
    type: QuestionType;
    content: string;
    label: string;
    options?: string[];
    maxLength?: number;
    file?: File | null;
    required: boolean;
    lng?: string; // Agrega lng aquí
    sectionId?: string;
}

export interface Section {
  id: string;
  title: string;
  questions: Question[];
  isExpanded?: boolean;
  order: number; // Agrega la propiedad de orden
}


export interface FormData {
  title: string;
  description: string;
  sections: Section[];
  questions: Question[];
}
export interface QuestionSectionProps {
    question: Question;
    index: number;
    lng: string;
    onQuestionClick: (id: string) => void;
    isActive: boolean;
    onRemove: () => void;
    onDuplicate: () => void;
    onContentChange: (content: string) => void;
    onLabelChange: (label: string) => void;
    onRequiredChange: (required: boolean) => void;
    onOptionsChange: (options: string[]) => void;
    onFileChange: (file: File | null) => void;
    moveQuestion?: (fromIndex: number, toIndex: number) => void; // Hacemos moveQuestion opcional
  }

export interface QuestionInputProps {
    question: Question;
    lng: string;
    onContentChange: (content: string) => void;
    onOptionsChange?: (options: string[]) => void;
    onFileChange?: (file: File | null) => void;
    handleOptionChange: (optionIndex: number, value: string) => void;
    addOption: () => void;
    removeOption: (optionIndex: number) => void;
}
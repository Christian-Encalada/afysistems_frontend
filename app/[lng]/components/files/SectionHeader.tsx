import { ChevronDown, ChevronUp } from "lucide-react";
import { TFunction } from "i18next";

interface SectionHeaderProps {
  title: string;
  isExpanded: boolean;
  onTitleChange: (title: string) => void;
  onToggle: () => void;
  onSectionClick: () => void; 
  isActive: boolean; 
  t: TFunction<"files">;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  isExpanded,
  onTitleChange,
  onToggle,
  onSectionClick,
  isActive,
  t,
}) => (
  <div
    className={`p-6 border-b ${
      isActive ? "border-blue-500 ring-2 ring-blue-200" : "border-slate-400 dark:border-slate-800"
    } cursor-pointer`}
    onClick={onSectionClick} 
  >
    <div className="flex items-center justify-between">
      <input
        type="text"
        className="text-2xl font-semibold border-none focus:outline-none focus:ring-0 text-gray-900 dark:text-gray-100 bg-transparent flex-grow"
        placeholder={t("section_title_placeholder")}
        value={title}
        onChange={(e) => onTitleChange(e.target.value)}
      />
      <button
        onClick={(e) => {
          e.stopPropagation(); 
          onToggle();
        }}
        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
      >
        {isExpanded ? (
          <ChevronUp className="h-6 w-6 text-gray-500" />
        ) : (
          <ChevronDown className="h-6 w-6 text-gray-500" />
        )}
      </button>
    </div>
  </div>
);

import React, { useState, useEffect, useRef } from "react";
import { useQuestionTypes } from "@/types/useQuestionTypes";
import { QuestionType } from "@/types/useQuestionTypes";

interface FloatingToolbarProps {
  onAction: (type: QuestionType) => void;
  activeQuestionId: string | null;
  activeSectionId: string | null;
}

export const FloatingToolbar: React.FC<FloatingToolbarProps> = ({
  onAction,
  activeQuestionId,
  activeSectionId,
}) => {
  const questionTypes = useQuestionTypes();
  const toolbarRef = useRef<HTMLDivElement>(null);
  const [toolbarStyle, setToolbarStyle] = useState<React.CSSProperties>({
    top: "0px",
    right: "0px",
    transform: "translateY(0)",
  });

  const updateToolbarPosition = () => {
    let targetElement: HTMLElement | null = null;

    if (activeQuestionId) {
      targetElement = document.querySelector(
        `[data-question-id="${activeQuestionId}"]`
      ) as HTMLElement;
    } else if (activeSectionId) {
      targetElement = document.querySelector(
        `[data-section-id="${activeSectionId}"]`
      ) as HTMLElement;
    } else {
      targetElement = document.querySelector(".form-header") as HTMLElement;
    }

    if (targetElement && toolbarRef.current) {
      const offsetTop = targetElement.offsetTop + targetElement.clientHeight / 2;
      const offsetLeft = targetElement.offsetLeft + targetElement.clientWidth + 16;

      setToolbarStyle({
        top: `${offsetTop}px`,
        left: `${offsetLeft}px`,
        transform: "translateY(-50%)",
      });
    }
  };

  useEffect(() => {
    updateToolbarPosition();
  }, [activeQuestionId, activeSectionId]);

return (
    <div
      ref={toolbarRef}
      style={{
        position: "absolute",
        ...toolbarStyle,
        transition: "top 0.3s ease, left 0.3s ease",
      }}
      className="z-50 bg-white dark:bg-dark-primary border border-gray-200 dark:border-slate-700 rounded-lg shadow-lg p-2 flex flex-col gap-2"
    >
      {questionTypes.map((questionType) => (
        <button
          key={questionType.type}
          onClick={() => onAction(questionType.type as QuestionType)}
          data-testid={`floating-toolbar-${questionType.type}`} // Asignamos un identificador único
          className="group relative flex items-center justify-center p-2 hover:bg-blue-50 dark:hover:bg-slate-700 rounded transition-all duration-200"
          title={questionType.type}
        >
          {React.cloneElement(questionType.icon, {
            className:
              "w-5 h-5 text-gray-500 dark:text-gray-300 group-hover:text-blue-500 dark:group-hover:text-blue-400",
          })}
          <span className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-sm rounded opacity-0 group-hover:opacity-100 whitespace-nowrap">
            {questionType.type}
          </span>
        </button>
      ))}
    </div>
  );
}  

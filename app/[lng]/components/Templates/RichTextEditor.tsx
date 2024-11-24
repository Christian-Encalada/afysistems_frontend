'use client';

import dynamic from 'next/dynamic';
import 'quill/dist/quill.snow.css';
import { useState, useEffect } from 'react';
import { ArrowUpIcon } from '@heroicons/react/solid';
import { getAllTemplateEnvs } from '../../services/templateEnvService';
import { useTranslation } from '@/i18n/client';

const ReactQuill = dynamic(() => import('react-quill'), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});

export default function RichTextEditor({
  value,
  onChange,
  lng,
}: {
  value: string;
  onChange: (content: string) => void;
  lng: string;
}) {
  const { t } = useTranslation(lng, 'templates');
  const [variables, setVariables] = useState<{ id: number; name: string }[]>([]);
  const [selectedVariable, setSelectedVariable] = useState('');

  useEffect(() => {
    const fetchTemplateEnvs = async () => {
      try {
        const response = await getAllTemplateEnvs();
        const formattedVariables = response.TemplateEnvsPaginated?.data.map(
          (env: { id: number; env: string }) => ({
            id: env.id,
            name: env.env,
          })
        );
        setVariables(formattedVariables || []);
      } catch (error) {
        console.error('Error fetching variables:', error);
      }
    };

    fetchTemplateEnvs();
  }, []);

  const handleInsertVariable = () => {
    if (selectedVariable) {
      const editor = document.querySelector('.ql-editor');
      const selection = window.getSelection();

      if (selection && selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        if (range) {
          range.deleteContents();

          const node = document.createTextNode(selectedVariable);
          range.insertNode(node);

          range.setStartAfter(node);
          range.setEndAfter(node);

          selection.removeAllRanges();
          selection.addRange(range);
        }
      }

      onChange(`${value}${selectedVariable}`);
      setSelectedVariable('');
    }
  };

  return (
    <div className="relative">
      {/* Restaurar borde visible del contenedor */}
      <div className="border border-slate-300 dark:border-slate-700 rounded-md overflow-hidden">
        <ReactQuill
          value={value}
          onChange={onChange}
          theme="snow"
          modules={{
            toolbar: {
              container: [
                ['bold', 'italic', 'underline', 'strike'],
                [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                [{ 'header': [1, 2, 3, false] }],
                ['link', 'image'],
                [{ 'align': [] }],
              ],
            },
          }}
          className="h-48"
        />
      </div>

      <div className="mt-1 flex gap-1 items-center">
        <select
          className="w-full rounded-md bg-white border border-slate-300 px-3 py-2 text-sm dark:bg-dark-secondary dark:text-dark-text-primary dark:border-slate-700"
          onChange={(e) => setSelectedVariable(e.target.value)}
          value={selectedVariable}
        >
          <option value="">{t('select_variable')}</option>
          {variables.map((variable) => (
            <option key={variable.id} value={variable.name}>
              {variable.name}
            </option>
          ))}
        </select>

        <button
          type="button"
          onClick={handleInsertVariable}
          className="rounded-lg bg-indigo-400 text-white p-2 hover:bg-indigo-500 dark:bg-gray-600 dark:hover:bg-gray-700"
        >
          <ArrowUpIcon className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}

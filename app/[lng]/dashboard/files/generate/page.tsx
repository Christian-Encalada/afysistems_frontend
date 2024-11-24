"use client";

import React, { useState, useEffect } from 'react';
import { FormComponent } from '@/[lng]/components/files/FormComponent';
import { useAuth } from '@/[lng]/contexts/AuthContext';
import { FormSkeleton } from '@/[lng]/components/files/FormSkeleton';
import { PlusIcon, MoreVertical, EditIcon, XIcon } from 'lucide-react';
import { getForms, deleteForm, updateFormTitle } from '@/[lng]/services/formsService';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

interface FormPageProps {
  lng: string;
}

const FormPage: React.FC<FormPageProps> = ({ lng }) => {
  const { t } = useTranslation('files');
  const { isLoading } = useAuth();
  const [showFormComponent, setShowFormComponent] = useState(false);
  const [forms, setForms] = useState<any[]>([]);
  const [loadingForms, setLoadingForms] = useState(true);
  const [openForms, setOpenForms] = useState<number | undefined>(undefined); // Guardar el ID del formulario abierto
  const [openMenu, setOpenMenu] = useState<number | null>(null);
  const [editingTitleId, setEditingTitleId] = useState<number | null>(null);
  const [newTitle, setNewTitle] = useState<string>('');
  const [previewImageUrl, setPreviewImageUrl] = useState<string | null>(null); // Añadido para previsualización

  const fetchForms = async () => {
    setLoadingForms(true);
    try {
      const response = await getForms();
      setForms(response);
    } catch (error: any) {
      toast.error(t('errors.load_forms', {
        message: error.response?.data?.message || error.message,
      }));
    } finally {
      setLoadingForms(false);
    }
  };

  useEffect(() => {
    fetchForms();
  }, []);

  const handleCreateNewForm = () => {
    setShowFormComponent(true);
    setOpenForms(undefined); // Crear un nuevo formulario, así que no hay formId
  };

  const handleBackToList = () => {
    setShowFormComponent(false);
    fetchForms();
  };

  const toggleForm = (formId: number) => {
    setShowFormComponent(true); // Mostrar el componente del formulario
    setOpenForms(formId); // Establece el formId del formulario que se va a editar
  };

  const toggleMenu = (formId: number) => {
    setOpenMenu(openMenu === formId ? null : formId);
  };

  const handleEditTitle = (formId: number, currentTitle: string) => {
    setEditingTitleId(formId);
    setNewTitle(currentTitle);
  };

  const handleSaveTitle = async (formId: number) => {
    try {
      await updateFormTitle(formId, newTitle);
      toast.success(t('messages.title_updated'));
      setEditingTitleId(null);
      fetchForms();
    } catch (error) {
      toast.error(t('errors.update_failed'));
    }
  };

  const handleDelete = async (formId: number) => {
    try {
      await deleteForm(formId);
      toast.success(t('messages.form_deleted'));
      fetchForms();
    } catch (error) {
      toast.error(t('errors.delete_failed'));
    }
  };

  // Nueva función para manejar la previsualización del formulario
  const handlePreviewUpdate = (previewUrl: string | null) => {
    setPreviewImageUrl(previewUrl);
  };

  return (
<div className="min-h-screen text-white p-8">
  {isLoading || loadingForms ? (
    <FormSkeleton />
  ) : (
    <>
      {showFormComponent ? (
        <div className="flex flex-col lg:flex-row w-full">
          {/* Formulario que ocupa el 100% en escritorio */}
          <div className="flex-grow w-full">
            <FormComponent lng={lng} onBack={handleBackToList} formId={openForms} onPreviewUpdate={handlePreviewUpdate} />
          </div>

          {/* Vista previa del formulario */}
          {previewImageUrl && (
            <div className="hidden lg:block w-1/4 p-4">
              <img
                src={previewImageUrl}
                alt="Preview"
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </div>
          )}
        </div>
      ) : (
        <div className="max-w-8xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-12 text-text-primary dark:text-dark-text-primary">
            {t('titles.form_manager')}
          </h1>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 mb-12 justify-center">
            <div
              data-testid="create-form-button" 
              onClick={handleCreateNewForm}
              className="bg-white hover:bg-bg-primary dark:bg-dark-primary dark:hover:bg-dark-secondary p-6 rounded-lg shadow-lg cursor-pointer hover:bg-gray-700 transition-colors flex flex-col items-center justify-center"
            >
              <PlusIcon className="w-12 h-12 text-text-primary dark:text-dark-text-primary mb-2" />
              <span className="text-text-primary dark:text-dark-text-primary">
                {t('button.create_form')}
              </span>
            </div>
          </div>

          <h2 className="text-2xl font-semibold mb-6 text-text-primary dark:text-dark-text-primary">
            {t('titles.recent_forms')}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {forms.length > 0 ? (
              forms.map((form) => (
                <div
                  key={form.id}
                  className="relative bg-white dark:bg-dark-primary border border-slate-300 dark:border-slate-700 rounded-lg shadow-lg transition-transform transform duration-300 hover:scale-105 cursor-pointer"
                  onClick={() => toggleForm(form.id)}
                >
                  {/* Imagen de previsualización del formulario */}
                  <div className="relative h-48 bg-gray-100 dark:bg-gray-800 flex items-center overflow-visible rounded-lg justify-center">
                    {form.previewImage ? (
                      <img
                        src={`http://localhost:3000${form.previewImage}`}
                        alt={form.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-gray-500 dark:text-gray-400">
                        {t('messages.no_preview_available')}
                      </span>
                    )}

                    {/* Botón de tres puntitos */}
                    <button
                      className="absolute top-2 right-2 text-gray-500 dark:text-gray-400"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleMenu(form.id);
                      }}
                    >
                      <MoreVertical className="h-6 w-6" />
                    </button>
                  </div>

                  {/* Menú desplegable */}
                  {openMenu === form.id && (
                    <div
                      className="absolute bottom-full mb-2 right-2 w-48 bg-white dark:bg-gray-800 shadow-lg rounded-lg py-2 z-20"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <button
                        className="flex items-center block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEditTitle(form.id, form.title);
                        }}
                      >
                        <EditIcon className="w-4 h-4 mr-2" />
                        {t('actions.edit_title')}
                      </button>
                      <button
                        className="flex items-center block w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(form.id);
                        }}
                      >
                        <XIcon className="w-4 h-4 mr-2" />
                        {t('actions.delete')}
                      </button>
                    </div>
                  )}

                  {/* Detalles del formulario */}
                  <div className="p-4">
                    {editingTitleId === form.id ? (
                      <input
                        type="text"
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            handleSaveTitle(form.id);
                          }
                        }}
                        onClick={(e) => e.stopPropagation()}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-700 focus:outline-none"
                      />
                    ) : (
                      <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 truncate">
                        {form.title || t('messages.untitled_form')}
                      </h3>
                    )}
                    <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400 mt-2">
                      <span>
                        {t('labels.last_opened')}: {new Date(form.createdAt).toLocaleDateString(lng)}
                      </span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-purple-600 dark:text-purple-400"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M3 3v18h18V3H3zm16 16H5V5h14v14zM7 10h10v2H7v-2zm0 4h7v2H7v-2z" />
                      </svg>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-lg text-gray-600 dark:text-gray-400">
                {t('messages.no_recent_forms')}
              </p>
            )}
          </div>
        </div>
      )}
    </>
  )}
</div>

  );
};

export default FormPage;

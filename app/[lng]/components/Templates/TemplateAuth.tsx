'use client';

import TemplateTable from '@/[lng]/components/Templates/TemplateTable'; // Importar el componente TemplateTable
import { useAuth } from '@/[lng]/contexts/AuthContext';
import SkeletonTable from '@/[lng]/components/SkeletonTable';

export default function TemplateAuth({ lng, typeSkeleton}: {lng: string, typeSkeleton: string}) {
  const { isLoading } = useAuth();

  return (
    <div>
      {isLoading ? (
        <SkeletonTable lng={lng} type={typeSkeleton} /> 
      ) : (
        <TemplateTable lng={lng} />
      )}
    </div>
  );
}

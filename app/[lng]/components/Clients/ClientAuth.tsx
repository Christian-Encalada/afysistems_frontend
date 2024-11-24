'use client'
import { useAuth } from '@/[lng]/contexts/AuthContext';
import ClientTable from '@/[lng]/components/Clients/ClientTable';
import SkeletonTable from '@/[lng]/components/SkeletonTable';


export default function ClientAuth({ lng, typeSkeleton, typeTable, mode }: { lng: string, typeSkeleton: string, typeTable: string, mode?: string }) {
    const { isLoading } = useAuth();
    return (
    <div>
        {isLoading ? (
            <SkeletonTable lng={lng} type={typeSkeleton} mode={mode} />
        ) : (
            <ClientTable lng={lng} type={typeTable}/>
        )}
    </div>
    );
}
'use client'
import { useAuth } from '@/[lng]/contexts/AuthContext';
import SkeletonTable from '@/[lng]/components/SkeletonTable';
import UserTable from '@/[lng]/components/Users/UserTable';


export default function UserAuth({ lng, typeSkeleton }: {lng: string, typeSkeleton: string}) {
    const { isLoading } = useAuth();
    return (
    <div>
        {isLoading ? (
            <SkeletonTable lng={lng} type={typeSkeleton}/>
        ) : (
            <UserTable lng={lng}/>
        )}
    </div>
    );
}

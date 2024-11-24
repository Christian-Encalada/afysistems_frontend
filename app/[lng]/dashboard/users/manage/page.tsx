import UserAuth from "@/[lng]/components/Users/UserAuth";
import { generatePageMetadata } from '@/utils/metadata';
import { MetaParams} from '@/types';


export async function generateMetadata({ params: { lng } }: MetaParams) {
  return await generatePageMetadata({ lng, namespace: 'seoDashboardUser', keyPrefix: "manage" });
}

export default function ManageUsersPage({
  params: { lng },
}: {
  params: { lng: string };
}) {
  
  const typeSkeleton = "manage";
  return (
    <div>
      <UserAuth lng={lng} typeSkeleton={typeSkeleton}/>
    </div>
  );
}

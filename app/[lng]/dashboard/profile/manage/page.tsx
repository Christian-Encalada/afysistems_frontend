import { generatePageMetadata } from '@/utils/metadata';
import { MetaParams} from '@/types';
import ProfilePage from '@/[lng]/components/Administration/Profile/ProfilePage';


export async function generateMetadata({ params: { lng } }: MetaParams) {
  return await generatePageMetadata({ lng, namespace: 'seoDashboardProfile', keyPrefix: "manage" });
}

export default function ProfileManagementPage({ params: { lng } }: { params: { lng: string } }) {

  return (
    <>
      <ProfilePage lng={lng} />
    </>
  );
}

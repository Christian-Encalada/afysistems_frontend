import { generatePageMetadata } from '@/utils/metadata';
import { MetaParams } from '@/types';
import PasswordPage from '@/[lng]/components/Administration/Password/PasswordPage';

export async function generateMetadata({ params: { lng } }: MetaParams) {
  return await generatePageMetadata({ lng, namespace: 'seoDashboardAdministration', keyPrefix: "change_password" });
}

export default function PasswordManagementPage({ params: { lng } }: { params: { lng: string } }) {
  return (
    <div>
      <PasswordPage lng={lng} />
    </div>
  );
}

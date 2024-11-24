import ResetPasswordForm from '@/[lng]/components/ResetPassword/ResetPasswordForm';
import { MetaParams } from '@/types';
import { generatePageMetadata } from '@/utils/metadata';

export async function generateMetadata({ params: { lng } }: MetaParams) {
  return await generatePageMetadata({ lng, namespace: 'resetPassword' });
}

const ResetPasswordPage = ({ params }: { params: any }) => {
  return <ResetPasswordForm lng={params.lng} />;
};

export default ResetPasswordPage;

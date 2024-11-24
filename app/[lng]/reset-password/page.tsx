import { NextPage } from 'next';
import { generatePageMetadata } from '@/utils/metadata';
import { MetaParams, PageProps } from '@/types';

import RequestResetPasswordForm from '../components/ResetPassword/RequestResetPasswordForm';

export async function generateMetadata({ params: { lng } }: MetaParams) {
  return await generatePageMetadata({ lng, namespace: 'resetPassword' });
}

const Page: NextPage<PageProps> = ({ params }: PageProps) => {
  return <RequestResetPasswordForm lng={params.lng} />;
};

export default Page;

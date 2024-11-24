import { NextPage } from 'next';
import { generatePageMetadata } from '@/utils/metadata';
import { MetaParams, PageProps } from '@/types';
import LoginForm from '../components/LoginForm';

export async function generateMetadata({ params: { lng } }: MetaParams) {
  return await generatePageMetadata({ lng, namespace: 'login' });
}

const Page: NextPage<PageProps> = ({ params }: PageProps) => {
  return <LoginForm lng={params.lng} />;
};

export default Page;

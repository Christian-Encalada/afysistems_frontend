import { NextPage } from 'next';
import { languages, fallbackLng } from '@/i18n/settings';
import { generatePageMetadata } from '@/utils/metadata';
import { MetaParams, PageProps } from '@/types';

export async function generateMetadata({ params: { lng } }: MetaParams) {
  return await generatePageMetadata({ lng, namespace: 'index' });
}

const Page: NextPage<PageProps> = ({ params }: PageProps) => {
  if (languages.indexOf(params.lng) < 0) params.lng = fallbackLng;
  return <>Hello world!</>;
};

export default Page;

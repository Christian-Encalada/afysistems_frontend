import { NextPage } from 'next';
import { generatePageMetadata } from '@/utils/metadata';
import { MetaParams, DashboardProps } from '@/types';
import DashboardInfo from '../../components/DashboardInfo';


export async function generateMetadata({ params: { lng } }: MetaParams) {
  return await generatePageMetadata({ lng, namespace: 'seoDashboardHome', keyPrefix: "home" });
}

const Page: NextPage<DashboardProps> = ({ params }: DashboardProps) => {

  return (
    <>
      <DashboardInfo lng={params.lng} />
    </>
  );
};

export default Page;

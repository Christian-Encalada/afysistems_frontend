import ClientAuth from '@/[lng]/components/Clients/ClientAuth';
import { generatePageMetadata } from '@/utils/metadata';
import { MetaParams} from '@/types';


export async function generateMetadata({ params: { lng } }: MetaParams) {
  return await generatePageMetadata({ lng, namespace: 'seoDashboardClient', keyPrefix: "view" });
}

const typeSkeleton = 'clients';
const typeTable = 'list';
const mode = 'list';

export default function ClientListPage({
  params: { lng },
}: {
  params: { lng: string };
}) {
  return (
    <>
        <ClientAuth lng={lng} typeSkeleton={typeSkeleton} typeTable={typeTable} mode={mode}/>
    </>
  );
}

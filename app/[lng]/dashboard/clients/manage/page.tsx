import { generatePageMetadata } from '@/utils/metadata';
import { MetaParams} from '@/types';
import ClientAuth from '@/[lng]/components/Clients/ClientAuth';



export async function generateMetadata({ params: { lng } }: MetaParams) {
  return await generatePageMetadata({ lng, namespace: 'seoDashboardClient', keyPrefix: "manage" });
}

const typeSkeleton = 'clients';
const typeTable = 'manage';

export default function ManageClientsPage({
  params: { lng },
}: {
  params: { lng: string };
}) {
  return (
    <div>
      <ClientAuth lng={lng} typeSkeleton={typeSkeleton} typeTable={typeTable}/>
    </div>
  );
}

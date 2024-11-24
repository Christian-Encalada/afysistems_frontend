import ClientAuth from "@/[lng]/components/Clients/ClientAuth";
import { generatePageMetadata } from '@/utils/metadata';
import { MetaParams} from '@/types';


export async function generateMetadata({ params: { lng } }: MetaParams) {
  return await generatePageMetadata({ lng, namespace: 'seoDashboardReport', keyPrefix: "clients" });
}

const typeSkeleton = 'clients';
const typeTable = 'report';
const mode = 'report';

export default function ClientsReportPage({
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


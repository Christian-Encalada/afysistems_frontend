import SitesManageList from "@/[lng]/components/Site/SitesManageList";
import { PageProps } from "@/types";
import { generatePageMetadata } from '@/utils/metadata';
import { MetaParams} from '@/types';


export async function generateMetadata({ params: { lng } }: MetaParams) {
  return await generatePageMetadata({ lng, namespace: 'seoDashboardSite', keyPrefix: "manage" });
}

export default function SitesManagePage({ params: { lng } }: PageProps) {
  return <SitesManageList lng={lng} />;
}

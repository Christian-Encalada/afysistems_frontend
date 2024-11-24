import SitesList from "@/[lng]/components/Site/SitesList";
import { PageProps } from "@/types";
import { generatePageMetadata } from '@/utils/metadata';
import { MetaParams} from '@/types';


export async function generateMetadata({ params: { lng } }: MetaParams) {
  return await generatePageMetadata({ lng, namespace: 'seoDashboardSite', keyPrefix: "list" });
}

export default function SitesListPage({ params: { lng } }: PageProps) {
  return <SitesList lng={lng} />;
}

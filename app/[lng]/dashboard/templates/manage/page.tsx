import TemplateAuth from "@/[lng]/components/Templates/TemplateAuth";
import { generatePageMetadata } from '@/utils/metadata';
import { MetaParams} from '@/types';


export async function generateMetadata({ params: { lng } }: MetaParams) {
  return await generatePageMetadata({ lng, namespace: 'seoDashboardTemplate', keyPrefix: "manage" });
}


export default function AdminTemplatesEmailPage({
  params: { lng },
}: {
  params: { lng: string };
}) {

  const typeSkeleton = "templates";
  return (
    <>
       <TemplateAuth lng={lng} typeSkeleton={typeSkeleton} />
    </>
  );
}

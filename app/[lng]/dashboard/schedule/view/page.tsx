import { generatePageMetadata } from '@/utils/metadata';
import { MetaParams} from '@/types';


export async function generateMetadata({ params: { lng } }: MetaParams) {
  return await generatePageMetadata({ lng, namespace: 'seoDashboardSchedule', keyPrefix: "view" });
}

export default function ViewSchedulePage() {
  return <div>ViewSchedulePage</div>;
}

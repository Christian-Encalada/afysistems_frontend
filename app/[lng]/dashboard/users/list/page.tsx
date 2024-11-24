import { generatePageMetadata } from '@/utils/metadata';
import { MetaParams} from '@/types';


export async function generateMetadata({ params: { lng } }: MetaParams) {
  return await generatePageMetadata({ lng, namespace: 'seoDashboardUser', keyPrefix: "list" });
}

export default function UsersListPage() {
  return <div>UsersListPage</div>;
}



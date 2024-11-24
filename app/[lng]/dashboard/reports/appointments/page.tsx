import { generatePageMetadata } from '@/utils/metadata';
import { MetaParams} from '@/types';


export async function generateMetadata({ params: { lng } }: MetaParams) {
  return await generatePageMetadata({ lng, namespace: 'seoDashboardReport', keyPrefix: "appointments" });
}

export default function AppointmentReportsPage() {
  return <div>AppointmentReports</div>;
}

'use client';

import PasswordForm from './PasswordForm';
import SkeletonPassword from './SkeletonPassword';
import { useEffect, useState } from 'react';
import { useTranslation } from '@/i18n/client';

interface PasswordPageProps {
  lng: string;
}

export default function PasswordPage({ lng }: PasswordPageProps) {
  const { t } = useTranslation(lng, 'administration');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  if (loading) {
    return <SkeletonPassword />;
  }

  return (
    <div className="password-container p-6 max-w-md ml-0">
<h1 className="text-2xl font-extrabold mb-4">{t('change_password')}</h1>
      <PasswordForm lng={lng} />
    </div>
  );
}

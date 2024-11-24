import { useEffect, useState } from 'react';
import { getProfile } from '@/[lng]/services/profileService';
import { useTranslation } from '@/i18n/client';
import { User } from '@/types/users';
import { UserDatum } from '@/types/usersResponse';

// Función para mapear UserDatum a User
const mapUserDatumToUser = (userDatum: UserDatum): User => {
  return {
    id: userDatum.id,
    username: userDatum.username,
    role: userDatum.role,
    tenantId: {
      id: userDatum.tenant.id,
      name: userDatum.tenant.name,
    },
  };
};

export default function ProfileHeader({ lng }: { lng: string }) {
  const [userData, setUserData] = useState<User | null>(null);
  const { t } = useTranslation(lng, 'administration');

  // Función para traducir el rol
  const translateRole = (role: string) => {
    switch (role) {
      case 'super admin':
        return t('roles_super_admin');
      case 'admin':
        return t('roles_admin');
      case 'assistant':
        return t('roles_assistant');
      default:
        return role;
    }
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const userDatum = await getProfile();
        const mappedUser = mapUserDatumToUser(userDatum);
        setUserData(mappedUser);
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    }
    
    fetchData();
  }, []);

  return (
    <div className='profile-header mb-6'>
      <h1 className='text-2xl font-extrabold text-text-primary dark:text-dark-text-primary mb-2'>
        {t('profile_of')}: {userData?.username}
      </h1>
      <p className='text-xl text-gray-700 dark:text-gray-300'>
        {t('role')}: {userData?.role ? translateRole(userData.role) : ''}
      </p>
    </div>
  );
}

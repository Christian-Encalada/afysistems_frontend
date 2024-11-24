'use client';

import ProfileForm from './ProfileForm';
import ProfileHeader from '@/[lng]/components/Administration/Profile/ProfileHeader';
import SkeletonProfile from '@/[lng]/components/Administration/Profile/SkeletonProfile';
import { getProfile } from '@/[lng]/services/profileService';
import { useEffect, useState } from 'react';
import { IFormUpdateProfile } from '@/types/forms';
import { mapUserDatumToFormUpdateUser } from '@/utils/userMappers';

export default function ProfilePage({ lng }: { lng: string }) {
  const [profileData, setProfileData] = useState<IFormUpdateProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const reloadData = async () => {
    setLoading(true);
    try {
      const profile = await getProfile();
      const mappedProfileData = mapUserDatumToFormUpdateUser(profile);
      setProfileData(mappedProfileData);
    } catch (error) {
      console.error('Error loading profile:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    reloadData();
  }, []);

  if (loading) {
    return <SkeletonProfile />;
  }

  return (
    <div className='profile-container p-6'>
      <ProfileHeader lng={lng} /> 
      
      {profileData && (
        <ProfileForm profileData={profileData} lng={lng} reloadData={reloadData} />
      )}
    </div>
  );
}

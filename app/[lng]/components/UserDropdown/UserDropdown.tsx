"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/[lng]/components/ui/sites/dropdown-menu";
import { useAuth } from '@/[lng]/contexts/AuthContext';
import { logout } from '@/[lng]/services/authService';
import UsernameSkeleton from '@/[lng]/components/UsernameSkeleton';
import { useTranslation } from '@/i18n/client';
import { MdLogout, MdOutlineAccountCircle } from "react-icons/md";
import { LogoutConfirmationModal } from '@/[lng]/components/UserDropdown/LogoutConfirmationModal';

interface UserDropdownProps {
  lng: string;
}

const getInitials = (username: string): string => {
  if (!username) return '';
  if (username.includes(' ')) {
    return username.split(' ').slice(0, 2).map(word => word[0].toUpperCase()).join('');
  }
  if (username.includes('_')) {
    return username[0].toUpperCase();
  }
  return username[0].toUpperCase();
};

const UserDropdown: React.FC<UserDropdownProps> = ({ lng }) => {
  const { user, isLoading } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const { t } = useTranslation(lng, 'userDropdown');

  const handleLogout = () => {
    logout();
    window.location.href = '/login';
  };

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div
            className='flex h-full px-2 lg:py-1 rounded-md cursor-pointer items-center gap-2 capitalize text-text-primary dark:text-text-secondary hover:bg-gray-100 dark:hover:bg-dark-secondary hover:text-text-primary dark:hover:text-text-secondary'
            title={t('profile')}
          >
          <MdOutlineAccountCircle className='h-5 w-5' />
            {isLoading ? (
              <UsernameSkeleton />
            ) : (
              <p>{getInitials(user?.username || '')}</p>
            )}
          </div>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="w-56 bg-white shadow-lg divide-y divide-gray-100 rounded-md dark:bg-dark-primary text-text-primary dark:text-text-secondary">
          <div className="py-1">
            <DropdownMenuItem asChild>
              <Link href="/dashboard/administration/profile/manage" className="block px-4 py-2 text-sm">
                {t('profile')}
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="#" className="block px-4 py-2 text-sm">
                {t('preferences')}
              </Link>
            </DropdownMenuItem>
          </div>
          <div className="py-1">
            <DropdownMenuItem asChild>
              <button 
                onClick={openModal} 
                className="block w-full px-4 py-2 text-sm text-left text-red-600"
              >
                <MdLogout className='mr-2 h-4 w-4'/>
                {t('logout')}
              </button>
            </DropdownMenuItem>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>

      <LogoutConfirmationModal
        lng={lng}
        isOpen={showModal} 
        onConfirm={handleLogout}
        onCancel={closeModal}
      />
    </>
  );
};

export default UserDropdown;

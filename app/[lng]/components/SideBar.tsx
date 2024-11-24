'use client';

import { useTranslation } from '@/i18n/client';
import NavItem from './NavItem';
import RightSideBar from './RightSideBar';
import { DivProps } from '@/types/drawers';
import { useSidebarMenu } from '../hooks/useSideBarMenu';
import { useAuth } from '../contexts/AuthContext';
import SideBarSkeleton from './SideBarSkeleton';
import { useState } from 'react';
import { MenuItem } from '@/types/item';

export default function SideBar({ lng, className = '', ...props }: DivProps) {
  const { t } = useTranslation(lng, 'dashboardDirection');
  const { isLoading } = useAuth();
  const { navItems, activeItem, handleItemClick } = useSidebarMenu();
  const [isRightSideBarOpen, setIsRightSideBarOpen] = useState(false);

  if (isLoading) {
    return <SideBarSkeleton />;
  }

  if (!activeItem) return null;

  const handleClick = (item: MenuItem) => {
    handleItemClick(item);
    setIsRightSideBarOpen(true);
    if (isRightSideBarOpen && item.id === activeItem.id) {
      setIsRightSideBarOpen(false);
    }
  };

  const handleClose = () => {
    setIsRightSideBarOpen(false);
  };

  return (
    <div className={`relative flex h-full ${className}`.trim()} {...props}>
      <div className="z-40 flex flex-col items-center gap-1 border-r border-text-primary border-opacity-15 bg-white px-3 py-6 dark:border-r-2 dark:border-dark-text-secondary dark:border-opacity-40 dark:bg-dark-primary">
        {navItems.map((item) => (
          <NavItem
            label={t(item.label as any)}
            key={item.id}
            onClick={() => handleClick(item)}
            icon={item.icon}
            isActive={item.id === activeItem.id}
          />
        ))}
      </div>
      <div
        className={`${isRightSideBarOpen ? 'fixed' : 'hidden'} left-0 right-0 top-0 min-h-screen w-full`}
        onClick={handleClose}
      ></div>
      <RightSideBar
        activeItem={activeItem}
        lng={lng}
        isOpen={isRightSideBarOpen}
        onHide={handleClose}
      />
    </div>
  );
}

import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { MenuItem, UserRole } from '@/types/item';
import { filterMenuByRole } from '@/utils/sideBarMenuByRole';

export function useSidebarMenu() {
  const { user } = useAuth();
  const [navItems, setNavItems] = useState<MenuItem[]>([]);
  const [activeItem, setActiveItem] = useState<MenuItem | null>(null);

  useEffect(() => {
    if (user && user.role) {
      const filteredMenu = filterMenuByRole(user.role as UserRole);
      setNavItems(filteredMenu);
      setActiveItem(filteredMenu.length > 0 ? filteredMenu[0] : null);
    }
  }, [user]);

  const handleItemClick = (item: MenuItem) => setActiveItem(item);

  return { navItems, activeItem, handleItemClick };
}

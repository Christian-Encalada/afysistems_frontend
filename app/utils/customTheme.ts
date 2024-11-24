import { CustomFlowbiteTheme } from 'flowbite-react';

export const customTheme: CustomFlowbiteTheme = {
  sidebar: {
    root: {
      base: 'h-full',
      inner: 'h-full overflow-y-auto overflow-x-hidden bg-white px-3 py-4 ',
    },
    collapse: {
      button:
        'group flex w-full items-center rounded-lg p-2 text-base font-normal text-black transition duration-75 hover:bg-dashboard-secondary dark:text-white dark:hover:bg-dashboard-secondary hover:text-white',
      icon: {
        base: 'h-6 w-6 text-black transition duration-75 group-hover:text-white dark:text-gray-400 dark:group-hover:text-white hover:text-white',
      },
      label: {
        icon: {
          open: {
            off: '',
            on: 'text-white',
          },
        },
      },
    },
    item: {
      base: 'flex items-center justify-center rounded-lg p-2 text-base font-normal text-black hover:bg-dashboard-secondary dark:text-white hover:text-white dark:hover:bg-dashboard-secondary group',
      collapsed: {
        insideCollapse:
          'w-full pl-8 flex transition duration-75 hover:bg-dashboard-bg-secondary hover:text-dashboard-secondary',
      },
      content: {
        base: 'flex-1 flex gap-1 items-center whitespace-nowrap px-3',
      },
      icon: {
        base: 'h-6 w-6 flex-shrink-0  transition duration-75 dark:group-hover:text-white hover:text-white group-hover:text-white',
        active: 'text-black dark:text-black',
      },
    },
  },
};

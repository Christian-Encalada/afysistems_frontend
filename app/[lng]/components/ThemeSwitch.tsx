'use client';

import { PiSunDimFill } from 'react-icons/pi';
import { BiSolidMoon } from 'react-icons/bi';
import { useTheme } from 'next-themes';

export default function ThemeSwitch() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const isActive = theme === 'light';

  const switchClasses = `flex items-center justify-center w-6 h-6 text-dark rounded-full transform ${
    isActive
      ? 'translate-x-0 bg-text-secondary'
      : 'translate-x-6 bg-dark-text-primary'
  } transition-transform duration-500 ease-in-out`;

  return (
    <div
      className={`${isActive ? 'bg-bg-primary-opacity' : 'bg-dark-secondary'} relative h-8 w-14 cursor-pointer rounded-full p-1`}
      onClick={toggleTheme}
    >
      <button className={switchClasses}>
        {isActive ? (
          <PiSunDimFill size={16} className='text-text-primary' />
        ) : (
          <BiSolidMoon size={16} className='text-text-primary' />
        )}
      </button>
    </div>
  );
}

'use client';

import { FaMoon, FaSun } from 'react-icons/fa';
import { useTheme } from '@/context/ThemeContext';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      type='button'
      onClick={toggleTheme}
      className='md:p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200'
      aria-label={
        theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'
      }
    >
      {/* Toggled with CSS rather than state so the correct icon is painted
          immediately: ThemeScript sets .dark on <html> before first paint,
          while `theme` only becomes accurate after the mount effect runs. */}
      <FaSun className='hidden text-yellow-400 dark:block' />
      <FaMoon className='block text-gray-700 dark:hidden' />
    </button>
  );
};

export default ThemeToggle;

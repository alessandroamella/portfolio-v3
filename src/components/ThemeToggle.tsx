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
      {theme === 'dark' ? (
        <FaSun className='text-yellow-400' />
      ) : (
        <FaMoon className='text-gray-700' />
      )}
    </button>
  );
};

export default ThemeToggle;

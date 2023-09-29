'use client';

import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';

export const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <button
      className={`bg-stone-200 hover:bg-stone-300 p-2 rounded text-stone-600 whitespace-nowrap dark:bg-gray-900 dark:text-gray-50 dark:hover:bg-gray-950`}
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
      {theme === 'light' ? '🌘 Dark Mode' : '☀️ Light Mode'}
    </button>
  );
};

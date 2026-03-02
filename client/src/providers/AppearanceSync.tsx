'use client';

import { useEffect } from 'react';
import { useAppSelector } from '@/redux/hooks';

const fontSizeMap = {
  small: '14px',
  medium: '16px',
  large: '18px',
} as const;

export default function AppearanceSync() {
  const theme = useAppSelector((state) => state.appearance.theme);
  const fontSize = useAppSelector((state) => state.appearance.fontSize);

  useEffect(() => {
    const root = document.documentElement;

    const applyTheme = (resolvedTheme: 'light' | 'dark') => {
      root.classList.toggle('dark', resolvedTheme === 'dark');
    };

    if (theme === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      applyTheme(mediaQuery.matches ? 'dark' : 'light');

      const onChange = (event: MediaQueryListEvent) => {
        applyTheme(event.matches ? 'dark' : 'light');
      };

      mediaQuery.addEventListener('change', onChange);
      return () => mediaQuery.removeEventListener('change', onChange);
    }

    applyTheme(theme);
  }, [theme]);

  useEffect(() => {
    document.documentElement.style.fontSize = fontSizeMap[fontSize];
  }, [fontSize]);

  return null;
}

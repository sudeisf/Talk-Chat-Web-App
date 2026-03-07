'use client';

import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { selectFontSizePreference, selectThemePreference, setTheme } from '@/redux/slice/appearanceSlice';

const fontSizeMap = {
  small: '14px',
  medium: '16px',
  large: '18px',
} as const;

export default function AppearanceSync() {
  const dispatch = useAppDispatch();
  const theme = useAppSelector(selectThemePreference);
  const fontSize = useAppSelector(selectFontSizePreference);

  useEffect(() => {
    // Migrate legacy persisted `system` values into a fixed mode.
    if ((theme as unknown as string) === 'system') {
      dispatch(setTheme('dark'));
    }
  }, [dispatch, theme]);

  useEffect(() => {
    const root = document.documentElement;
    const resolvedTheme = (theme as unknown as string) === 'system' ? 'dark' : theme;
    root.classList.toggle('dark', resolvedTheme === 'dark');
  }, [theme]);

  useEffect(() => {
    document.documentElement.style.fontSize = fontSizeMap[fontSize];
  }, [fontSize]);

  return null;
}

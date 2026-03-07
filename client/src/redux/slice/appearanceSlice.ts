import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';

export type ThemePreference = 'light' | 'dark';
export type FontSizePreference = 'small' | 'medium' | 'large';

interface AppearanceState {
  theme: ThemePreference;
  fontSize: FontSizePreference;
}

const initialState: AppearanceState = {
  theme: 'dark',
  fontSize: 'medium',
};

const appearanceSlice = createSlice({
  name: 'appearance',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<ThemePreference>) => {
      state.theme = action.payload;
    },
    setFontSize: (state, action: PayloadAction<FontSizePreference>) => {
      state.fontSize = action.payload;
    },
  },
});

export const { setTheme, setFontSize } = appearanceSlice.actions;

export const selectThemePreference = (state: RootState) => state.appearance.theme;
export const selectFontSizePreference = (state: RootState) =>
  state.appearance.fontSize;

export default appearanceSlice.reducer;

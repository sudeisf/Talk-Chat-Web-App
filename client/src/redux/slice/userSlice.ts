import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import type { User } from '@/types/user';

interface UserState {
  user: User | null;
}

const initialState: UserState = {
  user: null,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState['user']>) => {
      state.user = action.payload;
    },
    clearUser: (state) => {
      state.user = null;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;

// Selectors
export const selectUser = (state: RootState) => state.user.user;
export const selectUserId = (state: RootState) => state.user.user?.id;

export default userSlice.reducer;
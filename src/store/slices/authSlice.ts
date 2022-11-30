import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { User } from 'interfaces/user';

interface InitialState {
  user: User | null;
  msToken: string | null;
}

const initialState: InitialState = {
  user: null,
  msToken: null
};

export const authSlice = createSlice({
  initialState,
  name: 'auth',
  reducers: {
    logout: () => initialState,
    setToken: (state, action: PayloadAction<string>) => {
      state.msToken = action.payload;
    },
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    }
  }
});

export default authSlice.reducer;
export const { logout, setUser, setToken } = authSlice.actions;

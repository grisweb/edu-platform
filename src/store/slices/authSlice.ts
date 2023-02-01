import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { User } from 'interfaces/user';

interface InitialState {
  user: User | null;
  msToken: string | null;
  serverConnected: boolean;
}

const initialState: InitialState = {
  user: null,
  msToken: null,
  serverConnected: true
};

export const authSlice = createSlice({
  initialState,
  name: 'auth',
  reducers: {
    logout: () => initialState,
    setToken: (state, action: PayloadAction<string | null>) => {
      state.msToken = action.payload;
    },
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    setServerConnected: (state, action: PayloadAction<boolean>) => {
      state.serverConnected = action.payload;
    }
  }
});

export default authSlice.reducer;
export const { logout, setUser, setToken, setServerConnected } =
  authSlice.actions;

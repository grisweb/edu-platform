import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface InitialState {
  disabled: boolean;
}

const initialState: InitialState = {
  disabled: false
};

export const formSlice = createSlice({
  initialState,
  name: 'form',
  reducers: {
    setDisabled: (state, action: PayloadAction<boolean>) => {
      state.disabled = action.payload;
    }
  }
});

export default formSlice.reducer;
export const { setDisabled } = formSlice.actions;

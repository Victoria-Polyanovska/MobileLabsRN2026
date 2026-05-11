import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserData {
  pib: string;
  email: string;
  phone: string;
  address: string;
}

const initialState: UserData = {
  pib: '', email: '', phone: '', address: '',
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUserData: (state, action: PayloadAction<UserData>) => {
      return { ...action.payload };
    },
  },
});

export const { setUserData } = usersSlice.actions;
export default usersSlice.reducer;
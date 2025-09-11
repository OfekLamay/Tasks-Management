import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  username: 'NotLoggedIn',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      state.username = action.payload;
    },
    logout(state) {
      state.username = 'NotLoggedIn';
    },
  },
});

export const { setUser, logout } = userSlice.actions;
export default userSlice.reducer;
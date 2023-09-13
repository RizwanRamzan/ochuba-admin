import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: { email: "", password: "", role: "" },
  token: '',
  FirstTime: true,
  userDetails: {},
  booking:{}
};

const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    signout: (state) => {
      state.user = { email: "", password: "", role: "" };
      state.token = ''
    },
    setUserCompleteDetails: (state, action) => {
      state.userDetails = action.payload
    }
  },
});

export const { setUser, signout, setToken, setUserCompleteDetails } = userSlice.actions;
export const authReducer = userSlice.reducer;



import { createSlice } from '@reduxjs/toolkit'
export const psychoSlice = createSlice({
  name: 'psycho',
  initialState: {
    userInfo: [],
  },
  reducers: {
    addUserInfo: (state, { payload }) => {
      state.userInfo = [
        ...state.userInfo,
        payload
      ]
    }
  }
});
export const { addUserInfo } = psychoSlice.actions;
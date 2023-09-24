import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  toVerify: [],
  toReport: [],
  adminInfo: {},
}

export const adminSlice = createSlice({
  name: 'adminR',
  initialState,
  reducers: {
    setDocsToVefiry: (state, { payload }) => {
      state.toVerify = payload;
    },
    setReportsToVefiry: (state, { payload }) => {
      state.toReport = payload;
    },
    setAdminInfo: (state, { payload }) => {
      state.adminInfo = payload;
    },
    updateAdminInfo: (state, { payload }) => {
      state.adminInfo = { ...state.adminInfo, payload }
    },
    resetAllAdminData: (state) => {
      state = initialState;
    },
  }
})

export const { setDocsToVefiry, setReportsToVefiry, setAdminInfo, updateAdminInfo, resetAllAdminData } = adminSlice.actions
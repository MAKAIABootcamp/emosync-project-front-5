import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  toVerify: [],
  toReport: []
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
  }
})

export const { setDocsToVefiry, setReportsToVefiry } = adminSlice.actions
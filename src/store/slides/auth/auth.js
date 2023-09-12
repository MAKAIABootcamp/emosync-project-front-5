import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    authGoogle: false,
    userRole: "CLIENT",
    email: null,
    displayName: null,
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setTuserRole: (state, { payload }) => {
            state.typeOfUser = payload;
        },
        setEmailAndDisplayName: (state, { payload }) => {
            state.email = payload.email;
            state.displayName = displayName;
        }
    }
})

export const { setTuserRoled,  setEmailAndDisplayName } = authSlice.actions
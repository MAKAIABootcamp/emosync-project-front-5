import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isAuthenticated: false,
    authGoogle: false,
    userRole: "CLIENT",
    email: null,
    displayName: null
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUserRole: (state, { payload }) => {
            state.typeOfUser = payload;
        },
        setEmailAndDisplayName: (state, { payload }) => {
            state.email = payload.email;
            state.displayName = displayName;
        }
    }
})

export const { setUserRole,  setEmailAndDisplayName } = authSlice.actions
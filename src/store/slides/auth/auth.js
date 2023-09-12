import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isAuthenticated: false,
    authGoogle: false,
    userRole: null,
    email: null,
    displayName: null
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUserRole: (state, { payload }) => {
            state.userRole = payload;
        },
        setEmailAndDisplayName: (state, { payload }) => {
            state.email = payload.email;
            state.displayName = displayName;
        }
    }
})

export const { setUserRole,  setEmailAndDisplayName } = authSlice.actions
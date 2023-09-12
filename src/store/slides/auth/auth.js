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
        setIsAuthenticated: (state) => {
            state.isAuthenticated = !state.isAuthenticated;
        },
        setUserRole: (state, { payload }) => {
            state.userRole = payload;
        },
        authWithGoogle: (state, { payload }) => {
            state.email = payload.email;
            state.displayName = payload.displayName;
            state.authGoogle = true;
        },
        reset: (state) => {
            state.isAuthenticated = false
            state.authGoogle = false
            state.userRole = null
            state.email = null
            state.displayName = null
        }
    }
})

export const { setIsAuthenticated, setUserRole, authWithGoogle, reset } = authSlice.actions
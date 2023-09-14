import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isAuthenticated: false,
    authGoogle: false,
    userRole: null,
    email: null,
    displayName: null,
    key: null,
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setKey: (state, {payload}) => {
            state.key = payload;
        },
        setUserRole: (state, { payload }) => {
            state.userRole = payload;
        },
        authWithGoogle: (state, { payload }) => {
            state.email = payload.email;
            state.displayName = payload.displayName;
            state.key = payload.key;
            state.authGoogle = true;
        },
        isLogged: (state, { payload }) => {
            state.isAuthenticated = true
            state.userRole = payload.userRole
            state.key = payload.key
        },
        endRegister: (state, { payload }) => {
            state.isAuthenticated = true
            state.authGoogle = false
            state.email = null
            state.displayName = null
        },
        reset: (state) => {
            localStorage.clear()
            state.isAuthenticated = false
            state.authGoogle = false
            state.userRole = null
            state.email = null
            state.displayName = null
            state.key= null
        }
    }
})

export const { setUserRole, authWithGoogle, reset, endRegister, isLogged, setKey } = authSlice.actions
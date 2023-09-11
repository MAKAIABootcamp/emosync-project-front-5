import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isAuthenticated: false,
    authGoogle: false,
    typeUser: "CLIENT",
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setIsAuthenticated: (state) => {
            state.isAuthenticated = !state.isChecking
        },
        updateInfo: (state, { payload }) => {
            state.authMethod = payload.authMethod;
            state.typeUser = payload.typeUser;
        }
    }
})

export const { setIsAuthenticated, updateInfo } = authSlice.actions